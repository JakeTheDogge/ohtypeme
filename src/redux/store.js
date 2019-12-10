import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'

const store = createStore(reducer, { text: 'Wait a moment, darling', time: null, gameIsToStart: false }, applyMiddleware(thunk));

export default store;
