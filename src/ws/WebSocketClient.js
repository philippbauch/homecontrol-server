const { EventEmitter } = require("events");

let CLIENT_IDENTIFIER = 0;
let KEEP_ALIVE_INTERVAL = 30000; // 30 seconds

class WebSocketClient extends EventEmitter {
  static dummy() {
    return new WebSocketClient();
  }

  /**
   * Create a new {@code WebSocketClient} instance and start a keep-alive
   * interval for the given socket.
   *
   * @param {ObjectId} userId  - ID of the user connected over the given socket
   * @param {WebSocket} socket - WebSocket object used to communicate with the
   *                             connected user
   */
  constructor(userId, socket) {
    super();

    this.id = CLIENT_IDENTIFIER++;
    this.isAlive = true;
    this.socket = socket;
    this.userId = userId;

    if (socket) {
      this.keepAlive = setInterval(this.ping.bind(this), KEEP_ALIVE_INTERVAL);

      this.socket.on("pong", this.heartbeat.bind(this));

      this.socket.onclose = this.handleClose.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
    }
  }

  handleClose() {
    clearInterval(this.keepAlive);

    this.emit("close", this.id);
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);

    this.emit("message", this.userId, message);
  }

  /**
   * Callback to the `pong` event on `this.socket`.
   */
  heartbeat() {
    this.isAlive = true;
  }

  isSocketOpen() {
    return this.socket && this.socket.readyState === 1;
  }

  ping() {
    if (this.isAlive === false) {
      return this.socket.terminate();
    }

    this.isAlive = false;
    this.socket.ping();
  }

  prepareMessage(type, data) {
    const message = {
      type,
      data
    };

    return JSON.stringify(message);
  }

  send(type, data) {
    if (!this.isSocketOpen()) {
      return;
    }

    const message = this.prepareMessage(type, data);

    this.socket.send(message);
  }

  sendInvitation(invitation) {
    this.send("invitation", invitation);
  }
}

module.exports = WebSocketClient;