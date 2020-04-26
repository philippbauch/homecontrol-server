const db = require("../../database");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_invitations";

const getInvitations = wrapAsync(async function(req, res) {
  const { homeId } = req.params;

  let invitations = await db.invitations.aggregate([
    {
      $match: {
        homeId,
        pending: true
      }
    },
    {
      $lookup: {
        from: "homes",
        localField: "homeId",
        foreignField: "_id",
        as: "home"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "inviteeId",
        foreignField: "_id",
        as: "invitee"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "inviterId",
        foreignField: "_id",
        as: "inviter"
      }
    },
    {
      $unwind: "$home"
    },
    {
      $unwind: "$invitee"
    },
    {
      $unwind: "$inviter"
    },
    {
      $project: {
        accepted: 1,
        pending: 1,
        home: {
          _id: "$home._id",
          name: "$home.name",
        },
        invitee: {
          _id: "$invitee._id",
          identifier: "$invitee.identifier",
        },
        inviter: {
          _id: "$inviter._id",
          identifier: "$inviter.identifier",
        }
      }
    },
    {
      $project: {
        homeId: 0,
        inviteeId: 0,
        inviterId: 0
      }
    }
  ]).toArray();

  return res.success(invitations);
}, CONTEXT);

module.exports = { CONTEXT, getInvitations };
