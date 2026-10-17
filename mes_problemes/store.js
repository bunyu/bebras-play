// "Mes problèmes": problems made with editeur.html.
//
// A problem is plain data (no code):
//   { id, title, color, world, versions: [ { stars, text, max, blocks, tests: [ { tiles, robot } ] } ] }
// - world    : one of the WORLDS below ("course", "marbles", "paint", "sokoban", "flowers", "gems")
// - stars    : 1 to 4, the difficulty of the version
// - max      : how many blocks the program may use
// - blocks   : names of the allowed blocks: robot blocks of the world (see WORLDS) and general
//              blocks (see GROUPS); "cat:variables" stands for the whole Variables menu
// - tiles    : the grid, one number per cell (the "num" of the world's pieces)
// - robot    : { row, col } and, in worlds where the robot turns, dir (0 east, 1 south, 2 west, 3 north)
// - solution : optional, a program that solves the version (Blockly XML)
//
// Problems come from two places: data.js in this folder (shared with the folder, the zip, git)
// and this browser's storage (what the editor saves until "Exporter" writes it to data.js).
(function () {
   'use strict';

   var KEY = 'algoreaMyProblems.v1';
   var LEVELS = ['basic', 'easy', 'medium', 'hard'];   // 1 to 4 stars, the engine's names

   // The robot either slides in the four directions, or faces one way and turns.
   // Each list: the moves, then what the robot can sense in that way of moving.
   var SLIDE = [
      ['east', 'avancer vers l\'est'], ['west', 'avancer vers l\'ouest'],
      ['north', 'avancer vers le nord'], ['south', 'avancer vers le sud']
   ];
   var SLIDE_SENSORS = [
      ['obstacleEast', 'obstacle à l\'est ?'], ['obstacleWest', 'obstacle à l\'ouest ?'],
      ['obstacleNorth', 'obstacle au nord ?'], ['obstacleSouth', 'obstacle au sud ?']
   ];
   var TURN = [
      ['forward', 'avancer'], ['backwards', 'reculer'],
      ['left', 'pivoter à gauche'], ['right', 'pivoter à droite'], ['turnAround', 'faire demi-tour']
   ];
   var TURN_SENSORS = [
      ['obstacleInFront', 'obstacle devant ?'], ['obstacleLeft', 'obstacle à gauche ?'],
      ['obstacleRight', 'obstacle à droite ?']
   ];
   // sensors that exist in every world
   var ANYWHERE = [
      ['gridEdgeEast', 'bord de la grille à l\'est ?'], ['gridEdgeWest', 'bord de la grille à l\'ouest ?'],
      ['gridEdgeNorth', 'bord de la grille au nord ?'], ['gridEdgeSouth', 'bord de la grille au sud ?'],
      ['row', 'ligne du robot (nombre)'], ['col', 'colonne du robot (nombre)']
   ];

   // A world of the engine's robot library, described for the editor:
   // - pieces  : what can be put on a cell; "solid" pieces cannot hold the robot at the start
   // - actions : blocks that make the robot do something; sensors: blocks that give an answer
   // - rules   : what a test needs to make sense
   //             one: [num]            exactly one such piece
   //             some: [num]           at least one
   //             enough: [a, b]        at least as many pieces a as pieces b
   //             supply: [a, b]        the numbers on pieces a add up to at least those on pieces b
   //             blocks: [names]       blocks that must be allowed
   var WORLDS = {
      course: {
         name: 'Parcours', goal: 'atteindre le drapeau', images: 'img_course', robot: 'red_robot',
         pieces: [
            { num: 1, name: 'Case vide' },
            { num: 2, name: 'Buisson', img: 'obstacle.png', solid: true },
            { num: 3, name: 'Drapeau', img: 'green.png', solid: true }
         ],
         actions: SLIDE,
         sensors: SLIDE_SENSORS.concat([['onExit', 'sur le drapeau ?']], ANYWHERE),
         // the engine's own French name for this block contains a space, which breaks the program
         strings: { label: { onExit: 'sur le drapeau' }, code: { onExit: 'surDrapeau' } },
         rules: { one: [3] }
      },
      marbles: {
         name: 'Billes', goal: 'mettre chaque bille dans un trou', images: 'img_marbles', robot: 'red_robot',
         pieces: [
            { num: 1, name: 'Case vide' },
            { num: 4, name: 'Bille', img: 'marble.png' },
            { num: 3, name: 'Trou', img: 'hole.png' }
         ],
         actions: SLIDE.concat([['withdrawObject', 'ramasser la bille'], ['dropObject', 'déposer la bille']]),
         sensors: [
            ['onObject', 'sur une bille ?'], ['onContainer', 'sur un trou ?'],
            ['nbWithdrawables', 'nombre de billes sur la case'], ['nbInBag', 'nombre de billes portées']
         ].concat(ANYWHERE),
         rules: { some: [3], enough: [4, 3], blocks: ['withdrawObject', 'dropObject'] }
      },
      paint: {
         name: 'Peinture', goal: 'peindre toutes les cases marquées', images: 'img_paint', robot: 'red_robot',
         pieces: [
            { num: 1, name: 'Case vide' },
            { num: 3, name: 'Case à peindre', img: 'marker.png' },
            // a landmark: "sur une case marquée ?" is true on it too, but painting it is a mistake
            { num: 4, name: 'Repère (point blanc)', img: 'marker_white.png' }
         ],
         actions: SLIDE.concat([['dropObject', 'peindre la case']]),
         sensors: [['onContainer', 'sur une case marquée ?'], ['onPaint', 'peinture sur la case ?']].concat(ANYWHERE),
         rules: { some: [3], blocks: ['dropObject'] }
      },
      fishing: {
         name: 'Îles et poissons', goal: 'apporter à chaque île le nombre de poissons qu\'elle demande',
         images: 'img_fishing', robot: 'red_robot',
         // "counted" pieces carry a number, kept in the test's counts: { "row,col": n }
         pieces: [
            { num: 1, name: 'Mer' },
            { num: 8, name: 'Filet de poissons', img: 'fishes.png', under: 'net.png', counted: 'poissons',
              items: ['net', 'count_fishes'], stack: 'fishes' },
            { num: 2, name: 'Île', img: 'island.png', counted: 'poissons demandés',
              items: ['count_needs'], need: 'island' },
            { num: 7, name: 'Rocher', img: 'obstacle.png', solid: true }
         ],
         actions: SLIDE.concat([
            ['withdrawObject', 'prendre le poisson'], ['dropObject', 'déposer le poisson'],
            ['withdrawNum', 'prendre … poissons'], ['dropNum', 'déposer … poissons']
         ]),
         sensors: [
            ['onObject', 'poisson sur la case ?'], ['onContainer', 'sur une île ?'],
            ['nbWithdrawables', 'nombre de poissons sur la case'], ['containerSize', 'nombre de poissons commandés'],
            ['nbInBag', 'nombre de poissons portés']
         ].concat(SLIDE_SENSORS, ANYWHERE),
         settings: { bagSize: 100 },   // the boat carries many fish
         rules: { some: [2], supply: [8, 2] }
      },
      sokoban: {
         name: 'Caisses', goal: 'pousser chaque caisse sur une case marquée', images: 'img_sokoban',
         robot: 'green_robot', turns: true,
         pieces: [
            { num: 1, name: 'Case vide' },
            { num: 2, name: 'Mur', img: 'wall.png', solid: true },
            { num: 4, name: 'Caisse', img: 'box.png', solid: true },
            { num: 3, name: 'Case marquée', img: 'marker.png' }
         ],
         actions: TURN.concat([['pushObject', 'pousser la caisse']]),
         sensors: [['pushableInFront', 'caisse devant ?']].concat(
            TURN_SENSORS, [['onContainer', 'sur une case marquée ?']], ANYWHERE),
         rules: { some: [3], enough: [4, 3], blocks: ['pushObject'] }
      },
      flowers: {
         name: 'Fleurs', goal: 'semer une graine sur chaque case de terre', images: 'img_flowers',
         robot: 'green_robot', turns: true,
         pieces: [
            { num: 1, name: 'Case vide' },
            { num: 2, name: 'Terre', img: 'marker.png' },
            { num: 5, name: 'Fleur', img: 'fixed_flower.png', solid: true }
         ],
         actions: TURN.concat([['dropObject', 'semer une graine']]),
         sensors: [['onContainer', 'terre sur la case ?']].concat(TURN_SENSORS, ANYWHERE),
         rules: { some: [2], blocks: ['dropObject'] }
      },
      gems: {
         name: 'Pierres précieuses', goal: 'ramasser toutes les pierres précieuses', images: 'img_gems',
         robot: 'green_robot', turns: true,
         pieces: [
            { num: 1, name: 'Case vide' },
            { num: 3, name: 'Pierre précieuse', img: 'gem.png' },
            { num: 4, name: 'Mur', img: 'obstacle.png', solid: true }
         ],
         actions: TURN,
         sensors: TURN_SENSORS.concat([['onObject', 'sur une pierre précieuse ?']], ANYWHERE),
         rules: { some: [3] }
      }
   };

   // General blocks, the same in every world, by menu.
   // "cat:..." is a whole menu of the engine (the child creates variables or functions in it).
   var GROUPS = [
      { name: 'Boucles', blocks: [
         ['controls_repeat', 'répéter … fois'], ['controls_repeat_ext', 'répéter (un nombre calculé) fois'],
         ['controls_whileUntil', 'répéter tant que'], ['controls_untilWhile', 'répéter jusqu\'à'],
         ['controls_for', 'compter avec une variable de … à …']
      ] },
      { name: 'Logique', blocks: [
         ['controls_if', 'si … faire'], ['controls_if_else', 'si … faire … sinon'],
         ['logic_negate', 'pas …'], ['logic_operation', '… et … / … ou …'],
         ['logic_compare', 'comparer : = ≠ < >'], ['logic_boolean', 'vrai / faux']
      ] },
      { name: 'Maths', blocks: [
         ['math_number', 'un nombre'], ['math_arithmetic', 'calcul : + − × ÷'],
         ['math_modulo', 'reste de la division'], ['math_number_property', 'est pair / impair / positif ?']
      ] },
      { name: 'Variables', blocks: [['cat:variables', 'variables (créer, modifier, lire)']] },
      { name: 'Fonctions', blocks: [
         ['procedures_defnoreturn', 'créer une fonction'], ['procedures_defreturn', 'créer une fonction qui donne un résultat']
      ] },
      { name: 'Listes', blocks: [
         ['lists_create_with_empty', 'créer une liste vide'], ['lists_repeat', 'créer une liste de … éléments'],
         ['lists_append', 'ajouter à la liste'], ['lists_getIndex', 'lire un élément'],
         ['lists_setIndex', 'modifier un élément'], ['lists_length', 'longueur de la liste']
      ] }
   ];

   // ---------- the same names in English and Vietnamese ----------
   // The French names above stay the reference (and the data). In another language the names of
   // the worlds, pieces, blocks and menus are replaced by these, while the page loads.
   // Robot blocks use the engine's own labels in that language ("…" for its %1), so the editor's
   // list matches what the child sees in the task.
   var L = window.AlgoreaLang;
   var lang = L && L.lang !== 'fr' ? L.lang : 'fr';
   var NAMES = {
      en: {
         robot: 'Robot',
         worlds: {
            course: ['Path', 'reach the flag', { 1: 'Empty cell', 2: 'Bush', 3: 'Flag' }],
            marbles: ['Marbles', 'put each marble in a hole', { 1: 'Empty cell', 4: 'Marble', 3: 'Hole' }],
            paint: ['Painting', 'paint all the marked cells', { 1: 'Empty cell', 3: 'Cell to paint', 4: 'Landmark (white dot)' }],
            fishing: ['Islands and fish', 'bring each island the number of fish it asks for',
               { 1: 'Sea', 8: 'Net of fish', 2: 'Island', 7: 'Rock' }, { 8: 'fish', 2: 'fish asked for' }],
            sokoban: ['Boxes', 'push each box onto a marked cell', { 1: 'Empty cell', 2: 'Wall', 4: 'Box', 3: 'Marked cell' }],
            flowers: ['Flowers', 'plant a seed on each patch of soil', { 1: 'Empty cell', 2: 'Soil', 5: 'Flower' }],
            gems: ['Gems', 'pick up all the gems', { 1: 'Empty cell', 3: 'Gem', 4: 'Wall' }]
         },
         blocks: {
            east: 'move right', west: 'move left', north: 'move up', south: 'move down',
            obstacleEast: 'obstacle on the right', obstacleWest: 'obstacle on the left',
            obstacleNorth: 'obstacle above', obstacleSouth: 'obstacle below',
            forward: 'move forward', backwards: 'move backwards', left: 'turn left', right: 'turn right',
            turnAround: 'turn around', obstacleInFront: 'obstacle ahead', obstacleLeft: 'obstacle on the left',
            obstacleRight: 'obstacle on the right',
            gridEdgeEast: 'grid edge on the right', gridEdgeWest: 'grid edge on the left',
            gridEdgeNorth: 'grid edge above', gridEdgeSouth: 'grid edge below',
            row: 'robot\'s row', col: 'robot\'s column',
            withdrawObject: 'pick the object', dropObject: 'drop the object', onObject: 'on an object',
            onContainer: 'on a container', nbWithdrawables: 'number of objects on the cell',
            nbInBag: 'number of objects in the bag', containerSize: 'number of objects to drop on the cell',
            withdrawNum: 'pick up %1 objects', dropNum: 'drop %1 objects',
            pushObject: 'push the object', pushableInFront: 'pushable object ahead',
            onExit: 'on the flag', onPaint: 'paint on the cell'
         },
         worldBlocks: {
            marbles: { withdrawObject: 'pick up the marble', dropObject: 'drop the marble', onObject: 'on a marble', onContainer: 'on a hole' },
            paint: { dropObject: 'paint the cell', onContainer: 'on a marked cell' },
            fishing: {
               withdrawObject: 'take the fish', dropObject: 'drop the fish', withdrawNum: 'take %1 fish', dropNum: 'drop %1 fish',
               nbWithdrawables: 'number of fish on the cell', containerSize: 'number of fish ordered',
               onObject: 'fish on the cell', onContainer: 'on an island'
            },
            sokoban: { pushObject: 'push the box', onContainer: 'on a marked cell', pushableInFront: 'in front of a box',
               obstacleInFront: 'in front of an obstacle' },
            flowers: { dropObject: 'plant a seed', onContainer: 'soil on the cell', obstacleInFront: 'flower ahead' }
         },
         groups: ['Loops', 'Logic', 'Maths', 'Variables', 'Functions', 'Lists'],
         common: {
            controls_repeat: 'repeat … times', controls_repeat_ext: 'repeat (a calculated number of) times',
            controls_whileUntil: 'repeat while', controls_untilWhile: 'repeat until',
            controls_for: 'count with a variable from … to …',
            controls_if: 'if … do', controls_if_else: 'if … do … else', logic_negate: 'not …',
            logic_operation: '… and … / … or …', logic_compare: 'compare: = ≠ < >', logic_boolean: 'true / false',
            math_number: 'a number', math_arithmetic: 'calculation: + − × ÷', math_modulo: 'remainder of a division',
            math_number_property: 'is even / odd / positive?', 'cat:variables': 'variables (create, change, read)',
            procedures_defnoreturn: 'make a function', procedures_defreturn: 'make a function that gives a result',
            lists_create_with_empty: 'make an empty list', lists_repeat: 'make a list of … items',
            lists_append: 'add to the list', lists_getIndex: 'read an item', lists_setIndex: 'change an item',
            lists_length: 'length of the list'
         }
      },
      vi: {
         robot: 'Rô-bốt',
         worlds: {
            course: ['Đường đi', 'đi đến lá cờ', { 1: 'Ô trống', 2: 'Bụi cây', 3: 'Lá cờ' }],
            marbles: ['Viên bi', 'bỏ mỗi viên bi vào một cái lỗ', { 1: 'Ô trống', 4: 'Viên bi', 3: 'Cái lỗ' }],
            paint: ['Tô màu', 'tô màu tất cả các ô có đánh dấu', { 1: 'Ô trống', 3: 'Ô cần tô màu', 4: 'Điểm mốc (chấm trắng)' }],
            fishing: ['Đảo và cá', 'mang đến mỗi hòn đảo đúng số cá đảo cần',
               { 1: 'Biển', 8: 'Lưới cá', 2: 'Hòn đảo', 7: 'Tảng đá' }, { 8: 'con cá', 2: 'con cá đảo cần' }],
            sokoban: ['Thùng hàng', 'đẩy mỗi thùng vào một ô có đánh dấu', { 1: 'Ô trống', 2: 'Bức tường', 4: 'Thùng', 3: 'Ô có đánh dấu' }],
            flowers: ['Vườn hoa', 'gieo một hạt giống trên mỗi ô đất', { 1: 'Ô trống', 2: 'Đất', 5: 'Bông hoa' }],
            gems: ['Đá quý', 'nhặt tất cả các viên đá quý', { 1: 'Ô trống', 3: 'Viên đá quý', 4: 'Bức tường' }]
         },
         blocks: {
            east: 'sang phải', west: 'sang trái', north: 'đi lên', south: 'đi xuống',
            obstacleEast: 'chướng ngại vật bên phải', obstacleWest: 'chướng ngại vật bên trái',
            obstacleNorth: 'chướng ngại vật phía trên', obstacleSouth: 'chướng ngại vật phía dưới',
            forward: 'tiến lên', backwards: 'lùi lại', left: 'quay trái', right: 'quay phải', turnAround: 'quay đầu lại',
            obstacleInFront: 'chướng ngại vật phía trước', obstacleLeft: 'chướng ngại vật bên trái',
            obstacleRight: 'chướng ngại vật bên phải',
            gridEdgeEast: 'mép lưới bên phải', gridEdgeWest: 'mép lưới bên trái',
            gridEdgeNorth: 'mép lưới phía trên', gridEdgeSouth: 'mép lưới phía dưới',
            row: 'hàng của rô-bốt', col: 'cột của rô-bốt',
            withdrawObject: 'nhặt đồ vật', dropObject: 'đặt đồ vật', onObject: 'trên một đồ vật',
            onContainer: 'trên một chỗ chứa', nbWithdrawables: 'số đồ vật trên ô', nbInBag: 'số đồ vật trong túi',
            containerSize: 'số đồ vật cần đặt trên ô', withdrawNum: 'nhặt %1 đồ vật', dropNum: 'đặt %1 đồ vật',
            pushObject: 'đẩy đồ vật', pushableInFront: 'vật đẩy được ở phía trước',
            onExit: 'ở lá cờ', onPaint: 'ô đã được tô màu'
         },
         worldBlocks: {
            marbles: { withdrawObject: 'nhặt viên bi', dropObject: 'đặt viên bi', onObject: 'trên một viên bi', onContainer: 'trên một cái lỗ' },
            paint: { dropObject: 'tô màu ô', onContainer: 'trên một ô có đánh dấu' },
            fishing: {
               withdrawObject: 'lấy con cá', dropObject: 'thả con cá', withdrawNum: 'lấy %1 con cá', dropNum: 'thả %1 con cá',
               nbWithdrawables: 'số cá trên ô', containerSize: 'số cá đảo cần',
               onObject: 'có cá trên ô', onContainer: 'trên một hòn đảo'
            },
            sokoban: { pushObject: 'đẩy thùng', onContainer: 'trên một ô có đánh dấu', pushableInFront: 'thùng ở phía trước',
               obstacleInFront: 'chướng ngại vật phía trước' },
            flowers: { dropObject: 'gieo hạt', onContainer: 'có đất trên ô', obstacleInFront: 'bông hoa phía trước' }
         },
         groups: ['Vòng lặp', 'Logic', 'Toán', 'Biến', 'Hàm', 'Danh sách'],
         common: {
            controls_repeat: 'lặp lại … lần', controls_repeat_ext: 'lặp lại (một số được tính ra) lần',
            controls_whileUntil: 'lặp lại trong khi', controls_untilWhile: 'lặp lại cho đến khi',
            controls_for: 'đếm bằng một biến từ … đến …',
            controls_if: 'nếu … thực hiện', controls_if_else: 'nếu … thực hiện … nếu không', logic_negate: 'không …',
            logic_operation: '… và … / … hoặc …', logic_compare: 'so sánh: = ≠ < >', logic_boolean: 'đúng / sai',
            math_number: 'một số', math_arithmetic: 'phép tính: + − × ÷', math_modulo: 'số dư của phép chia',
            math_number_property: 'là số chẵn / lẻ / dương?', 'cat:variables': 'biến (tạo, thay đổi, đọc)',
            procedures_defnoreturn: 'tạo một hàm', procedures_defreturn: 'tạo một hàm trả về kết quả',
            lists_create_with_empty: 'tạo một danh sách rỗng', lists_repeat: 'tạo một danh sách gồm … phần tử',
            lists_append: 'thêm vào danh sách', lists_getIndex: 'đọc một phần tử', lists_setIndex: 'thay đổi một phần tử',
            lists_length: 'độ dài của danh sách'
         }
      }
   };
   // The course world's "on the flag" block, named by us in every language (see strings above)
   var COURSE_STRINGS = {
      en: { label: { onExit: 'on the flag' }, code: { onExit: 'onFlag' } },
      vi: { label: { onExit: 'ở lá cờ' }, code: { onExit: 'onFlag' } }
   };
   var N = NAMES[lang];
   if (N) {
      Object.keys(WORLDS).forEach(function (w) {
         var world = WORLDS[w], t = N.worlds[w], own = N.worldBlocks[w] || {};
         world.name = t[0];
         world.goal = t[1];
         world.pieces = world.pieces.map(function (p) {
            var copy = {};
            Object.keys(p).forEach(function (k) { copy[k] = p[k]; });
            copy.name = t[2][p.num] || p.name;
            if (p.counted) { copy.counted = (t[3] || {})[p.num] || p.counted; }
            return copy;
         });
         function rename(list) {
            return list.map(function (b) {
               var name = own[b[0]] || N.blocks[b[0]];
               return [b[0], name ? name.replace(/%1/g, '…') : b[1]];
            });
         }
         world.actions = rename(world.actions);
         world.sensors = rename(world.sensors);
      });
      WORLDS.course.strings = COURSE_STRINGS[lang];
      GROUPS = GROUPS.map(function (g, i) {
         return { name: N.groups[i], blocks: g.blocks.map(function (b) { return [b[0], N.common[b[0]] || b[1]]; }) };
      });
   }
   Object.keys(WORLDS).forEach(function (w) { WORLDS[w].blocks = WORLDS[w].actions.concat(WORLDS[w].sensors); });
   var COMMON = [].concat.apply([], GROUPS.map(function (g) { return g.blocks; }));

   // ---------- starter problems in the child's language ----------
   // i18n/tasks-<lang>.js may give the problems of data.js in another language:
   //   window.ALGOREA_STARTER_TEXT = { <id>: { title, texts: [one per version, as in data.js] } }
   // shown() returns the problem to SHOW: a copy where the title and each statement that are still
   // those of data.js are in the child's language. Anything the user wrote stays as written.
   // It is for display only: the editor, the storage and the links always keep the original.
   // A copy received by a link (no id, or a "partage-..." id) is found by its world and title.
   function original(problem) {
      var starters = window.ALGOREA_CUSTOM || [];
      return starters.filter(function (p) { return p.id === problem.id; })[0] ||
         starters.filter(function (p) { return p.world === problem.world && p.title === problem.title; })[0];
   }
   function shown(problem) {
      var texts = window.ALGOREA_STARTER_TEXT;
      if (!texts || !problem || lang === 'fr') { return problem; }
      var orig = original(problem), tr = orig && texts[orig.id];
      if (!tr) { return problem; }
      var copy = {};
      Object.keys(problem).forEach(function (k) { copy[k] = problem[k]; });
      if (tr.title && problem.title === orig.title) { copy.title = tr.title; }
      copy.versions = (problem.versions || []).map(function (v) {
         var j = -1;
         orig.versions.forEach(function (o, i) { if (j < 0 && v.text && o.text === v.text) { j = i; } });
         var text = j >= 0 && tr.texts && tr.texts[j];
         if (!text) { return v; }
         var w = {};
         Object.keys(v).forEach(function (k) { w[k] = v[k]; });
         w.text = text;
         return w;
      });
      return copy;
   }

   function local() {
      try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
   }
   function writeLocal(map) {
      try { localStorage.setItem(KEY, JSON.stringify(map)); } catch (e) { /* storage full or off */ }
   }

   // every problem: the ones of data.js, replaced or completed by the ones saved in this browser
   function all() {
      var map = local(), seen = {}, out = [];
      (window.ALGOREA_CUSTOM || []).forEach(function (p) {
         seen[p.id] = true;
         if (!map[p.id]) { out.push(p); } else if (!map[p.id].deleted) { out.push(map[p.id]); }
      });
      Object.keys(map).forEach(function (id) {
         if (!seen[id] && !map[id].deleted) { out.push(map[id]); }
      });
      return out;
   }

   // the most advanced idea a problem uses, as in tasks.js
   function skill(problem) {
      var used = {};
      problem.versions.forEach(function (v) { (v.blocks || []).forEach(function (b) { used[b] = true; }); });
      function any(prefix) { return Object.keys(used).some(function (b) { return b.indexOf(prefix) === 0; }); }
      if (any('lists_')) { return 'listes'; }
      if (any('procedures_')) { return 'fonctions'; }
      if (used['cat:variables'] || used.controls_for) { return 'variables'; }
      if (any('controls_if') || any('logic_') || used.controls_whileUntil || used.controls_untilWhile) { return 'conditions'; }
      return any('controls_repeat') ? 'boucles' : 'sequences';
   }

   window.AlgoreaCustom = {
      WORLDS: WORLDS, GROUPS: GROUPS, COMMON: COMMON, LEVELS: LEVELS,
      // the blocks that move the robot in this world
      moves: function (world) { return (WORLDS[world].turns ? TURN : SLIDE).map(function (b) { return b[0]; }); },
      // a long list of blocks is shown in menus, and variables and functions need their menu
      needsMenus: function (blocks) {
         return blocks.length > 12 || blocks.some(function (b) {
            return b === 'cat:variables' || b === 'controls_for' || b.indexOf('procedures_') === 0 || b.indexOf('lists_') === 0;
         });
      },
      // the number written on a counted piece (1 when nobody chose)
      countAt: function (test, row, col) { return (test.counts && test.counts[row + ',' + col]) || 1; },
      // a test as the engine wants it: the grid, then the robot and the pieces that carry a number
      toEngine: function (worldName, test) {
         var world = WORLDS[worldName], items = [], self = this;
         var robot = { row: test.robot.row, col: test.robot.col, type: world.robot };
         if (world.turns) { robot.dir = test.robot.dir || 0; }
         items.push(robot);
         var tiles = test.tiles.map(function (line, row) {
            return line.map(function (num, col) {
               var piece = world.pieces.filter(function (p) { return p.num === num; })[0];
               if (!piece || !piece.counted) { return num; }
               var n = self.countAt(test, row, col);
               if (piece.need) { items.push({ row: row, col: col, type: piece.need, containerSize: n }); }
               (piece.items || []).forEach(function (type) { items.push({ row: row, col: col, type: type }); });
               for (var i = 0; piece.stack && i < n; i++) { items.push({ row: row, col: col, type: piece.stack }); }
               return 1;   // the cell itself is empty: everything on it is an item
            });
         });
         return { tiles: tiles, initItems: items };
      },
      all: all,
      shown: shown,
      get: function (id) { return all().filter(function (p) { return p.id === id; })[0]; },
      levelOf: function (version) { return LEVELS[version.stars - 1]; },
      save: function (problem) { var m = local(); m[problem.id] = problem; writeLocal(m); },
      remove: function (id) { var m = local(); m[id] = { id: id, deleted: true }; writeLocal(m); },
      // true when this browser holds changes that data.js does not have yet
      pending: function () { return Object.keys(local()).length > 0; },
      // after an export, data.js holds everything: forget the browser copies
      forgetLocal: function () { writeLocal({}); },
      // the entry of the trainer's list (same shape as the entries of tasks.js)
      asTask: function (problem, number) {
         return {
            id: 'perso_' + problem.id, path: 'mes_problemes/task.html?id=' + encodeURIComponent(problem.id),
            title: shown(problem).title, number: number, skill: skill(problem), group: 'Mes problèmes',
            color: problem.color || undefined, custom: problem.id,
            levels: problem.versions.map(function (v) { return LEVELS[v.stars - 1]; })
         };
      },
      toDataFile: function (problems) {
         return '// "Mes problèmes" - written by editeur.html (Exporter). See store.js for the format.\n' +
            'window.ALGOREA_CUSTOM = ' + JSON.stringify(problems, null, 1) + ';\n';
      }
   };
})();
