const { db } = require("../../db");
const { HomeDoesntExistError, PermissionDeniedError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_devices_in_home";

const getDevicesInHome = wrapAsync(async function (req, res) {
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  const home = await db.homes.findOne({ _id: homeId });

  if (!home) {
    throw new HomeDoesntExistError();
  }

  if (!home.residents.some(resident => resident._id.equals(userId))) {
    throw new PermissionDeniedError();
  }

  let devices = await db.homes.aggregate([
    {
      $match: {
        _id: homeId
      }
    },
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "homeId",
        as: "rooms"
      }
    },
    {
      $unwind: "$rooms"
    },
    {
      $lookup: {
        from: "devices",
        localField: "rooms._id",
        foreignField: "roomId",
        as: "devices"
      }
    },
    {
      $unwind: "$devices"
    },
    {
      $project: {
        "devices._id": 1,
        "devices.apiKey": 1,
        "devices.name": 1,
        "devices.room._id": "$rooms._id",
        "devices.room.name": "$rooms.name"
      }
    },
    {
      $replaceRoot: {
        newRoot: "$devices"
      }
    }
  ]).toArray();

  return res.success(devices);
}, CONTEXT);

module.exports = { CONTEXT, getDevicesInHome };
