import React from 'react';
import Board from '../components/board';

class Main extends React.Component {
  render() {
    return (
      <div className='main'>
        <h1 className='title'>WORDLE CLONE</h1>
        <hr className='seperator' />
        <Board />
      </div>
    );
  }
}

export default Main;
