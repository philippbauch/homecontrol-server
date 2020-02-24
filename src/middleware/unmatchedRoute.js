const { UNMATCHED_ROUTE } = require("../errors");

const unmatchedRoute = (req, res) => {
  res.failure(UNMATCHED_ROUTE);
};

module.exports = { unmatchedRoute };
