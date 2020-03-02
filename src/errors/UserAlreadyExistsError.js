const ApiError = require("./ApiError");

class UserAlreadyExistsError extends ApiError {
  constructor(domain, value) {
    const code = 400;
    const id = "ERR_USER_ALREADY_EXISTS";
    const message = "A user with the given identifier already exists";

    super({
      code,
      domain,
      id,
      message,
      value
    });
  }
}

module.exports = UserAlreadyExistsError;
