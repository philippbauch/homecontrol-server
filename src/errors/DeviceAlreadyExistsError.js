const ApiError = require("./ApiError");

class DeviceAlreadyExistsError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_DEVICE_ALREADY_EXISTS";
    const message = "A device with the given identifier already exists";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = DeviceAlreadyExistsError;
