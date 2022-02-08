import { win, lose } from './board.types';

const INITAL_STATE = {
  won: false,
};

const reducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case win:
      return {
        ...state,
        won: true,
      };
    case lose:
      return {
        ...state,
        won: false,
      };
    default:
      return state;
  }
};

export default reducer;
