const ApiError = require("./ApiError");

class UserDoesntExistError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_USER_DOESNT_EXIST";
    const message = "A user with the given identifier doesn't exist";

    super({ code, id, message, value });
  }
}

module.exports = UserDoesntExistError;
