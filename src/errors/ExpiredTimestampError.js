const ApiError = require("./ApiError");

class ExpiredTimestampError extends ApiError {
  constructor(domain) {
    const code = 403;
    const id = "ERR_EXPIRED_TIMESTAMP";
    const message = "Timestamp expired";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = ExpiredTimestampError;
