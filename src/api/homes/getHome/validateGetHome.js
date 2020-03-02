const CONTEXT = "validate_get_home";

function validateGetHome(req, res, next) {
  const { homeId } = req.params;

  if (!homeId) {
    return res.error.missingParam(CONTEXT, "homeId");
  }

  req.getHome = {
    _id: homeId
  };

  next();
}

module.exports = { CONTEXT, validateGetHome };
