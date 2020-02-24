const winston = require("winston");
const format = require("./format");
const transports = require("./transports");

const logger = winston.createLogger({
  format,
  level: "info",
  transports
});

module.exports = logger;
