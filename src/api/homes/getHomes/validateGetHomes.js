const CONTEXT = "validate_get_homes";

function validateGetHomes(req, res, next) {
  // Add validation here

  next();
}

module.exports = { CONTEXT, validateGetHomes };
