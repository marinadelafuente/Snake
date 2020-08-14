'use strict';

const popUpBtn = document.querySelector('.btn__pop-up');
const popUpClose = document.querySelector('.btn__pop-up__close');
const popUp = document.querySelector('.pop-up');
const grid = document.querySelector('.grid');
const startBtn = document.querySelector('.btn__start');
const resetBtn = document.querySelector('.btn__reset');
let scoreDisplay = document.querySelector('.score');

const gridWidth = 10;
let currentIndex = 0;
let appleIndex = 0;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let intervalId;
let intervalTime = 1000;
let mySound;

const openPopUp = () => {
  popUp.style.display = 'block';
};

const closePopUp = (ev) => {
  if (ev.target.classList.contains('pop-up') || ev.target === popUpClose) {
    popUp.style.display = 'none';
  }
};

// create the grid in which the snake moves
const createGrid = () => {
  for (let i = 0; i < gridWidth * gridWidth; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
};
createGrid();

// paint the snake
const paintSnake = () => {
  currentSnake.forEach((square) => {
    squares[square].classList.add('snake');
    squares[currentSnake[0]].classList.replace('snake', 'snake__head');
  });
};
paintSnake();

// add sound when the snake eats the apple
function sound(src) {
  this.sound = document.createElement('audio');
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = 'none';
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
// start the game: the snake starts moving
const startGame = () => {
  generateApples();
  intervalId = setInterval(moveSnake, intervalTime);
  startBtn.style.pointerEvents = 'none';
  startBtn.classList.replace('btn', 'unavailable');
  // startBtn.classList.add();
};

// move the snake one movement at a time
const moveSnake = () => {
  if (
    (currentSnake[0] + gridWidth >= gridWidth * gridWidth &&
      direction === gridWidth) || //if snake hits bottom
    (currentSnake[0] % gridWidth === gridWidth - 1 && direction === 1) || //if snake hits right wall
    (currentSnake[0] % gridWidth === 0 && direction === -1) || //if snake hits left wall
    (currentSnake[0] - gridWidth < 0 && direction === -gridWidth) || //if snake hits the top
    squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
  ) {
    clearInterval(intervalId);
    currentSnake.forEach((square) => {
      squares[square].classList.add('game-over');
    });
    //this will clear the interval if any of the above happen
    return setTimeout(reset, 2000);
  }
  let tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  squares[tail].classList.remove('snake__head');
  currentSnake.unshift(currentSnake[0] + direction);

  let head = currentSnake[0];
  afterAppleEating(tail);
  // squares[head].classList.add('snake');
  currentSnake.forEach((item) => {
    squares[item].classList.add('snake');
    squares[item].classList.remove(
      'snake__head',
      'snake__head-down',
      'snake__head-left'
    );
  });
  if (direction === gridWidth) {
    squares[head].classList.replace('snake', 'snake__head-down');
  } else if (direction === -1) {
    squares[head].classList.replace('snake', 'snake__head-left');
  } else {
    squares[head].classList.replace('snake', 'snake__head');
  }
};

const afterAppleEating = (tail) => {
  if (squares[currentSnake[0]].classList.contains('apple')) {
    mySound = new sound('./assets/sounds/tink.wav');
    mySound.play();
    //remove the class of apple
    squares[appleIndex].classList.remove('apple');
    //grow the snake by adding class of snake to it
    squares[tail].classList.add('snake');
    //grow our snake array
    currentSnake.push(tail);
    //generate a new apple
    generateApples();
    //add one to the score
    score++;
    scoreDisplay.textContent = score;
    // speed up snake
    clearInterval(intervalId);
    intervalTime = intervalTime * 0.9;
    intervalId = setInterval(moveSnake, intervalTime);
  }
};

const generateApples = () => {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
};

// control the movements of the snake with the keyboard: up, down, left, right
const controlMove = (ev) => {
  squares[currentIndex].classList.remove('snake');
  if (ev.keyCode === 38) {
    direction = -gridWidth; //up
  } else if (ev.keyCode === 40) {
    direction = gridWidth; //down
  } else if (ev.keyCode === 37) {
    direction = -1; // left
  } else if (ev.keyCode === 39) {
    direction = 1; // right
  }
};

const reset = () => {
  currentSnake.forEach((square) => {
    squares[square].classList.remove(
      'snake',
      'snake__head',
      'snake__head-down',
      'snake__head-left',
      'game-over'
    );
  });
  squares[appleIndex].classList.remove('apple');
  startBtn.style.pointerEvents = 'auto';
  startBtn.classList.replace('unavailable', 'btn');

  currentSnake = [2, 1, 0];
  currentIndex = 0;
  paintSnake();
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
};
// // reset the game: the snake stops moving and gets back to initial state
const resetAndStop = () => {
  clearInterval(intervalId);
  reset();
  clearInterval(intervalId);
};

popUpBtn.addEventListener('click', openPopUp);
popUpClose.addEventListener('click', closePopUp);
document.addEventListener('keyup', controlMove);
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetAndStop);
