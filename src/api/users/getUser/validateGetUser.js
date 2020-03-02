const CONTEXT = "validate_get_user";

function validateGetUser(req, res, next) {
  const { userId } = req.params;

  if (!userId) {
    return res.error.missingParam(CONTEXT, "userId");
  }

  req.getUser = {
    _id: userId
  };

  next();
}

module.exports = { CONTEXT, validateGetUser };
