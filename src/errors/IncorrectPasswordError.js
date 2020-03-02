const ApiError = require("./ApiError");

class IncorrectPasswordError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_INCORRECT_PASSWORD";
    const message = "The password is incorrect";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = IncorrectPasswordError;
