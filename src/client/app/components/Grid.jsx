import React from 'react';
import GridRow from './GridRow.jsx';

export default class Grid extends React.Component {
  render() {
    const gridRows = this.props.board.map(function(row, index) {
      return (
        <GridRow key={index} y={index} row={row} />
      )
    })

    return (
      <div class="grid">
        {gridRows}
      </div>
    )
  }
}
