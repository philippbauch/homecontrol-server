const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "post_room";

async function postRoom(req, res) {
  const { name } = req.postRoom;
  const { _id: userId } = req.user;

  try {
    const existingRoom = await db.rooms.findOne({ name, userId });

    if (existingRoom) {
      return res.failure("A room with this name already exists.");
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  try {
    const { insertedId: _id } = await db.rooms.insertOne({
      name,
      userId
    });

    res.success({ _id });
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, postRoom };
