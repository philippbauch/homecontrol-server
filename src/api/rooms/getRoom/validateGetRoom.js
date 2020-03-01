const { MISSING_PARAM } = require("../../../errors");

const CONTEXT = "validate_get_room";

function validateGetRoom(req, res, next) {
  const { roomId } = req.params;

  if (!roomId) {
    return res.failure(MISSING_PARAM("roomId", CONTEXT));
  }

  req.getRoom = {
    _id: roomId
  };

  next();
}

module.exports = { CONTEXT, validateGetRoom };
