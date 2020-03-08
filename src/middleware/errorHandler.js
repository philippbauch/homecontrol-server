const ApiError = require("../errors/ApiError");
const { logger } = require("../logger");
const { formatResponse } = require("../utils");

function errorHandler(error, req, res, next) {
  if (!(error instanceof ApiError)) {
    logger.error(error.message);
    error = new ApiError({});
  }

  const { code, context, id, message, value } = error;
  const { method, path } = req;

  const payload = {
    code,
    context,
    id,
    method,
    message,
    path,
    value
  };

  const response = formatResponse("error", payload);

  res.json(response);
  res.status(code);
}

module.exports = { errorHandler };
