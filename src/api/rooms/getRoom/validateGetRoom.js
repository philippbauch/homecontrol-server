const CONTEXT = "validate_get_room";

function validateGetRoom(req, res, next) {
  const { roomId } = req.params;

  if (!roomId) {
    return res.error.missingParam(CONTEXT, "roomId");
  }

  req.getRoom = {
    _id: roomId
  };

  next();
}

module.exports = { CONTEXT, validateGetRoom };
