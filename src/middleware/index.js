const { authentication } = require("./authentication");
const { errorHandler } = require("./errorHandler");
const { identification } = require("./identification");
const { permitAdmin } = require("./permitAdmin");
const { success } = require("./success");
const { timestamp } = require("./timestamp");
const { unmatchedRoute } = require("./unmatchedRoute");
const { validation } = require("./validation");

module.exports = {
  authentication,
  errorHandler,
  identification,
  permitAdmin,
  success,
  timestamp,
  unmatchedRoute,
  validation
};
