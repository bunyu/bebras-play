// Language of the trainer, the editor and the tasks: French, English or Vietnamese.
// Chosen in the trainer (🌐), kept in this browser (localStorage "algoreaLang"). The first time,
// the device's language when it is one of these, otherwise English.
//
// Every page loads this file first. Pages pick their texts with AlgoreaLang.pick({fr, en, vi}).
// Task pages (they set window.stringsLanguage before loading it) also get:
//   - window.stringsLanguage = the language, so the engine draws its blocks and buttons in it;
//   - i18n/engine.js: the engine's texts missing in English and Vietnamese.
// bridge.js then puts in the task's own texts (i18n/tasks-<lang>.js).
(function () {
   'use strict';
   var LANGS = { fr: 'Français', en: 'English', vi: 'Tiếng Việt' };
   var FLAGS = { fr: '🇫🇷', en: '🇬🇧', vi: '🇻🇳' };
   var SPEECH = { fr: 'fr-FR', en: 'en-GB', vi: 'vi-VN' };
   var KEY = 'algoreaLang';

   var lang = null;
   try { lang = localStorage.getItem(KEY); } catch (e) { /* storage off */ }
   if (!LANGS[lang]) {
      var device = String(navigator.language || '').slice(0, 2).toLowerCase();
      lang = LANGS[device] ? device : 'en';
   }
   var script = document.currentScript;
   var root = script ? script.src.replace(/lang\.js(\?.*)?$/, '') : '';

   var taskTexts = false;
   function load(file) { document.write('<script src="' + root + file + '"><\/script>'); }

   window.AlgoreaLang = {
      LANGS: LANGS, FLAGS: FLAGS, lang: lang, speech: SPEECH[lang],
      set: function (l) {
         if (!LANGS[l]) { return; }
         try { localStorage.setItem(KEY, l); } catch (e) { /* storage off */ }
      },
      // the text for the current language, French when one is missing
      pick: function (texts) { return texts[lang] !== undefined ? texts[lang] : texts.fr; },
      // "Bravo {name} !" with {name: "Lan"}
      fmt: function (s, args) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return args[k] !== undefined ? args[k] : m; }); },
      // the tasks' titles and statements in this language (window.ALGOREA_TASK_TEXT); call while the page loads
      loadTaskTexts: function () {
         if (lang !== 'fr' && !taskTexts) { taskTexts = true; load('i18n/tasks-' + lang + '.js'); }
      }
   };
   document.documentElement.lang = lang;

   if (window.stringsLanguage) {
      window.stringsLanguage = lang;
      if (lang !== 'fr') { load('i18n/engine.js'); }
   }
})();
