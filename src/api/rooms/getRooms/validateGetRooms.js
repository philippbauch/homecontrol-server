const CONTEXT = "validate_get_rooms";

function validateGetRooms(req, res, next) {
  // Add validation here

  next();
}

module.exports = { CONTEXT, validateGetRooms };
