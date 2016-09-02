import React from 'react';
import * as GameBoardActionCreator from './../actions/GameBoardActionCreator.js';


export default class GridRow extends React.Component {
  handleClick(e) {
    let coords = e.target.id.split(',');
    GameBoardActionCreator.editCell(coords[0], coords[1]);
  }

  render() {
    let yIndex = this.props.y;
    let handleClick = this.handleClick;
    let cells = this.props.row.map(function(cell, index) {
      return (
        <div key={index} class={cell} id={yIndex + ',' + index} onClick={handleClick} ></div>
      )
    })

    return (
      <div class="cellRow">
        {cells}
      </div>
    )
  }
}
