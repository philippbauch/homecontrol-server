const db = require("../../database");
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

  const resident = {
    _id: userId,
    owner: true
  };

  const { ops } = await db.homes.insertOne({
    name,
    residents: [resident]
  });

  res.success(ops[0]);
}, CONTEXT);

module.exports = { CONTEXT, postHome };
