import { EventEmitter } from 'events';
import dispatcher from './../dispatcher.js';

class GameBoardStore extends EventEmitter {
  constructor() {
    super();
    this.board = [];
    this.boardHeight = 30;
    this.boardWidth = 30;
    this.generation = 0;
  }

  // Returns current board
  getBoard() {
    return {
      board: this.board,
      generation: this.generation
    };
  }

  // Generates a random board
  createBoard() {
    this.pauseGame();
    this.board = [];
    this.generation = 0;

    for (let i = 0; i < this.boardHeight; i++) {
      let row = [];
      for (let j = 0; j < this.boardWidth; j++) {
        let liveCell = 'alive';
        let deadCell = 'dead';
        Math.random() * 2 >= 1.4 ? row.push(liveCell) : row.push(deadCell);
      }
      this.board.push(row);
    }
    this.newBoard = this.board.slice(0);

    this.emit('change');
  }

  // Clones a board
  cloneBoard(newBoard, board) {
    for (let i = 0; i < board.length; i++) {
      newBoard.push( board[i].slice(0))
    }
  }

  // Compares two arrays to determine if they are identical
  compareBoards(board1, board2) {
    for (let i = 0; i < board2.length; i++) {
      for (let j = 0; j < board2[i].length; j++) {
        if (board2[i][j] !== board1[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  // Advances a generation
  passGeneration() {
    let newBoard = [];

    this.cloneBoard(newBoard, this.board);

    this.generation += 1;

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        newBoard[i][j] = this.willCellLive(i, j, this.board)
      }
    }

    this.compareBoards(this.board, newBoard) === true ? this.pauseGame() : null;

    this.board = newBoard;
    this.emit('change');
  };

  // Starts game
  playGame() {
    this.gameStart = setInterval(this.passGeneration.bind(this), 200)
  }

  // Pauses game
  pauseGame() {
    clearInterval(this.gameStart)
  }

  // Checks cell neighbors to determine state next generation
  willCellLive(y, x, board) {
    let cellFate = '';
    let liveNeighbors = 0;

    const checkCell = {
      above(y, x) {
        board[y - 1][x] === 'alive' ? liveNeighbors += 1 : null;
      },

      below(y, x) {
        board[y + 1][x] === 'alive' ? liveNeighbors += 1 : null;
      },

      right(y, x) {
        board[y][x + 1] === 'alive' ? liveNeighbors += 1 : null;
      },

      left(y, x) {
        board[y][x - 1] === 'alive' ? liveNeighbors += 1 : null;
      },

      aboveRight(y, x) {
        board[y - 1][x + 1] === 'alive' ? liveNeighbors += 1 : null;
      },

      aboveLeft(y, x) {
        board[y - 1][x - 1] === 'alive' ? liveNeighbors += 1 : null;
      },

      belowRight(y, x) {
        board[y + 1][x + 1] === 'alive' ? liveNeighbors += 1 : null;
      },

      belowLeft(y, x) {
        board[y + 1][x - 1] === 'alive' ? liveNeighbors += 1 : null;
      },

    };

    // Top left corner check
    if ( y === 0 && x === 0 ) {
      checkCell.below(y, x);
      checkCell.right(y, x);
      checkCell.belowRight(y, x);
    }
    // Top right corner check
    else if ( y === 0 && x === board[y].length - 1) {
      checkCell.below(y, x);
      checkCell.left(y, x);
      checkCell.belowLeft(y, x);
    }
    // Bottom left corner check
    else if ( y === board.length - 1 && x === 0 ) {
      checkCell.above(y, x);
      checkCell.right(y, x);
      checkCell.aboveRight(y, x);
    }
    // Bottom right corner check
    else if ( y === board.length - 1 && x === board[y].length - 1) {
      checkCell.above(y, x);
      checkCell.left(y, x);
      checkCell.aboveLeft(y, x);
    }
    // Top border check
    else if( y === 0 ) {
      checkCell.below(y, x);
      checkCell.left(y, x);
      checkCell.right(y, x);
      checkCell.belowLeft(y, x);
      checkCell.belowRight(y, x);
    }
    // Bottom border check
    else if ( y === board.length - 1) {
      checkCell.above(y, x);
      checkCell.left(y, x);
      checkCell.right(y, x);
      checkCell.aboveLeft(y, x);
      checkCell.aboveRight(y, x);
    }
    // Left border check
    else if ( x === 0 ) {
      checkCell.below(y, x);
      checkCell.above(y, x);
      checkCell.right(y, x);
      checkCell.belowRight(y, x);
      checkCell.aboveRight(y, x);
    }
    // Right border check
    else if ( x === board[y].length - 1) {
      checkCell.below(y, x);
      checkCell.above(y, x);
      checkCell.left(y, x);
      checkCell.belowLeft(y, x);
      checkCell.aboveLeft(y, x);
    }
    // Inner cells check
    else {
      checkCell.aboveLeft(y, x);
      checkCell.above(y, x);
      checkCell.aboveRight(y, x);
      checkCell.right(y, x);
      checkCell.belowRight(y, x);
      checkCell.below(y, x);
      checkCell.belowLeft(y, x);
      checkCell.left(y, x);
    }

    if (board[y][x] === 'alive' && liveNeighbors > 3) {
      cellFate = 'dead';
    }
    else if (board[y][x] === 'alive' && liveNeighbors < 2) {
      cellFate = 'dead';
    }
    else if (board[y][x] === 'alive' && (2 <= liveNeighbors <= 3)) {
      cellFate = 'alive';
    }
    else if (board[y][x] === 'dead' && liveNeighbors === 3) {
      cellFate = 'alive';
    }
    else if (board[y][x] === 'dead' && liveNeighbors !== 3) {
      cellFate = 'dead';
    }

    return cellFate;
  }

  // Changes the value of a cell
  editCell(y, x) {
    this.board[y][x] === 'alive' ? this.board[y][x] = 'dead' : this.board[y][x] = 'alive';
    this.emit('change');
  }

  // Clears the board
  clearBoard() {
    this.pauseGame();
    this.generation = 0;

    this.board = this.board.map(function(row) {
      return row.map(function(cell) {
        return cell = 'dead';
      })
    })

    this.emit('change');
  }

  // Handles actions passed by components
  handleActions(action) {
    switch(action.type) {
      case "CREATE_BOARD": {
        this.createBoard();
        break;
      }
      case "PASS_GENERATION": {
        this.passGeneration();
        break;
      }
      case "PLAY_GAME": {
        this.playGame();
        break;
      }
      case "PAUSE_GAME": {
        this.pauseGame();
        break;
      }
      case "EDIT_CELL": {
        this.editCell(action.y, action.x)
        break;
      }
      case "CLEAR_BOARD": {
        this.clearBoard();
        break;
      }
    }
  }
}


const gameBoardStore = new GameBoardStore;
dispatcher.register(gameBoardStore.handleActions.bind(gameBoardStore));

export default gameBoardStore;
