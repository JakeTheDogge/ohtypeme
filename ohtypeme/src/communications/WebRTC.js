import ID from './ID';
import Peer from 'peerjs';

export default class WebRTC {
  static NEW_TEXT = 'TEXT';
  static TEXT_RESPONSE_OK = 'TEXT_RESPONSE_OK';
  static TEXT_RESPONSE_I_AM_BUSY = 'TEXT_RESPONSE_I_AM_BUSY';
  static TIME = 'TIME';
  static HELLO = 'HELLO';

  constructor(roomId, userName, randomSuffix, processData, deleteConnection) {
    this.peerId = new ID(roomId, userName, randomSuffix);
    console.log('my id is', this.peerId.getId());
    const webRTCServerInfo = { host: '167.172.164.93', port: 9000, path: '/oh-my-type' };
    this.peer = new Peer(this.peerId.getId(), webRTCServerInfo);
    this.connections = new Map();
    this.deleteConnecitonFromManager = deleteConnection;
    this.peer.on('connection', (conn) => {
      this.connectToPeer(conn.peer);
      conn.on('data', data => {
        console.log('Received', data);
        processData(data);
      });
    });
    this.connectToAllPeersInRoom();
  }

  connectToPeer(id) {
    console.log('connecting to peer', id);
    if (id === this.peerId.getId() || this.connections.has(id)) {
      return;
    }
    const conn = this.peer.connect(id);
    conn.on('open', () => { this.connections.set(id, conn); conn.send({ type: WebRTC.HELLO }) });
    conn.on('close', () => this.removeConnection(id));
    conn.on('error', error => console.log(error));
  }

  removeConnection(id) {
    console.log('removing connection, id:');
    console.log('blabla', id);
    const conn = this.connections.get(id);
    this.connections.delete(id);
    this.deleteConnecitonFromManager(ID.fromString(id));
    if (conn) {
      conn.close();
    }
  }

  connectToAllPeersInRoom() {
    console.log('connection to other peers in the room');
    this.peer.listAllPeers(ids =>
      ids
        .filter(id => id.startsWith(this.peerId.roomId) && id !== this.peerId.getId())
        .forEach(this.connectToPeer.bind(this))
    );
  };

  sendToPeer(id, data) {
    console.log('sending to', id, data);
    console.log(this.connections);
    if (!this.connections.has(id)) {
      console.error(`Cannot send to ${id} data ${data}`);
    }
    this.connections.get(id).send(data)
  }

  sendToPeers(peerIds, data) {
    peerIds.forEach(id => this.sendToPeer(id, data))
  }

  getConnected() {
    return this.connections.keys();
  }
}
