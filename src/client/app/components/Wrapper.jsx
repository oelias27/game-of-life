import React from 'react';
import Grid from './Grid.jsx';
import GameBoardStore from './../stores/GameBoardStore.js';
import * as GameBoardActionCreator from './../actions/GameBoardActionCreator.js';

export default class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      board: GameBoardStore.getBoard().board,
      generation: GameBoardStore.getBoard().generation
    }
  }

  componentWillMount() {
    GameBoardStore.on('change', () => {
      this.setState({
        board: GameBoardStore.getBoard().board,
        generation: GameBoardStore.getBoard().generation
      })
    });
    GameBoardActionCreator.createBoard();
  }

  componentDidMount() {
    GameBoardActionCreator.playGame();
  }

  handleClick(e) {
    if (e.target.id === 'play') {
      GameBoardActionCreator.playGame();
    }
    else if (e.target.id === 'advance') {
      GameBoardActionCreator.passGeneration();
    }
    else if (e.target.id === 'pause') {
      GameBoardActionCreator.pauseGame();
    }
    else if (e.target.id === 'reset') {
      GameBoardActionCreator.createBoard();
    }
    else if (e.target.id === 'clear') {
      GameBoardActionCreator.clearBoard();
    }
  }

  render() {
    return (
      <div class="container">
        <Grid board={this.state.board} />
        <div class="buttons">
          <button class="btn btn-primary contraol" id="play" onClick={this.handleClick.bind(this)}>Play</button>
          <button class="btn btn-primary contraol" id="reset" onClick={this.handleClick.bind(this)}>Reset</button>
          <button class="btn btn-primary contraol" id="advance" onClick={this.handleClick.bind(this)}>Pass One Gen</button>
          <button class="btn btn-primary contraol" id="pause" onClick={this.handleClick.bind(this)}>Pause</button>
          <button class="btn btn-primary contraol" id="clear" onClick={this.handleClick.bind(this)}>Clear</button>
        </div>
        <p class="generation">Generation:{this.state.generation}</p>
      </div>
    )
  }
}
