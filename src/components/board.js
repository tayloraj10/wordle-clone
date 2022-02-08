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
      won: false,
      showWord: false,
    };
    this.myInputRef = React.createRef();
  }

  componentDidMount() {
    this.getTargetWord();
  }

  getTargetWord() {
    let apiKey = `${process.env.REACT_APP_API_KEY}`;
    let apiUrl = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minDictionaryCount=3&minLength=5&maxLength=5&api_key=${apiKey}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.word.toLowerCase());
          this.setState({
            correctWord: result.word.toLowerCase(),
          });
        },

        (error) => {
          //   this.setState({
          //     isLoaded: true,
          //     error,
          //   });
        }
      );
  }

  onChange(event) {
    let value = event.target.value;
    if (value !== '' && value !== ' ' && this.state.currentIndex < 4) {
      const newCurrentIndex = this.state.currentIndex + 1;
      this.setState({
        currentIndex: newCurrentIndex,
      });
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

    if (this.state.currentRow === 5) {
      this.setState({
        statusMessage: 'Sorry, you lost!',
      });
      return;
    }

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
        won: true,
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

  onClick = (event, data) => {
    let newIndex = data.index;
    console.log(newIndex);
    this.setState({
      currentIndex: newIndex,
    });
  };

  showWord() {
    this.setState({
      showWord: !this.state.showWord,
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
        onClickPass={this.onClick}
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
        this.state.words[this.state.currentRow] !== undefined &&
        this.state.words[this.state.currentRow].length === 5 &&
        !this.state.won ? (
          <Button
            variant='secondary'
            className='button'
            size='lg'
            onClick={() => this.onSubmit()}
          >
            Submit
          </Button>
        ) : null}
        {this.state.badLetters.length > 0 ? (
          <h4 className='badLetters'>Letters not in word</h4>
        ) : null}
        <ul className='badLettersList'>
          {this.state.badLetters.map((letter) => {
            return <li key={letter}>{letter + ', '}</li>;
          })}
        </ul>
        <Button
          variant='danger'
          className='button showButton'
          size='lg'
          onClick={() => this.showWord()}
        >
          {this.state.showWord ? 'Hide Word' : 'Show Word'}
        </Button>
        {this.state.showWord ? (
          <h4 className='correctWord'>{this.state.correctWord}</h4>
        ) : null}
      </div>
    );
  }
}

export default Board;
