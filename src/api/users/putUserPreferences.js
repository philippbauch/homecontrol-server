const _ = require("lodash");
const { db } = require("../../db");
const {
  HomeDoesntExistError,
  InternalError,
  PermissionDeniedError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "put_user_preferences";

const putUserPreferences = wrapAsync(async function(req, res) {
  const { activeHomeId } = req.body;
  const { _id: userId, preferences } = req.user;

  const update = {};

  if (activeHomeId) {
    const home = await db.homes.findOne({ _id: activeHomeId });

    if (!home) {
      throw new HomeDoesntExistError();
    }

    if (!home.residents.some(resident => resident._id.equals(userId))) {
      throw new PermissionDeniedError();
    }

    if (!activeHomeId.equals(preferences.activeHomeId)) {
      update["preferences.activeHomeId"] = activeHomeId;
    }
  }

  if (_.isEmpty(update)) {
    return res.success({ _id: userId });
  }

  const { result } = await db.users.updateOne(
    { _id: userId },
    { $set: update });

  if (!result.ok) {
    throw new InternalError();
  }

  res.success({ _id: userId });
}, CONTEXT);

module.exports = { CONTEXT, putUserPreferences };
