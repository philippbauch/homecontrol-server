const bcrypt = require("bcrypt");
const _ = require("lodash");
const db = require("../../database");
const {
  HomeDoesntExistError,
  IncorrectPasswordError,
  InternalError,
  MissingRequiredFieldError,
  PasswordTooShortError,
  PermissionDeniedError,
  UserAlreadyExistsError,
  UserDoesntExistError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "put_user";
const SALT_ROUNDS = 12;

const putUser = wrapAsync(async function(req, res) {
  const { currentPassword, identifier, password, preferences } = req.body;
  const { userId } = req.params;
  const { _id, admin } = req.user;

  if (!admin && !userId.equals(_id)) {
    throw new PermissionDeniedError();
  }

  const user = await db.users.findOne({ _id: userId });

  if (!user) {
    throw new UserDoesntExistError();
  }

  const update = {};

  if (identifier && identifier !==user.identifier) {
    const existingUser = await db.users.findOne({ identifier });

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    update["identifier"] = identifier;
  }

  if (password) {
    if (!currentPassword) {
      throw new MissingRequiredFieldError("currentPassword");
    }

    const equal = await bcrypt.compare(currentPassword, user.hash);

    if (!equal) {
      throw new IncorrectPasswordError();
    }

    if (password.length < 8) {
      throw new PasswordTooShortError();
    }

    update["hash"] = await bcrypt.hash(password, SALT_ROUNDS);
  }

  if (preferences) {
    const { activeHomeId } = preferences;

    if (activeHomeId) {
      const home = await db.homes.findOne({ _id: activeHomeId });

      if (!home) {
        throw new HomeDoesntExistError();
      }

      if (!home.residents.some(resident => resident._id.equals(userId))) {
        throw new PermissionDeniedError();
      }

      update["preferences.activeHomeId"] = activeHomeId;
    }
  }

  if (_.isEmpty(update)) {
    return res.success({ _id: userId });
  }

  const { result } = await db.users.updateOne(
    { _id: userId },
    { $set: update }
  );

  if (!result.ok) {
    throw new InternalError();
  }

  res.success({ _id: userId });
}, CONTEXT);

module.exports = { CONTEXT, putUser };
