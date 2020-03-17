const { db } = require("../../db");
const { HomeDoesntExistError, PermissionDeniedError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_home";

const getHome = wrapAsync(async function(req, res) {
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  let homes = await db.homes.aggregate([
    {
      $match: {
        _id: homeId
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

  if (!homes.length) {
    throw new HomeDoesntExistError();
  }

  const home = homes[0];

  if (!home.residents.some(resident => resident._id.equals(userId))) {
    throw new PermissionDeniedError();
  }

  return res.success(home);
}, CONTEXT);

module.exports = { CONTEXT, getHome };
