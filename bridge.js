// Link between a task page and the trainer page (algorea.html) that shows it in a frame.
// - tells the trainer the score each time the task is graded
// - puts back the child's last programs, or loads a solution, when the trainer asks
// - gives the task page its dark theme (task-dark.css, beside this file)
// Opened on its own, a task page works as before, with the dark theme.
(function () {
   var theme = document.createElement('link');
   theme.rel = 'stylesheet';
   theme.href = document.currentScript.src.replace(/bridge\.js.*$/, 'task-dark.css');
   // added last, so that it wins over the styles the engine loads
   window.addEventListener('load', function () { document.head.appendChild(theme); });
   document.head.appendChild(theme);
   // the bottom bar of the phone layout: the three views keep their names (task-mobile.css)
   var mobile = document.createElement('link');
   mobile.rel = 'stylesheet';
   mobile.href = theme.href.replace(/task-dark\.css$/, 'task-mobile.css');
   window.addEventListener('load', function () { document.head.appendChild(mobile); });
   document.head.appendChild(mobile);

   // on a phone the list of blocks took half of the screen: smaller blocks there
   // (the engine may build the workspace again, for instance when the version changes)
   var SMALL_SCALE = 0.75;
   var config = {};   // from the trainer: {gentle, bigBlocks} (see 'config' below)
   setInterval(function () {
      if (window.innerWidth >= 700 || config.bigBlocks || !window.task || !task.displayedSubTask) { return; }
      var helper = task.displayedSubTask.blocklyHelper, ws = helper && helper.workspace;
      if (!ws || !ws.setScale || ws.scale <= SMALL_SCALE + 0.01) { return; }
      ws.setScale(SMALL_SCALE);
      var flyout = ws.getFlyout && ws.getFlyout();
      if (flyout && flyout.reflow) { flyout.reflow(); }
   }, 700);

   // on a phone the run view shows the grid above the program, but the engine makes the program
   // read-only there: keep it editable, with its list of blocks, so the child can build and run
   // in the same view (task-mobile.css gives the grid and the program their share of the height)
   setInterval(function () {
      var helper = window.task && task.displayedSubTask && task.displayedSubTask.blocklyHelper;
      if (!helper || !helper.setReadOnly || helper.algoreaEditable) { return; }
      helper.algoreaEditable = true;
      var setReadOnly = helper.setReadOnly;
      helper.setReadOnly = function () { return setReadOnly.call(this, false); };
      if (helper.readOnly) { setReadOnly.call(helper, false); }
   }, 300);

   translate();

   // the step-by-step guide "How to play" (tutorial.js, beside this file)
   var guide = document.createElement('script');
   guide.src = theme.href.replace(/task-dark\.css$/, 'tutorial.js');
   document.head.appendChild(guide);

   if (window.parent === window) { return; }

   function send(msg) {
      msg.source = 'algorea-task';
      window.parent.postMessage(msg, '*');
   }

   // what the trainer's robot friend Réa reacts to: a block clicking into place, a run that fails
   setInterval(function () {
      var helper = window.task && task.displayedSubTask && task.displayedSubTask.blocklyHelper, ws = helper && helper.workspace;
      if (ws && ws.addChangeListener && !ws.algoreaSnap) {
         ws.algoreaSnap = true;
         ws.addChangeListener(function (e) {
            if (e && e.type === 'move' && e.newParentId && !ws.isDragging_) { send({ type: 'snap' }); }
         });
      }
      var qi = window.quickAlgoInterface;
      if (qi && qi.displayResults && !qi.algoreaResults) {
         qi.algoreaResults = true;
         var results = qi.displayResults;
         qi.displayResults = function (main) {
            var text = document.createElement('div');
            text.innerHTML = (main && main.message) || '';
            send({ type: 'runFailed', message: text.innerText });
            // the youngest hear it from Réa instead of a red banner
            if (config.gentle) { return; }
            return results.apply(this, arguments);
         };
      }
   }, 500);

   function blockCount() {
      try {
         var helper = task.displayedSubTask.blocklyHelper;
         return helper.workspace.getAllBlocks().filter(function (b) { return !/_start$/.test(b.type) && !b.isShadow(); }).length;
      } catch (e) { return 0; }
   }

   var wait = setInterval(function () {
      if (!window.task || !task.getLevelGrade || !window.displayHelper || !task.displayedSubTask) { return; }
      clearInterval(wait);
      // every grading of the task goes through getLevelGrade (the Validate button included)
      var grade = task.getLevelGrade;
      task.getLevelGrade = function (answer, token, callback, level) {
         grade(answer, token, function (score) {
            send({ type: 'score', score: score, answer: answer, maxScores: displayHelper.getLevelsMaxScores(),
               level: displayHelper.taskLevel, blocks: blockCount() });
            if (callback) { callback.apply(null, arguments); }
         }, level);
      };
      var gi = task.displayedSubTask.gridInfos || {};
      send({ type: 'ready', maxScores: displayHelper.getLevelsMaxScores(),
         world: gi.contextType || (window.customProblem && customProblem.world) || 'none' });
   }, 200);

   function loadProgram(xml) {
      var helper = task.displayedSubTask.blocklyHelper;
      helper.programs[helper.codeId].blockly = xml;
      helper.languages[helper.codeId] = 'blockly';
      helper.loadPrograms();
      helper.loadCodeId(helper.codeId);
   }

   window.addEventListener('message', function (event) {
      var msg = event.data;
      if (!msg || msg.source !== 'algorea-trainer') { return; }
      if (msg.type === 'restore') {
         // put back the programs saved the last time this task was graded
         task.reloadAnswer(msg.answer, function () {});
         return;
      }
      if (msg.type === 'config') {
         config = msg;
         return;
      }
      if (msg.type === 'hint') {
         if (window.AlgoreaTutorial) { AlgoreaTutorial.hint({ solutions: msg.solutions, speak: msg.speak }); }
         return;
      }
      if (msg.type === 'tutorial') {
         if (window.AlgoreaTutorial) { AlgoreaTutorial.start({ speak: msg.speak }); }
         return;
      }
      if (msg.type === 'setLevel') {
         // a problem never tried starts at its easiest version
         if (displayHelper.taskLevel !== msg.level) { displayHelper.setLevel(msg.level); }
         return;
      }
      if (msg.type !== 'loadProgram') { return; }
      if (msg.level && displayHelper.taskLevel !== msg.level) {
         displayHelper.setLevel(msg.level);
         setTimeout(function () { loadProgram(msg.xml); }, 800);
      } else {
         loadProgram(msg.xml);
      }
   });

   // the task in the language chosen in the trainer (lang.js): its heading and statement, then its
   // own messages, buttons and blocks (i18n/tasks-<lang>.js, made by tools/task_texts.mjs);
   // a task with no translation yet stays in French
   function translate() {
      var L = window.AlgoreaLang;
      if (!L || L.lang === 'fr') { return; }
      window.stringsLanguage = L.lang;   // some task scripts set it back to 'fr'
      L.loadTaskTexts();
      // France-ioi's own blocks know French and English only; the rest comes from Blockly's messages
      if (window.FioiBlockly && FioiBlockly.Msg && !FioiBlockly.Msg[L.lang]) {
         FioiBlockly.Msg[L.lang] = L.pick({ fr: {}, en: {}, vi: {
            VARIABLES_DEFAULT_NAME: 'phần_tử',
            LISTS_APPEND_MSG: 'thêm phần tử %2 vào danh sách %1',
            LISTS_APPEND_TOOLTIP: 'Thêm một phần tử vào danh sách \'%1\'',
            INVALID_NAME: 'Tên không hợp lệ: chỉ dùng chữ cái, chữ số (không đứng đầu) và dấu gạch dưới \'_\'.',
            CANNOT_DELETE_VARIABLE_PROCEDURE: 'Không thể xóa biến \'%1\' vì hàm \'%2\' đang dùng nó.'
         } });
      }
      var id = location.pathname.replace(/^.*\//, '').replace(/\.html$/, '');
      function texts() { return (window.ALGOREA_TASK_TEXT || {})[id]; }
      // before the engine reads the page
      document.addEventListener('readystatechange', function () {
         var t = texts(), h1 = document.querySelector('#task h1'), intro = document.getElementById('taskIntro');
         if (!t || document.readyState !== 'interactive') { return; }
         if (h1 && (t.h1 || t.title)) { h1.innerHTML = t.h1 || t.title; }
         if (intro && t.intro) { intro.innerHTML = t.intro; }
         if (t.title) { document.title = t.title; }
      });
      // each task script calls initBlocklySubTask(subTask) once its gridInfos are set
      var init = window.initBlocklySubTask;
      if (typeof init !== 'function') { return; }
      window.initBlocklySubTask = function (subTask) {
         var t = texts(), gi = subTask.gridInfos;
         if (t && gi) {
            if (t.languageStrings) { gi.languageStrings = t.languageStrings; }
            if (t.taskStrings) { gi.taskStrings = t.taskStrings; }
            (gi.newBlocks || []).forEach(function (b) {
               var mine = t.newBlocks && t.newBlocks[b.name], fr = b.strings && b.strings.fr;
               if (mine && fr) {
                  b.strings[L.lang] = { label: mine.label, code: fr.code, description: mine.description };
               }
            });
         }
         return init.apply(this, arguments);
      };
   }
})();
