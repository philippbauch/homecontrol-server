const ApiError = require("./ApiError");

class InvalidEmailError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_INVALID_EMAIL";
    const message = "The email is invalid";

    super({ code, id, message, value });
  }
}

module.exports = InvalidEmailError;
