export const START_ROUND = 'START_ROUND';
export const ROUND_IS_TO_START = 'ROUND_IS_TO_START';
export const LOAD_TEXT = 'LOAD_TEXT';

export function startRound(payload) {
  return { type: START_ROUND, payload };
};

export function roundIsToStart(payload) {
  return { type: ROUND_IS_TO_START, payload };
};

export function loadText(payload) {
  return { type: LOAD_TEXT, payload };
};
