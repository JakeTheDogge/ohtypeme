import { START_ROUND, ROUND_IS_TO_START, LOAD_TEXT, END_TYPING, START_TYPING, END_COUNTDOWN } from "./actions"

const reducer = (state, action) => {
  switch (action.type) {
    case (ROUND_IS_TO_START):
      return Object.assign({}, state, { gameIsToStart: true });
    case (START_ROUND):
      return Object.assign({}, state, { gameIsToStart: false, time: action.payload.time, text: action.payload.text, ids: action.payload.ids });
    case (LOAD_TEXT):
      return Object.assign({}, state, { text: action.payload.text });
    case (END_TYPING):
      return Object.assign({}, state, { isRoundOn: false });
    case (START_TYPING):
      return Object.assign({}, state, { isRoundOn: true });
    case (END_COUNTDOWN):
        return Object.assign({}, state, { time: null });
    default:
      return state;
  }
}

export default reducer;
