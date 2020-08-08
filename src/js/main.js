"use strict";

const grid = document.querySelector(".grid");
const score = document.querySelector(".score");
const startBtn = document.querySelector(".btn__start");
const resetBtn = document.querySelector(".btn__reset");
let squares = [];
let currentSnake = [2, 1, 0];

const createGrid = () => {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
};
createGrid();

currentSnake.forEach((square) => {
  squares[square].classList.add("snake");
});

const move = () => {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + 1);
  let head = currentSnake[0];
  squares[head].classList.add("snake");
};
move();
