class ApiError extends Error {
  constructor({
    code = 400,
    domain,
    id = "ERR_UNKNOWN",
    message = "Unknown error",
    value
  }) {
    super(message);

    this.code = code;
    this.domain = domain;
    this.id = id;
    this.value = value;
  }
}

module.exports = ApiError;
