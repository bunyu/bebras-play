// "Mes problèmes" - written by editeur.html (Exporter). See store.js for the format.
window.ALGOREA_CUSTOM = [
 {
  "id": "petit-drapeau",
  "title": "Le drapeau",
  "color": "blanche",
  "world": "course",
  "versions": [
   {
    "stars": 1,
    "max": 3,
    "blocks": [
     "east"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Va jusqu'au drapeau.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"east\"></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "east"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1,
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Va jusqu'au drapeau. Il est plus loin !",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"east\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 5,
    "blocks": [
     "east",
     "north"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        3
       ],
       [
        1,
        1,
        1
       ],
       [
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 2,
       "col": 0
      }
     }
    ],
    "text": "Va jusqu'au drapeau. Il est en haut.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"north\"><next><block type=\"north\"></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-peintre",
  "title": "Le petit peintre",
  "color": "blanche",
  "world": "paint",
  "versions": [
   {
    "stars": 1,
    "max": 3,
    "blocks": [
     "east",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins la case marquée.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "east",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins les deux cases marquées.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 5,
    "blocks": [
     "east",
     "south",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3
       ],
       [
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins les deux cases marquées. Une est en bas.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"south\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-tresor",
  "title": "Les pierres brillantes",
  "color": "blanche",
  "world": "gems",
  "versions": [
   {
    "stars": 1,
    "max": 3,
    "blocks": [
     "forward"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Ramasse les pierres. Le robot avance tout droit.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"forward\"></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "forward",
     "right"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3
       ],
       [
        4,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Ramasse les pierres. Pour tourner, le robot pivote à droite.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"right\"><next><block type=\"forward\"></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "premier-parcours",
  "title": "Premier parcours",
  "color": "blanche",
  "world": "course",
  "versions": [
   {
    "stars": 1,
    "max": 5,
    "blocks": [
     "east"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1,
        1,
        1
       ],
       [
        1,
        1,
        1,
        3,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"east\"></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 6,
    "blocks": [
     "east",
     "north"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1,
        1,
        1
       ],
       [
        1,
        1,
        3,
        1,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 3,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nLe drapeau est plus haut : le robot doit aussi aller vers le nord.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"north\"><next><block type=\"north\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 8,
    "blocks": [
     "east",
     "north",
     "south"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1,
        1,
        1,
        1
       ],
       [
        1,
        1,
        2,
        1,
        3,
        1
       ],
       [
        1,
        1,
        2,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nAttention : il ne peut pas traverser un buisson. Il doit en faire le tour.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"south\"><next><block type=\"east\"></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "ranger-une-bille",
  "title": "Ranger une bille",
  "color": "blanche",
  "world": "marbles",
  "versions": [
   {
    "stars": 1,
    "max": 6,
    "blocks": [
     "east",
     "withdrawObject",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il ramasse la bille et la dépose dans le trou.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 6,
    "blocks": [
     "east",
     "south",
     "withdrawObject",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        1
       ],
       [
        1,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il ramasse la bille et la dépose dans le trou.\nLe trou est juste en dessous de la bille.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"south\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 10,
    "blocks": [
     "east",
     "withdrawObject",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        3,
        4,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il range les deux billes, chacune dans un trou.\nLe robot ne peut porter qu'une bille à la fois.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "escalier",
  "title": "L'escalier",
  "color": "jaune",
  "world": "course",
  "versions": [
   {
    "stars": 2,
    "max": 3,
    "blocks": [
     "east",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nTu n'as droit qu'à 3 blocs : utilise le bloc « répéter ».",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">7</field><statement name=\"DO\"><block type=\"east\"></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 4,
    "blocks": [
     "east",
     "north",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        3,
        2
       ],
       [
        2,
        2,
        2,
        1,
        1,
        2
       ],
       [
        2,
        2,
        1,
        1,
        2,
        2
       ],
       [
        2,
        1,
        1,
        2,
        2,
        2
       ],
       [
        1,
        1,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 5,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il monte l'escalier jusqu'au drapeau.\nRegarde bien : quels sont les deux pas qui se répètent ?",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"north\"></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 7,
    "blocks": [
     "east",
     "north",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2
       ],
       [
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 4,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il monte l'escalier jusqu'au drapeau.\nLes marches sont plus longues, et il reste un bout de chemin tout en haut.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"east\"><next><block type=\"north\"></block></next></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"east\"></block></statement></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "une-bille-un-trou",
  "title": "Une bille, un trou",
  "color": "jaune",
  "world": "marbles",
  "versions": [
   {
    "stars": 2,
    "max": 6,
    "blocks": [
     "east",
     "withdrawObject",
     "dropObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        3,
        4,
        3,
        4,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il range chaque bille dans le trou qui est juste après elle.\nTu n'as droit qu'à 6 blocs.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 7,
    "blocks": [
     "east",
     "north",
     "south",
     "withdrawObject",
     "dropObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        4,
        4,
        4,
        1
       ],
       [
        1,
        3,
        3,
        3,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il range chaque bille dans le trou qui est juste en dessous d'elle.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"south\"><next><block type=\"dropObject\"><next><block type=\"north\"></block></next></block></next></block></next></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 10,
    "blocks": [
     "east",
     "west",
     "south",
     "withdrawObject",
     "dropObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        3,
        4,
        3,
        4,
        3
       ],
       [
        1,
        4,
        3,
        4,
        3,
        4,
        3
       ],
       [
        1,
        4,
        3,
        4,
        3,
        4,
        3
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Il y a trois rangées. Programme le robot pour qu'il range toutes les billes.\nAstuce : on peut mettre un bloc « répéter » dans un autre bloc « répéter ».",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"west\"></block></statement><next><block type=\"south\"></block></next></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "le-bon-chemin",
  "title": "Le bon chemin",
  "color": "jaune",
  "world": "course",
  "versions": [
   {
    "stars": 2,
    "max": 6,
    "blocks": [
     "east",
     "north",
     "obstacleEast",
     "controls_repeat",
     "controls_if",
     "controls_if_else"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        2,
        2
       ],
       [
        2,
        2,
        1,
        1,
        1,
        2,
        2
       ],
       [
        1,
        1,
        1,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 4,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nTu n'as droit qu'à 6 blocs. Idée : s'il y a un buisson à l'est, le robot monte. Sinon, il avance.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">8</field><statement name=\"DO\"><block type=\"controls_if\"><mutation else=\"1\"></mutation><value name=\"IF0\"><block type=\"obstacleEast\"></block></value><statement name=\"DO0\"><block type=\"north\"></block></statement><statement name=\"ELSE\"><block type=\"east\"></block></statement></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 6,
    "blocks": [
     "east",
     "north",
     "obstacleEast",
     "controls_repeat",
     "controls_if",
     "controls_if_else"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        1,
        2,
        2,
        2,
        2
       ],
       [
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 5,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        1,
        1,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 5,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nAttention : le même programme doit marcher sur les deux chemins.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">10</field><statement name=\"DO\"><block type=\"controls_if\"><mutation else=\"1\"></mutation><value name=\"IF0\"><block type=\"obstacleEast\"></block></value><statement name=\"DO0\"><block type=\"north\"></block></statement><statement name=\"ELSE\"><block type=\"east\"></block></statement></block></statement></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 6,
    "blocks": [
     "east",
     "north",
     "obstacleEast",
     "controls_repeat",
     "controls_if",
     "controls_if_else"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 6,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2
       ],
       [
        2,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 6,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        1,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 6,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nLe même programme doit marcher sur les trois chemins. Compte bien le nombre de pas.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">13</field><statement name=\"DO\"><block type=\"controls_if\"><mutation else=\"1\"></mutation><value name=\"IF0\"><block type=\"obstacleEast\"></block></value><statement name=\"DO0\"><block type=\"north\"></block></statement><statement name=\"ELSE\"><block type=\"east\"></block></statement></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "bille-ou-pas",
  "title": "Bille ou pas ?",
  "color": "orange",
  "world": "marbles",
  "versions": [
   {
    "stars": 2,
    "max": 9,
    "blocks": [
     "east",
     "north",
     "south",
     "withdrawObject",
     "dropObject",
     "onObject",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        1,
        4,
        4,
        1,
        1
       ],
       [
        1,
        3,
        1,
        3,
        3,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        4,
        1,
        1,
        4,
        4
       ],
       [
        1,
        1,
        3,
        1,
        1,
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il range chaque bille dans le trou qui est juste en dessous d'elle.\nAttention : les billes ne sont pas au même endroit dans les deux tests. Le robot doit regarder s'il est sur une bille.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onObject\"></block></value><statement name=\"DO0\"><block type=\"withdrawObject\"><next><block type=\"south\"><next><block type=\"dropObject\"><next><block type=\"north\"></block></next></block></next></block></next></block></statement></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 9,
    "blocks": [
     "east",
     "withdrawObject",
     "dropObject",
     "onObject",
     "onContainer",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        1,
        3,
        4,
        3,
        1,
        4,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        4,
        3,
        1,
        4,
        1,
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il range chaque bille dans le trou suivant.\nLe même programme doit marcher sur les deux tests.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">8</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onObject\"></block></value><statement name=\"DO0\"><block type=\"withdrawObject\"></block></statement><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onContainer\"></block></value><statement name=\"DO0\"><block type=\"dropObject\"></block></statement></block></next></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 13,
    "blocks": [
     "east",
     "west",
     "south",
     "withdrawObject",
     "dropObject",
     "onObject",
     "onContainer",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        1,
        3,
        4,
        3,
        1
       ],
       [
        1,
        1,
        4,
        3,
        1,
        4,
        3
       ],
       [
        1,
        4,
        3,
        1,
        1,
        4,
        3
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        4,
        1,
        3,
        4,
        3
       ],
       [
        1,
        4,
        3,
        4,
        1,
        1,
        3
       ],
       [
        1,
        1,
        1,
        4,
        1,
        3,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Il y a trois rangées. Programme le robot pour qu'il range chaque bille dans le trou suivant.\nLe même programme doit marcher sur les deux tests.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onObject\"></block></value><statement name=\"DO0\"><block type=\"withdrawObject\"></block></statement><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onContainer\"></block></value><statement name=\"DO0\"><block type=\"dropObject\"></block></statement></block></next></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"west\"></block></statement><next><block type=\"south\"></block></next></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "peindre-la-ligne",
  "title": "Peindre la ligne",
  "color": "jaune",
  "world": "paint",
  "versions": [
   {
    "stars": 2,
    "max": 4,
    "blocks": [
     "east",
     "dropObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3,
        3,
        3,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il peigne toutes les cases marquées.\nTu n'as droit qu'à 4 blocs.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">5</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 6,
    "blocks": [
     "east",
     "dropObject",
     "onContainer",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        1,
        3,
        3,
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        3,
        3,
        1,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il peigne toutes les cases marquées, et seulement celles-là.\nLes cases marquées ne sont pas au même endroit dans les deux tests.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onContainer\"></block></value><statement name=\"DO0\"><block type=\"dropObject\"></block></statement></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "ranger-la-caisse",
  "title": "Ranger la caisse",
  "color": "jaune",
  "world": "sokoban",
  "versions": [
   {
    "stars": 2,
    "max": 3,
    "blocks": [
     "forward",
     "pushObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        4,
        1,
        1,
        3
       ],
       [
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il pousse la caisse jusqu'à la case marquée.\nTu n'as droit qu'à 3 blocs.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"pushObject\"></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 12,
    "blocks": [
     "forward",
     "left",
     "right",
     "pushObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        4,
        1,
        1,
        3
       ],
       [
        1,
        2,
        2,
        2,
        2
       ],
       [
        1,
        4,
        1,
        1,
        3
       ],
       [
        1,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Il y a deux caisses. Programme le robot pour qu'il pousse chaque caisse sur sa case marquée.\nAprès la première caisse, le robot doit revenir au début pour aller chercher la deuxième.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"pushObject\"></block></statement><next><block type=\"left\"><next><block type=\"left\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"forward\"></block></statement><next><block type=\"left\"><next><block type=\"forward\"><next><block type=\"forward\"><next><block type=\"left\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "le-jardin",
  "title": "Le jardin",
  "color": "jaune",
  "world": "flowers",
  "versions": [
   {
    "stars": 2,
    "max": 4,
    "blocks": [
     "forward",
     "dropObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        2,
        2,
        2,
        2,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Programme le robot jardinier pour qu'il sème une graine sur chaque case de terre.\nTu n'as droit qu'à 4 blocs.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"forward\"><next><block type=\"dropObject\"></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 6,
    "blocks": [
     "forward",
     "dropObject",
     "onContainer",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        2,
        1,
        2,
        2,
        1,
        2
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        2,
        2,
        1,
        2,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Programme le robot jardinier pour qu'il sème une graine sur chaque case de terre, et seulement là.\nLa terre n'est pas au même endroit dans les deux tests.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"forward\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onContainer\"></block></value><statement name=\"DO0\"><block type=\"dropObject\"></block></statement></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "le-tresor",
  "title": "Le trésor",
  "color": "jaune",
  "world": "gems",
  "versions": [
   {
    "stars": 2,
    "max": 3,
    "blocks": [
     "forward",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3,
        3,
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il ramasse toutes les pierres précieuses.\nIl les ramasse tout seul en passant dessus. Tu n'as droit qu'à 3 blocs.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">5</field><statement name=\"DO\"><block type=\"forward\"></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 5,
    "blocks": [
     "forward",
     "left",
     "right",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3
       ],
       [
        3,
        4,
        3
       ],
       [
        3,
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il ramasse toutes les pierres précieuses autour du mur.\nRegarde bien : quels sont les pas qui se répètent à chaque côté ?",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"forward\"><next><block type=\"forward\"><next><block type=\"right\"></block></next></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "jusqu-au-buisson",
  "title": "Jusqu'au buisson",
  "color": "orange",
  "world": "course",
  "versions": [
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "east",
     "north",
     "obstacleEast",
     "obstacleNorth",
     "controls_repeat",
     "controls_whileUntil",
     "logic_negate"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        1,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nLe chemin n'a pas la même longueur dans les trois tests : on ne peut pas compter les pas.\nIdée : le robot avance tant qu'il n'y a pas de buisson à l'est.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_whileUntil\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_negate\"><value name=\"BOOL\"><block type=\"obstacleEast\"></block></value></block></value><statement name=\"DO\"><block type=\"east\"></block></statement></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 9,
    "blocks": [
     "east",
     "north",
     "obstacleEast",
     "obstacleNorth",
     "controls_repeat",
     "controls_whileUntil",
     "logic_negate"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        1,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 3,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 5,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        3,
        2,
        2
       ],
       [
        2,
        2,
        1,
        2,
        2
       ],
       [
        2,
        2,
        1,
        2,
        2
       ],
       [
        2,
        2,
        1,
        2,
        2
       ],
       [
        2,
        2,
        1,
        2,
        2
       ],
       [
        1,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 6,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nIl avance vers l'est jusqu'au buisson, puis vers le nord jusqu'au buisson.\nLe même programme doit marcher sur les trois tests.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_whileUntil\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_negate\"><value name=\"BOOL\"><block type=\"obstacleEast\"></block></value></block></value><statement name=\"DO\"><block type=\"east\"></block></statement><next><block type=\"controls_whileUntil\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_negate\"><value name=\"BOOL\"><block type=\"obstacleNorth\"></block></value></block></value><statement name=\"DO\"><block type=\"north\"></block></statement></block></next></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 10,
    "blocks": [
     "east",
     "north",
     "obstacleEast",
     "obstacleNorth",
     "controls_repeat",
     "controls_whileUntil",
     "logic_negate"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        2,
        2
       ],
       [
        2,
        2,
        1,
        1,
        1,
        1,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 6,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        2,
        2
       ],
       [
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 5,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        1,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        1,
        1,
        2,
        2,
        2,
        2
       ],
       [
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 6,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il monte l'escalier jusqu'au drapeau.\nLes marches n'ont pas toutes la même taille, et elles changent d'un test à l'autre.\nIl y a toujours trois marches.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"controls_whileUntil\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_negate\"><value name=\"BOOL\"><block type=\"obstacleEast\"></block></value></block></value><statement name=\"DO\"><block type=\"east\"></block></statement><next><block type=\"controls_whileUntil\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_negate\"><value name=\"BOOL\"><block type=\"obstacleNorth\"></block></value></block></value><statement name=\"DO\"><block type=\"north\"></block></statement></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "le-grand-rangement",
  "title": "Le grand rangement",
  "color": "orange",
  "world": "marbles",
  "versions": [
   {
    "stars": 3,
    "max": 14,
    "blocks": [
     "east",
     "west",
     "north",
     "south",
     "withdrawObject",
     "dropObject",
     "onObject",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        1,
        4,
        4,
        1,
        1
       ],
       [
        1,
        3,
        1,
        3,
        3,
        1,
        1
       ],
       [
        1,
        1,
        4,
        1,
        1,
        4,
        4
       ],
       [
        1,
        1,
        3,
        1,
        1,
        3,
        3
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il range chaque bille dans le trou qui est juste en dessous d'elle.\nIl y a deux rangées de billes. Tu n'as droit qu'à 14 blocs.\nAstuce : range une rangée, reviens au début, descends, et recommence.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onObject\"></block></value><statement name=\"DO0\"><block type=\"withdrawObject\"><next><block type=\"south\"><next><block type=\"dropObject\"><next><block type=\"north\"></block></next></block></next></block></next></block></statement></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"west\"></block></statement><next><block type=\"south\"><next><block type=\"south\"></block></next></block></next></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 14,
    "blocks": [
     "east",
     "west",
     "north",
     "south",
     "withdrawObject",
     "dropObject",
     "onObject",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        1,
        4,
        4,
        1,
        1
       ],
       [
        1,
        3,
        1,
        3,
        3,
        1,
        1
       ],
       [
        1,
        1,
        4,
        1,
        1,
        4,
        4
       ],
       [
        1,
        1,
        3,
        1,
        1,
        3,
        3
       ],
       [
        1,
        4,
        4,
        1,
        1,
        1,
        4
       ],
       [
        1,
        3,
        3,
        1,
        1,
        1,
        3
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        4,
        1,
        1,
        1,
        4
       ],
       [
        1,
        1,
        3,
        1,
        1,
        1,
        3
       ],
       [
        1,
        4,
        1,
        4,
        1,
        4,
        1
       ],
       [
        1,
        3,
        1,
        3,
        1,
        3,
        1
       ],
       [
        1,
        1,
        1,
        1,
        4,
        1,
        1
       ],
       [
        1,
        1,
        1,
        1,
        3,
        1,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il range chaque bille dans le trou qui est juste en dessous d'elle.\nIl y a trois rangées de billes, et les billes changent de place d'un test à l'autre.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onObject\"></block></value><statement name=\"DO0\"><block type=\"withdrawObject\"><next><block type=\"south\"><next><block type=\"dropObject\"><next><block type=\"north\"></block></next></block></next></block></next></block></statement></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"west\"></block></statement><next><block type=\"south\"><next><block type=\"south\"></block></next></block></next></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "le-serpentin",
  "title": "Le serpentin",
  "color": "vert",
  "world": "gems",
  "versions": [
   {
    "stars": 3,
    "max": 13,
    "blocks": [
     "forward",
     "left",
     "right",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3,
        3,
        3,
        3
       ],
       [
        3,
        3,
        3,
        3,
        3,
        3
       ],
       [
        3,
        3,
        3,
        3,
        3,
        3
       ],
       [
        3,
        3,
        3,
        3,
        3,
        3
       ],
       [
        1,
        4,
        4,
        4,
        4,
        4
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il ramasse toutes les pierres précieuses.\nIl fait une rangée vers l'est, descend, fait la rangée suivante vers l'ouest, descend, et recommence.\nTu n'as droit qu'à 13 blocs.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">5</field><statement name=\"DO\"><block type=\"forward\"></block></statement><next><block type=\"right\"><next><block type=\"forward\"><next><block type=\"right\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">5</field><statement name=\"DO\"><block type=\"forward\"></block></statement><next><block type=\"left\"><next><block type=\"forward\"><next><block type=\"left\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 16,
    "blocks": [
     "forward",
     "left",
     "right",
     "obstacleInFront",
     "controls_repeat",
     "controls_whileUntil",
     "logic_negate"
    ],
    "tests": [
     {
      "tiles": [
       [
        4,
        4,
        4,
        4,
        4,
        4
       ],
       [
        4,
        1,
        3,
        3,
        3,
        4
       ],
       [
        4,
        3,
        3,
        3,
        3,
        4
       ],
       [
        4,
        3,
        3,
        3,
        3,
        4
       ],
       [
        4,
        3,
        3,
        3,
        3,
        4
       ],
       [
        4,
        1,
        4,
        4,
        4,
        4
       ],
       [
        4,
        4,
        4,
        4,
        4,
        4
       ]
      ],
      "robot": {
       "row": 1,
       "col": 1,
       "dir": 0
      }
     },
     {
      "tiles": [
       [
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4
       ],
       [
        4,
        1,
        3,
        3,
        3,
        3,
        3,
        4
       ],
       [
        4,
        3,
        3,
        3,
        3,
        3,
        3,
        4
       ],
       [
        4,
        3,
        3,
        3,
        3,
        3,
        3,
        4
       ],
       [
        4,
        3,
        3,
        3,
        3,
        3,
        3,
        4
       ],
       [
        4,
        1,
        4,
        4,
        4,
        4,
        4,
        4
       ],
       [
        4,
        4,
        4,
        4,
        4,
        4,
        4,
        4
       ]
      ],
      "robot": {
       "row": 1,
       "col": 1,
       "dir": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il ramasse toutes les pierres précieuses.\nLa salle n'a pas la même largeur dans les deux tests : on ne peut pas compter les pas.\nIdée : le robot avance tant qu'il n'y a pas d'obstacle devant lui.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"controls_whileUntil\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_negate\"><value name=\"BOOL\"><block type=\"obstacleInFront\"></block></value></block></value><statement name=\"DO\"><block type=\"forward\"></block></statement><next><block type=\"right\"><next><block type=\"forward\"><next><block type=\"right\"><next><block type=\"controls_whileUntil\"><field name=\"MODE\">WHILE</field><value name=\"BOOL\"><block type=\"logic_negate\"><value name=\"BOOL\"><block type=\"obstacleInFront\"></block></value></block></value><statement name=\"DO\"><block type=\"forward\"></block></statement><next><block type=\"left\"><next><block type=\"forward\"><next><block type=\"left\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "peindre-le-tableau",
  "title": "Peindre le tableau",
  "color": "orange",
  "world": "paint",
  "versions": [
   {
    "stars": 3,
    "max": 8,
    "blocks": [
     "east",
     "west",
     "south",
     "dropObject",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3,
        3,
        3,
        3
       ],
       [
        1,
        3,
        3,
        3,
        3,
        3
       ],
       [
        1,
        3,
        3,
        3,
        3,
        3
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il peigne tout le rectangle marqué.\nTu n'as droit qu'à 8 blocs.\nAstuce : peins une ligne, reviens au début, descends, et recommence.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">3</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">5</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">5</field><statement name=\"DO\"><block type=\"west\"></block></statement><next><block type=\"south\"></block></next></block></next></block></statement></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 10,
    "blocks": [
     "east",
     "west",
     "south",
     "dropObject",
     "onContainer",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3,
        1,
        1,
        3,
        1
       ],
       [
        1,
        1,
        1,
        3,
        3,
        1,
        1
       ],
       [
        1,
        3,
        1,
        1,
        1,
        1,
        3
       ],
       [
        1,
        1,
        3,
        3,
        3,
        3,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        1,
        3,
        1,
        1,
        3
       ],
       [
        1,
        3,
        3,
        3,
        1,
        1,
        1
       ],
       [
        1,
        1,
        1,
        1,
        3,
        3,
        3
       ],
       [
        1,
        3,
        1,
        1,
        1,
        3,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il peigne toutes les cases marquées, et seulement celles-là.\nLe dessin n'est pas le même dans les deux tests.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onContainer\"></block></value><statement name=\"DO0\"><block type=\"dropObject\"></block></statement></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">6</field><statement name=\"DO\"><block type=\"west\"></block></statement><next><block type=\"south\"></block></next></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "les-trois-bosses",
  "title": "Les trois bosses",
  "color": "vert",
  "world": "course",
  "versions": [
   {
    "stars": 4,
    "max": 14,
    "blocks": [
     "east",
     "north",
     "south",
     "controls_repeat",
     "procedures_defnoreturn"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ],
       [
        2,
        2,
        1,
        1,
        2,
        2,
        2,
        1,
        1,
        2,
        2,
        2,
        2,
        1,
        1,
        2,
        2
       ],
       [
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        2
       ],
       [
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        2,
        2,
        3,
        2
       ],
       [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
       ]
      ],
      "robot": {
       "row": 3,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il arrive sur le drapeau.\nIl y a trois bosses pareilles, mais elles ne sont pas à la même distance les unes des autres.\nTu n'as droit qu'à 14 blocs. Idée : crée une fonction « bosse », puis utilise-la trois fois.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"procedures_callnoreturn\"><mutation name=\"bosse\"></mutation><next><block type=\"east\"><next><block type=\"procedures_callnoreturn\"><mutation name=\"bosse\"></mutation><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"procedures_callnoreturn\"><mutation name=\"bosse\"></mutation></block></next></block></next></block></next></block></next></block></next></block></next></block><block type=\"procedures_defnoreturn\" x=\"350\" y=\"0\"><mutation></mutation><field name=\"NAME\">bosse</field><statement name=\"STACK\"><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"north\"></block></next></block></statement><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"south\"></block></next></block></statement></block></next></block></statement></block></xml>"
   }
  ]
 },
 {
  "id": "le-triangle",
  "title": "Le triangle 2",
  "color": "orange",
  "world": "paint",
  "versions": [
   {
    "stars": 4,
    "max": 25,
    "blocks": [
     "east",
     "west",
     "south",
     "dropObject",
     "controls_repeat",
     "controls_repeat_ext",
     "math_number",
     "math_arithmetic",
     "cat:variables"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        1,
        1,
        1,
        1,
        1,
        1,
        3,
        1
       ],
       [
        1,
        3,
        3,
        1,
        1,
        1,
        1,
        3,
        3,
        1
       ],
       [
        1,
        3,
        3,
        3,
        1,
        1,
        3,
        3,
        3,
        1
       ],
       [
        1,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il peigne tout le triangle.\nChaque ligne a une case de plus que la ligne du dessus. Tu n'as droit qu'à 16 blocs.\nIdée : garde dans une variable le nombre de cases à peindre, et ajoute 1 à chaque ligne."
   }
  ]
 },
 {
  "id": "la-livraison",
  "title": "La livraison",
  "color": "jaune",
  "world": "fishing",
  "versions": [
   {
    "stars": 2,
    "max": 8,
    "blocks": [
     "east",
     "withdrawNum",
     "dropNum",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ],
       [
        1,
        1,
        8,
        1,
        1,
        1,
        2,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      },
      "counts": {
       "1,2": 5,
       "1,6": 5
      }
     }
    ],
    "text": "Programme le bateau pour qu'il apporte à l'île les poissons qu'elle demande.\nLe nombre sur le filet dit combien il y a de poissons. Le nombre sur l'île dit combien elle en veut.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"east\"></block></statement><next><block type=\"withdrawNum\"><value name=\"PARAM_0\"><shadow type=\"math_number\"><field name=\"NUM\">5</field></shadow></value><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"east\"></block></statement><next><block type=\"dropNum\"><value name=\"PARAM_0\"><shadow type=\"math_number\"><field name=\"NUM\">5</field></shadow></value></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 8,
    "blocks": [
     "east",
     "withdrawNum",
     "dropNum",
     "nbWithdrawables",
     "containerSize",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ],
       [
        1,
        1,
        8,
        1,
        1,
        1,
        2,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      },
      "counts": {
       "1,2": 3,
       "1,6": 3
      }
     },
     {
      "tiles": [
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ],
       [
        1,
        1,
        8,
        1,
        1,
        1,
        2,
        1
       ],
       [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      },
      "counts": {
       "1,2": 7,
       "1,6": 7
      }
     }
    ],
    "text": "Programme le bateau pour qu'il apporte à l'île les poissons qu'elle demande.\nLe nombre de poissons change d'un test à l'autre : on ne peut pas l'écrire dans le programme.\nIdée : le bateau peut lire le nombre de poissons qui sont sur sa case.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">2</field><statement name=\"DO\"><block type=\"east\"></block></statement><next><block type=\"withdrawNum\"><value name=\"PARAM_0\"><block type=\"nbWithdrawables\"></block></value><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"east\"></block></statement><next><block type=\"dropNum\"><value name=\"PARAM_0\"><block type=\"containerSize\"></block></value></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 4,
    "max": 9,
    "blocks": [
     "east",
     "withdrawNum",
     "dropNum",
     "nbWithdrawables",
     "nbInBag",
     "controls_repeat"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        8,
        8,
        8,
        8,
        1,
        2,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      },
      "counts": {
       "0,1": 2,
       "0,2": 4,
       "0,3": 1,
       "0,4": 3,
       "0,6": 10
      }
     },
     {
      "tiles": [
       [
        1,
        8,
        8,
        8,
        8,
        1,
        2,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      },
      "counts": {
       "0,1": 3,
       "0,2": 3,
       "0,3": 2,
       "0,4": 5,
       "0,6": 13
      }
     }
    ],
    "text": "Il y a quatre filets. L'île veut tous les poissons.\nProgramme le bateau pour qu'il prenne les poissons de chaque filet, puis les apporte à l'île.\nLes nombres changent d'un test à l'autre.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">4</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"withdrawNum\"><value name=\"PARAM_0\"><block type=\"nbWithdrawables\"></block></value></block></next></block></statement><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"dropNum\"><value name=\"PARAM_0\"><block type=\"nbInBag\"></block></value></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "apres-le-repere",
  "title": "Après le repère",
  "color": "orange",
  "world": "paint",
  "versions": [
   {
    "stars": 3,
    "max": 7,
    "blocks": [
     "east",
     "dropObject",
     "onContainer",
     "controls_repeat",
     "controls_if"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        4,
        3,
        1,
        4,
        3,
        1,
        1,
        4,
        3,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     },
     {
      "tiles": [
       [
        1,
        4,
        3,
        1,
        1,
        1,
        4,
        3,
        4,
        3,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Programme le robot pour qu'il peigne la case qui est juste après chaque point blanc.\nAttention : il ne faut pas peindre les points blancs. Ce sont seulement des repères.\nLes repères changent de place d'un test à l'autre.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"controls_repeat\"><field name=\"TIMES\">8</field><statement name=\"DO\"><block type=\"east\"><next><block type=\"controls_if\"><value name=\"IF0\"><block type=\"onContainer\"></block></value><statement name=\"DO0\"><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></statement></block></next></block></statement></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-gauche",
  "title": "Vers la gauche",
  "color": "blanche",
  "world": "course",
  "versions": [
   {
    "stars": 1,
    "max": 3,
    "blocks": [
     "west"
    ],
    "tests": [
     {
      "tiles": [
       [
        3,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 2
      }
     }
    ],
    "text": "Le drapeau est à gauche. Va le chercher.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"west\"><next><block type=\"west\"></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "west"
    ],
    "tests": [
     {
      "tiles": [
       [
        3,
        1,
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 4
      }
     }
    ],
    "text": "Le drapeau est loin à gauche.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"west\"><next><block type=\"west\"><next><block type=\"west\"><next><block type=\"west\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 4,
    "blocks": [
     "west",
     "north"
    ],
    "tests": [
     {
      "tiles": [
       [
        3,
        1
       ],
       [
        1,
        1
       ]
      ],
      "robot": {
       "row": 1,
       "col": 1
      }
     }
    ],
    "text": "Le drapeau est à gauche et en haut.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"west\"><next><block type=\"north\"></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-descendre",
  "title": "On descend",
  "color": "blanche",
  "world": "course",
  "versions": [
   {
    "stars": 1,
    "max": 3,
    "blocks": [
     "south"
    ],
    "tests": [
     {
      "tiles": [
       [
        1
       ],
       [
        1
       ],
       [
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Descends jusqu'au drapeau.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"south\"><next><block type=\"south\"></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 4,
    "blocks": [
     "east",
     "south"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1
       ],
       [
        1,
        1
       ],
       [
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Descends, puis va à droite. Ou l'inverse !",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"south\"><next><block type=\"south\"></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-coin",
  "title": "Le coin d'en haut",
  "color": "blanche",
  "world": "course",
  "versions": [
   {
    "stars": 1,
    "max": 5,
    "blocks": [
     "east",
     "north"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        3
       ],
       [
        1,
        1,
        1
       ],
       [
        1,
        1,
        1
       ]
      ],
      "robot": {
       "row": 2,
       "col": 0
      }
     }
    ],
    "text": "Va dans le coin, sur le drapeau.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"north\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"east\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "east",
     "north"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        3
       ],
       [
        1,
        2,
        1
       ],
       [
        1,
        2,
        1
       ]
      ],
      "robot": {
       "row": 2,
       "col": 0
      }
     }
    ],
    "text": "Va sur le drapeau. Les buissons bloquent le passage.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"north\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"east\"></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-buisson",
  "title": "Le buisson",
  "color": "blanche",
  "world": "course",
  "versions": [
   {
    "stars": 1,
    "max": 5,
    "blocks": [
     "east",
     "north",
     "south"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1
       ],
       [
        1,
        2,
        3
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     }
    ],
    "text": "Un buisson est sur le chemin. Passe par-dessus !",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"south\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 6,
    "blocks": [
     "east",
     "north",
     "south"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        1,
        1,
        1
       ],
       [
        1,
        2,
        1,
        3
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     }
    ],
    "text": "Passe par-dessus le buisson, puis va au drapeau.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"south\"><next><block type=\"east\"></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-escalier",
  "title": "Les marches",
  "color": "blanche",
  "world": "course",
  "versions": [
   {
    "stars": 1,
    "max": 5,
    "blocks": [
     "east",
     "north"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        3
       ],
       [
        2,
        1,
        1
       ],
       [
        1,
        1,
        2
       ]
      ],
      "robot": {
       "row": 2,
       "col": 0
      }
     }
    ],
    "text": "Monte les marches jusqu'au drapeau.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"north\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 7,
    "blocks": [
     "east",
     "north"
    ],
    "tests": [
     {
      "tiles": [
       [
        2,
        2,
        2,
        3
       ],
       [
        2,
        2,
        1,
        1
       ],
       [
        2,
        1,
        1,
        2
       ],
       [
        1,
        1,
        2,
        2
       ]
      ],
      "robot": {
       "row": 3,
       "col": 0
      }
     }
    ],
    "text": "Encore plus de marches !",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"north\"><next><block type=\"east\"><next><block type=\"north\"></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-ligne",
  "title": "La ligne de couleur",
  "color": "blanche",
  "world": "paint",
  "versions": [
   {
    "stars": 1,
    "max": 7,
    "blocks": [
     "east",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins les trois cases marquées.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "south",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1
       ],
       [
        3
       ],
       [
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins les cases marquées, vers le bas.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"south\"><next><block type=\"dropObject\"><next><block type=\"south\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-saute-case",
  "title": "Une case sur deux",
  "color": "blanche",
  "world": "paint",
  "versions": [
   {
    "stars": 1,
    "max": 6,
    "blocks": [
     "east",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins seulement les cases marquées.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 9,
    "blocks": [
     "east",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        1,
        3,
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins seulement les cases marquées. Saute les autres.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"east\"><next><block type=\"east\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-carre",
  "title": "Le petit carré",
  "color": "blanche",
  "world": "paint",
  "versions": [
   {
    "stars": 1,
    "max": 7,
    "blocks": [
     "east",
     "west",
     "south",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3
       ],
       [
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0
      }
     }
    ],
    "text": "Peins les trois cases marquées.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"dropObject\"><next><block type=\"south\"><next><block type=\"dropObject\"><next><block type=\"west\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-collier",
  "title": "Le collier",
  "color": "blanche",
  "world": "gems",
  "versions": [
   {
    "stars": 1,
    "max": 4,
    "blocks": [
     "forward"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Ramasse les trois pierres.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"forward\"><next><block type=\"forward\"></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 3,
    "blocks": [
     "forward"
    ],
    "tests": [
     {
      "tiles": [
       [
        1
       ],
       [
        3
       ],
       [
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 1
      }
     }
    ],
    "text": "Le robot regarde vers le bas. Ramasse les pierres.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"forward\"></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 4,
    "blocks": [
     "forward",
     "left"
    ],
    "tests": [
     {
      "tiles": [
       [
        4,
        3
       ],
       [
        1,
        3
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Ramasse les pierres. Pour tourner, le robot pivote à gauche.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"left\"><next><block type=\"forward\"></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-virage",
  "title": "Le virage",
  "color": "blanche",
  "world": "gems",
  "versions": [
   {
    "stars": 1,
    "max": 5,
    "blocks": [
     "forward",
     "right"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3,
        3
       ],
       [
        4,
        4,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Ramasse toutes les pierres. Il faut tourner une fois.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"forward\"><next><block type=\"right\"><next><block type=\"forward\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 6,
    "blocks": [
     "forward",
     "left",
     "right"
    ],
    "tests": [
     {
      "tiles": [
       [
        4,
        3,
        3
       ],
       [
        1,
        3,
        4
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Ramasse toutes les pierres. Le chemin tourne à gauche puis à droite.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"left\"><next><block type=\"forward\"><next><block type=\"right\"><next><block type=\"forward\"></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-bille-haut",
  "title": "La bille et le trou",
  "color": "blanche",
  "world": "marbles",
  "versions": [
   {
    "stars": 1,
    "max": 5,
    "blocks": [
     "east",
     "north",
     "withdrawObject",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        3
       ],
       [
        1,
        4
       ]
      ],
      "robot": {
       "row": 1,
       "col": 0
      }
     }
    ],
    "text": "Prends la bille. Mets-la dans le trou, en haut.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"east\"><next><block type=\"withdrawObject\"><next><block type=\"north\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "west",
     "withdrawObject",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        3,
        4,
        1
       ]
      ],
      "robot": {
       "row": 0,
       "col": 2
      }
     }
    ],
    "text": "Prends la bille. Mets-la dans le trou, à gauche.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"west\"><next><block type=\"withdrawObject\"><next><block type=\"west\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-graine",
  "title": "La graine",
  "color": "blanche",
  "world": "flowers",
  "versions": [
   {
    "stars": 1,
    "max": 3,
    "blocks": [
     "forward",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        2
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Avance et sème une graine sur la terre.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"dropObject\"></block></next></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 5,
    "blocks": [
     "forward",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        2,
        2
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Sème une graine sur chaque case de terre.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"dropObject\"><next><block type=\"forward\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></xml>"
   },
   {
    "stars": 3,
    "max": 6,
    "blocks": [
     "forward",
     "right",
     "dropObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        2
       ],
       [
        1,
        2
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Sème sur les deux cases de terre. Il faut tourner à droite.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"forward\"><next><block type=\"dropObject\"><next><block type=\"right\"><next><block type=\"forward\"><next><block type=\"dropObject\"></block></next></block></next></block></next></block></next></block></next></block></xml>"
   }
  ]
 },
 {
  "id": "petit-caisse",
  "title": "Pousse la caisse",
  "color": "blanche",
  "world": "sokoban",
  "versions": [
   {
    "stars": 1,
    "max": 2,
    "blocks": [
     "pushObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Pousse la caisse sur la case marquée.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"pushObject\"></block></next></block></xml>"
   },
   {
    "stars": 2,
    "max": 3,
    "blocks": [
     "pushObject"
    ],
    "tests": [
     {
      "tiles": [
       [
        1,
        4,
        1,
        3
       ]
      ],
      "robot": {
       "row": 0,
       "col": 0,
       "dir": 0
      }
     }
    ],
    "text": "Pousse la caisse jusqu'à la case marquée. Elle est plus loin.",
    "solution": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"robot_start\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\"><next><block type=\"pushObject\"><next><block type=\"pushObject\"></block></next></block></next></block></xml>"
   }
  ]
 }
];
