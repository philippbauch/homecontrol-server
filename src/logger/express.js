const expressWinston = require("express-winston");
const format = require("./format");
const transports = require("./transports");

const LOG_MESSAGE = "HTTP {{res.statusCode}} {{req.method}} {{req.url}}";

const expressLogger = expressWinston.logger({
  format,
  msg: LOG_MESSAGE,
  transports
});

module.exports = { expressLogger };
