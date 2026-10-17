// "How to play": a step-by-step guide over a task page, for children who have never used blocks.
// It points at the real screen (grid, statement, list of blocks, program, ▶ button), shows a hand
// dragging a block, waits for the child to do it, explains each block of this task in the words
// of its world (marbles, fish, paint...), then how to run, try again and win the stars.
//
// Loaded by bridge.js in every task page. Starts with AlgoreaTutorial.start({ speak }) — the trainer
// asks for it with a message (🎓 button, or the first time a child meets a world) — or by itself
// in the "Learn to play" problems (window.algoreaTutorialAuto, set by mes_problemes/task.html).
// Texts in French, English and Vietnamese (lang.js).
(function () {
   'use strict';
   var L = window.AlgoreaLang || { lang: 'fr', pick: function (t) { return t.fr; } };
   var lang = L.lang;
   function pick(t) { return t ? (t[lang] !== undefined ? t[lang] : t.fr) : ''; }
   function fill(s, args) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return args[k] !== undefined ? args[k] : m; }); }

   /* ---------- texts ---------- */
   var T = {
      title: { fr: 'Comment jouer', en: 'How to play', vi: 'Cách chơi' },
      next: { fr: 'Suivant ▶', en: 'Next ▶', vi: 'Tiếp ▶' },
      back: { fr: '◀', en: '◀', vi: '◀' },
      close: { fr: 'Fermer', en: 'Close', vi: 'Đóng' },
      done: { fr: 'À toi de jouer !', en: 'Your turn!', vi: 'Đến lượt bạn!' },
      bravo: { fr: 'Bravo ! Tu as ajouté un bloc.', en: 'Well done! You added a block.', vi: 'Giỏi lắm! Bạn đã thêm một khối.' },
      robot: {
         fr: 'Voici le monde du robot.', en: 'This is the robot\'s world.', vi: 'Đây là thế giới của rô-bốt.'
      },
      goal: { fr: 'Sa mission : {goal}.', en: 'Its mission: {goal}.', vi: 'Nhiệm vụ của nó: {goal}.' },
      read: {
         fr: 'Ici, la consigne dit ce que le robot doit faire. Lis-la bien (ou fais-la lire avec 🔊).',
         en: 'Here, the instructions say what the robot must do. Read them carefully (or listen with 🔊).',
         vi: 'Ở đây, đề bài cho biết rô-bốt phải làm gì. Hãy đọc kỹ (hoặc bấm 🔊 để nghe).'
      },
      blocks: {
         fr: 'Voici tes blocs. Chaque bloc est un ordre pour le robot :',
         en: 'These are your blocks. Each block is an order for the robot:',
         vi: 'Đây là các khối lệnh của bạn. Mỗi khối là một mệnh lệnh cho rô-bốt:'
      },
      boxes: {
         fr: 'Les blocs sont rangés dans des boîtes : {names}. Touche une boîte pour voir ses blocs.',
         en: 'The blocks are sorted into boxes: {names}. Tap a box to see its blocks.',
         vi: 'Các khối được xếp vào từng hộp: {names}. Chạm vào một hộp để xem các khối bên trong.'
      },
      drag: {
         fr: 'Pour donner un ordre, pose ton doigt sur un bloc et fais-le glisser sous « {start} », jusqu\'à ce qu\'il s\'accroche. Essaie !',
         en: 'To give an order, put your finger on a block and slide it under "{start}" until it clicks into place. Try it!',
         vi: 'Để ra lệnh, hãy đặt ngón tay lên một khối và kéo nó xuống dưới "{start}" cho đến khi nó gắn vào. Thử xem!'
      },
      order: {
         fr: 'Le robot fait les blocs dans l\'ordre, de haut en bas. Ajoute les blocs les uns sous les autres.',
         en: 'The robot does the blocks in order, from top to bottom. Add the blocks one under the other.',
         vi: 'Rô-bốt làm các khối theo thứ tự, từ trên xuống dưới. Hãy gắn các khối nối tiếp nhau.'
      },
      remove: {
         fr: 'Un bloc en trop ? Fais-le glisser vers la liste des blocs (à gauche) pour le jeter. Attention : le nombre de blocs est limité.',
         en: 'One block too many? Slide it back onto the list of blocks to throw it away. Careful: the number of blocks is limited.',
         vi: 'Thừa một khối? Kéo nó trở lại danh sách khối để bỏ đi. Chú ý: số khối được dùng có giới hạn.'
      },
      repeat: {
         fr: 'Le bloc « répéter » fait plusieurs fois les blocs que tu mets dans sa bouche. Change le nombre en le touchant. Super pour faire moins de blocs !',
         en: 'The "repeat" block does the blocks you put inside its mouth several times. Tap the number to change it. Great for using fewer blocks!',
         vi: 'Khối "lặp lại" làm nhiều lần các khối bạn đặt vào bên trong nó. Chạm vào con số để thay đổi. Rất hay để dùng ít khối hơn!'
      },
      cond: {
         fr: 'Le bloc « si » regarde d\'abord la case : il fait les blocs de sa bouche seulement si c\'est vrai. Accroche une question verte (un capteur) à son bord.',
         en: 'The "if" block looks first: it does the blocks in its mouth only when the answer is yes. Attach a green question (a sensor) to its side.',
         vi: 'Khối "nếu" xem xét trước: nó chỉ làm các khối bên trong khi câu trả lời là đúng. Gắn một câu hỏi màu xanh (cảm biến) vào cạnh của nó.'
      },
      loopWhile: {
         fr: '« répéter tant que » recommence encore et encore, tant que la question est vraie.',
         en: '"repeat while" starts again and again, as long as the question is true.',
         vi: '"lặp lại trong khi" cứ làm đi làm lại, khi nào câu hỏi còn đúng.'
      },
      run: {
         fr: 'Ton programme est prêt ? Appuie sur ▶ : le robot suit tes blocs. Tu peux le ralentir pour bien voir.',
         en: 'Is your program ready? Press ▶: the robot follows your blocks. You can slow it down to watch carefully.',
         vi: 'Chương trình đã xong? Bấm ▶: rô-bốt sẽ làm theo các khối của bạn. Bạn có thể cho nó chạy chậm để xem kỹ.'
      },
      steps: {
         fr: '👣 fait avancer le programme d\'un seul bloc : pratique pour trouver une erreur.',
         en: '👣 runs the program one block at a time: handy to find a mistake.',
         vi: '👣 chạy chương trình từng khối một: rất tiện để tìm chỗ sai.'
      },
      fix: {
         fr: 'Raté ? Ce n\'est pas grave ! ⏮ remet le robot au départ. Change tes blocs et essaie encore.',
         en: 'Didn\'t work? No problem! ⏮ puts the robot back at the start. Change your blocks and try again.',
         vi: 'Chưa được? Không sao cả! ⏮ đưa rô-bốt về chỗ xuất phát. Hãy sửa các khối và thử lại.'
      },
      tests: {
         fr: 'Parfois, il y a plusieurs grilles à réussir avec le même programme. Regarde-les toutes !',
         en: 'Sometimes there are several grids to solve with the same program. Look at all of them!',
         vi: 'Đôi khi có nhiều lưới phải giải bằng cùng một chương trình. Hãy xem hết các lưới!'
      },
      stars: {
         fr: 'Chaque problème a des versions ★, ★★, ★★★… de plus en plus difficiles. Réussis-en une pour gagner ses étoiles !',
         en: 'Each problem has versions ★, ★★, ★★★… harder and harder. Solve one to win its stars!',
         vi: 'Mỗi bài có các mức ★, ★★, ★★★… khó dần lên. Giải được một mức để nhận sao của mức đó!'
      },
      tipTitle: { fr: 'Astuce : ', en: 'Tip: ', vi: 'Mẹo: ' },
      // hints (the 💡 button of the trainer), from a little help to a lot
      hintTitle: { fr: 'Indice de Réa', en: 'Réa\'s hint', vi: 'Gợi ý của Réa' },
      hint1: {
         fr: 'Regarde-moi avancer bloc par bloc avec 👣. Où est-ce que je me trompe la première fois ? Change ce bloc-là.',
         en: 'Watch me go block by block with 👣. Where do I first go wrong? Change that block.',
         vi: 'Xem mình đi từng khối một bằng 👣. Mình sai lần đầu ở đâu? Hãy đổi khối đó.'
      },
      hintRepeat: {
         fr: 'Des gestes reviennent plusieurs fois : mets-les dans un bloc « répéter ».',
         en: 'Some moves come back several times: put them inside a "repeat" block.',
         vi: 'Có những bước lặp lại nhiều lần: hãy đặt chúng vào trong khối "lặp lại".'
      },
      hintWhile: {
         fr: 'Utilise « répéter tant que » : je continue jusqu\'à ce que le travail soit fini.',
         en: 'Use "repeat while": I keep going until the job is done.',
         vi: 'Dùng khối "lặp lại khi": mình sẽ làm tiếp cho đến khi xong việc.'
      },
      hintIf: {
         fr: 'Je dois regarder avant d\'agir : utilise un bloc « si » avec une question.',
         en: 'I must look before I act: use an "if" block with a question.',
         vi: 'Mình phải nhìn trước khi làm: hãy dùng khối "nếu" với một câu hỏi.'
      },
      hintProc: {
         fr: 'Fabrique ton propre bloc (une fonction) pour la partie qui revient.',
         en: 'Make your own block (a function) for the part that comes back.',
         vi: 'Tự tạo một khối (một hàm) cho phần được lặp lại.'
      },
      hintSeq: {
         fr: 'Pas besoin de boucle ici : mets les blocs l\'un sous l\'autre. Compte bien les cases !',
         en: 'No loop needed here: put the blocks one under the other. Count the squares carefully!',
         vi: 'Ở đây không cần vòng lặp: đặt các khối nối tiếp nhau. Đếm kỹ các ô nhé!'
      },
      hintUses: { fr: 'Dans ma solution, j\'utilise ces blocs :', en: 'In my solution, I use these blocks:', vi: 'Trong lời giải của mình, mình dùng các khối này:' },
      hintStart: { fr: 'Commence comme ça, puis trouve la suite :', en: 'Start like this, then find the rest:', vi: 'Hãy bắt đầu như thế này, rồi tìm phần tiếp theo:' },
      hintNone: {
         fr: 'Je n\'ai plus d\'indice pour celui-ci. Un adulte peut te montrer la solution avec 🔑.',
         en: 'I have no more hints for this one. A grown-up can show you the solution with 🔑.',
         vi: 'Mình không còn gợi ý nào cho bài này. Người lớn có thể cho bạn xem lời giải bằng 🔑.'
      },
      listen: { fr: 'Écouter', en: 'Listen', vi: 'Nghe' },
      unknown: { fr: 'Essaie-le pour voir ce qu\'il fait !', en: 'Try it to see what it does!', vi: 'Hãy thử để xem nó làm gì!' }
   };

   // each world: its mission, what the robot carries and where it goes, and a way to think
   var WORLDS = {
      course: {
         goal: { fr: 'aller jusqu\'au drapeau', en: 'go to the flag', vi: 'đi đến lá cờ' },
         tip: {
            fr: 'compte les cases jusqu\'au drapeau avec ton doigt, puis mets autant de blocs.',
            en: 'count the squares to the flag with your finger, then use that many blocks.',
            vi: 'dùng ngón tay đếm số ô đến lá cờ, rồi dùng đúng chừng ấy khối.'
         }
      },
      marbles: {
         goal: { fr: 'ranger chaque bille dans un trou', en: 'put each marble into a hole', vi: 'đặt mỗi viên bi vào một cái lỗ' },
         obj: { fr: 'la bille', en: 'the marble', vi: 'viên bi' }, place: { fr: 'un trou', en: 'a hole', vi: 'một cái lỗ' },
         tip: {
            fr: 'va sur la bille, ramasse-la, va sur le trou, dépose-la. Le robot ne porte qu\'une bille à la fois.',
            en: 'go onto the marble, pick it up, go onto the hole, drop it. The robot carries one marble at a time.',
            vi: 'đi đến viên bi, nhặt nó, đi đến cái lỗ, đặt nó xuống. Rô-bốt chỉ mang được một viên bi mỗi lần.'
         }
      },
      paint: {
         goal: { fr: 'peindre toutes les cases marquées', en: 'paint all the marked cells', vi: 'tô màu tất cả các ô có đánh dấu' },
         blocks: { dropObject: { fr: 'Le robot peint la case où il est.', en: 'The robot paints the cell it is on.', vi: 'Rô-bốt tô màu ô nó đang đứng.' } },
         tip: {
            fr: 'peins seulement les cases marquées : passe sur les autres sans peindre.',
            en: 'paint only the marked cells: go over the others without painting.',
            vi: 'chỉ tô các ô có đánh dấu: đi qua các ô khác mà không tô.'
         }
      },
      fishing: {
         goal: { fr: 'apporter à chaque île les poissons qu\'elle demande', en: 'bring each island the fish it asks for', vi: 'mang đến mỗi hòn đảo số cá nó cần' },
         obj: { fr: 'un poisson', en: 'a fish', vi: 'một con cá' }, place: { fr: 'une île', en: 'an island', vi: 'một hòn đảo' },
         tip: {
            fr: 'le nombre sur le filet dit combien de poissons il y a ; le nombre sur l\'île dit combien elle en veut.',
            en: 'the number on the net says how many fish there are; the number on the island says how many it wants.',
            vi: 'con số trên lưới cho biết có bao nhiêu cá; con số trên đảo cho biết đảo cần bao nhiêu.'
         }
      },
      sokoban: {
         goal: { fr: 'pousser chaque caisse sur une case marquée', en: 'push each box onto a marked cell', vi: 'đẩy mỗi thùng vào một ô có đánh dấu' },
         obj: { fr: 'la caisse', en: 'the box', vi: 'thùng' }, place: { fr: 'une case marquée', en: 'a marked cell', vi: 'một ô có đánh dấu' },
         tip: {
            fr: 'le robot pousse la caisse qui est devant lui : place-toi derrière elle, tourné dans le bon sens.',
            en: 'the robot pushes the box in front of it: stand behind the box, facing the right way.',
            vi: 'rô-bốt đẩy thùng ở ngay trước mặt nó: hãy đứng phía sau thùng và quay đúng hướng.'
         }
      },
      flowers: {
         goal: { fr: 'semer une graine sur chaque case de terre', en: 'plant a seed on each soil cell', vi: 'gieo một hạt trên mỗi ô đất' },
         blocks: {
            dropObject: { fr: 'Le robot sème une graine sur sa case.', en: 'The robot plants a seed on its cell.', vi: 'Rô-bốt gieo một hạt trên ô của nó.' },
            obstacleInFront: { fr: 'Question : y a-t-il une fleur juste devant ?', en: 'Question: is there a flower just ahead?', vi: 'Câu hỏi: có bông hoa ngay phía trước không?' }
         },
         tip: {
            fr: 'regarde de quel côté le robot est tourné avant de choisir « pivoter à gauche » ou « à droite ».',
            en: 'look which way the robot is facing before choosing "turn left" or "turn right".',
            vi: 'hãy xem rô-bốt đang quay về hướng nào trước khi chọn "quay trái" hay "quay phải".'
         }
      },
      gems: {
         goal: { fr: 'ramasser toutes les pierres précieuses', en: 'collect all the gems', vi: 'nhặt hết các viên đá quý' },
         obj: { fr: 'la pierre précieuse', en: 'the gem', vi: 'viên đá quý' },
         tip: {
            fr: 'le robot ramasse une pierre en passant dessus. Pour tourner, mets-toi à sa place : sa gauche n\'est pas toujours ta gauche !',
            en: 'the robot picks up a gem by walking onto it. To turn, imagine you are the robot: its left is not always your left!',
            vi: 'rô-bốt tự nhặt đá quý khi đi qua. Khi quay, hãy tưởng tượng bạn là rô-bốt: bên trái của nó không phải lúc nào cũng là bên trái của bạn!'
         }
      },
      rocket: {
         goal: { fr: 'ramasser les objets puis rejoindre la fusée, sans toucher les astéroïdes', en: 'pick up the objects then reach the rocket, without hitting asteroids', vi: 'nhặt các đồ vật rồi đến tên lửa, không đâm vào thiên thạch' },
         obj: { fr: 'l\'objet', en: 'the object', vi: 'đồ vật' },
         tip: {
            fr: 'repère un motif qui se répète sur le chemin : tu pourras le mettre dans « répéter ».',
            en: 'look for a pattern that comes back along the way: you can put it inside "repeat".',
            vi: 'tìm một đoạn đường lặp đi lặp lại: bạn có thể đặt nó vào trong "lặp lại".'
         }
      },
      veterinary: {
         goal: { fr: 'apporter aux castors le bois qu\'ils demandent', en: 'bring the beavers the wood they ask for', vi: 'mang cho hải ly số gỗ chúng cần' },
         obj: { fr: 'le bois', en: 'the wood', vi: 'gỗ' }, place: { fr: 'un castor', en: 'a beaver', vi: 'một con hải ly' },
         tip: {
            fr: 'le nombre près de chaque castor dit combien de bûches il veut.',
            en: 'the number next to each beaver says how many logs it wants.',
            vi: 'con số cạnh mỗi con hải ly cho biết nó cần bao nhiêu khúc gỗ.'
         }
      },
      packages: {
         goal: { fr: 'mettre dans chaque carton le nombre de livres demandé', en: 'put the right number of books into each box', vi: 'cho đúng số sách vào mỗi thùng' },
         obj: { fr: 'un livre', en: 'a book', vi: 'một quyển sách' }, place: { fr: 'un carton', en: 'a box', vi: 'một thùng giấy' },
         tip: {
            fr: 'lis les nombres : combien de livres sur la pile, combien dans chaque carton.',
            en: 'read the numbers: how many books are on the pile, how many go in each box.',
            vi: 'đọc các con số: có bao nhiêu sách trong chồng, mỗi thùng cần bao nhiêu.'
         }
      },
      // also the castle tasks (gears rules, castle pictures): no mission sentence, the statement says it
      gears: {
         obj: { fr: 'la roue dentée', en: 'the gear', vi: 'bánh răng' }, place: { fr: 'une machine', en: 'a machine', vi: 'một cỗ máy' }
      },
      dominoes: { obj: { fr: 'le domino', en: 'the domino', vi: 'quân domino' } },
      biscuits: { obj: { fr: 'le biscuit', en: 'the biscuit', vi: 'bánh quy' } },
      pearls: { obj: { fr: 'la perle', en: 'the pearl', vi: 'viên ngọc trai' } },
      poker: { obj: { fr: 'la carte', en: 'the card', vi: 'lá bài' } }
   };
   var ANY = {
      obj: { fr: 'l\'objet', en: 'the object', vi: 'đồ vật' },
      place: { fr: 'sa place', en: 'its place', vi: 'chỗ của nó' },
      tip: {
         fr: 'fais d\'abord la première version ★, puis cherche ce qui se répète.',
         en: 'start with version ★, then look for what repeats.',
         vi: 'hãy làm mức ★ trước, rồi tìm phần lặp lại.'
      }
   };

   // what a block does, said simply; {obj} and {place} are the world's words
   var BLOCKS = {
      east: { fr: 'Le robot va d\'une case vers la droite →', en: 'The robot moves one square to the right →', vi: 'Rô-bốt đi sang phải một ô →' },
      west: { fr: 'Le robot va d\'une case vers la gauche ←', en: 'The robot moves one square to the left ←', vi: 'Rô-bốt đi sang trái một ô ←' },
      north: { fr: 'Le robot monte d\'une case ↑', en: 'The robot moves one square up ↑', vi: 'Rô-bốt đi lên một ô ↑' },
      south: { fr: 'Le robot descend d\'une case ↓', en: 'The robot moves one square down ↓', vi: 'Rô-bốt đi xuống một ô ↓' },
      forward: { fr: 'Le robot avance d\'une case, droit devant lui.', en: 'The robot moves one square straight ahead.', vi: 'Rô-bốt tiến thẳng một ô về phía trước.' },
      backwards: { fr: 'Le robot recule d\'une case.', en: 'The robot moves one square backwards.', vi: 'Rô-bốt lùi lại một ô.' },
      left: { fr: 'Le robot tourne sur place d\'un quart de tour vers SA gauche ↺ (il ne change pas de case).', en: 'The robot turns a quarter turn to ITS left ↺ (it stays on its square).', vi: 'Rô-bốt quay một phần tư vòng sang bên trái CỦA NÓ ↺ (vẫn đứng nguyên ô).' },
      right: { fr: 'Le robot tourne sur place d\'un quart de tour vers SA droite ↻ (il ne change pas de case).', en: 'The robot turns a quarter turn to ITS right ↻ (it stays on its square).', vi: 'Rô-bốt quay một phần tư vòng sang bên phải CỦA NÓ ↻ (vẫn đứng nguyên ô).' },
      turnAround: { fr: 'Le robot fait demi-tour.', en: 'The robot turns around.', vi: 'Rô-bốt quay ngược lại.' },
      wait: { fr: 'Le robot attend un moment.', en: 'The robot waits a moment.', vi: 'Rô-bốt chờ một lát.' },
      jump: { fr: 'Le robot saute sur la plateforme au-dessus.', en: 'The robot jumps onto the platform above.', vi: 'Rô-bốt nhảy lên bệ đỡ phía trên.' },
      withdrawObject: { fr: 'Le robot ramasse {obj} sur sa case.', en: 'The robot picks up {obj} on its square.', vi: 'Rô-bốt nhặt {obj} ở ô của nó.' },
      dropObject: { fr: 'Le robot pose ce qu\'il porte sur sa case.', en: 'The robot puts down what it carries on its square.', vi: 'Rô-bốt đặt thứ nó đang mang xuống ô của nó.' },
      withdrawNum: { fr: 'Le robot ramasse le nombre de choses que tu écris dans le bloc.', en: 'The robot picks up as many things as the number you write in the block.', vi: 'Rô-bốt nhặt số lượng bằng con số bạn ghi trong khối.' },
      dropNum: { fr: 'Le robot pose le nombre de choses que tu écris dans le bloc.', en: 'The robot puts down as many things as the number you write in the block.', vi: 'Rô-bốt đặt xuống số lượng bằng con số bạn ghi trong khối.' },
      pushObject: { fr: 'Le robot pousse {obj} qui est juste devant lui, et avance avec.', en: 'The robot pushes {obj} just in front of it, and moves with it.', vi: 'Rô-bốt đẩy {obj} ngay trước mặt nó và tiến theo.' },
      writeNumber: { fr: 'Le robot écrit un nombre sur sa case.', en: 'The robot writes a number on its square.', vi: 'Rô-bốt viết một số lên ô của nó.' },
      onObject: { fr: 'Question : y a-t-il {obj} sur la case du robot ?', en: 'Question: is there {obj} on the robot\'s square?', vi: 'Câu hỏi: có {obj} ở ô của rô-bốt không?' },
      onContainer: { fr: 'Question : le robot est-il sur {place} ?', en: 'Question: is the robot on {place}?', vi: 'Câu hỏi: rô-bốt có đang ở {place} không?' },
      onExit: { fr: 'Question : le robot est-il arrivé ?', en: 'Question: has the robot arrived?', vi: 'Câu hỏi: rô-bốt đã đến nơi chưa?' },
      onPaint: { fr: 'Question : la case est-elle déjà peinte ?', en: 'Question: is the cell already painted?', vi: 'Câu hỏi: ô này đã được tô màu chưa?' },
      obstacleInFront: { fr: 'Question : y a-t-il un obstacle juste devant le robot ?', en: 'Question: is there an obstacle just in front of the robot?', vi: 'Câu hỏi: có chướng ngại vật ngay trước rô-bốt không?' },
      obstacleLeft: { fr: 'Question : y a-t-il un obstacle à la gauche du robot ?', en: 'Question: is there an obstacle on the robot\'s left?', vi: 'Câu hỏi: có chướng ngại vật bên trái rô-bốt không?' },
      obstacleRight: { fr: 'Question : y a-t-il un obstacle à la droite du robot ?', en: 'Question: is there an obstacle on the robot\'s right?', vi: 'Câu hỏi: có chướng ngại vật bên phải rô-bốt không?' },
      obstacleEast: { fr: 'Question : y a-t-il un obstacle sur la case de droite ?', en: 'Question: is there an obstacle on the square to the right?', vi: 'Câu hỏi: ô bên phải có chướng ngại vật không?' },
      obstacleWest: { fr: 'Question : y a-t-il un obstacle sur la case de gauche ?', en: 'Question: is there an obstacle on the square to the left?', vi: 'Câu hỏi: ô bên trái có chướng ngại vật không?' },
      obstacleNorth: { fr: 'Question : y a-t-il un obstacle sur la case du dessus ?', en: 'Question: is there an obstacle on the square above?', vi: 'Câu hỏi: ô phía trên có chướng ngại vật không?' },
      obstacleSouth: { fr: 'Question : y a-t-il un obstacle sur la case du dessous ?', en: 'Question: is there an obstacle on the square below?', vi: 'Câu hỏi: ô phía dưới có chướng ngại vật không?' },
      pushableInFront: { fr: 'Question : y a-t-il {obj} juste devant le robot ?', en: 'Question: is there {obj} just in front of the robot?', vi: 'Câu hỏi: có {obj} ngay trước rô-bốt không?' },
      gridEdge: { fr: 'Question : le robot est-il au bord de la grille, de ce côté ?', en: 'Question: is the robot at the edge of the grid, on that side?', vi: 'Câu hỏi: rô-bốt có đang ở mép lưới, phía đó không?' },
      readNumber: { fr: 'Donne le nombre écrit sur la case du robot.', en: 'Gives the number written on the robot\'s square.', vi: 'Cho biết con số viết trên ô của rô-bốt.' },
      nbWithdrawables: { fr: 'Donne combien de choses il y a sur la case du robot.', en: 'Gives how many things there are on the robot\'s square.', vi: 'Cho biết có bao nhiêu thứ trên ô của rô-bốt.' },
      containerSize: { fr: 'Donne combien de choses il faut poser sur cette case.', en: 'Gives how many things must be put on this square.', vi: 'Cho biết cần đặt bao nhiêu thứ lên ô này.' },
      nbInBag: { fr: 'Donne combien de choses le robot porte.', en: 'Gives how many things the robot carries.', vi: 'Cho biết rô-bốt đang mang bao nhiêu thứ.' },
      row: { fr: 'Donne le numéro de la ligne du robot.', en: 'Gives the number of the robot\'s row.', vi: 'Cho biết số hàng của rô-bốt.' },
      col: { fr: 'Donne le numéro de la colonne du robot.', en: 'Gives the number of the robot\'s column.', vi: 'Cho biết số cột của rô-bốt.' },
      withdrawNum_noShadow: { fr: 'Le robot prend autant de choses que le nombre du bloc. Touche le nombre pour le changer.', en: 'The robot picks up as many things as the number in the block. Tap the number to change it.', vi: 'Rô-bốt lấy số lượng đồ vật bằng con số trong khối. Chạm vào con số để thay đổi.' },
      dropNum_noShadow: { fr: 'Le robot pose autant de choses que le nombre du bloc. Touche le nombre pour le changer.', en: 'The robot puts down as many things as the number in the block. Tap the number to change it.', vi: 'Rô-bốt đặt xuống số lượng đồ vật bằng con số trong khối. Chạm vào con số để thay đổi.' },
      pickTransportable: { fr: 'Le robot ramasse l\'objet de sa case.', en: 'The robot picks up the object on its square.', vi: 'Rô-bốt nhặt đồ vật ở ô của nó.' },
      dropTransportable: { fr: 'Le robot pose l\'objet qu\'il porte.', en: 'The robot puts down the object it carries.', vi: 'Rô-bốt đặt xuống đồ vật nó đang mang.' },
      paint: { fr: 'Le robot peint sa case.', en: 'The robot paints its square.', vi: 'Rô-bốt tô màu ô của nó.' },
      numberUnder: { fr: 'Donne le nombre écrit sur la case du robot.', en: 'Gives the number written on the robot\'s square.', vi: 'Cho biết con số viết trên ô của rô-bốt.' },
      writeCode: { fr: 'Le robot écrit sur sa case le code que tu choisis dans le bloc.', en: 'The robot writes on its square the code you choose in the block.', vi: 'Rô-bốt viết lên ô của nó mã mà bạn chọn trong khối.' },
      dropPlatformInFront: { fr: 'Le robot pose une plateforme sur la case devant lui.', en: 'The robot puts a platform on the square in front of it.', vi: 'Rô-bốt đặt một bục lên ô phía trước nó.' },
      platformInFront: { fr: 'Question : y a-t-il une plateforme devant le robot ?', en: 'Question: is there a platform in front of the robot?', vi: 'Câu hỏi: có bục ở phía trước rô-bốt không?' },
      platformAbove: { fr: 'Question : y a-t-il une plateforme au-dessus du robot ?', en: 'Question: is there a platform above the robot?', vi: 'Câu hỏi: có bục ở phía trên rô-bốt không?' },
      // onStar, onHearts, onBlue…: a question about the robot's square
      onSomething: { fr: 'Question : la réponse est oui quand le robot est « {label} », sinon non.', en: 'Question: the answer is yes when the robot is "{label}", otherwise no.', vi: 'Câu hỏi: câu trả lời là đúng khi rô-bốt "{label}", nếu không thì sai.' },
      controls_repeat: { fr: 'Fait plusieurs fois les blocs placés dans sa bouche.', en: 'Does the blocks inside its mouth several times.', vi: 'Làm nhiều lần các khối đặt bên trong nó.' },
      controls_repeat_ext: { fr: 'Fait plusieurs fois les blocs placés dans sa bouche.', en: 'Does the blocks inside its mouth several times.', vi: 'Làm nhiều lần các khối đặt bên trong nó.' },
      controls_whileUntil: { fr: 'Recommence les blocs de sa bouche tant que la question est vraie.', en: 'Does the blocks inside again and again while the question is true.', vi: 'Làm đi làm lại các khối bên trong khi câu hỏi còn đúng.' },
      controls_untilWhile: { fr: 'Recommence les blocs de sa bouche jusqu\'à ce que la question soit vraie.', en: 'Does the blocks inside again and again until the question is true.', vi: 'Làm đi làm lại các khối bên trong cho đến khi câu hỏi đúng.' },
      controls_for: { fr: 'Compte avec une variable, et fait les blocs de sa bouche pour chaque nombre.', en: 'Counts with a variable and does the blocks inside for each number.', vi: 'Đếm bằng một biến và làm các khối bên trong cho mỗi số.' },
      controls_if: { fr: 'Fait les blocs de sa bouche seulement si la question est vraie.', en: 'Does the blocks inside only if the question is true.', vi: 'Chỉ làm các khối bên trong nếu câu hỏi đúng.' },
      controls_if_else: { fr: 'Si la question est vraie, fait les blocs du haut ; sinon, ceux du bas.', en: 'If the question is true, does the top blocks; otherwise, the bottom ones.', vi: 'Nếu câu hỏi đúng, làm các khối phía trên; nếu không, làm các khối phía dưới.' },
      logic_negate: { fr: 'Inverse la réponse : oui devient non, non devient oui.', en: 'Flips the answer: yes becomes no, no becomes yes.', vi: 'Đảo ngược câu trả lời: đúng thành sai, sai thành đúng.' },
      logic_operation: { fr: '« et » : les deux doivent être vrais. « ou » : un seul suffit.', en: '"and": both must be true. "or": one is enough.', vi: '"và": cả hai phải đúng. "hoặc": chỉ cần một cái đúng.' },
      logic_compare: { fr: 'Compare deux nombres (égal, plus petit, plus grand…).', en: 'Compares two numbers (equal, smaller, bigger…).', vi: 'So sánh hai số (bằng, nhỏ hơn, lớn hơn…).' },
      logic_boolean: { fr: 'Vrai ou faux.', en: 'True or false.', vi: 'Đúng hoặc sai.' },
      math_number: { fr: 'Un nombre, que tu peux changer.', en: 'A number that you can change.', vi: 'Một con số mà bạn có thể thay đổi.' },
      math_arithmetic: { fr: 'Calcule avec deux nombres : + − × ÷.', en: 'Calculates with two numbers: + − × ÷.', vi: 'Tính toán với hai số: + − × ÷.' },
      variables_get: { fr: 'Donne le nombre gardé dans la variable.', en: 'Gives the number kept in the variable.', vi: 'Cho biết con số đang được cất trong biến.' },
      variables_set: { fr: 'Garde un nombre dans une variable (une boîte avec un nom).', en: 'Keeps a number in a variable (a box with a name).', vi: 'Cất một con số vào biến (một chiếc hộp có tên).' },
      math_change: { fr: 'Ajoute un nombre à la variable.', en: 'Adds a number to the variable.', vi: 'Cộng thêm một số vào biến.' },
      procedures_defnoreturn: { fr: 'Fabrique ton propre bloc : mets des blocs dedans, puis utilise-le plusieurs fois.', en: 'Make your own block: put blocks inside, then use it several times.', vi: 'Tự tạo khối của bạn: đặt các khối vào trong, rồi dùng nó nhiều lần.' },
      procedures_callnoreturn: { fr: 'Utilise le bloc que tu as fabriqué.', en: 'Uses the block you made.', vi: 'Dùng khối mà bạn đã tạo.' },
      lists: { fr: 'Range ou lit plusieurs valeurs dans une liste.', en: 'Stores or reads several values in a list.', vi: 'Cất hoặc đọc nhiều giá trị trong một danh sách.' }
   };

   /* ---------- the page: views, blocks, places on screen ---------- */
   // the first one shown (the run buttons exist twice on a phone, one of them hidden)
   function $(s) {
      var all = document.querySelectorAll(s);
      for (var i = 0; i < all.length; i++) { if (visible(all[i])) { return all[i]; } }
      return all[0] || null;
   }
   function visible(el) { if (!el) { return false; } var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; }
   function helper() { return window.task && task.displayedSubTask && task.displayedSubTask.blocklyHelper; }
   function workspace() { var h = helper(); return h && h.workspace; }
   function flyout() { var ws = workspace(); return ws && (ws.flyout_ || (ws.toolbox_ && ws.toolbox_.flyout_)); }
   function startBlock() {
      var ws = workspace();
      return ws ? ws.getTopBlocks(false).filter(function (b) { return /_start$/.test(b.type); })[0] : null;
   }
   function flyoutBlocks() {
      var f = flyout();
      return f && f.workspace_ ? f.workspace_.getTopBlocks(true) : [];
   }
   function world() {
      var gi = window.task && task.displayedSubTask && task.displayedSubTask.gridInfos;
      return (gi && gi.contextType) || (window.customProblem && customProblem.world) || 'none';
   }
   // on a phone the task shows one view at a time (statement / editor / run)
   function view(name, then) {
      var tab = document.getElementById('mode-' + name), bar = document.getElementById('modeSelector');
      if (bar && visible(bar) && tab && !tab.classList.contains('active')) {
         tab.click();
         setTimeout(then, 450);
      } else {
         then();
      }
   }
   // some tasks sort their blocks into boxes (categories): the list shows one box at a time
   function categories() {
      var ws = workspace(), tree = ws && ws.toolbox_ && ws.toolbox_.tree_;
      return tree && tree.getChildren ? tree.getChildren().filter(function (c) { return c.blocks && c.blocks.length; }) : [];
   }
   var CUSTOM = { PROCEDURE: 'procedures_defnoreturn', VARIABLE: 'variables_set' };
   var spare = null;   // a workspace never shown, to make the blocks of every box at once
   function toolBlocks() {
      var cats = categories();
      if (!cats.length) { return [{ name: '', blocks: flyoutBlocks() }]; }
      spare = spare || new Blockly.Workspace();
      return cats.map(function (c) {
         var nodes = typeof c.blocks === 'string' ?
            (CUSTOM[c.blocks] ? [Blockly.Xml.textToDom('<xml><block type="' + CUSTOM[c.blocks] + '"></block></xml>').firstChild] : []) :
            Array.prototype.slice.call(c.blocks);
         var made = [];
         nodes.forEach(function (n) {
            if (!n.nodeName || n.nodeName.toLowerCase() !== 'block') { return; }
            try { made.push(Blockly.Xml.domToBlock(n, spare)); } catch (e) {
               try { made.push(Blockly.Xml.domToBlock(spare, n)); } catch (e2) { /* a block this page cannot make */ }
            }
         });
         return { name: String(c.getHtml ? c.getHtml() : '').replace(/<[^>]*>/g, ''), cat: c, blocks: made };
      });
   }
   // opens the box holding a block of this kind, when the blocks are in boxes
   function openBox(re) {
      var ws = workspace(), tree = ws && ws.toolbox_ && ws.toolbox_.tree_;
      if (!tree) { return; }
      var found = toolBlocks().filter(function (g) { return g.blocks.some(function (b) { return re.test(b.type); }); })[0];
      if (found && found.cat && tree.getSelectedItem() !== found.cat) { tree.setSelectedItem(found.cat); }
   }
   // the flyout's blocks are made again when the view changes: look them up when needed
   function flyBlock(re) {
      if (categories().length) { openBox(re); }
      return flyoutBlocks().filter(function (b) { return re.test(b.type); })[0] || null;
   }
   // an open box lies over the program: slide the program to the right of it
   function uncover() {
      var f = flyout(), s = startBlock(), ws = workspace();
      var fr = rectOf(f), sr = rectOf(s);
      if (!fr || !sr || sr.left > fr.right) { return; }
      var dx = (fr.right - sr.left + 24) / (ws.scale || 1);
      if (s.moveBy) { s.moveBy(dx, 0); }
   }
   // where the blocks are picked from: the list, or the boxes
   function palette() {
      var ws = workspace();
      return categories().length && ws.toolbox_.HtmlDiv ? ws.toolbox_.HtmlDiv : flyout();
   }
   function rectOf(target) {
      if (target && target.getSvgRoot) { target = target.getSvgRoot(); }
      if (target && target.svgGroup_) { target = target.svgGroup_; }
      if (!target || !target.getBoundingClientRect) { return null; }
      var r = target.getBoundingClientRect();
      return r.width || r.height ? r : null;
   }

   /* ---------- what to say about each block ---------- */
   function blockText(b) {
      var w = WORLDS[world()] || {}, words = { obj: pick(w.obj || ANY.obj), place: pick(w.place || ANY.place), label: label(b) };
      var key = b.type;
      var t = (w.blocks && w.blocks[key]) || BLOCKS[key] ||
         (/^gridEdge/.test(key) && BLOCKS.gridEdge) || (/^lists_/.test(key) && BLOCKS.lists) || (/^on[A-Z]/.test(key) && BLOCKS.onSomething) ||
         (/^procedures_call/.test(key) && BLOCKS.procedures_callnoreturn) || (/^procedures_def/.test(key) && BLOCKS.procedures_defnoreturn);
      if (t) { return fill(pick(t), words); }
      var tip = typeof b.tooltip === 'function' ? b.tooltip() : b.tooltip;
      return tip && typeof tip === 'string' ? tip : pick(T.unknown);
   }
   function label(b) { return String(b.toString()).replace(/\?/g, '…').replace(/\s+/g, ' ').trim(); }
   function color(b) { try { return b.getColour(); } catch (e) { return '#5b80a5'; } }
   function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
   function isAction(b) { return !b.outputConnection && !/^controls_|^procedures_|^variables_|^math_|^logic_|^lists_|^text/.test(b.type); }

   /* ---------- the steps of this task ---------- */
   function steps() {
      var w = WORLDS[world()] || {}, groups = toolBlocks(), boxed = groups.length > 1 || !!groups[0].name;
      var blocks = [].concat.apply([], groups.map(function (g) { return g.blocks; })), types = blocks.map(function (b) { return b.type; });
      var has = function (re) { return types.some(function (t) { return re.test(t); }); };
      var start = startBlock(), list = [];
      list.push({ view: 'instructions', target: function () { return $('#gridContainer'); },
         text: pick(T.robot) + (w.goal ? ' ' + fill(pick(T.goal), { goal: pick(w.goal) }) : '') });
      list.push({ view: 'instructions', target: function () { return $('#taskIntro'); }, text: pick(T.read) });
      list.push({ view: 'editor', target: palette, text: pick(T.blocks), html: groups.map(function (g) {
         return (boxed ? '<li><b>' + esc(g.name) + '</b></li>' : '') + g.blocks.map(function (b) {
            return '<li><span class="tut-chip" style="background:' + color(b) + '">' + esc(label(b)) + '</span> ' + esc(blockText(b)) + '</li>';
         }).join('');
      }).join('') });
      if (boxed) {
         list.push({ view: 'editor', target: palette, text: fill(pick(T.boxes), { names: groups.map(function (g) { return g.name; }).join(', ') }) });
      }
      var first = blocks.filter(isAction)[0] || blocks[0];
      var firstType = first ? new RegExp('^' + first.type + '$') : /^$/;
      list.push({ view: 'editor', target: function () { return startBlock(); }, text: fill(pick(T.drag), { start: start ? label(start) : '' }),
         before: function () { flyBlock(firstType); uncover(); }, demo: function () { return flyBlock(firstType); }, wait: true });
      list.push({ view: 'editor', target: function () { return startBlock(); }, text: pick(T.order) });
      list.push({ view: 'editor', target: palette, text: pick(T.remove) });
      if (has(/^controls_repeat/)) {
         list.push({ view: 'editor', target: function () { return flyBlock(/^controls_repeat/); }, text: pick(T.repeat) });
      }
      if (has(/^controls_whileUntil|^controls_untilWhile/)) {
         list.push({ view: 'editor', target: function () { return flyBlock(/^controls_(whileUntil|untilWhile)/); }, text: pick(T.loopWhile) });
      }
      if (has(/^controls_if/)) {
         list.push({ view: 'editor', target: function () { return flyBlock(/^controls_if/); }, text: pick(T.cond) });
      }
      list.push({ view: 'player', target: function () { return $('.playPause'); }, text: pick(T.run) });
      list.push({ view: 'player', target: function () { return $('.nextStep'); }, text: pick(T.steps) });
      list.push({ view: 'player', target: function () { return $('.backToFirst'); }, text: pick(T.fix) });
      var tests = document.querySelectorAll('#testSelector .testTab, #testSelector > div, .testTitle');
      if (tests.length > 1) { list.push({ view: 'player', target: function () { return $('#testSelector'); }, text: pick(T.tests) }); }
      list.push({ view: 'instructions', target: function () { return $('#tabsMenu'); }, text: pick(T.stars) });
      list.push({ view: 'editor', target: null, text: pick(T.tipTitle) + pick(w.tip || ANY.tip), last: true });
      return list;
   }

   /* ---------- the guide on screen ---------- */
   var CSS = '' +
      '#tut-ring{position:fixed;z-index:100001;pointer-events:none;border:4px solid #ffcf3a;border-radius:12px;' +
      'box-shadow:0 0 0 9999px rgba(0,0,0,.45);transition:all .35s ease}' +
      '#tut-ring.none{border-color:transparent;left:50%!important;top:50%!important;width:0!important;height:0!important}' +
      '#tut-card{position:fixed;z-index:100003;left:50%;transform:translateX(-50%);width:min(560px,calc(100% - 16px));' +
      'max-height:48vh;overflow:auto;background:#fffdf4;color:#1b2430;border-radius:18px;padding:14px 16px 12px;' +
      'box-shadow:0 6px 30px rgba(0,0,0,.4);font:18px/1.4 "Segoe UI",Roboto,Arial,sans-serif}' +
      '#tut-card.top{top:8px}#tut-card.bottom{bottom:8px}' +
      '#tut-card h4{margin:0 0 6px;font-size:15px;color:#8a6d00;display:flex;gap:8px;align-items:center}' +
      '#tut-card h4 span{margin-left:auto;font-weight:400;color:#888}' +
      '#tut-card p{margin:0 0 8px}#tut-card ul{margin:0 0 8px;padding:0;list-style:none}' +
      '#tut-card li{margin:6px 0;font-size:16px}' +
      '.tut-chip{display:inline-block;color:#fff;border-radius:8px;padding:2px 8px;font-size:14px;font-weight:600;margin-right:4px}' +
      '#tut-card .tut-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}' +
      '#tut-card button{font:inherit;font-size:17px;border-radius:12px;border:1px solid #c9c2a5;background:#fff;color:#1b2430;' +
      'min-height:46px;padding:6px 14px;cursor:pointer}' +
      '#tut-card button.main{background:#3d86d8;border-color:#3d86d8;color:#fff;font-weight:700;margin-left:auto}' +
      '#tut-card .ok{color:#1d7a3a;font-weight:700}' +
      '#tut-hand{position:fixed;z-index:100002;pointer-events:none;font-size:40px;line-height:1;display:none;' +
      'filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))}' +
      '#tut-hand .tut-chip{position:absolute;left:26px;top:-10px;white-space:nowrap;opacity:.9}';

   var ring, card, hand, list, at, timer, anim, speakOn = false;

   function speak(text) {
      var host = window.AndroidBridge ? window : (function () { try { return window.parent.AndroidBridge ? window.parent : null; } catch (e) { return null; } })();
      if (host && host.AndroidBridge) {
         if (host.AndroidBridge.speakIn) { host.AndroidBridge.speakIn(text, lang); } else { host.AndroidBridge.speak(text); }
         return;
      }
      if (!window.speechSynthesis) { return; }
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = L.speech || 'fr-FR';
      u.rate = 0.9;
      speechSynthesis.speak(u);
   }
   function hush() {
      var host = window.AndroidBridge ? window : (function () { try { return window.parent.AndroidBridge ? window.parent : null; } catch (e) { return null; } })();
      if (host && host.AndroidBridge && host.AndroidBridge.stopSpeaking) { host.AndroidBridge.stopSpeaking(); }
      else if (window.speechSynthesis) { speechSynthesis.cancel(); }
   }

   function build() {
      if (ring) { return; }
      var style = document.createElement('style');
      style.textContent = CSS;
      document.head.appendChild(style);
      ring = document.createElement('div'); ring.id = 'tut-ring';
      hand = document.createElement('div'); hand.id = 'tut-hand';
      card = document.createElement('div'); card.id = 'tut-card';
      document.body.appendChild(ring); document.body.appendChild(hand); document.body.appendChild(card);
   }

   function place(target) {
      var r = rectOf(typeof target === 'function' ? target() : target);
      if (!r) { ring.className = 'none'; card.className = 'bottom'; return null; }
      var pad = 6, x = Math.max(2, r.left - pad), y = Math.max(2, r.top - pad);
      var w = Math.min(innerWidth - x - 2, r.width + 2 * pad), h = Math.min(innerHeight - y - 2, r.height + 2 * pad);
      ring.className = '';
      ring.style.left = x + 'px'; ring.style.top = y + 'px'; ring.style.width = w + 'px'; ring.style.height = h + 'px';
      // the card goes where it hides the least
      card.className = (r.top + r.height / 2) > innerHeight / 2 ? 'top' : 'bottom';
      return r;
   }

   // a hand that drags the block from the list to under the start block, again and again
   function demo(block) {
      stopDemo();
      var from = rectOf(block), to = rectOf(startBlock());
      // under the blocks already attached
      var s = startBlock(), lastBlock = s;
      while (lastBlock && lastBlock.getNextBlock && lastBlock.getNextBlock()) { lastBlock = lastBlock.getNextBlock(); }
      if (lastBlock && lastBlock !== s) { to = rectOf(lastBlock) || to; }
      if (!from || !to) { return; }
      hand.innerHTML = '👆<span class="tut-chip" style="background:' + color(block) + '">' + esc(label(block)) + '</span>';
      hand.style.display = 'block';
      var x0 = from.left + 18, y0 = from.top + from.height / 2, x1 = to.left + 24, y1 = to.bottom + 18, t0 = null;
      function frame(t) {
         if (t0 === null) { t0 = t; }
         var k = ((t - t0) % 2600) / 2600;                 // 0..1 in a loop
         var m = k < 0.15 ? 0 : k > 0.75 ? 1 : (k - 0.15) / 0.6;
         m = m * m * (3 - 2 * m);
         hand.style.left = (x0 + (x1 - x0) * m) + 'px';
         hand.style.top = (y0 + (y1 - y0) * m) + 'px';
         hand.style.opacity = k > 0.9 ? String(1 - (k - 0.9) * 10) : '1';
         anim = requestAnimationFrame(frame);
      }
      anim = requestAnimationFrame(frame);
   }
   function stopDemo() { cancelAnimationFrame(anim); if (hand) { hand.style.display = 'none'; } }

   function count() { var s = startBlock(); return s ? s.getDescendants(false).length : 0; }

   function show(i) {
      clearInterval(timer);
      stopDemo();
      hush();
      at = i;
      var step = list[i];
      view(step.view, function () {
         if (step.before) { try { step.before(); } catch (e) { /* the guide goes on without it */ } }
         var r = place(step.target);
         card.innerHTML = '<h4>' + (step.title || '🤖 ' + esc(pick(T.title))) + '<span>' + (step.count || (i + 1) + ' / ' + list.length) + '</span></h4>' +
            '<p>' + esc(step.text) + '</p>' + (step.html ? '<ul>' + step.html + '</ul>' : '') +
            '<p class="ok" hidden></p>' +
            '<div class="tut-row">' +
            (i > 0 ? '<button data-act="back">' + esc(pick(T.back)) + '</button>' : '') +
            '<button data-act="listen">🔊</button>' +
            '<button data-act="close">' + esc(pick(T.close)) + '</button>' +
            '<button class="main" data-act="next">' + esc(step.last ? pick(T.done) : pick(T.next)) + '</button></div>';
         card.scrollTop = 0;
         var said = step.text + (step.html ? ' ' + card.querySelector('ul').innerText : '');
         if (speakOn) { speak(said); }
         card.onclick = function (e) {
            var act = e.target.getAttribute && e.target.getAttribute('data-act');
            if (act === 'next') { if (at + 1 < list.length) { show(at + 1); } else { stop(true); } }
            else if (act === 'back') { show(at - 1); }
            else if (act === 'close') { stop(false); }
            else if (act === 'listen') { speak(said); }
         };
         if (step.demo && r) { demo(step.demo()); }
         if (step.wait) {
            var before = count();
            timer = setInterval(function () {
               if (count() > before) {
                  clearInterval(timer);
                  stopDemo();
                  var ok = card.querySelector('.ok');
                  ok.hidden = false;
                  ok.textContent = '🎉 ' + pick(T.bravo);
                  if (speakOn) { speak(pick(T.bravo)); }
                  setTimeout(function () { if (at === i) { show(i + 1); } }, 1800);
               }
            }, 300);
         }
      });
   }

   function stop(finished) {
      clearInterval(timer);
      stopDemo();
      hush();
      if (ring) { ring.remove(); card.remove(); hand.remove(); ring = card = hand = null; }
      window.removeEventListener('resize', onResize);
      try { window.parent.postMessage({ source: 'algorea-task', type: 'tutorialDone', finished: !!finished }, '*'); } catch (e) { /* alone */ }
   }

   /* ---------- hints: 1 look again, 2 the idea, 3 the first blocks of a checked solution ---------- */
   var hintStep = {};
   function solutionChain(xml) {
      // the blocks under the start block of a solution, made in the hidden workspace
      try {
         var dom = Blockly.Xml.textToDom(xml), start = null;
         Array.prototype.forEach.call(dom.getElementsByTagName('block'), function (b) {
            if (!start && /_start$/.test(b.getAttribute('type'))) { start = b; }
         });
         var next = start && Array.prototype.filter.call(start.childNodes, function (n) { return n.nodeName && n.nodeName.toLowerCase() === 'next'; })[0];
         var first = next && Array.prototype.filter.call(next.childNodes, function (n) { return n.nodeName && n.nodeName.toLowerCase() === 'block'; })[0];
         if (!first) { return null; }
         spare = spare || new Blockly.Workspace();
         try { return Blockly.Xml.domToBlock(first, spare); } catch (e) { return Blockly.Xml.domToBlock(spare, first); }
      } catch (e) { return null; }
   }
   // the words of a block alone, without the blocks it holds ("repeat 7 times do")
   function head(b) {
      try {
         return b.inputList.map(function (input) {
            return input.fieldRow.map(function (f) { return f.getText ? f.getText() : ''; }).join(' ');
         }).join(' ').replace(/\s+/g, ' ').trim();
      } catch (e) { return label(b); }
   }
   function chip(b) {
      var text = label(b);
      if (text.length > 34) { text = text.slice(0, 32) + '…'; }
      return '<span class="tut-chip" style="background:' + color(b) + '">' + esc(text) + '</span>';
   }
   function hint(solutions) {
      var level = (window.displayHelper && displayHelper.taskLevel) || 'basic';
      var step = hintStep[level] = Math.min(3, (hintStep[level] || 0) + 1);
      var xml = solutions && solutions[level], first = xml ? solutionChain(xml) : null;
      var text, html = '';
      if (step === 1) {
         var w = WORLDS[world()] || {};
         text = pick(T.hint1) + ' ' + pick(T.tipTitle) + pick(w.tip || ANY.tip);
      } else if (!first) {
         text = step === 2 && has(/^controls_repeat/) ? pick(T.hintRepeat) : pick(T.hintNone);
      } else if (step === 2) {
         var all = first.getDescendants(false), types = all.map(function (b) { return b.type; });
         var any = function (re) { return types.some(function (t) { return re.test(t); }); };
         text = any(/^procedures_/) ? pick(T.hintProc) : any(/^controls_(whileUntil|untilWhile)/) ? pick(T.hintWhile) :
            any(/^controls_if/) ? pick(T.hintIf) : any(/^controls_repeat|^controls_for/) ? pick(T.hintRepeat) : pick(T.hintSeq);
         var seen = {};
         html = '<li>' + esc(pick(T.hintUses)) + '</li><li>' + all.filter(function (b) {
            if (b.isShadow() || b.outputConnection && /^math_number|^logic_boolean/.test(b.type) || seen[b.type]) { return false; }
            seen[b.type] = true; return true;
         }).map(function (b) {
            // the block as it is in the list (its own numbers would give the answer away)
            var mine = null;
            toolBlocks().forEach(function (g) { g.blocks.forEach(function (x) { if (!mine && x.type === b.type) { mine = x; } }); });
            return chip(mine || { toString: function () { return head(b); }, getColour: function () { return color(b); } });
         }).join(' ') + '</li>';
      } else {
         text = pick(T.hintStart);
         // about the first third of the program, and only the top of a block that holds others
         var chain = [], b = first;
         while (b) { chain.push(b); b = b.getNextBlock(); }
         var shown = chain.slice(0, Math.max(1, Math.min(3, Math.floor(chain.length / 3))));
         html = shown.map(function (x, i) {
            var inner = x.getChildren().some(function (c) { return !c.outputConnection && c !== x.getNextBlock(); });
            return '<li>' + (i + 1) + '. ' + (inner ? chip({ toString: function () { return head(x) + ' …'; }, getColour: function () { return color(x); } }) : chip(x)) + '</li>';
         }).join('') + (chain.length > shown.length || shown.some(function (x) { return x.getChildren().length; }) ? '<li>…</li>' : '');
      }
      function has(re) { return toolBlocks().some(function (g) { return g.blocks.some(function (x) { return re.test(x.type); }); }); }
      build();
      list = [{ view: step === 1 ? 'player' : 'editor', target: step === 1 ? function () { return $('.nextStep'); } : palette,
         title: '💡 ' + esc(pick(T.hintTitle)), count: step + ' / 3', text: text, html: html, last: true }];
      window.addEventListener('resize', onResize);
      show(0);
      try { window.parent.postMessage({ source: 'algorea-task', type: 'hintUsed', level: level, step: step }, '*'); } catch (e) { /* alone */ }
   }

   function onResize() { if (ring && list) { place(list[at].target); } }

   function ready() { return !!(workspace() && startBlock() && flyout()); }

   window.AlgoreaTutorial = {
      start: function (options) {
         options = options || {};
         speakOn = !!options.speak;
         var tries = 0;
         (function wait() {
            if (!ready()) { if (++tries < 60) { setTimeout(wait, 250); } return; }
            if (ring) { stop(false); }
            build();
            list = steps();
            window.addEventListener('resize', onResize);
            show(0);
         })();
      },
      stop: function () { stop(false); },
      hint: function (options) {
         options = options || {};
         speakOn = !!options.speak;
         if (!ready()) { return; }
         if (ring) { stop(false); }
         hint(options.solutions);
      },
      // for tests: the explanation of each block of this task
      describe: function () { return [].concat.apply([], toolBlocks().map(function (g) { return g.blocks; })).map(function (b) { return label(b) + ' — ' + blockText(b) + ' [' + b.type + ']'; }); }
   };

   // a "Learn to play" problem opened on its own (in the trainer, the trainer starts the guide)
   if (window.algoreaTutorialAuto && window.parent === window) {
      window.addEventListener('load', function () { setTimeout(function () { AlgoreaTutorial.start({}); }, 800); });
   }
})();
