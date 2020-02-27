const bcrypt = require("bcrypt");
const { db } = require("../src/db");
const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER
} = require("../src/environment");

const URL = `mongodb://${DB_HOST}:27017`;

const SALT_ROUNDS = 12;

const identifier = "admin";
const password = "admin";

(async function() {
  await db.connect(URL, DB_NAME, {
    auth: {
      user: DB_USER,
      password: DB_PASSWORD
    }
  });

  var hash = await bcrypt.hash(password, SALT_ROUNDS);

  const isAdmin = true;
  const isLocked = false;

  const { insertedId: _id } = await db.users.insertOne({
    identifier,
    hash,
    admin: isAdmin,
    locked: isLocked
  });

  console.log("Done.");
  console.log("Created admin user with id:", _id);
})();
