// Sharing "Mes problèmes": a problem travels as a short code inside a link.
//
//   <BASE>partage.html#p=<code>
//
// The code is the problem (see store.js) as JSON, wrapped as { format: FORMAT, problem: {...} },
// compressed with deflate and written in base64url ("z" + ...). Browsers without compression
// streams write the JSON uncompressed ("j" + ...). The id is not sent: the receiver gives one.
// Opened in the Android application, the same link opens the problem in the application.
//
// Everything read from a code is checked and rebuilt from the known fields only (clean()),
// because a shared problem comes from someone else.
(function () {
   'use strict';

   // where partage.html is published for people who do not have the application
   var BASE = 'https://bunyu.github.io/bebras-play/';
   var FORMAT = 'algorea-problem/1';
   var MAX_ROWS = 14, MAX_COLS = 20, MAX_TESTS = 10, MAX_TEXT = 2000;

   // what a child may read: the reasons a code cannot be read (shown by the editor), the message sent
   var T = (window.AlgoreaLang ? AlgoreaLang.pick : function (t) { return t.fr; })({
      fr: {
         number: 'nombre attendu', notProblem: 'ce n\'est pas un problème', world: 'monde inconnu',
         noVersion: 'aucune version', twice: 'deux versions {n} étoiles', noTest: 'version sans test',
         grid: 'grille invalide', noCode: 'aucun code de problème trouvé',
         old: 'ce navigateur est trop ancien pour lire ce code', format: 'format inconnu',
         untitled: 'Problème partagé', message: 'Un problème de robot à résoudre : « {title} »'
      },
      en: {
         number: 'a number was expected', notProblem: 'this is not a problem', world: 'unknown world',
         noVersion: 'no version', twice: 'two {n}-star versions', noTest: 'a version without a test',
         grid: 'invalid grid', noCode: 'no problem code found',
         old: 'this browser is too old to read this code', format: 'unknown format',
         untitled: 'Shared problem', message: 'A robot problem to solve: “{title}”'
      },
      vi: {
         number: 'cần một con số', notProblem: 'đây không phải là một bài', world: 'thế giới không rõ',
         noVersion: 'không có mức nào', twice: 'có hai mức {n} sao', noTest: 'có mức không có bài kiểm tra',
         grid: 'lưới không hợp lệ', noCode: 'không tìm thấy mã của bài',
         old: 'trình duyệt này quá cũ, không đọc được mã này', format: 'định dạng không rõ',
         untitled: 'Bài được chia sẻ', message: 'Một bài rô-bốt cho bạn giải: “{title}”'
      }
   });
   function fmt(s, args) { return s.replace(/\{(\w+)\}/g, function (m, k) { return args[k]; }); }

   function bytesToB64url(bytes) {
      var s = '';
      for (var i = 0; i < bytes.length; i += 0x8000) {
         s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      }
      return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
   }
   function b64urlToBytes(text) {
      var s = atob(text.replace(/-/g, '+').replace(/_/g, '/'));
      var out = new Uint8Array(s.length);
      for (var i = 0; i < s.length; i++) { out[i] = s.charCodeAt(i); }
      return out;
   }
   function pipe(bytes, stream) {
      return new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer()
         .then(function (buf) { return new Uint8Array(buf); });
   }
   var canZip = typeof CompressionStream === 'function' && typeof DecompressionStream === 'function';

   function int(x, lo, hi) {
      x = Math.round(Number(x));
      if (!isFinite(x)) { throw new Error(T.number); }
      return Math.max(lo, Math.min(hi, x));
   }
   function str(x, max) { return typeof x === 'string' ? x.slice(0, max) : ''; }

   // the problem, rebuilt from the fields store.js knows, or an Error saying what is wrong
   function clean(p) {
      var C = window.AlgoreaCustom;
      if (!p || typeof p !== 'object') { throw new Error(T.notProblem); }
      var world = C.WORLDS[p.world];
      if (!world) { throw new Error(T.world); }
      var nums = world.pieces.map(function (x) { return x.num; });
      var known = world.blocks.concat(C.COMMON).map(function (b) { return b[0]; });
      if (!Array.isArray(p.versions) || !p.versions.length) { throw new Error(T.noVersion); }
      var seen = {};
      var versions = p.versions.slice(0, 4).map(function (v) {
         var stars = int(v.stars, 1, 4);
         if (seen[stars]) { throw new Error(fmt(T.twice, { n: stars })); }
         seen[stars] = true;
         if (!Array.isArray(v.tests) || !v.tests.length) { throw new Error(T.noTest); }
         var out = {
            stars: stars,
            text: str(v.text, MAX_TEXT),
            max: int(v.max, 1, 200),
            blocks: (Array.isArray(v.blocks) ? v.blocks : []).filter(function (b) { return known.indexOf(b) >= 0; }),
            tests: v.tests.slice(0, MAX_TESTS).map(function (t) {
               if (!Array.isArray(t.tiles) || !t.tiles.length || t.tiles.length > MAX_ROWS) { throw new Error(T.grid); }
               var cols = Array.isArray(t.tiles[0]) ? t.tiles[0].length : 0;
               if (cols < 1 || cols > MAX_COLS) { throw new Error(T.grid); }
               var tiles = t.tiles.map(function (line) {
                  if (!Array.isArray(line) || line.length !== cols) { throw new Error(T.grid); }
                  return line.map(function (n) { return nums.indexOf(n) >= 0 ? n : 1; });
               });
               var r = t.robot || {};
               var test = { tiles: tiles, robot: { row: int(r.row, 0, tiles.length - 1), col: int(r.col, 0, cols - 1) } };
               if (world.turns) { test.robot.dir = int(r.dir || 0, 0, 3); }
               if (t.counts && typeof t.counts === 'object') {
                  test.counts = {};
                  Object.keys(t.counts).forEach(function (k) {
                     if (/^\d{1,2},\d{1,2}$/.test(k)) { test.counts[k] = int(t.counts[k], 1, 99); }
                  });
               }
               return test;
            })
         };
         if (typeof v.solution === 'string' && v.solution.indexOf('<xml') === 0 && v.solution.length < 100000) {
            out.solution = v.solution;
         }
         return out;
      });
      versions.sort(function (a, b) { return a.stars - b.stars; });
      var colors = ['blanche', 'jaune', 'orange', 'vert'];
      var problem = {
         id: '', title: str(p.title, 60).trim() || T.untitled,
         color: colors.indexOf(p.color) >= 0 ? p.color : 'blanche',
         world: p.world, versions: versions
      };
      if (p.author) { problem.author = str(p.author, 30); }
      return problem;
   }

   function encode(problem) {
      var copy = JSON.parse(JSON.stringify(problem));
      delete copy.id;
      delete copy.shared;
      var bytes = new TextEncoder().encode(JSON.stringify({ format: FORMAT, problem: copy }));
      if (!canZip) { return Promise.resolve('j' + bytesToB64url(bytes)); }
      return pipe(bytes, new CompressionStream('deflate-raw')).then(function (z) { return 'z' + bytesToB64url(z); });
   }

   // the code found in a link, in a text that contains a link, or the code alone
   function findCode(text) {
      text = String(text || '').trim();
      var m = text.match(/[#&?]p=([A-Za-z0-9_-]+)/);
      if (m) { return m[1]; }
      m = text.match(/^[zj][A-Za-z0-9_-]{8,}$/);
      return m ? m[0] : '';
   }

   function decode(text) {
      return new Promise(function (resolve) {
         var code = findCode(text);
         if (!code) { throw new Error(T.noCode); }
         var bytes = b64urlToBytes(code.slice(1));
         if (code[0] === 'j') { resolve(bytes); return; }
         if (!canZip) { throw new Error(T.old); }
         resolve(pipe(bytes, new DecompressionStream('deflate-raw')));
      }).then(function (bytes) {
         var data = JSON.parse(new TextDecoder().decode(bytes));
         if (!data || data.format !== FORMAT) { throw new Error(T.format); }
         return clean(data.problem);
      });
   }

   function link(problem) {
      return encode(problem).then(function (code) { return BASE + 'partage.html#p=' + code; });
   }

   // keeps a received problem in "Mes problèmes" under a new id; returns that id
   function keep(problem) {
      var C = window.AlgoreaCustom;
      var copy = clean(problem);
      var base = 'partage-' + copy.title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
         .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
      var id = base, n = 2;
      while (C.get(id)) { id = base + '-' + n++; }
      copy.id = id;
      copy.shared = true;
      C.save(copy);
      return id;
   }

   // the Android application gives its share sheet; a browser its own, or the clipboard
   function send(title, url) {
      var text = fmt(T.message, { title: title }) + '\n' + url;
      if (window.AndroidBridge && AndroidBridge.share) {
         AndroidBridge.share(title, text);
         return Promise.resolve('shared');
      }
      if (navigator.share) {
         return navigator.share({ title: title, text: text, url: url }).then(function () { return 'shared'; });
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
         return navigator.clipboard.writeText(url).then(function () { return 'copied'; });
      }
      return Promise.resolve('shown');
   }

   window.AlgoreaShare = {
      BASE: BASE, FORMAT: FORMAT,
      encode: encode, decode: decode, findCode: findCode, clean: clean, link: link, keep: keep, send: send
   };
})();
