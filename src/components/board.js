import React from 'react';
import LetterRow from './letterRow';
import '../styles/master.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      currentRow: 0,
      currentIndex: 0,
    };
  }

  render() {
    return (
      <div className='board'>
        <LetterRow
          currentIndex={this.state.currentIndex}
          currentRow={this.state.currentRow}
          rowIndex={0}
        />
        <LetterRow
          currentIndex={this.state.currentIndex}
          currentRow={this.state.currentRow}
          rowIndex={1}
        />
        <LetterRow
          currentIndex={this.state.currentIndex}
          currentRow={this.state.currentRow}
          rowIndex={2}
        />
        <LetterRow
          currentIndex={this.state.currentIndex}
          currentRow={this.state.currentRow}
          rowIndex={3}
        />
        <LetterRow
          currentIndex={this.state.currentIndex}
          currentRow={this.state.currentRow}
          rowIndex={4}
        />
        <LetterRow currentIndex={this.state.currentIndex} />
      </div>
    );
  }
}

export default Board;
