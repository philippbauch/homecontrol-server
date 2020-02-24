const { authentication } = require("./authentication");
const { identification } = require("./identification");
const { permitAdmin } = require("./permitAdmin");
const { responseFormatter } = require("./responseFormatter");
const { timestamp } = require("./timestamp");
const { unmatchedRoute } = require("./unmatchedRoute");
const { validation } = require("./validation");

module.exports = {
  authentication,
  identification,
  permitAdmin,
  responseFormatter,
  timestamp,
  unmatchedRoute,
  validation
};
