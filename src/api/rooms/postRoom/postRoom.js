const { db } = require("../../../db");

const CONTEXT = "post_room";

async function postRoom(req, res) {
  const { name } = req.postRoom;
  const { _id: userId } = req.user;

  try {
    const existingRoom = await db.rooms.findOne({ name, userId });

    if (existingRoom) {
      return res.error.roomAlreadyExists(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  try {
    const { insertedId: _id } = await db.rooms.insertOne({
      name,
      userId
    });

    res.success({ _id });
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, postRoom };
