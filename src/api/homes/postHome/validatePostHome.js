const { MISSING_REQUIRED_FIELD } = require("../../../errors");

const CONTEXT = "validate_post_home";

function validatePostHome(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.failure(MISSING_REQUIRED_FIELD("name", CONTEXT));
    return;
  }

  req.postHome = {
    name
  };

  next();
}

module.exports = { CONTEXT, validatePostHome };
