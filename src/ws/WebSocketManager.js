const http = require("http");
const WebSocket = require('ws');
const WebSocketClient = require("./WebSocketClient");
const logger = require("../logger");

class WebSocketManager {
  constructor() {
    this.clients = [];
    this.identifier = 0;

    this.server = new WebSocket.Server({ noServer: true });
    this.server.on("error", this.handleError);
  }

  connect(userId) {
    return (socket) => {
      const client = new WebSocketClient(userId, socket);

      client.on("close", this.handleClose.bind(this));
      client.on("message", this.handleMessage.bind(this));

      this.clients.push(client);
    }
  }

  findClient(userId) {
    const client = this.clients.find(client => client.userId.equals(userId));

    if (!client) {
      return WebSocketClient.dummy();
    }

    return client;
  }

  handleClose(id) {
    const index = this.clients.findIndex(client => client.id === id);

    if (index !== -1) {
      this.clients.splice(index, 1);
    }
  }

  handleError(error) {
    logger.error(error.message);
  }

  handleMessage(userId, message) {
    console.log(`User with id ${userId} sent ${message}`);
  }

  upgrade(app) {
    if (!this.server) {
        throw new Error("WebSocketServer has not been initialized");
    }

    function handleUpgrade(req, socket, head) {
      const res = new http.ServerResponse(req);
      res.assignSocket(socket);

      const _head = Buffer.alloc(head.length);
      _head.copy(head);

      res.on("finish", () => {
        res.socket.destroy();
      });

      function websocket(userId) {
        this.server.handleUpgrade(req, socket, _head, this.connect(userId));
      }

      res.websocket = websocket.bind(this);

      return app(req, res);
    }

    return handleUpgrade.bind(this);
  }
}

module.exports = WebSocketManager;