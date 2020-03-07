const CONTEXT = "validate_get_rooms";

function validateGetRooms(req, res, next) {
  const { homeId } = req.params;

  if (!homeId) {
    return res.error.missingParam(CONTEXT, "homeId");
  }

  req.getRooms = {
    homeId
  };

  next();
}

module.exports = { CONTEXT, validateGetRooms };
