import Round from './Round';
import { getPercent, roundIsToStart, startRound } from '../redux/actions';
import ID from './ID';
import store from '../redux/store';


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
        store.dispatch(getPercent({percent: action.payload.progress, id: ID.fromString(action.payload.id)}));
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
      console.log('dispatching round is to start');
      store.dispatch(roundIsToStart());
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

  processTime(state, data) {
    console.log(`Time data:`);
    console.log(data);
    console.log('dispatching START THE COUNTDOWN');
    const newRound = Round.fromObj(data.round);

    const competitorIds = new Set(newRound.ids);
    competitorIds.add(newRound.leaderId.getId());

    store.dispatch(startRound({text: newRound.text.text, time: data.time, ids: Array.from(competitorIds).map(x => ID.fromString(x))}));
    return new DataProcessorDTO({newRound: newRound, readyForNewRound: false})
  }

}
