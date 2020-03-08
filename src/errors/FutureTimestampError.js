const ApiError = require("./ApiError");

class FutureTimestampError extends ApiError {
  constructor(value) {
    const code = 403;
    const id = "ERR_FUTURE_TIMESTAMP";
    const message = "Timestamp is in the future";

    super({ code, id, message, value });
  }
}

module.exports = FutureTimestampError;
