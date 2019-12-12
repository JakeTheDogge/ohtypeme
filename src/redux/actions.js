export const START_ROUND = 'START_ROUND';
export const ROUND_IS_TO_START = 'ROUND_IS_TO_START';
export const LOAD_TEXT = 'LOAD_TEXT';
export const END_TYPING = 'END_TYPING';
export const START_TYPING = 'START_TYPING';
export const END_COUNTDOWN = 'END_COUNTDOWN';


export function endCountdown() {
  return { type: END_COUNTDOWN }
}

export function startTyping() {
  return { type: START_TYPING };
}

export function endTyping() {
  return { type: END_TYPING };
}

export function startRound(payload) {
  return { type: START_ROUND, payload };
};

export function roundIsToStart() {
  return { type: ROUND_IS_TO_START };
};

export function loadText(payload) {
  return { type: LOAD_TEXT, payload };
};
