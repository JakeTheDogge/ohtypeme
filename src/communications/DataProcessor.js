import Round from './Round';
import { dispatch } from './Manager';


export class DataProcessorDTO {
  constructor({ newRound = null,
                confirmationIds = null,
                tryToStartRound = null,
                readyForNewRound = null,
                send= null,
              }) {
    this.newRound = newRound;
    this.confirmationIds = confirmationIds;
    this.tryToStartRound = tryToStartRound;
    this.readyForNewRound = readyForNewRound;
    this.send = send;
  }
}

export default class DataProcessor {
  static NEW_TEXT = 'TEXT';
  static TEXT_RESPONSE_OK = 'TEXT_RESPONSE_OK';
  static TEXT_RESPONSE_I_AM_BUSY = 'TEXT_RESPONSE_I_AM_BUSY';
  static TEXT_PROGRESS = 'TEXT_PROGRESS';
  static TIME = 'TIME';
  static HELLO = 'HELLO';

  constructor(getState, callManager) {
    this.callManager = callManager;
    this.getState = getState;
  }

  processData(action) {
    let dto = null;
    const state = this.getState();
    switch (action.type) {
      case DataProcessor.NEW_TEXT:
        dto = this.processText(state, action.payload);
        break;
      case DataProcessor.TEXT_RESPONSE_OK:
        dto = this.processTextResponseOk(state, action);
        break;
      case DataProcessor.TIME:
        dto = this.processTime(state, action.payload);
        break;
      case DataProcessor.TEXT_RESPONSE_I_AM_BUSY:
        dto = this.processTextResponseBusy(state, action.payload);
        break;
      case DataProcessor.TEXT_PROGRESS:
        dispatch('if right text, update percents', action.payload);
        break;
      case DataProcessor.HELLO:
        console.log('HELLO');
        console.log(action.payload);
        break;
      default:
        console.error('Unknown action');
        console.error(action);
    }
    dto && this.callManager(dto);
  }

  processText(state, data) {
    console.log('Text', data);
    const newRound = Round.fromObj(data.round);
    if (!state.readyForNewRound) {
      return new DataProcessorDTO({send: {
          ids: [newRound.leaderId.getId()],
          message: { type: DataProcessor.TEXT_RESPONSE_I_AM_BUSY, payload: {id: state.webRTC.peerId.getId()}}
      }});
    }
    if (state.round === null || newRound.isBetterThan(state.round)) {
      // TODO remove `start new round` button and show `round is about to start`
      dispatch('ROUND IS ABout to staRT');
      return new DataProcessorDTO({newRound, send: {
          ids: [newRound.leaderId.getId()],
          message: {type: DataProcessor.TEXT_RESPONSE_OK, payload: {id: state.webRTC.peerId.getId()}}
        }});
    }
  }

  processTextResponseOk(state, data) {
    console.log('TextResponseOK data:');
    console.log(data);
    return new DataProcessorDTO({
      confirmationIds: [...state.confirmationIds, data.payload.id],
      tryToStartRound: true});
  }

  processTextResponseBusy(state, data) {
    console.log('TextResponseBusy data:');
    console.log(data);
    return new DataProcessorDTO({
      newRound: state.round === null ? null : new Round(state.round.text, state.round.leaderId, state.round.ids.filter(id => id !== data.id), state.round.id),
      tryToStartRound: true
    });
  }

  processTime(sate, data) {
    console.log(`Time data:`);
    console.log(data);
    // TODO start the countdown
    dispatch('START THE COUNTDOWN');
    return new DataProcessorDTO({newRound: Round.fromObj(data.round), readyForNewRound: false})
  }

}
