const CONTEXT = "validate_get_users";

function validateGetUsers(req, res, next) {
  // Add validation here

  next();
}

module.exports = { CONTEXT, validateGetUsers };
