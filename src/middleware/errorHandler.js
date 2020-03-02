const { formatResponse } = require("../middleware/responseFormatter");

function errorHandler(error, req, res, next) {
  if (!error.id) {
    return next(error);
  }

  const { code, domain, id, message, value } = error;
  const { method, path } = req;

  const payload = {
    code,
    domain,
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
