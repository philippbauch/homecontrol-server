const { EventEmitter } = require("events");

let CLIENT_IDENTIFIER = 0;

class WebSocketClient extends EventEmitter {
  static dummy() {
    return new WebSocketClient();
  }

  constructor(userId, socket) {
    super();

    this.id = CLIENT_IDENTIFIER++;
    this.userId = userId;
    this.socket = socket;

    if (socket) {
      this.socket.onclose = this.handleClose.bind(this);
      this.socket.onmessage = this.handleMessage.bind(this);
    }
  }

  handleClose() {
    this.emit("close", this.id);
  }

  handleMessage(event) {
    this.emit("message", event);
  }

  isSocketOpen() {
    console.log(this.socket.readyState);
    return this.socket.readyState === 1;
  }

  prepareMessage(type, data) {
    const message = {
      type,
      data
    };

    return JSON.stringify(message);
  }

  send(type, data) {
    if (!this.socket || !this.isSocketOpen()) {
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