const bcrypt = require("bcrypt");
const { db } = require("../db");
const { SERVER_DOMAIN } = require("../environment");
const {
  IncorrectPasswordError,
  MissingRequiredFieldError,
  UserDoesntExistError,
  UserLockedError
} = require("../errors");
const { wrapAsync } = require("../utils");

const CONTEXT = "login";

  const login = wrapAsync(async function(req, res) {
    const { identifier, password } = req.body;

    if (!identifier) {
      throw new MissingRequiredFieldError("identifier");
    }

    if (!password) {
      throw new MissingRequiredFieldError("password");
    }

    let user = await db.users.findOne({ identifier });

    if (!user) {
      throw new UserDoesntExistError();
    }

    const { _id, hash, locked } = user;

    const equal = await bcrypt.compare(password, hash);

    if (!equal) {
      throw new IncorrectPasswordError();
    }

    if (locked) {
      throw new UserLockedError();
    }

    delete user.hash;

    return res
      .cookie("token", _id, {
        domain: SERVER_DOMAIN,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        signed: true
      })
      .success(user);
  }, CONTEXT);

module.exports = { CONTEXT, login };
