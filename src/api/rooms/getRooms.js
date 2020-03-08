const { db } = require("../../db");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_rooms";

const getRooms = wrapAsync(async function(req, res) {
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  let rooms = await db.rooms
    .aggregate([
      {
        $lookup: {
          from: "homes",
          localField: "homeId",
          foreignField: "_id",
          as: "homes"
        }
      },
      { $match: { homeId, "homes.residents": userId } },
      { $project: { homes: 0 } }
    ])
    .toArray();

  return res.success(rooms);
}, CONTEXT);

module.exports = { CONTEXT, getRooms };
