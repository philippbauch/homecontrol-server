const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "post_home";

async function postHome(req, res) {
  const { name } = req.postHome;
  const { _id: userId } = req.user;

  try {
    const existingHome = await db.homes.findOne({ name, userId });

    if (existingHome) {
      return res.failure("A home with this name already exists.");
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  try {
    const { insertedId: _id } = await db.homes.insertOne({
      name,
      userId
    });

    res.success({ _id });
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, postHome };
