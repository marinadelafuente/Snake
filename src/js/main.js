'use strict';

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
// let head = squares[currentSnake[0]];

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
  console.log('paint');
  currentSnake.forEach((square) => {
    squares[square].classList.add('snake');
    squares[currentSnake[0]].classList.add('snake__head');
  });
};
paintSnake();

// start the game: the snake starts moving
const startGame = () => {
  generateApples();
  intervalId = setInterval(moveSnake, intervalTime);
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
    console.log('reset');
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
  squares[head].classList.add('snake');
  currentSnake.forEach((item) => {
    squares[item].classList.add('snake');
    squares[item].classList.remove('snake__head');
  });
  squares[head].classList.add('snake__head');
};

const afterAppleEating = (tail) => {
  if (squares[currentSnake[0]].classList.contains('apple')) {
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
    squares[square].classList.remove('snake');
    squares[square].classList.remove('snake__head');
    squares[square].classList.remove('game-over');
  });
  squares[appleIndex].classList.remove('apple');

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

  // squares.forEach((square) => {
  //   let index = squares.indexOf(square);
  //   if (currentSnake.includes(index)) {
  //     currentSnake.forEach((square) => {
  //       squares[square].classList.add('snake');
  //     });
  //   } else {
  //     square.classList.remove('snake');
  //   }
  // });
};

document.addEventListener('keyup', controlMove);
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetAndStop);
