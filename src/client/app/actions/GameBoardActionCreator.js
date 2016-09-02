import dispatcher from './../dispatcher.js';

export function createBoard() {
  dispatcher.dispatch({
    type: "CREATE_BOARD",
  });
}

export function passGeneration() {
  dispatcher.dispatch({
    type: "PASS_GENERATION"
  });
}

export function playGame() {
  dispatcher.dispatch({
    type: "PLAY_GAME"
  });
}

export function pauseGame() {
  dispatcher.dispatch({
    type: "PAUSE_GAME"
  });
}

export function editCell(y, x) {
  dispatcher.dispatch({
    type: "EDIT_CELL",
    y: y,
    x: x
  });
}

export function clearBoard() {
  dispatcher.dispatch({
    type: "CLEAR_BOARD"
  });
}
