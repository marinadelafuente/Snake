'use strict';

// // document.addEventListener('DOMContentLoaded', () => {
// const squares = document.querySelectorAll('.grid div');
// const scoreDisplay = document.querySelector('span');
// const startBtn = document.querySelector('.btn__start');

// const width = 10;
// let currentIndex = 0; //so first div in our grid
// let appleIndex = 0; //so first div in our grid
// let currentSnake = [2, 1, 0];
// let direction = 1;
// let score = 0;
// let speed = 0.9;
// let intervalTime = 0;
// let interval = 0;

// //to start, and restart the game
// function startGame() {
//   currentSnake.forEach((index) => squares[index].classList.remove('snake'));
//   squares[appleIndex].classList.remove('apple');
//   clearInterval(interval);
//   score = 0;
//   randomApple();
//   direction = 1;
//   scoreDisplay.innerText = score;
//   intervalTime = 1000;
//   currentSnake = [2, 1, 0];
//   currentIndex = 0;
//   currentSnake.forEach((index) => squares[index].classList.add('snake'));
//   interval = setInterval(moveOutcomes, intervalTime);
// }

// //function that deals with ALL the ove outcomes of the Snake
// function moveOutcomes() {
//   //deals with snake hitting border and snake hitting self
//   if (
//     (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
//     (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
//     (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
//     (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
//     squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
//   ) {
//     return clearInterval(interval); //this will clear the interval if any of the above happen
//   }

//   const tail = currentSnake.pop(); //removes last ite of the array and shows it
//   squares[tail].classList.remove('snake'); //removes class of snake from the TAIL
//   currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head of the array

//   //deals with snake getting apple
//   if (squares[currentSnake[0]].classList.contains('apple')) {
//     squares[currentSnake[0]].classList.remove('apple');
//     squares[tail].classList.add('snake');
//     currentSnake.push(tail);
//     randomApple();
//     score++;
//     scoreDisplay.textContent = score;
//     clearInterval(interval);
//     intervalTime = intervalTime * speed;
//     interval = setInterval(moveOutcomes, intervalTime);
//   }
//   squares[currentSnake[0]].classList.add('snake');
// }

// //generate new apple once apple is eaten
// function randomApple() {
//   do {
//     appleIndex = Math.floor(Math.random() * squares.length);
//   } while (squares[appleIndex].classList.contains('snake')); //making sure apples dont appear on the snake
//   squares[appleIndex].classList.add('apple');
// }

// //assign functions to keycodes
// function control(e) {
//   squares[currentIndex].classList.remove('snake');

//   if (e.keyCode === 39) {
//     direction = 1; //if we press the right arrow on our keyboard, the snake will go right one
//   } else if (e.keyCode === 38) {
//     direction = -width; // if we press the up arrow, the snake will go back ten divs, appearing to go up
//   } else if (e.keyCode === 37) {
//     direction = -1; // if we press left, the snake will go left one div
//   } else if (e.keyCode === 40) {
//     direction = +width; //if we press down, the snake head will instantly appear in the div ten divs from where you are now
//   }
// }

// document.addEventListener('keyup', control);
// startBtn.addEventListener('click', startGame);
// // });

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
  currentSnake.unshift(currentSnake[0] + direction);
  //   snakeHead = currentSnake[0];
  afterAppleEating(tail);
  squares[currentSnake[0]].classList.add('snake');
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
