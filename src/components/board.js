import React from 'react';
import LetterRow from './letterRow';
import '../styles/master.css';
import Button from 'react-bootstrap/Button';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      colors: [],
      currentRow: 0,
      currentIndex: 0,
      correctWord: 'hello',
      badLetters: [],
      statusMessage: '',
    };
    this.myInputRef = React.createRef();
  }

  onChange(event) {
    let value = event.target.value;
    if (value !== '' && value !== ' ' && this.state.currentIndex < 4) {
      const newCurrentIndex = this.state.currentIndex + 1;
      this.setState({
        currentIndex: newCurrentIndex,
      });
    }
    if (this.state.currentIndex === 4) {
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 8 && this.state.currentIndex > 0) {
      const newCurrentIndex = this.state.currentIndex - 1;
      this.setState({
        currentIndex: newCurrentIndex,
      });
    }
  }

  onSubmit() {
    let colors = [];
    let newBadLetters = this.state.badLetters;
    let word = this.state.words[this.state.currentRow];

    for (let i = 0; i < word.length; i++) {
      if (this.state.correctWord[i] === word[i]) {
        colors.push('green');
      } else if (this.state.correctWord.includes(word[i])) {
        colors.push('yellow');
      } else {
        colors.push('');
        if (!this.state.badLetters.includes(word[i])) {
          newBadLetters.push(word[i]);
        }
      }
    }

    let newColors = this.state.colors;
    newColors.push(colors);

    if (word === this.state.correctWord) {
      this.setState({
        statusMessage: 'Congrats, you got the word!',
      });
      return;
    }

    let newRow = this.state.currentRow + 1;
    this.setState(
      {
        currentRow: newRow,
        currentIndex: 0,
        colors: newColors,
        badLetters: newBadLetters,
      },
      () => {
        this.myInputRef.current.focus();
      }
    );
  }

  wordChange(word) {
    let newWords = this.state.words;
    newWords[this.state.currentRow] = word;
    this.setState({
      words: newWords,
    });
  }

  renderRow(i) {
    return (
      <LetterRow
        currentIndex={this.state.currentIndex}
        currentRow={this.state.currentRow}
        rowIndex={i}
        onChange={(value) => this.onChange(value)}
        onKeyDown={(value) => this.onKeyDown(value)}
        refDown={this.state.currentRow === i ? this.myInputRef : null}
        wordChange={(word) => this.wordChange(word)}
        colors={this.state.colors[i] === undefined ? [] : this.state.colors[i]}
      />
    );
  }

  render() {
    return (
      <div className='board'>
        <h3 className='status blink_me'>{this.state.statusMessage}</h3>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.state.currentIndex === 4 &&
        this.state.words[this.state.currentRow].length === 5 ? (
          <Button
            variant='secondary'
            className='button'
            size='lg'
            onClick={() => this.onSubmit()}
          >
            Submit
          </Button>
        ) : null}
        <h4 className='badLetters'>Letters not in word</h4>
        <ul>
          {this.state.badLetters.map((letter) => {
            return <li key={letter}>{letter + ', '}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Board;
