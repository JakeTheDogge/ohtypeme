import ID from './ID';

export default class Round {
  constructor(text, leaderId, ids, id) {
    this.id = id;
    this.text = text;
    this.leaderId = leaderId;
    this.ids = [...ids];
  }

  isBetterThan(other) {
    return this.ids.includes(other.leaderId.getId()) && this.leaderId.getSuffix() < other.leaderId.getSuffix()
  }
  static fromObj(obj) {
    return new Round(obj.text, ID.fromObj(obj.leaderId), obj.ids, obj.id)
  }
}
