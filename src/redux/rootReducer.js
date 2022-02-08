import { combineReducers } from 'redux';

import boardReducer from './Board/board.reducer';

const rootReducer = combineReducers({
  board: boardReducer,
});

export default rootReducer;
