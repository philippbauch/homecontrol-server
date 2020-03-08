const ApiError = require("./ApiError");

class DeviceAlreadyExistsError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_DEVICE_ALREADY_EXISTS";
    const message = "A device with the given identifier already exists";

    super({ code, id, message, value });
  }
}

module.exports = DeviceAlreadyExistsError;
