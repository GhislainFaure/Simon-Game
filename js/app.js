/**
 *
 * Code fourni
 */
const app = {
  // just a utility var to remember all the colors
  colors: ["red", "green", "blue", "yellow"],

  // this var will contain the sequence said by Simon
  sequence: [],

  // ou est le joueur dans la séquence
  indice: 0,
  // Est ce au tour du joueur -- Est ce que l'on peut cliquer sur les cases
  isPlayerTurn: false,

  drawCells: function () {
    const playground = document.getElementById("playground");
    for (const color of app.colors) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = color;
      cell.style.backgroundColor = color;
      playground.appendChild(cell);

      cell.addEventListener("click", function () {
        if (!isPlayerTurn) {
          return;
        }
       
        app.bumpCell(color);

        // on regarde si la couleur cliquée correspond à la couleur de la séquence à l'index courant
        if (color === app.sequence[app.indice]) {
          // c'est la bonne couleur
          // si la séquence n'est pas finie
          if (app.indice < app.sequence.length - 1) {
            // on augment l'indice
            app.indice = app.indice + 1;
            //on relance le timer de 5 secondes
            app.timer = setTimeout(app.endGame, 5000);
          } else {
            // si on est là on a fini la séquence
            // on appelle nextMove
            console.log("sequence finie");
            app.nextMove();
          }
        } else {
          // ce n'est pas la bonne couleur
          app.endGame();
        }
      });
    }
  },
  nextMove: function () {
    // chiffre random entre 0 et 3
    const random = Math.floor(Math.random() * 4);

    // en fonction du chiffre, obtenir sa couleur
    const color = app.colors[random];

    // ajouter la couleur aléatoire dans la sequence
    app.sequence.push(color);

    // on va aussi remettre l'indice a 0,
    // sinon on ne pourra pas rejouer depuis le début de la séquence
    app.indice = 0;

    // refaire parler simon
    // ah tiens, la fonction attend un parametre.
    // visiblement, il faut donner la séquence
    app.simonSays(app.sequence);
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = "45px";
    // and reset the same style, after a small pause (150 ms)
    setTimeout(() => {
      document.getElementById(color).style.borderWidth = "0";
    }, 150);
  },

  newGame: function () {
    // start by reseting the sequence
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random() * 4);
      // add the corresponding color to the sequence
      app.sequence.push(app.colors[random]);
    }

    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
  },

  simonSays: function (sequence) {
    if (sequence && sequence.length) {
      // si on est là c'est Simon qui joue
      // on empeche le joueur de jouer
      app.isPlayerTurn = false;
      app.showMessage("Mémorisez la séquence");
      // after 500ms, bump the first cell
      setTimeout(app.bumpCell, 500, sequence[0]);
      // plays the rest of the sequence after a longer pause
      setTimeout(app.simonSays, 850, sequence.slice(1));
    } else {
      // ça y est c'est au joueur de jouer
      // on lui affiche un message
      app.showMessage("Rejouez la séquence");
      // on l'autorise à jouer
      app.isPlayerTurn = true;

      // quand Simon a fini de parler
      // on lance un setTimeout qui va lancer la méthode de fin de partie
      // au bout de 5 secondes
      // je stocke son timer dans app

      app.timer = setTimeout(app.endGame, 5000);
    }
  },

  init: function () {
    console.log("init");
    app.drawCells();

    // listen click on the "go" button
    document.getElementById("go").addEventListener("click", app.newGame);
  },

  /** Fin du code fourni. Après, c'est à toi de jouer! */

  showMessage: function (message) {
    document.getElementById("message").classList.remove("hidden");
    document.getElementById("message").innerHTML = message;
    // pour masquer le boutton démarrer utiliser la classe css .hidden qui contient display none
    document.getElementById("go").classList.add("hidden");
  },
  hideMessage: function () {
    document.getElementById("message").classList.add("hidden");
    document.getElementById("go").classList.remove("hidden");
  },
  endGame: function () {
    alert(`Partie terminée. Votre score : ${app.sequence.length}`);
    app.hideMessage();
    app.sequence = [];
  },
};

document.addEventListener("DOMContentLoaded", app.init);
