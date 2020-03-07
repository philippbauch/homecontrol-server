const { db } = require("../../../db");

const CONTEXT = "post_room";

async function postRoom(req, res) {
  const { homeId, name } = req.postRoom;
  const { _id: userId } = req.user;

  console.log(homeId);
  console.log(userId);

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
