const ApiError = require("./ApiError");

class UnknownUserError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_UNKNOWN_USER";
    const message = "The authenticated user is unknown";

    super({ code, id, message, value });
  }
}

module.exports = UnknownUserError;
