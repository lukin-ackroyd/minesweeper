document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
    cells: []
}
let size = 6
let difficulty = .4

function createBoard () {
  for (c = 0; c < size; c++) {
    for (r = 0; r < size; r++) {
      board.cells.push({
        col: c,
        row: r,
        hidden: true,
        isMine: Math.random() < difficulty
      })
    }
  }
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  createBoard ()
  for (c = 0; c < board.cells.length; c++) {
      countSurroundingMines (board.cells[c])
  }
  document.addEventListener ("click", checkForWin)
  document.addEventListener ("contextmenu", checkForWin)
  lib.initBoard()

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

// this needs to say when all mines are marked
let isWin = true
for (c = 0; c < board.cells.length; c++) {
  if ((board.cells[c].isMine && !board.cells[c].isMarked) 
  || (!board.cells[c].isMine && board.cells[c].hidden)) isWin = false;
}
if (isWin) {lib.displayMessage('You win!')}

// this needs to say when all nonmines are not hidden
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  let mineCount = 0
  surrounding.forEach(surCells => {
    if (surCells.isMine === true) {
      mineCount++;
    }
  });
  cell.surroundingMines = mineCount
}

