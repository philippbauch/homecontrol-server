const ApiError = require("./ApiError");

class InvalidTimestampError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_INVALID_TIMESTAMP";
    const message = "The timestamp is invalid";

    super({ code, id, message, value });
  }
}

module.exports = InvalidTimestampError;
