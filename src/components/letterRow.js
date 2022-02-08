import React from 'react';
import '../styles/master.css';

class LetterRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
    };
  }

  isSquareEnabled(index) {
    return this.props.currentIndex === index ? '' : 'disabled';
  }

  isRowEnabled(index) {
    return this.props.currentRow === index ? '' : 'disabled';
  }

  onChange = (e) => {
    this.props.onChange(e);
    if (this.props.currentIndex < 4) {
      setTimeout(function () {
        e.target.nextElementSibling.focus();
      });
    }

    let newWord;
    if (
      this.state.word.length <= 5 &&
      this.props.currentIndex === this.state.word.length
    ) {
      newWord = this.state.word + e.target.value;
    } else {
      let chars = this.state.word.split('');
      chars[this.props.currentIndex] = e.target.value;
      newWord = chars.join('');
    }

    this.setState(
      {
        word: newWord,
      },
      () => {
        this.props.wordChange(this.state.word);
      }
    );
  };

  onKeyDown = (e) => {
    if (this.props.currentIndex > 0) {
      this.props.onKeyDown(e);
      e.target.value = '';
      setTimeout(function () {
        e.target.previousElementSibling.focus();
      });
    }
    if (e.keyCode === 8) {
      let newWord = this.state.word.slice(0, -1);

      this.setState(
        {
          word: newWord,
        },
        () => {
          this.props.wordChange(this.state.word);
        }
      );
    }
  };

  renderSquare(i) {
    return (
      <input
        type='text'
        name='name'
        className='square'
        disabled={this.isSquareEnabled(i)}
        maxLength={1}
        autoComplete='off'
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        autoFocus={i === 0 && this.props.currentRow === this.props.rowIndex}
        ref={this.props.currentIndex === i ? this.props.refDown : null}
        style={{
          border:
            this.props.colors === undefined
              ? '3px solid #3a3a3c'
              : getBorderColor(this.props.colors[i]),
        }}
        // onClick={(e) => {
        //   this.props.onClickPass(e, { index: i, row: this.props.rowIndex });
        // }}
      />
    );
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <form>
          <fieldset disabled={this.isRowEnabled(this.props.rowIndex)}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
          </fieldset>
        </form>
      </div>
    );
  }
}

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
