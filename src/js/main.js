"use strict";

const grid = document.querySelector(".grid");
const score = document.querySelector(".score");
const startBtn = document.querySelector(".btn__start");
const resetBtn = document.querySelector(".btn__reset");
let snakeSquares = [];

const createGrid = () => {
  // create 100 elementss with a for loop
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    snakeSquares.push(square);
    console.log(snakeSquares);
    // let html = '<div class="square"></div>';
    // grid.innerHTML += html;
    // let snakeSquares = Array.from(grid.children);
    // console.log(snakeSquares);
  }
  //   console.log(grid);
};

createGrid();
