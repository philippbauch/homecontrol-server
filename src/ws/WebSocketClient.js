const { EventEmitter } = require("events");
const { ObjectId } = require("mongodb");

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
      this.socket.onclose = this.handleClose;
      this.socket.onmessage = this.handleMessage;
    }
  }

  handleClose() {
    this.emit("close", this.id);
  }

  handleMessage(event) {
    this.emit("message", event);
  }

  prepareMessage(type, data) {
    const message = {
      type,
      data
    };

    return JSON.stringify(message);
  }

  send(type, data) {
    if (!this.socket) {
      return;
    }

    const message = this.prepareMessage(type, data);

    this.socket.send(message);
  }

  sendNotification(notification) {
    this.send("notification", notification);
  }
}

module.exports = WebSocketClient;