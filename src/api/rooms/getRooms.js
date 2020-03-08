const { db } = require("../../db");

const CONTEXT = "get_rooms";

async function getRooms(req, res) {
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  try {
    /**
     *  [
     *    {
     *      "_id": ...,
     *      "name": ...,
     *      "homeId": ...,
     *      "homes": [
     *        {
     *          "_id": ...,
     *          "name": ...,
     *          "residents": [...]
     *        }
     *      ]
     *    }
     *  ]
     */
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
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getRooms };
