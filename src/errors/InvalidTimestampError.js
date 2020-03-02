const ApiError = require("./ApiError");

class InvalidTimestampError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_INVALID_TIMESTAMP";
    const message = "The timestamp is invalid";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = InvalidTimestampError;
