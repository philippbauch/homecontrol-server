const { UnmatchedRouteError } = require("../errors");
const { wrapSync } = require("../utils");

const CONTEXT = "unmatched_route";

const unmatchedRoute = wrapSync(function (req, res) {
  throw new UnmatchedRouteError();
}, CONTEXT);

module.exports = { unmatchedRoute };
