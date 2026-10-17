// "Learn to play": one tiny problem per world of the editor, played with the step-by-step guide
// (tutorial.js) switched on. Same format as data.js (see store.js); the sentences exist in the
// three languages of the app and are picked when the page loads.
//   mes_problemes/task.html?tutorial=<world>   plays the one of that world
(function () {
   'use strict';
   var L = window.AlgoreaLang;
   function pick(t) { return L ? L.pick(t) : t.fr; }

   // a program as Blockly XML: block names, or ['controls_repeat', times, [blocks inside]]
   function program(list) {
      function chain(items) {
         if (!items.length) { return ''; }
         var head = items[0], rest = chain(items.slice(1)), xml;
         if (Array.isArray(head)) {
            xml = '<block type="controls_repeat"><field name="TIMES">' + head[1] + '</field>' +
               '<statement name="DO">' + chain(head[2]) + '</statement>';
         } else {
            xml = '<block type="' + head + '">';
         }
         return xml + (rest ? '<next>' + rest + '</next>' : '') + '</block>';
      }
      return '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="robot_start" deletable="false" movable="false" editable="false" x="0" y="0">' +
         '<next>' + chain(list) + '</next></block></xml>';
   }

   function version(stars, blocks, max, tests, text, solution) {
      return { stars: stars, blocks: blocks, max: max, tests: tests, text: pick(text), solution: program(solution) };
   }

   var R = 'controls_repeat';
   window.ALGOREA_TUTORIALS = [
      { world: 'course', versions: [
         version(1, ['east'], 3, [{ tiles: [[1, 1, 3]], robot: { row: 0, col: 0 } }], {
            fr: 'Amène le robot jusqu\'au drapeau.',
            en: 'Take the robot to the flag.',
            vi: 'Hãy đưa rô-bốt đến lá cờ.'
         }, ['east', 'east']),
         version(2, ['east', R], 2, [{ tiles: [[1, 1, 1, 1, 1, 1, 3]], robot: { row: 0, col: 0 } }], {
            fr: 'Le drapeau est loin et tu n\'as que 2 blocs : utilise « répéter ».',
            en: 'The flag is far away and you only have 2 blocks: use "repeat".',
            vi: 'Lá cờ ở xa mà bạn chỉ có 2 khối: hãy dùng khối "lặp lại".'
         }, [[R, 6, ['east']]])
      ] },
      { world: 'marbles', versions: [
         version(1, ['east', 'withdrawObject', 'dropObject'], 4, [{ tiles: [[1, 4, 3]], robot: { row: 0, col: 0 } }], {
            fr: 'Ramasse la bille, puis dépose-la dans le trou.',
            en: 'Pick up the marble, then drop it into the hole.',
            vi: 'Nhặt viên bi, rồi đặt nó vào cái lỗ.'
         }, ['east', 'withdrawObject', 'east', 'dropObject']),
         version(2, ['east', 'withdrawObject', 'dropObject', R], 5, [{ tiles: [[1, 4, 3, 4, 3, 4, 3]], robot: { row: 0, col: 0 } }], {
            fr: 'Range les trois billes. Les mêmes gestes reviennent : mets-les dans « répéter ».',
            en: 'Put away the three marbles. The same moves come back: put them inside "repeat".',
            vi: 'Cất ba viên bi. Các bước giống nhau lặp lại: hãy đặt chúng vào trong khối "lặp lại".'
         }, [[R, 3, ['east', 'withdrawObject', 'east', 'dropObject']]])
      ] },
      { world: 'paint', versions: [
         version(1, ['east', 'dropObject'], 4, [{ tiles: [[1, 3, 3]], robot: { row: 0, col: 0 } }], {
            fr: 'Peins les deux cases marquées.',
            en: 'Paint the two marked cells.',
            vi: 'Tô màu hai ô có đánh dấu.'
         }, ['east', 'dropObject', 'east', 'dropObject']),
         version(2, ['east', 'dropObject', R], 3, [{ tiles: [[1, 3, 3, 3, 3, 3]], robot: { row: 0, col: 0 } }], {
            fr: 'Peins les cinq cases avec seulement 3 blocs.',
            en: 'Paint the five cells with only 3 blocks.',
            vi: 'Tô màu năm ô mà chỉ dùng 3 khối.'
         }, [[R, 5, ['east', 'dropObject']]])
      ] },
      { world: 'fishing', versions: [
         version(1, ['east', 'withdrawObject', 'dropObject'], 4, [{ tiles: [[1, 8, 2]], robot: { row: 0, col: 0 }, counts: { '0,1': 1, '0,2': 1 } }], {
            fr: 'Prends le poisson dans le filet et apporte-le à l\'île.',
            en: 'Take the fish from the net and bring it to the island.',
            vi: 'Lấy con cá trong lưới và mang nó đến hòn đảo.'
         }, ['east', 'withdrawObject', 'east', 'dropObject']),
         version(2, ['east', 'withdrawObject', 'dropObject', R], 6, [{ tiles: [[1, 8, 2]], robot: { row: 0, col: 0 }, counts: { '0,1': 3, '0,2': 3 } }], {
            fr: 'L\'île veut 3 poissons : prends-en 3, puis donne-les 3.',
            en: 'The island wants 3 fish: take 3, then give all 3.',
            vi: 'Hòn đảo cần 3 con cá: lấy 3 con, rồi thả cả 3 con.'
         }, ['east', [R, 3, ['withdrawObject']], 'east', [R, 3, ['dropObject']]])
      ] },
      { world: 'sokoban', versions: [
         version(1, ['forward', 'pushObject'], 3, [{ tiles: [[1, 4, 1, 3]], robot: { row: 0, col: 0, dir: 0 } }], {
            fr: 'Pousse la caisse jusqu\'à la case marquée.',
            en: 'Push the box onto the marked cell.',
            vi: 'Đẩy thùng đến ô có đánh dấu.'
         }, ['pushObject', 'pushObject']),
         version(2, ['forward', 'left', 'right', 'pushObject'], 4, [{ tiles: [[1, 1, 2], [2, 4, 2], [2, 1, 2], [2, 3, 2]], robot: { row: 0, col: 0, dir: 0 } }], {
            fr: 'La caisse est en dessous : le robot doit d\'abord pivoter pour la regarder.',
            en: 'The box is below: the robot must turn to face it first.',
            vi: 'Thùng ở phía dưới: rô-bốt phải quay người để nhìn về phía nó trước.'
         }, ['forward', 'right', 'pushObject', 'pushObject'])
      ] },
      { world: 'flowers', versions: [
         version(1, ['forward', 'dropObject'], 4, [{ tiles: [[1, 2, 2]], robot: { row: 0, col: 0, dir: 0 } }], {
            fr: 'Sème une graine sur chaque case de terre.',
            en: 'Plant a seed on each soil cell.',
            vi: 'Gieo một hạt trên mỗi ô đất.'
         }, ['forward', 'dropObject', 'forward', 'dropObject']),
         version(2, ['forward', 'left', 'right', 'dropObject'], 7, [{ tiles: [[1, 2, 2], [5, 5, 2]], robot: { row: 0, col: 0, dir: 0 } }], {
            fr: 'Au bout de la ligne, le robot doit pivoter pour descendre.',
            en: 'At the end of the row, the robot must turn to go down.',
            vi: 'Đến cuối hàng, rô-bốt phải quay người để đi xuống.'
         }, ['forward', 'dropObject', 'forward', 'dropObject', 'right', 'forward', 'dropObject'])
      ] },
      { world: 'gems', versions: [
         version(1, ['forward'], 3, [{ tiles: [[1, 1, 3]], robot: { row: 0, col: 0, dir: 0 } }], {
            fr: 'Va chercher la pierre précieuse : le robot la ramasse en passant dessus.',
            en: 'Go and get the gem: the robot picks it up when it gets there.',
            vi: 'Đi lấy viên đá quý: rô-bốt tự nhặt khi đi đến ô đó.'
         }, ['forward', 'forward']),
         version(2, ['forward', 'left', 'right'], 5, [{ tiles: [[1, 1, 1], [4, 4, 1], [4, 4, 3]], robot: { row: 0, col: 0, dir: 0 } }], {
            fr: 'Le chemin tourne : pivote au bon moment.',
            en: 'The path turns: turn at the right moment.',
            vi: 'Đường đi có chỗ rẽ: hãy quay đúng lúc.'
         }, ['forward', 'forward', 'right', 'forward', 'forward'])
      ] }
   ];
   window.ALGOREA_TUTORIALS.forEach(function (t) {
      t.id = 'tutorial-' + t.world;
      t.color = 'blanche';
      t.title = window.AlgoreaCustom ? AlgoreaCustom.WORLDS[t.world].name : t.world;
   });
})();
