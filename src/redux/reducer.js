import { START_ROUND, ROUND_IS_TO_START, LOAD_TEXT } from "./actions"

const reducer = (state, action) => {
  switch (action.type) {
    case (ROUND_IS_TO_START):
      return Object.assign({}, state, { gameIsToStart: true, text: action.payload.text });
    case (START_ROUND):
      return Object.assign({}, state, { gameIsToStart: false, text: action.payload.text, time: action.payload.time });
    case (LOAD_TEXT):
      return Object.assign({}, state, { text: action.payload.text });
    default:
      return state;
  }
}

export default reducer;
