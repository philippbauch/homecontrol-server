const db = require("../../database");
const {
  MissingRequiredFieldError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "post_home";

const postHome = wrapAsync(async function(req, res) {
  const { name } = req.body;
  const { _id: userId, identifier } = req.user;

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

  const home = ops[0];

  home.residents[0].identifier = identifier;

  res.success(home);
}, CONTEXT);

module.exports = { CONTEXT, postHome };
