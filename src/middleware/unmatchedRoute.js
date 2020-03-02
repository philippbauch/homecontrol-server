const CONTEXT = "unmatched_route";

const unmatchedRoute = (req, res) => {
  res.error.unmatchedRoute(CONTEXT);
};

module.exports = { unmatchedRoute };
