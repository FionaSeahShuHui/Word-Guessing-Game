const inputs = document.querySelector(".inputs");
const restartButton = document.querySelector(".restartButton");
const hint = document.querySelector(".hint span");
const guesses = document.querySelector(".guesses span");
const wrongLetters = document.querySelector(".wrong span");
const typingInput = document.querySelector(".typingInput");

let word,
  maxGuesses,
  incorrect = [],
  correct = [];

function randomWord() {
  let randWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = randWord.word;
  maxGuesses = 8;

  (correct = []), (incorrect = []);
  hint.innerText = randWord.hint;
  guesses.innerText = maxGuesses;
  wrongLetters.innerText = incorrect;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  // wrongLetters.innerText = incorrect;
  inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrect.includes(` ${key}`) &&
    !correct.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correct.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      incorrect.push(` ${key}`);
    }
  }
  guesses.innerText = maxGuesses;
  wrongLetters.innerText = incorrect;
  typingInput.value = "";

  setTimeout(() => {
    if (correct.length === word.length) {
      alert("Congratulations! You win! :)");
      randomWord();
    } else if (maxGuesses < 1) {
      alert(
        "Game over! Please restart the game if you would like to play again"
      );
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

restartButton.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());
