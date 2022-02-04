import React from 'react';
import '../styles/master.css';
import LetterRow from './row';

class Board extends React.Component {
  render() {
    return (
      <div className='board'>
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
        <LetterRow />
      </div>
    );
  }
}

export default Board;
