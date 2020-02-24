const { MISSING_PARAM } = require("../../../errors");

const CONTEXT = "validate_get_user";

function validateGetUser(req, res, next) {
  const { userId } = req.params;

  if (!userId) {
    return res.failure(MISSING_PARAM("userId", CONTEXT));
  }

  req.getUser = {
    _id: userId
  };

  next();
}

module.exports = { CONTEXT, validateGetUser };
