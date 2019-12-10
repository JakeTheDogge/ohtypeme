export default class ID {
  constructor(roomId, userName, randomSuffix) {
    this.roomId = roomId;
    this.userName = userName;
    this.randomSuffix = randomSuffix;
  }

  static fromObj(obj) {
    return new ID(obj.roomId, obj.userName, obj.randomSuffix)
  }

  static fromString(s) {
    const [roomId, userName, randomSuffix] = s.split('-');
    return new ID(roomId, userName, randomSuffix);
  }

  getId() {
    return [this.roomId, this.userName, this.randomSuffix].join('-')
  };

  getSuffix() {
    return this.randomSuffix;
  }
}
