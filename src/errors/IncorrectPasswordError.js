const ApiError = require("./ApiError");

class IncorrectPasswordError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_INCORRECT_PASSWORD";
    const message = "The password is incorrect";

    super({ code, id, message, value });
  }
}

module.exports = IncorrectPasswordError;
