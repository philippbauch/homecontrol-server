class ApiError extends Error {
  constructor({
    code = 400,
    id = "ERR_UNKNOWN",
    message = "Unknown error",
    value
  }) {
    super();

    this.code = code;
    this.id = id;
    this.message = message;
    this.value = value;
  }
}

module.exports = ApiError;
