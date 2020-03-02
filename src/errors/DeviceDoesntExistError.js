const ApiError = require("./ApiError");

class DeviceDoesntExistError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_DEVICE_DOESNT_EXIST";
    const message = "A device with the given identifier doesn't exist";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = DeviceDoesntExistError;
