const { db } = require("../../db");

const CONTEXT = "post_home";

async function postHome(req, res) {
  const { name } = req.body;
  const { _id: userId } = req.user;

  if (!name) {
    res.error.missingRequiredField(CONTEXT, "name");
    return;
  }

  try {
    const existingHome = await db.homes.findOne({ name, residents: userId });

    if (existingHome) {
      return res.error.homeAlreadyExists(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  try {
    const { insertedId: _id } = await db.homes.insertOne({
      name,
      residents: [userId]
    });

    res.success({ _id });
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, postHome };
