import React from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/master.css';

class LetterRow extends React.Component {
  render() {
    return (
      <div>
        <Button variant='outline-light' className='square'></Button>
        <Button variant='outline-light' className='square'></Button>
        <Button variant='outline-light' className='square'></Button>
        <Button variant='outline-light' className='square'></Button>
        <Button variant='outline-light' className='square'></Button>
      </div>
    );
  }
}

export default LetterRow;
