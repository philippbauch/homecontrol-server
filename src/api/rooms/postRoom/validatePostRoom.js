const CONTEXT = "validate_post_room";

function validatePostRoom(req, res, next) {
  const { name } = req.body;
  const { homeId } = req.params;

  if (!name) {
    res.error.missingRequiredField(CONTEXT, "name");
    return;
  }

  req.postRoom = {
    homeId,
    name
  };

  next();
}

module.exports = { CONTEXT, validatePostRoom };
