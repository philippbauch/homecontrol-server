const CONTEXT = "validate_get_room";

function validateGetRoom(req, res, next) {
  // Add validation here

  next();
}

module.exports = { CONTEXT, validateGetRoom };
