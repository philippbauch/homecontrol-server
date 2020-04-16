const logger = require("../logger");

function websocket(req, res) {
  const { _id } = req.user;

  logger.info(`(WebSocket) User connected with ID ${_id}`);

  res.websocket(_id);
}

module.exports = { websocket };