const ApiError = require("./ApiError");

class UnknownUserError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_UNKNOWN_USER";
    const message = "The authenticated user is unknown";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = UnknownUserError;
