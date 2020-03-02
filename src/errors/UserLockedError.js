const ApiError = require("./ApiError");

class UserLockedError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_LOCKED_USER";
    const message = "User is locked";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = UserLockedError;
