const ApiError = require("./ApiError");

class FutureTimestampError extends ApiError {
  constructor(domain) {
    const code = 403;
    const id = "ERR_FUTURE_TIMESTAMP";
    const message = "Timestamp is in the future";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = FutureTimestampError;
