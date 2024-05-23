let levels = [
  { word1: "õun", word2: "puu", wrong: ["saabas", "koer", "auto", "disko", "püksid", "kala"], compound: "õunapuu" },
  { word1: "auto", word2: "varuosa", wrong: ["saabas", "koer", "lamp", "teemant", "kala", "valgus"], compound: "autovaruosa" },
  { word1: "raamat", word2: "kogu", wrong: ["tool", "tiik", "klaviatuur", "ekraan", "koer", "tass"], compound: "raamatukogu" },
  { word1: "järv", word2: "äär", wrong: ["kell", "mobiil", "karv", "kinni", "varvas", "kamm"], compound: "järveäärne" },
  { word1: "kool", word2: "maja", wrong: ["buffee", "tomat", "liblikas", "tass", "pudel", "taldrik"], compound: "koolimaja" },
  { word1: "käsi", word2: "kott", wrong: ["müts", "sokk", "saabas", "püksid", "lammas", "eesel"], compound: "käekott" },
  { word1: "sõit", word2: "rada", wrong: ["maja", "järv", "maailm", "siga", "planeet", "banaan"], compound: "sõidurada" },
  { word1: "lille", word2: "pott", wrong: ["kitarr", "klaver", "kauss", "gorilla", "kool", "flööt"], compound: "lillepott" },
  { word1: "tee", word2: "äär", wrong: ["sinine", "harva", "varvas", "kull", "tõuks", "morss"], compound: "teeäär" },
  { word1: "laps", word2: "aed", wrong: ["pood", "pliiats", "karv", "muna", "joonlaua", "teritaja"], compound: "lasteaed" },
];

let currentLevel = 0;

function loadLevel(level) {
  document.getElementById('level-text').textContent = `Tase ${level + 1}`;
  let words = [levels[level].word1, levels[level].word2, ...levels[level].wrong];
  shuffle(words);

  document.getElementById('word1').textContent = words[0];
  document.getElementById('word2').textContent = words[1];
  document.getElementById('word3').textContent = words[2];
  document.getElementById('word4').textContent = words[3];
  document.getElementById('word5').textContent = words[4];
  document.getElementById('word6').textContent = words[5];
  document.getElementById('word7').textContent = words[6];
  document.getElementById('word8').textContent = words[7];

  document.getElementById('dropzone1').textContent = '';
  document.getElementById('dropzone2').textContent = '';
  document.getElementById('result-message').textContent = '';
  document.getElementById('game-container').style.backgroundColor = '#f6f0ec';

  enableDragAndDrop();
}

function enableDragAndDrop() {
  const words = document.querySelectorAll('.word');
  const dropzones = document.querySelectorAll('.dropzone');

  words.forEach(word => {
      word.ondragstart = function (event) {
          event.dataTransfer.setData("text", event.target.id);
      };
  });

  dropzones.forEach(zone => {
      zone.ondragover = function (event) {
          event.preventDefault();
      };

      zone.ondrop = function (event) {
          event.preventDefault();
          let data = event.dataTransfer.getData("text");
          event.target.textContent = document.getElementById(data).textContent;
          checkCompoundWord();
      };
  });
}

function checkCompoundWord() {
  const dropzone1 = document.getElementById('dropzone1').textContent;
  const dropzone2 = document.getElementById('dropzone2').textContent;
  const combinedWord = dropzone1 + dropzone2;

  if (dropzone1 === levels[currentLevel].word1 && dropzone2 === levels[currentLevel].word2) {
      showResult(true);
      document.getElementById('next-level').disabled = false;
  } else if (dropzone1 && dropzone2) {
      showResult(false);
      document.getElementById('dropzone1').textContent = '';
      document.getElementById('dropzone2').textContent = '';
  }
}

function showResult(isCorrect) {
  const resultMessage = document.getElementById('result-message');
  const gameContainer = document.getElementById('game-container');
  if (isCorrect) {
      resultMessage.textContent = "Correct!";
      resultMessage.style.color = "green";
      gameContainer.style.backgroundColor = "#a0ffa0";

      showOverlay(levels[currentLevel].compound);
  } else {
      resultMessage.textContent = "Vale! Proovi uuesti.";
      resultMessage.style.color = "red";
      gameContainer.style.backgroundColor = "#ffa0a0";

      setTimeout(() => {
          gameContainer.classList.add('wrong-answer');

          gameContainer.addEventListener('animationend', () => {
              gameContainer.classList.remove('wrong-answer');
              gameContainer.style.backgroundColor = '#f6f0ec'; // Ensure it returns to original color
          }, { once: true });
      }, 500); // slight delay to ensure the red background is shown
  }
}

function showOverlay(compoundWord) {
  const overlay = document.getElementById('overlay');
  const compoundWordBox = document.getElementById('compound-word');
  compoundWordBox.textContent = compoundWord;
  overlay.style.display = 'flex';

  setTimeout(() => {
      overlay.style.display = 'none';
  }, 1500);
}

function nextLevel() {
  if (currentLevel < levels.length - 1) {
      currentLevel++;
      loadLevel(currentLevel);
      document.getElementById('next-level').disabled = true;
  } else {
      showCongratulations();
  }
}

function showCongratulations() {
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('congrats-container').style.display = 'block';
}

function restartGame() {
  currentLevel = 0;
  document.getElementById('congrats-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  loadLevel(currentLevel);
  document.getElementById('next-level').disabled = true;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function showSection(sectionId) {
  document.getElementById('home-container').style.display = 'none';
  document.getElementById(sectionId).style.display = 'block';
}

function goHome() {
  document.getElementById('home-container').style.display = 'block';
  document.getElementById('game-container').style.display = 'none';
  document.getElementById('rules-container').style.display = 'none';
  document.getElementById('about-container').style.display = 'none';
}

// Initial load
loadLevel(currentLevel);
document.getElementById('next-level').disabled = true;
