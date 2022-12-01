// primero traemos todas nuestras variables:
const word = document.getElementById('word');
const incorrect = document.getElementById('incorrect');
const incorrectLettersEl = document.querySelector('#incorrect p');
const backdrop = document.getElementById('backdrop');
const finalMsg = document.getElementById('final-msg');
const msgInfo = document.getElementById('msg-info');
const playBtn = document.getElementById('play');
const indication = document.getElementById('indication');
const bodyParts = document.getElementsByClassName('body-part');

// hacemos la lista de las palabras por adivinar
const wordList = [
  'alura',
  'developer',
  'coding',
  'javascript'
];

// palabra seleccionada para jugar
let selectedWord = null;
// historial de las letras incorrectas
let incorrectCount = 0;
// palabras correctas
const correctLetters = [];
// palabras incorrectas
const incorrectLetters = [];

// seleccionar al azar una palabra de la lista
function initializeWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  const noOfLetters = selectedWord.length;
  for (let i = 0; i < noOfLetters; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
}

// indicación desde la parte de abajo
function displayIndication() {
  indication.classList.add('visible');
  setTimeout(() => {
    indication.classList.remove('visible');
  }, 2400);
}

// actualiza la figura cuando las letras son correctas
function updateFigure() {
  try {
    bodyParts[incorrectCount].style.display = 'block';
    incorrectCount++;
  } catch (error) {}
}

// cuando el jugador gana
function successState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = '¡Ganaste. Felicidades!';
  }, 400);
}

// cuando el jugador pierde
function failureState() {
  setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = `¡Hay no perdiste :(! palabra correcta:"${selectedWord}"`;
  }, 400);
}

// aquí hacemos el match de la palabra introducida con la letra clave
function check(ev) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ev.key;

  // extensión de palabras por teclado
  if (
    !backdrop.classList.contains('visible') &&
    !indication.classList.contains('visible') &&
    ev.keyCode >= 65 &&
    ev.keyCode <= 90
  ) {
    if (selectedWord.includes(character)) {
      if (correctLetters.includes(character)) {
        displayIndication();
      } else {
        correctLetters.push(character);
        const indexes = [];
        [...selectedWord].forEach((value, index) => {
          if (value === character) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          letterElements[value].textContent = character;
        });
      }
    } else {
      if (incorrectLetters.includes(character)) {
        displayIndication();
      } else {
        incorrectLetters.push(character);
        if (!incorrect.classList.contains('visible')) {
          incorrect.classList.add('visible');
        }
        incorrectLettersEl.textContent = `${incorrectLetters.join(', ')}`;
        updateFigure();
      }
    }
  }

  // Creamos una palabra a partir de las letras.
  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });

  // Check if created word is correct
  if (formedWord === selectedWord) {
    successState();
  }

  // Check if man was hung
  if (incorrectCount >= 6) {
    failureState();
  }
}

// Borramos todas las variables y empezamos de nuevo
function startNewGame() {
  selectedWord = null;
  incorrectCount = 0;
  correctLetters.splice(0);
  incorrectLetters.splice(0);
  word.innerHTML = '';
  Array.from(bodyParts).forEach((value) => {
    value.style.display = 'none';
  });
  incorrect.classList.remove('visible');
  backdrop.classList.remove('visible');
  finalMsg.classList.remove('visible');
  initializeWord();
}

// comienza el juego
initializeWord();

// Event Listeners
window.addEventListener('keyup', check);
playBtn.addEventListener('click', startNewGame);