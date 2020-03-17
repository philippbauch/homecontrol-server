const ApiError = require("./ApiError");

class ResidentDoesntExistError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_RESIDENT_ALREADY_EXISTS";
    const message = "A resident with the given ObjectId already exists for this home";

    super({ code, id, message, value });
  }
}

module.exports = ResidentDoesntExistError;
