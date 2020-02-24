const { format } = require("winston");
const { combine, printf, timestamp } = format;

/**
 * The format of the timestamp that is added to each log output.
 */
const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";

/**
 * Make sure the log level is displayed in uppercase letters.
 */
const uppercaseLogLevel = format(info => ({
  ...info,
  level: info.level.toUpperCase()
}));

/**
 * Print the log message in the desired format.
 */
const printLogMessage = printf(
  ({ level, message, timestamp }) => `${timestamp} [${level}] : ${message}`
);

/**
 * Create a custom winston logger format.
 *
 * All combined formatters are called sequentially to transform the output.
 */
const customFormat = combine(
  timestamp({
    format: TIMESTAMP_FORMAT
  }),
  uppercaseLogLevel(),
  printLogMessage
);

module.exports = customFormat;
