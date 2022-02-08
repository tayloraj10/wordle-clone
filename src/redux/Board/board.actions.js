import { win, lose } from './board.types';

export const winGame = () => {
  return {
    type: win,
  };
};

export const loseGame = () => {
  return {
    type: lose,
  };
};
