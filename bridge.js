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
      var flyout = ws.flyout_ || (ws.getFlyout && ws.getFlyout());
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

   /* ---------- phone layout: one view to build and run, parts the child can resize ---------- */
   // The run view already holds the grid and an editable program, so the separate editor view is
   // dropped (task-mobile.css hides its button): a task that would open it opens the run view.
   // Two handles resize the parts: between the grid and the program (up / down), and on the right
   // edge of the list of blocks (left / right: smaller or bigger blocks in the list). The sizes are
   // kept for every task (localStorage "algoreaTaskLayout").
   var LAYOUT_KEY = 'algoreaTaskLayout';
   var layout = {};
   try { layout = JSON.parse(localStorage.getItem(LAYOUT_KEY)) || {}; } catch (e) { /* storage off */ }
   function saveLayout() { try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout)); } catch (e) { /* storage off */ } }
   // the phone layout: the bottom bar switches views (on a computer everything is on one screen)
   function phone() {
      var b = document.getElementById('mode-instructions');
      return !!(b && b.offsetParent && getComputedStyle(b).visibility !== 'hidden');   // hidden, not removed, on a computer
   }
   function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
   function workspace() {
      var helper = window.task && task.displayedSubTask && task.displayedSubTask.blocklyHelper;
      return helper && helper.workspace;
   }

   var modeWait = setInterval(function () {
      var qi = window.quickAlgoInterface;
      if (!qi || !qi.selectMode) { return; }
      clearInterval(modeWait);
      var select = qi.selectMode;
      qi.selectMode = function (mode) {
         if (mode === 'mode-editor' && phone()) { mode = 'mode-player'; }
         var result = select.call(this, mode);
         setTimeout(placeGrips, 60);
         return result;
      };
      if (qi.curMode === 'mode-editor' && phone()) { qi.selectMode('mode-player'); }
   }, 200);

   // the list of blocks gets its own scale: a share of the program's (Blockly gives both the same)
   function listScale() {
      return layout.list || (phone() && !config.bigBlocks ? 0.8 : 1);
   }
   var flyoutWait = setInterval(function () {
      if (!window.Blockly || !Blockly.Flyout) { return; }
      clearInterval(flyoutWait);
      var P = Blockly.Flyout.prototype;
      ['layout_', 'reflowVertical'].forEach(function (name) {
         var original = P[name];
         if (!original) { return; }
         P[name] = function () {
            if (this.horizontalLayout_) { return original.apply(this, arguments); }
            var target = this.targetWorkspace_, scale = target.scale;
            target.scale = scale * listScale();
            try { return original.apply(this, arguments); }
            finally {
               target.scale = scale;
               if (name === 'reflowVertical') { target.resize(); setTimeout(placeGrips, 0); }
            }
         };
      });
      refreshList();
   }, 100);
   // draws the list again at its scale (the blocks are laid out when the list is shown)
   function refreshList() {
      var ws = workspace(), flyout = ws && ws.flyout_;
      // a list opened from a menu (categories) is laid out again each time it opens
      if (!flyout || ws.toolbox_ || !flyout.isVisible || !flyout.isVisible()) { return; }
      var blocks = ws.options && ws.options.languageTree;
      if (blocks && blocks.childNodes) { flyout.show(blocks.childNodes); } else { flyout.reflow(); }
      placeGrips();
   }

   // the two handles
   function grip(id, title) {
      var g = document.getElementById(id);
      if (!g) {
         g = document.createElement('div');
         g.id = id;
         g.className = 'algoreaGrip';
         g.title = title;
         g.innerHTML = '<span></span>';
      }
      return g;
   }
   function placeGrips() {
      var content = document.getElementById('taskContent'), lib = document.getElementById('blocklyLibContent');
      var container = document.getElementById('blocklyContainer'), ws = workspace();
      if (!content || !lib || !container || !ws) { return; }
      if (layout.grid) { setGridShare(layout.grid); }
      var split = grip('algoreaSplit', 'Glisser pour agrandir la grille ou le programme');
      if (split.parentNode !== content) { content.insertBefore(split, lib); dragY(split); }
      var side = grip('algoreaListGrip', 'Glisser pour changer la taille de la liste des blocs');
      if (side.parentNode !== container) { container.appendChild(side); dragX(side); }
      var flyout = ws.flyout_;
      side.hidden = !flyout || ws.toolbox_ || !flyout.isVisible || !flyout.isVisible();
      if (!side.hidden && !side.classList.contains('dragging')) { side.style.left = flyout.width_ + 'px'; }
   }
   addEventListener('resize', function () { setTimeout(placeGrips, 100); });
   setInterval(placeGrips, 1000);   // the engine may build the workspace (or build it again) later

   function onDrag(el, move, end) {
      el.addEventListener('pointerdown', function (e) {
         e.preventDefault();
         el.setPointerCapture(e.pointerId);
         el.classList.add('dragging');
         function up(ev) {
            el.removeEventListener('pointermove', move);
            el.removeEventListener('pointerup', up);
            el.removeEventListener('pointercancel', up);
            el.classList.remove('dragging');
            end(ev);
         }
         el.addEventListener('pointermove', move);
         el.addEventListener('pointerup', up);
         el.addEventListener('pointercancel', up);
      });
   }
   // up / down: the share of the height for the grid (15 % to 75 %)
   function setGridShare(pct) { document.getElementById('task').style.setProperty('--algorea-grid', pct + '%'); }
   var resizing = 0;
   function dragY(el) {
      onDrag(el, function (e) {
         var box = document.getElementById('taskContent').getBoundingClientRect();
         layout.grid = Math.round(clamp((e.clientY - box.top) / box.height * 100, 15, 75));
         setGridShare(layout.grid);
         cancelAnimationFrame(resizing);
         resizing = requestAnimationFrame(function () { if (window.quickAlgoInterface) { quickAlgoInterface.onResize(); } });
      }, function () {
         saveLayout();
         // the grid is drawn again at its new size
         window.dispatchEvent(new Event('resize'));
      });
   }
   // left / right: the list's blocks get smaller or bigger (60 % to 130 % of the program's)
   function dragX(el) {
      var start = 0, startScale = 1;
      el.addEventListener('pointerdown', function () { start = parseFloat(el.style.left) || 1; startScale = listScale(); });
      onDrag(el, function (e) {
         var box = el.parentNode.getBoundingClientRect();
         el.style.left = clamp(e.clientX - box.left, 40, box.width * 0.7) + 'px';
      }, function () {
         layout.list = Math.round(clamp(startScale * (parseFloat(el.style.left) || start) / start, 0.6, 1.3) * 100) / 100;
         saveLayout();
         refreshList();
      });
   }

   // the speed slider: the engine draws two (beside the grid, and in the bar of a phone) and reads the
   // first one, hidden on a phone, so the speed never changed there: every slider follows the one moved
   document.addEventListener('input', syncSpeed, true);
   document.addEventListener('change', syncSpeed, true);
   function syncSpeed(e) {
      var moved = e.target;
      if (!moved.classList || !moved.classList.contains('speedCursor')) { return; }
      Array.prototype.forEach.call(document.querySelectorAll('.speedCursor'), function (s) {
         if (s !== moved) { s.value = moved.value; }
      });
   }

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
