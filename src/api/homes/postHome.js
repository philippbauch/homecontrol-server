const { db } = require("../../db");
const {
  HomeAlreadyExistsError,
  MissingRequiredFieldError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "post_home";

const postHome = wrapAsync(async function(req, res) {
  const { name } = req.body;
  const { _id: userId } = req.user;

  if (!name) {
    throw new MissingRequiredFieldError("name");
  }

  const existingHome = await db.homes.findOne({ name, residents: userId });

  if (existingHome) {
    throw new HomeAlreadyExistsError();
  }

  const resident = {
    _id: userId,
    owner: true
  };

  const { insertedId: _id } = await db.homes.insertOne({
    name,
    residents: [resident]
  });

  res.success({ _id });
}, CONTEXT);

module.exports = { CONTEXT, postHome };
