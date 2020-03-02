const ApiError = require("./ApiError");

class RoomAlreadyExistsError extends ApiError {
  constructor(domain, value) {
    const code = 400;
    const id = "ERR_ROOM_ALREADY_EXISTS";
    const message = "A room with the given identifier already exists";

    super({
      code,
      domain,
      id,
      message,
      value
    });
  }
}

module.exports = RoomAlreadyExistsError;
