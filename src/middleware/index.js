const { authentication } = require("./authentication");
const { errorHandler } = require("./errorHandler");
const { errors } = require("./errors");
const { identification } = require("./identification");
const { permitAdmin } = require("./permitAdmin");
const { responseFormatter } = require("./responseFormatter");
const { timestamp } = require("./timestamp");
const { unmatchedRoute } = require("./unmatchedRoute");
const { validation } = require("./validation");

module.exports = {
  authentication,
  errorHandler,
  errors,
  identification,
  permitAdmin,
  responseFormatter,
  timestamp,
  unmatchedRoute,
  validation
};
