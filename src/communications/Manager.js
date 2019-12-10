import uid from 'uid2'
import ID from './ID';
import WebRTC from './WebRTC';
import Round from './Round';

export default class Manager {
  static instance = null;

  static getInstance(roomId, userName, randomSuffix) {
    if (Manager.instance === null) {
      Manager.instance = new Manager(roomId, userName, randomSuffix);
    }
    return Manager.instance;
  }
  constructor(roomId, userName, randomSuffix) {
    this.webRTC = new WebRTC(roomId, userName, randomSuffix, this.processData.bind(this), this.deleteConnection.bind(this));
    this.round = null;
    this.conformationIds = null;

    console.log('NEW MANAGER CREATED');

    this.readyForNewRound = true;
  }

  prepareToStartNewRound(text) {
    // TODO check if you are connected to everyone
    if (this.round !== null) {
      console.error('Cannot start new round before finishing previous one');
      return;
    }
    this.round = new Round(text, this.webRTC.peerId, this.webRTC.getConnected(), uid(10, undefined));
    this.conformationIds = [];
    console.log('Starting new round');
    console.log(this.round);
    this.webRTC.sendToPeers(this.round.ids, { type: WebRTC.NEW_TEXT, round: this.round });
  }

  tryToStartRound() {
    if (this.webRTC.peerId !== this.round.leaderId || !this.readyForNewRound) {
      return;
    }
    console.log('try to start round', this.conformationIds.every(id => this.round.ids.includes(id)));
    console.log(this.round, this.conformationIds, this.round.ids);
    if (this.round.ids.map(id => ID.fromString(id)).every(id => this.conformationIds.includes(id))) {
      const time = new Date().getTime() + 10 * 1000;
      this.round.ids = Array.from(new Set(this.round.ids));
      this.readyForNewRound = false;
      this.webRTC.sendToPeers(this.round.ids, { type: WebRTC.TIME, time, round: this.round });

      // TODO start the timer and show the text
    }
  }

  finishRound() {
    this.round = null;
    this.readyForNewRound = true;
  }

  processText(data) {
    console.log('Text', data);
    const newRound = Round.fromObj(data.round);
    if (!this.readyForNewRound) {
      this.webRTC.sendToPeer(newRound.leaderId.getId(), { type: WebRTC.TEXT_RESPONSE_I_AM_BUSY, id: this.webRTC.peerId });
      return
    }
    if (this.round === null || newRound.isBetterThan(this.round)) {
      // TODO remove `start new round` button and show `round is about to start`
      this.round = newRound;
      this.webRTC.sendToPeer(this.round.leaderId.getId(), { type: WebRTC.TEXT_RESPONSE_OK, id: this.webRTC.peerId });
    }
  }

  processTextResponseOk(data) {
    console.log('TextResponseOK data:');
    console.log(data);
    this.conformationIds.push(ID.fromObj(data.id));
    this.tryToStartRound();
  }

  deleteConnection(id) {
    if (!this.round) {
      return
    }
    const newIds = new Set(this.round.ids);
    newIds.delete(ID.fromObj(id));
    this.round.ids = Array.from(newIds);
    this.tryToStartRound();
  }

  processTextResponseBusy(data) {
    console.log('TextResponseBusy data:');
    console.log(data);
    this.deleteConnection(data.id);
  }

  processTime(data) {
    console.log(`Time data:`);
    console.log(data);
    this.round = Round.fromObj(data.round);
    this.readyForNewRound = false;
    this.setText(this.round.text + '\n' + JSON.stringify(this.round));
    this.setTime(data.time);
    // TODO start the countdown
  }

  processData(data) {
    switch (data.type) {
      case WebRTC.NEW_TEXT:
        return this.processText(data);
      case WebRTC.TEXT_RESPONSE_OK:
        return this.processTextResponseOk(data);
      case WebRTC.TIME:
        return this.processTime(data);
      case WebRTC.TEXT_RESPONSE_I_AM_BUSY:
        return this.processTextResponseBusy(data);
      case WebRTC.HELLO:
        console.log('HELLO');
        break;
      default:
        console.error(`Unknown data = ${data}`);
    }
  }
}
