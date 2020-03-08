const ApiError = require("./ApiError");

class UserLockedError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_LOCKED_USER";
    const message = "User is locked";

    super({ code, id, message, value });
  }
}

module.exports = UserLockedError;
