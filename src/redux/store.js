import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'

export const store = createStore(reducer, { text: 'Wait a moment, darling', time: null, gameIsToStart: false, isRoundOn: false }, applyMiddleware(thunk));

export default store;
