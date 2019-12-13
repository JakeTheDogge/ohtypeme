import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'

export const store = createStore(reducer, {
  text: 'Share current link with you friends and start the race!',
  time: null,
  gameIsToStart: false,
  isRoundOn: false,
  percents: [],
  ids: [],
},
  applyMiddleware(thunk));

export default store;
