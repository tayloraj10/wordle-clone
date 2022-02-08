import React, { useState, useEffect } from 'react';
import '../styles/master.css';

const LetterRow = (props) => {
  const [word, setWord] = useState('');

  useEffect(() => {
    props.wordChange(word);
  }, [word]);

  const isSquareEnabled = (index) => {
    return props.currentIndex === index ? '' : 'disabled';
  };

  const isRowEnabled = (index) => {
    return props.currentRow === index ? '' : 'disabled';
  };

  const onChange = (e) => {
    props.onChange(e);
    if (props.currentIndex < 4) {
      setTimeout(function () {
        e.target.nextElementSibling.focus();
      });
    }

    let newWord;
    if (word.length <= 5 && props.currentIndex === word.length) {
      setWord(word + e.target.value);
    } else {
      let chars = this.state.word.split('');
      chars[props.currentIndex] = e.target.value;
      setWord(chars.join(''));
    }
  };

  const onKeyDown = (e) => {
    if (props.currentIndex > 0) {
      props.onKeyDown(e);
      e.target.value = '';
      setTimeout(function () {
        e.target.previousElementSibling.focus();
      });
    }
    if (e.keyCode === 8) {
      let newWord = word.slice(0, -1);

      setWord(newWord);
    }
  };

  const onFocus = (event) => {
    if (event.target.autocomplete) {
      event.target.autocomplete = 'whatever';
    }
  };

  const renderSquare = (i) => {
    return (
      <input
        type='text'
        name='name'
        className='square'
        disabled={isSquareEnabled(i)}
        maxLength={1}
        autoComplete='off'
        onFocus={onFocus}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={i === 0 && props.currentRow === props.rowIndex}
        ref={props.currentIndex === i ? props.refDown : null}
        style={{
          border:
            props.colors === undefined
              ? '3px solid #3a3a3c'
              : getBorderColor(props.colors[i]),
        }}
      />
    );
  };

  return (
    <div>
      <form>
        <fieldset disabled={isRowEnabled(props.rowIndex)}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
        </fieldset>
      </form>
    </div>
  );
};

function getBorderColor(color) {
  if (color === 'green') {
    return '3px solid green';
  } else if (color === 'yellow') {
    return '3px solid yellow';
  } else if (color === 'red') {
    return '3px solid red';
  } else {
    return '3px solid #3a3a3c';
  }
}

export default LetterRow;
