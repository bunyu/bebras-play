// Réa, the robot friend of the trainer (algorea.html): her face, her speech bubble, her sentences,
// the sounds and the confetti. The trainer decides when she speaks (see "Réa" in algorea.html).
//   Rea.face(size, outfit)      her picture as SVG; outfit = list of items ('hat', 'glasses', …)
//   Rea.say(text, options)      a bubble in the corner; options: {speak: fn, ms, mood: 'happy'|'think'}
//   Rea.line(moment, args)      one of her sentences for that moment, in the chosen language
//   Rea.sound(name)             'snap' | 'win' | 'fail' | 'star' | 'unlock' (Rea.sounds = false: silent)
//   Rea.buzz(ms)                a short vibration on the phone
//   Rea.confetti()  Rea.flyStar(from, to)
(function () {
   'use strict';
   var L = window.AlgoreaLang;
   function pick(t) { return L ? L.pick(t) : t.fr; }
   function fmt(s, a) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return a && a[k] !== undefined ? a[k] : m; }); }

   /* ---------- her sentences: several per moment, one picked at random ---------- */
   var LINES = {
      hello: {
         fr: ['Bonjour {name} ! Prêt·e pour la mission du jour ?', 'Coucou {name} ! On programme ensemble ?', 'Salut {name} ! J\'ai hâte de jouer avec toi.'],
         en: ['Hello {name}! Ready for today\'s mission?', 'Hi {name}! Shall we program together?', 'Hey {name}! I can\'t wait to play with you.'],
         vi: ['Chào {name}! Sẵn sàng cho nhiệm vụ hôm nay chưa?', 'Xin chào {name}! Mình cùng lập trình nhé?', 'Chào {name}! Mình rất muốn chơi cùng bạn.']
      },
      back: {
         fr: ['Tu m\'as manqué, {name} ! On reprend ?', 'Te revoilà, {name} ! Je t\'attendais.'],
         en: ['I missed you, {name}! Shall we go on?', 'You\'re back, {name}! I was waiting for you.'],
         vi: ['Mình nhớ bạn lắm, {name}! Mình chơi tiếp nhé?', 'Bạn quay lại rồi, {name}! Mình đợi bạn mãi.']
      },
      start: {
         fr: ['À toi de jouer ! Glisse les blocs sous le programme.', 'Regarde bien la grille, puis choisis tes blocs.', 'Je suis prête : donne-moi des ordres !'],
         en: ['Your turn! Slide the blocks under the program.', 'Look at the grid carefully, then pick your blocks.', 'I\'m ready: give me orders!'],
         vi: ['Đến lượt bạn! Kéo các khối xuống dưới chương trình.', 'Nhìn kỹ lưới, rồi chọn các khối nhé.', 'Mình sẵn sàng rồi: hãy ra lệnh cho mình!']
      },
      fail: {
         fr: ['Presque ! Regarde où je me suis arrêtée, et change un bloc.', 'Pas encore… mais tu es sur la bonne piste !', 'Oups ! Essaie encore, chaque essai t\'apprend quelque chose.', 'Pas grave ! Les vrais programmeurs essaient plein de fois.'],
         en: ['Almost! Look where I stopped, and change one block.', 'Not yet… but you\'re on the right track!', 'Oops! Try again: every try teaches you something.', 'No problem! Real programmers try many times.'],
         vi: ['Gần đúng rồi! Xem mình dừng ở đâu, rồi đổi một khối.', 'Chưa được… nhưng bạn đang đi đúng hướng!', 'Ối! Thử lại nhé: mỗi lần thử đều giúp bạn học thêm.', 'Không sao! Lập trình viên thật cũng thử rất nhiều lần.']
      },
      failMany: {
         fr: ['Celui-ci est difficile ! Touche 💡 si tu veux un indice.', 'Tu ne lâches rien, bravo ! Un indice 💡 peut t\'aider.'],
         en: ['This one is tricky! Tap 💡 if you want a hint.', 'You never give up, well done! A hint 💡 can help.'],
         vi: ['Bài này khó đấy! Chạm vào 💡 nếu bạn muốn gợi ý.', 'Bạn thật kiên trì, giỏi lắm! Một gợi ý 💡 có thể giúp bạn.']
      },
      win: {
         fr: ['Tu as réussi ! ★', 'Bravo {name}, c\'est gagné !', 'Génial ! Tu programmes comme un·e chef !', 'Youpi ! Je suis arrivée grâce à toi !'],
         en: ['You did it! ★', 'Well done {name}, you won!', 'Great! You program like a pro!', 'Yay! I made it thanks to you!'],
         vi: ['Bạn làm được rồi! ★', 'Giỏi lắm {name}, thắng rồi!', 'Tuyệt vời! Bạn lập trình như một chuyên gia!', 'Hoan hô! Nhờ bạn mà mình đã đến nơi!']
      },
      winTries: {
         fr: ['Tu as essayé {n} idées avant de trouver : c\'est comme ça que travaillent les programmeurs !'],
         en: ['You tried {n} ideas before finding it: that\'s how programmers work!'],
         vi: ['Bạn đã thử {n} cách trước khi tìm ra: lập trình viên cũng làm như vậy đó!']
      },
      winFew: {
         fr: ['Waouh, seulement {n} blocs : du travail de vrai·e programmeur·se !'],
         en: ['Wow, only {n} blocks: real programmer work!'],
         vi: ['Ồ, chỉ có {n} khối: đúng là lập trình viên thực thụ!']
      },
      next: {
         fr: ['Essaie la version suivante, elle est un peu plus difficile !', 'Il reste des étoiles à gagner : passe à la version suivante !'],
         en: ['Try the next version, it\'s a little harder!', 'There are more stars to win: go to the next version!'],
         vi: ['Thử mức tiếp theo nhé, khó hơn một chút đấy!', 'Vẫn còn sao để giành: sang mức tiếp theo nào!']
      },
      allStars: {
         fr: ['Toutes les étoiles de ce problème ! Tu es un·e champion·ne !'],
         en: ['All the stars of this problem! You\'re a champion!'],
         vi: ['Tất cả các sao của bài này! Bạn là nhà vô địch!']
      },
      rest: {
         fr: ['Super travail aujourd\'hui ! On se repose et on rejoue demain ?'],
         en: ['Great work today! Let\'s rest and play again tomorrow?'],
         vi: ['Hôm nay bạn làm tốt lắm! Mình nghỉ ngơi và mai chơi tiếp nhé?']
      }
   };
   function line(moment, args) {
      var list = pick(LINES[moment] || { fr: [''] });
      return fmt(list[Math.floor(Math.random() * list.length)], args);
   }

   /* ---------- her face (SVG) and the outfits won (see rewards in algorea.html) ---------- */
   var OUTFITS = {
      hat: '<path d="M30 30 L50 4 L70 30 Z" fill="#e8473c"/><circle cx="50" cy="5" r="5" fill="#f9d342"/>',
      crown: '<path d="M28 30 L32 10 L42 22 L50 6 L58 22 L68 10 L72 30 Z" fill="#f9d342" stroke="#d9a400" stroke-width="2"/>',
      glasses: '<g fill="#2d3e5c"><rect x="25" y="42" width="20" height="14" rx="6"/><rect x="55" y="42" width="20" height="14" rx="6"/><rect x="44" y="46" width="12" height="3"/></g>',
      bow: '<path d="M38 88 L50 82 L62 88 L62 76 L50 82 L38 76 Z" fill="#b26fd8"/><circle cx="50" cy="82" r="4" fill="#8a4fb0"/>',
      cape: '<path d="M16 80 Q50 70 84 80 L90 100 L10 100 Z" fill="#4cbf5c" opacity=".9"/>',
      gold: ''
   };
   function face(size, outfit) {
      outfit = outfit || [];
      var body = outfit.indexOf('gold') >= 0 ? '#f7c600' : '#ff9f43', dark = outfit.indexOf('gold') >= 0 ? '#c99a00' : '#e07a1f';
      var antenna = outfit.indexOf('hat') >= 0 || outfit.indexOf('crown') >= 0 ? '' :
         '<rect x="48" y="10" width="4" height="16" fill="' + dark + '"/><circle cx="50" cy="9" r="6" fill="#3cc0ef"/>';
      return '<svg class="rea-face" width="' + size + '" height="' + size + '" viewBox="0 0 100 100" aria-hidden="true">' +
         (outfit.indexOf('cape') >= 0 ? OUTFITS.cape : '') +
         antenna +
         '<rect x="14" y="24" width="72" height="64" rx="24" fill="' + body + '" stroke="' + dark + '" stroke-width="3"/>' +
         '<rect x="8" y="46" width="8" height="18" rx="4" fill="' + dark + '"/><rect x="84" y="46" width="8" height="18" rx="4" fill="' + dark + '"/>' +
         '<rect x="22" y="34" width="56" height="34" rx="16" fill="#fff8ec"/>' +
         '<circle cx="36" cy="49" r="6" fill="#2d3e5c"/><circle cx="64" cy="49" r="6" fill="#2d3e5c"/>' +
         '<circle cx="38" cy="47" r="2" fill="#fff"/><circle cx="66" cy="47" r="2" fill="#fff"/>' +
         '<path d="M40 59 Q50 67 60 59" stroke="#2d3e5c" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
         '<circle cx="27" cy="60" r="4" fill="#ffb3b3" opacity=".8"/><circle cx="73" cy="60" r="4" fill="#ffb3b3" opacity=".8"/>' +
         outfit.filter(function (o) { return o !== 'cape' && OUTFITS[o]; }).map(function (o) { return OUTFITS[o]; }).join('') +
         '</svg>';
   }

   /* ---------- the bubble ---------- */
   var CSS = '' +
      '#rea{position:fixed;left:10px;bottom:70px;z-index:50;display:flex;align-items:flex-end;gap:6px;max-width:min(440px,calc(100% - 20px));' +
      'pointer-events:none;transform:translateY(20px);opacity:0;transition:opacity .25s,transform .25s}' +
      '#rea.on{opacity:1;transform:none;pointer-events:auto}' +
      '#rea .rea-face{flex:none;filter:drop-shadow(0 3px 2px rgba(0,0,0,.2))}' +
      '#rea.happy .rea-face{animation:rea-jump .6s ease 2}' +
      '#rea.think .rea-face{animation:rea-tilt 1.2s ease 1}' +
      '#rea p{margin:0 0 30px;background:#fff;color:#2d3e5c;border:3px solid #f7c58a;border-radius:18px 18px 18px 4px;' +
      'padding:10px 14px;font:600 17px/1.35 "Nunito","Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 4px 0 #f0dcc0;cursor:pointer}' +
      '#rea p b{color:#e07a1f}' +
      '@keyframes rea-jump{0%,100%{transform:none}40%{transform:translateY(-14px)}}' +
      '@keyframes rea-tilt{0%,100%{transform:none}30%{transform:rotate(-10deg)}70%{transform:rotate(8deg)}}' +
      '.rea-confetti{position:fixed;inset:0;z-index:60;pointer-events:none}' +
      '.rea-star{position:fixed;z-index:61;font-size:40px;color:#ffd23f;pointer-events:none;text-shadow:0 2px 3px rgba(0,0,0,.3);' +
      'transition:left .8s cubic-bezier(.5,-0.3,.6,1),top .8s cubic-bezier(.5,-0.3,.6,1),font-size .8s,opacity .2s .75s}';
   var box = null, timer = null;
   function build() {
      if (box) { return box; }
      var style = document.createElement('style');
      style.textContent = CSS;
      document.head.appendChild(style);
      box = document.createElement('div');
      box.id = 'rea';
      box.innerHTML = '<span></span><p></p>';
      box.onclick = function () { hide(); };
      document.body.appendChild(box);
      return box;
   }
   function hide() { if (box) { box.className = ''; } clearTimeout(timer); }
   function say(text, options) {
      options = options || {};
      build();
      box.querySelector('span').innerHTML = face(options.size || 64, Rea.outfit);
      box.querySelector('p').innerHTML = text;
      box.className = 'on ' + (options.mood || '');
      clearTimeout(timer);
      timer = setTimeout(hide, options.ms || 6000);
      if (options.speak) { options.speak(box.querySelector('p').innerText); }
   }

   /* ---------- sounds, made on the spot (no sound files) ---------- */
   var audio = null;
   function tone(freq, start, len, type, gain) {
      var t = audio.currentTime + start, o = audio.createOscillator(), g = audio.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain || 0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      o.connect(g); g.connect(audio.destination);
      o.start(t); o.stop(t + len + 0.05);
      return o;
   }
   var SOUNDS = {
      snap: function () { tone(880, 0, 0.07, 'triangle', 0.12); },
      star: function () { tone(1318, 0, 0.12, 'sine'); tone(1760, 0.09, 0.18, 'sine'); },
      win: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.11, 0.22, 'triangle'); }); },
      fail: function () { var o = tone(330, 0, 0.35, 'sine', 0.15); o.frequency.exponentialRampToValueAtTime(180, audio.currentTime + 0.35); },
      unlock: function () { [784, 988, 1175, 1568, 1976].forEach(function (f, i) { tone(f, i * 0.08, 0.25, 'sine', 0.14); }); }
   };
   function sound(name) {
      if (!Rea.sounds || !SOUNDS[name]) { return; }
      try {
         audio = audio || new (window.AudioContext || window.webkitAudioContext)();
         if (audio.state === 'suspended') { audio.resume(); }
         SOUNDS[name]();
      } catch (e) { /* no sound here */ }
   }
   function buzz(ms) {
      if (!Rea.sounds) { return; }
      try {
         if (window.AndroidBridge && AndroidBridge.vibrate) { AndroidBridge.vibrate(ms || 30); }
         else if (navigator.vibrate) { navigator.vibrate(ms || 30); }
      } catch (e) { /* no vibration here */ }
   }

   /* ---------- confetti and flying stars ---------- */
   function confetti() {
      var c = document.createElement('canvas'), ctx = c.getContext('2d');
      c.className = 'rea-confetti';
      c.width = innerWidth; c.height = innerHeight;
      document.body.appendChild(c);
      var colors = ['#f9d342', '#3cc0ef', '#4cbf5c', '#b26fd8', '#f7a440', '#e8473c'], bits = [];
      for (var i = 0; i < 90; i++) {
         bits.push({ x: c.width / 2 + (Math.random() - 0.5) * 80, y: c.height * 0.45, vx: (Math.random() - 0.5) * 12,
            vy: -6 - Math.random() * 9, r: 4 + Math.random() * 5, a: Math.random() * 6, c: colors[i % colors.length] });
      }
      var t0 = null;
      (function frame(t) {
         if (t0 === null) { t0 = t; }
         ctx.clearRect(0, 0, c.width, c.height);
         bits.forEach(function (b) {
            b.x += b.vx; b.y += b.vy; b.vy += 0.35; b.vx *= 0.99; b.a += 0.2;
            ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c;
            ctx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r); ctx.restore();
         });
         if (t - t0 < 2200) { requestAnimationFrame(frame); } else { c.remove(); }
      })(performance.now());
   }
   function flyStar(from, to) {
      if (!to) { return; }
      var a = from ? from.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
      var b = to.getBoundingClientRect(), s = document.createElement('div');
      s.className = 'rea-star'; s.textContent = '★';
      s.style.left = (a.left + a.width / 2 - 20) + 'px'; s.style.top = (a.top + a.height / 2 - 20) + 'px';
      document.body.appendChild(s);
      requestAnimationFrame(function () { requestAnimationFrame(function () {
         s.style.left = (b.left + b.width / 2 - 10) + 'px'; s.style.top = (b.top + b.height / 2 - 12) + 'px';
         s.style.fontSize = '20px'; s.style.opacity = '0';
      }); });
      setTimeout(function () { s.remove(); }, 1100);
   }

   window.Rea = {
      name: 'Réa', outfit: [], sounds: true, OUTFITS: Object.keys(OUTFITS),
      face: face, say: say, hide: hide, line: line, sound: sound, buzz: buzz, confetti: confetti, flyStar: flyStar
   };
})();
