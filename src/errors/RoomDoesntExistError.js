const ApiError = require("./ApiError");

class RoomDoesntExistError extends ApiError {
  constructor(domain, value) {
    const code = 400;
    const id = "ERR_ROOM_DOESNT_EXIST";
    const message = "A room with the given name doesn't exist";

    super({
      code,
      domain,
      id,
      message,
      value
    });
  }
}

module.exports = RoomDoesntExistError;
