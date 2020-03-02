const { db } = require("../../../db");

const CONTEXT = "post_home";

async function postHome(req, res) {
  const { name } = req.postHome;
  const { _id: userId } = req.user;

  try {
    const existingHome = await db.homes.findOne({ name, userId });

    if (existingHome) {
      return res.error.homeAlreadyExists(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  try {
    const { insertedId: _id } = await db.homes.insertOne({
      name,
      userId
    });

    res.success({ _id });
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, postHome };
