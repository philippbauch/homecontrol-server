const { db } = require("../../db");

const CONTEXT = "post_room";

async function postRoom(req, res) {
  const { name } = req.body;
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  if (!name) {
    res.error.missingRequiredField(CONTEXT, "name");
    return;
  }

  try {
    let home = await db.homes.findOne({ _id: homeId, residents: userId });

    if (!home) {
      return res.error.homeDoesntExist(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  try {
    const existingRoom = await db.rooms.findOne({ homeId, name });

    if (existingRoom) {
      return res.error.roomAlreadyExists(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  try {
    const { insertedId: _id } = await db.rooms.insertOne({
      homeId,
      name
    });

    res.success({ _id });
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, postRoom };
