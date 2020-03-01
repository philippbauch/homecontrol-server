const { MISSING_PARAM } = require("../../../errors");

const CONTEXT = "validate_get_home";

function validateGetHome(req, res, next) {
  const { homeId } = req.params;

  if (!homeId) {
    return res.failure(MISSING_PARAM("homeId", CONTEXT));
  }

  req.getHome = {
    _id: homeId
  };

  next();
}

module.exports = { CONTEXT, validateGetHome };
