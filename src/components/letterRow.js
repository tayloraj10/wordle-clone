import React from 'react';
import '../styles/master.css';

class LetterRow extends React.Component {
  isSquareEnabled(index) {
    return this.props.currentIndex === index ? '' : 'disabled';
  }

  isRowEnabled(index) {
    return this.props.currentRow === index ? '' : 'disabled';
  }

  renderSquare(i) {
    return (
      <input
        type='text'
        name='name'
        className='square'
        disabled={this.isSquareEnabled(i)}
        maxLength={1}
      />
    );
  }

  render() {
    return (
      <div>
        <fieldset disabled={this.isRowEnabled(this.props.rowIndex)}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </fieldset>
      </div>
    );
  }
}

export default LetterRow;
