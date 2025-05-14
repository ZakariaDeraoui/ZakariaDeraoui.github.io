document.addEventListener("DOMContentLoaded", function () {
  // Create stars
  const starField = document.getElementById("starField");
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = Math.random() * 3 + 1 + "px";
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDuration = Math.random() * 3 + 2 + "s";
    star.style.animationDelay = Math.random() * 5 + "s";
    starField.appendChild(star);
  }

  // Create moon craters
  const moon = document.getElementById("moon");
  for (let i = 0; i < 12; i++) {
    const crater = document.createElement("div");
    crater.className = "crater";
    crater.style.width = Math.random() * 25 + 10 + "px";
    crater.style.height = crater.style.width;
    crater.style.left = Math.random() * 160 + 20 + "px";
    crater.style.top = Math.random() * 160 + 20 + "px";
    moon.appendChild(crater);
  }

  // Progress bar animation
  const progressBar = document.getElementById("progressBar");
  let width = 0;
  const progressInterval = setInterval(() => {
    if (width >= 100) {
      clearInterval(progressInterval);
    } else {
      width += 1;
      progressBar.style.width = width + "%";
    }
  }, 30);

  // Scene navigation
  const scene1 = document.getElementById("scene1");
  const scene2 = document.getElementById("scene2");
  const scene3 = document.getElementById("scene3");
  const scene4 = document.getElementById("scene4");
  const scene5 = document.getElementById("scene5");

  document.getElementById("startBtn").addEventListener("click", function () {
    scene1.classList.remove("visible");
    scene1.classList.add("hidden");
    setTimeout(() => {
      scene2.classList.remove("hidden");
      scene2.classList.add("visible");
    }, 500);

    // Add floating hearts
    createFloatingHearts();
  });

  document.getElementById("moonBtn").addEventListener("click", function () {
    scene2.classList.remove("visible");
    scene2.classList.add("hidden");
    setTimeout(() => {
      scene3.classList.remove("hidden");
      scene3.classList.add("visible");
      initPuzzleGame();
    }, 500);
  });

  // Create floating hearts
  function createFloatingHearts() {
    const container = document.querySelector(".container");
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + 20 + "%";
      heart.style.opacity = Math.random() * 0.5 + 0.3;
      heart.style.transform = `rotate(45deg) scale(${
        Math.random() * 0.6 + 0.4
      })`;
      heart.style.animationDuration = Math.random() * 6 + 4 + "s";
      heart.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(heart);
    }
  }

  // Definizione dei livelli multipli per il puzzle
  const puzzleLevels = [
    {
      instructions: "Inserisci la combinazione segreta: 2-8-1-2-0-4",
      sequence: [2, 8, 1, 2, 0, 4],
    },
    {
      instructions:
        "Nuovo livello! Inserisci la data del nostro primo incontro (giorno e mese)",
      sequence: [1, 2, 0, 9], // 12/09 - da modificare con la data reale
    },
    {
      instructions:
        "Ultimo livello! Quale numero fortunato è speciale per noi?",
      sequence: [7], // Da modificare con un numero significativo tra voi
    },
  ];

  // Variabili globali per il gioco
  let currentPuzzleLevel = 0;

  // Inizializza il gioco puzzle con più livelli
  function initPuzzleGame() {
    currentPuzzleLevel = 0;
    createPuzzle(puzzleLevels[currentPuzzleLevel]);
    document.getElementById("puzzleLevel").textContent = currentPuzzleLevel + 1;
    document.getElementById("puzzleInstructions").textContent =
      puzzleLevels[currentPuzzleLevel].instructions;
  }

  // Puzzle game migliorato con livelli multipli
  function createPuzzle(levelData) {
    const puzzleContainer = document.getElementById("puzzleContainer");
    const puzzleHint = document.getElementById("puzzleHint");

    // Pulisci il puzzle container
    puzzleContainer.innerHTML = "";

    const correctSequence = levelData.sequence;
    let userSequence = [];

    // Calcola le posizioni
    const positions = [];
    const gridSize = 3; // 3x3 grid
    const pieceSize = 90;
    const spacing = 10;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        positions.push({
          top: row * (pieceSize + spacing),
          left: col * (pieceSize + spacing),
        });
      }
    }

    // Crea tutti i numeri necessari (0-9)
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Mescola i numeri per maggiore casualità
    numbers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numbers.length; i++) {
      const piece = document.createElement("div");
      piece.className = "puzzle-piece";
      piece.textContent = numbers[i];

      // Usa le posizioni calcolate
      if (i < positions.length) {
        piece.style.top = positions[i].top + "px";
        piece.style.left = positions[i].left + "px";
      } else {
        // Per il decimo numero (in una griglia 3x3 ci stanno solo 9 numeri)
        piece.style.top = positions[0].top + 300 + "px";
        piece.style.left = positions[4].left + "px";
      }

      // Salva il numero come attributo data
      piece.dataset.number = numbers[i];

      piece.addEventListener("click", function () {
        const clickedNumber = parseInt(this.dataset.number);
        userSequence.push(clickedNumber);
        this.classList.add("correct");

        puzzleHint.textContent = `Sequenza: ${userSequence.join(" → ")}`;

        // Controlla se la sequenza è completa
        if (userSequence.length === correctSequence.length) {
          setTimeout(() => {
            if (arraysEqual(userSequence, correctSequence)) {
              puzzleHint.textContent =
                "Ottimo lavoro! Hai completato il livello!";

              // Avanza al livello successivo o passa alla prossima scena
              setTimeout(() => {
                currentPuzzleLevel++;
                if (currentPuzzleLevel < puzzleLevels.length) {
                  // Vai al prossimo livello di puzzle
                  document.getElementById("puzzleLevel").textContent =
                    currentPuzzleLevel + 1;
                  document.getElementById("puzzleInstructions").textContent =
                    puzzleLevels[currentPuzzleLevel].instructions;
                  createPuzzle(puzzleLevels[currentPuzzleLevel]);
                } else {
                  // Tutti i livelli completati, vai alla scena successiva
                  scene3.classList.remove("visible");
                  scene3.classList.add("hidden");
                  setTimeout(() => {
                    scene4.classList.remove("hidden");
                    scene4.classList.add("visible");
                    initMarmotGame();
                  }, 500);
                }
              }, 1500);
            } else {
              puzzleHint.textContent = "Sequenza errata! Riprova.";
              userSequence = [];
              document.querySelectorAll(".puzzle-piece").forEach((p) => {
                p.classList.remove("correct");
              });
            }
          }, 500);
        }
      });

      puzzleContainer.appendChild(piece);
    }
  }

  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Definizione dei livelli del gioco delle marmotte
  const marmotLevels = [
    { marmots: 5, total: 6, speed: 1 }, // Livello 1: 5 marmotte, velocità normale
    { marmots: 5, total: 6, speed: 1.5 }, // Livello 2: 6 marmotte, velocità maggiore
    { marmots: 6, total: 6, speed: 2 }, // Livello 3: 7 marmotte, velocità alta
  ];

  let currentMarmotLevel = 0;

  // Inizializza il gioco delle marmotte con livelli multipli
  function initMarmotGame() {
    currentMarmotLevel = 0;
    setupMarmotGame(marmotLevels[currentMarmotLevel]);
    document.getElementById("marmotLevel").textContent = currentMarmotLevel + 1;
  }

  // Gioco delle marmotte migliorato
  function setupMarmotGame(levelData) {
    const marmotField = document.getElementById("marmotField");
    const marmotScore = document.getElementById("marmotScore");
    const marmotTotal = document.getElementById("marmotTotal");
    const marmotHint = document.getElementById("marmotHint");
    let foundMarmots = 0;
    const totalMarmots = levelData.marmots;
    const totalHoles = levelData.total;
    const speedFactor = levelData.speed;

    // Aggiorna il contatore totale
    marmotScore.textContent = "0";
    marmotTotal.textContent = totalMarmots;

    // Crea elemento per i messaggi
    let messageEl = document.querySelector(".marmot-message");
    if (!messageEl) {
      messageEl = document.createElement("div");
      messageEl.className = "marmot-message";
      messageEl.textContent = "Congratulazioni!";
      document.getElementById("marmotGameContainer").appendChild(messageEl);
    }

    // Pulisci il gioco precedente
    marmotField.innerHTML = "";

    // Assegna le marmotte a buche casuali
    const marmotHoles = Array(totalHoles)
      .fill(0)
      .map((_, i) => (i < totalMarmots ? 1 : 0));

    // Mescola l'array
    for (let i = marmotHoles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [marmotHoles[i], marmotHoles[j]] = [marmotHoles[j], marmotHoles[i]];
    }

    // Crea le buche con le marmotte
    for (let i = 0; i < totalHoles; i++) {
      const hole = document.createElement("div");
      hole.className = "marmot-hole";

      const marmot = document.createElement("div");
      marmot.className = "marmot";
      const hasMarmot = marmotHoles[i] === 1;

      if (hasMarmot) {
        // Aggiungi la faccia della marmotta
        const eyes = document.createElement("div");
        eyes.className = "eyes";

        const leftEye = document.createElement("div");
        leftEye.className = "eye";

        const rightEye = document.createElement("div");
        rightEye.className = "eye";

        const nose = document.createElement("div");
        nose.className = "nose";

        eyes.appendChild(leftEye);
        eyes.appendChild(rightEye);
        marmot.appendChild(eyes);
        marmot.appendChild(nose);

        // Comportamento casuale di apparizione, aumentando velocità per livelli superiori
        const randomPeek = () => {
          if (!marmot.classList.contains("found")) {
            const shouldPeek = Math.random() > 0.7;
            if (shouldPeek) {
              marmot.classList.add("visible");
              setTimeout(() => {
                marmot.classList.remove("visible");
              }, (Math.random() * 1000) / speedFactor + 300);
            }

            // Pianifica la prossima apparizione
            setTimeout(randomPeek, (Math.random() * 3000) / speedFactor + 500);
          }
        };

        // Inizia il comportamento casuale dopo un breve ritardo
        setTimeout(randomPeek, Math.random() * 2000 + 500);
      }

      // Evento click sulla buca
      hole.addEventListener("click", function () {
        if (hasMarmot && !marmot.classList.contains("found")) {
          // Mostra la marmotta se non è già visibile
          marmot.classList.add("visible");
          marmot.classList.add("found");

          // Aggiorna il punteggio
          foundMarmots++;
          marmotScore.textContent = foundMarmots;

          // Controlla se tutte le marmotte sono state trovate
          if (foundMarmots === totalMarmots) {
            // Mostra messaggio di successo
            messageEl.textContent = "Hai trovato tutte le marmotte! ❤️";
            messageEl.classList.add("show");

            // Avanza al livello successivo o alla scena finale
            setTimeout(() => {
              messageEl.classList.remove("show");
              currentMarmotLevel++;

              if (currentMarmotLevel < marmotLevels.length) {
                // Passa al livello successivo
                document.getElementById("marmotLevel").textContent =
                  currentMarmotLevel + 1;
                setupMarmotGame(marmotLevels[currentMarmotLevel]);
              } else {
                // Tutti i livelli completati, vai alla scena finale
                scene4.classList.remove("visible");
                scene4.classList.add("hidden");
                setTimeout(() => {
                  scene5.classList.remove("hidden");
                  scene5.classList.add("visible");
                  createImprovedConfetti();
                }, 500);
              }
            }, 2000);
          }
        } else if (!hasMarmot) {
          // Animazione per buca vuota
          const emptyMessage = document.createElement("div");
          emptyMessage.textContent = "Vuoto!";
          emptyMessage.style.position = "absolute";
          emptyMessage.style.color = "white";
          emptyMessage.style.fontSize = "1rem";
          emptyMessage.style.top = "50%";
          emptyMessage.style.left = "50%";
          emptyMessage.style.transform = "translate(-50%, -50%)";
          emptyMessage.style.pointerEvents = "none";

          hole.appendChild(emptyMessage);

          // Rimuovi il messaggio dopo l'animazione
          setTimeout(() => {
            hole.removeChild(emptyMessage);
          }, 1000);
        }
      });

      hole.appendChild(marmot);
      marmotField.appendChild(hole);
    }

    // Easter Egg: Cliccando sul testo di aiuto, una marmotta farà capolino
    marmotHint.addEventListener("click", function () {
      const marmots = document.querySelectorAll(".marmot:not(.found)");
      if (marmots.length > 0) {
        const randomIndex = Math.floor(Math.random() * marmots.length);
        marmots[randomIndex].classList.add("visible");

        setTimeout(() => {
          marmots[randomIndex].classList.remove("visible");
        }, 1000);
      }
    });
  }

  // Coriandoli migliorati per la scena finale
  function createImprovedConfetti() {
    const confettiContainer = document.getElementById("confettiRain");
    const colors = [
      "#ff3366",
      "#6bff8d",
      "#ff6b6b",
      "#ffc3a0",
      "#ff77ff",
      "#77ffff",
      "#ffdd1c",
      "#ff9e80",
    ];
    const confettiCount = 200;

    confettiContainer.innerHTML = "";

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";

      // Colore casuale
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Forma casuale (rettangolo, cerchio, stella, cuore)
      const shapes = ["rect", "circle", "star", "heart"];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      // Imposta dimensioni e stile in base alla forma
      const size = Math.random() * 15 + 5;

      switch (shape) {
        case "rect":
          confetti.style.width = size + "px";
          confetti.style.height = size * 1.5 + "px";
          confetti.style.backgroundColor = color;
          break;
        case "circle":
          confetti.style.width = size + "px";
          confetti.style.height = size + "px";
          confetti.style.backgroundColor = color;
          confetti.style.borderRadius = "50%";
          break;
        case "star":
          confetti.style.width = size * 1.2 + "px";
          confetti.style.height = size * 1.2 + "px";
          confetti.style.backgroundColor = "transparent";
          confetti.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(
            color
          )}'%3E%3Cpath d='M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z'/%3E%3C/svg%3E")`;
          confetti.style.backgroundSize = "contain";
          break;
        case "heart":
          confetti.style.width = size * 1.2 + "px";
          confetti.style.height = size * 1.2 + "px";
          confetti.style.backgroundColor = "transparent";
          confetti.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(
            color
          )}'%3E%3Cpath d='M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z'/%3E%3C/svg%3E")`;
          confetti.style.backgroundSize = "contain";
          break;
      }

      // Posizione di partenza
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = -Math.random() * 100 - 20 + "px";

      // Opacità casuale
      confetti.style.opacity = Math.random() * 0.8 + 0.2;

      // Parametri di animazione
      const duration = Math.random() * 5 + 3;
      const delay = Math.random() * 5;
      const finalX = (Math.random() - 0.5) * 200;
      const finalY = window.innerHeight + 100;
      const rotateX = Math.random() * 360;
      const rotateY = Math.random() * 360;
      const rotateZ = Math.random() * 360;

      confetti.style.setProperty("--finalX", finalX + "px");
      confetti.style.setProperty("--finalY", finalY + "px");
      confetti.style.setProperty("--rotateX", rotateX + "deg");
      confetti.style.setProperty("--rotateY", rotateY + "deg");
      confetti.style.setProperty("--rotateZ", rotateZ + "deg");

      confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`;

      confettiContainer.appendChild(confetti);
    }
  }

  // Animazione speciale per quando viene cliccato "Si"
  function createLoveExplosion() {
    const loveContainer = document.getElementById("loveExplosion");
    loveContainer.innerHTML = "";

    // Immagini per l'animazione di amore
    const loveImages = [
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff3366"><path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"/></svg>',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff6b6b"><path d="M11.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm3.5 8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm3.5 6.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg>',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffc3a0"><path d="M12 2c-5.33 4-8 6.67-8 10 0 3.33 2.67 6 6 6s6-2.67 6-6c0-3.33-2.67-6-6-6 3.33 0 6 2.67 6 6 0 3.33-2.67 6-6 6-3.33 0-6-2.67-6-6 0-3.33 2.67-6 6-6"/></svg>',
    ];

    // Crea 30 particelle animate
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "love-particle";

      // Scegli un'immagine casuale
      const imgIndex = Math.floor(Math.random() * loveImages.length);
      particle.style.backgroundImage = `url('${loveImages[imgIndex]}')`;

      // Posizione iniziale (centro dello schermo)
      particle.style.left = "50%";
      particle.style.top = "50%";

      // Posizione finale (casuale attorno al centro)
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 300 + 50;
      const endX = Math.cos(angle) * distance + "%";
      const endY = Math.sin(angle) * distance + "%";

      particle.style.setProperty("--endX", endX);
      particle.style.setProperty("--endY", endY);

      // Animazione
      particle.style.animation = `love-explode ${
        Math.random() * 2 + 1
      }s ease-out forwards`;

      loveContainer.appendChild(particle);
    }

    // Aggiungi un battito del cuore al testo della risposta
    const yesResponse = document.getElementById("yesResponse");
    yesResponse.innerHTML =
      'Non vedo l\'ora di passare questa giornata speciale con te! <span class="luna-heart">❤️</span>';

    // Fai vibrare lo schermo leggermente
    document.body.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 500);

    // Aggiunge una pioggia di cuori che scende dall'alto
    setTimeout(() => {
      createHeartRain();
    }, 1000);
  }

  // Pioggia di cuori dopo l'esplosione d'amore
  function createHeartRain() {
    const confettiContainer = document.getElementById("confettiRain");
    const colors = ["#ff3366", "#ff6b6b", "#ffc3a0", "#ff77ff"];
    const heartCount = 50;

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.className = "confetti-piece";

      // Colore casuale per il cuore
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Crea l'elemento cuore con SVG
      heart.style.width = Math.random() * 15 + 10 + "px";
      heart.style.height = heart.style.width;
      heart.style.backgroundColor = "transparent";
      heart.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodeURIComponent(
        color
      )}'%3E%3Cpath d='M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z'/%3E%3C/svg%3E")`;
      heart.style.backgroundSize = "contain";

      // Posizione di partenza
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = -Math.random() * 100 - 20 + "px";

      // Opacità casuale
      heart.style.opacity = Math.random() * 0.8 + 0.2;

      // Parametri di animazione
      const duration = Math.random() * 8 + 5;
      const delay = Math.random() * 3;
      const finalX = (Math.random() - 0.5) * 200;
      const finalY = window.innerHeight + 100;
      const rotateZ = Math.random() * 360;

      heart.style.setProperty("--finalX", finalX + "px");
      heart.style.setProperty("--finalY", finalY + "px");
      heart.style.setProperty("--rotateX", "0deg");
      heart.style.setProperty("--rotateY", "0deg");
      heart.style.setProperty("--rotateZ", rotateZ + "deg");

      heart.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`;

      confettiContainer.appendChild(heart);
    }
  }

  document.getElementById("yesBtn").addEventListener("click", function () {
    document.getElementById("yesResponse").classList.add("response-visible");
    createLoveExplosion();
  });

  let noClicks = 0;
  document.getElementById("noBtn").addEventListener("click", function () {
    noClicks++;
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    // Rendi il pulsante "No" più piccolo e il pulsante "Sì" più grande ogni volta
    noBtn.style.transform = `scale(${Math.max(0.6, 1 - noClicks * 0.1)})`;
    yesBtn.style.transform = `scale(${Math.min(2, 1.1 + noClicks * 0.2)})`;

    // Sposta il pulsante "No" in una posizione casuale
    noBtn.style.position = "absolute";
    noBtn.style.left = Math.random() * 60 + 20 + "%";
    noBtn.style.top = Math.random() * 60 + 20 + "%";

    document.getElementById("noResponse").classList.add("response-visible");

    if (noClicks >= 3) {
      noBtn.style.opacity = "0.2";
      noBtn.disabled = true;
    }
  });
});
