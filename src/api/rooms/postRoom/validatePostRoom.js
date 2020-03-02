const CONTEXT = "validate_post_room";

function validatePostRoom(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.error.missingRequiredField(CONTEXT, "name");
    return;
  }

  req.postRoom = {
    name
  };

  next();
}

module.exports = { CONTEXT, validatePostRoom };
