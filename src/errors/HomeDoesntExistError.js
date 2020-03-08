const ApiError = require("./ApiError");

class HomeDoesntExistError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_HOME_DOESNT_EXIST";
    const message = "A home with the given identifier doesn't exist";

    super({ code, id, message, value });
  }
}

module.exports = HomeDoesntExistError;
