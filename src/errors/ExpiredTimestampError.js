const ApiError = require("./ApiError");

class ExpiredTimestampError extends ApiError {
  constructor(value) {
    const code = 403;
    const id = "ERR_EXPIRED_TIMESTAMP";
    const message = "Timestamp expired";

    super({ code, id, message, value });
  }
}

module.exports = ExpiredTimestampError;
