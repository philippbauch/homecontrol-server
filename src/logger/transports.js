const { transports } = require("winston");
const { LOGS_DIR } = require("../environment");

/**
 * Store all logs in a combined log file.
 */
const transportCombined = new transports.File({
  filename: `${LOGS_DIR}/combined.log`
});

/**
 * Print all logs to the console.
 */
const transportConsole = new transports.Console();

/**
 * Store error logs in a separate log file.
 */
const transportError = new transports.File({
  filename: `${LOGS_DIR}/error.log`,
  level: "error"
});

const customTransports = [transportCombined, transportConsole, transportError];

module.exports = customTransports;
