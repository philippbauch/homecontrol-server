const { db } = require("../../db");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_homes";

const getHomes = wrapAsync(async function(req, res) {
  const { _id: userId } = req.user;

  let homes = await db.homes.aggregate([
    {
      $match: {
        "residents._id": userId
      }
    },
    {
      $unwind: "$residents"
    },
    {
      $lookup: {
        from: "users",
        localField: "residents._id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name"
        },
        residents: {
          $push: {
            _id: "$residents._id",
            identifier: "$user.identifier",
            owner: "$residents.owner"
          }
        }
      }
    }
  ]).toArray();

  return res.success(homes);
}, CONTEXT);

module.exports = { CONTEXT, getHomes };
