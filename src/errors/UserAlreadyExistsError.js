const ApiError = require("./ApiError");

class UserAlreadyExistsError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_USER_ALREADY_EXISTS";
    const message = "A user with the given identifier already exists";

    super({ code, id, message, value });
  }
}

module.exports = UserAlreadyExistsError;
