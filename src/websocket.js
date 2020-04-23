const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const { ObjectId } = require("mongodb");
const Server = require("socket.io");
const db = require("./database");
const { ORIGIN } = require("./environment");
const { isObject } = require("./utils");

function parseCookie(socket, next) {
  const { token: tokenRaw } = cookie.parse(socket.request.headers.cookie);

  if (!tokenRaw) {
    return next(new Error("Authentication error"));
  }

  const jsonToken = cookieParser.signedCookie(tokenRaw, "secret");
  const token = cookieParser.JSONCookie(jsonToken);

  if (!token) {
    return next(new Error("Authentication error"));
  }

  socket.token = token;

  next();
}

async function validateCookie(socket, next) {
  if (!ObjectId.isValid(socket.token)) {
    return next(new Error("Authentication error"));
  }

  const _id = ObjectId.createFromHexString(socket.token);

  db.users
    .findOne({ _id }, { projection: { hash: 0 } })
    .then(user => {
      if (!user) {
        return next(new Error("Authentication error"));
      }

      socket.user = user;

      next();
    })
    .catch(() => next(new Error("Authentication error")))
}

function validateUser(socket, next) {
  const { locked } = socket.user;

  if (locked) {
    return next(new Error("Authentication error"));
  }

  next();
}

class WebSocket {
  constructor() {
    this.io = new Server(/* { origins: ORIGIN } */);

    this.io.use(parseCookie);
    this.io.use(validateCookie);
    this.io.use(validateUser);

    this.io.on("connection", (socket) => {
      const userId = socket.user._id.toHexString();
      socket.join(userId);
    });
  }

  /**
   * Attach socket.io to the given http.Server instance.
   *
   * @param {http.Server} httpServer - server to attach socket.io to
   */
  attach(httpServer) {
    this.io.attach(httpServer, { cookie: false });
  }

  /**
   * Target the given rooms for a subsequent message emission.
   */
  to(...rooms) {
    return rooms
      .filter(ObjectId.isValid)
      .map(room => isObject(room) ? room.toHexString() : room)
      .reduce((acc, room) => acc.to(room), this.io);
  }
}

module.exports = new WebSocket();