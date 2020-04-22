const bcrypt = require("bcrypt");
const http = require("http");
const app = require("./app");
const db = require("./database");
const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  PORT
} = require("./environment");
const logger = require("./logger");
const ws = require("./websocket");

const URL = `mongodb://${DB_HOST}:27017`;

(async function() {
  const server = http.createServer(app);

  ws.attach(server);

  await db.connect(URL, DB_NAME, {
    auth: {
      user: DB_USER,
      password: DB_PASSWORD
    }
  });

  const adminUsers = await db.users.find({ admin: true }).toArray();

  if (!adminUsers.length) {
    logger.info("No administrative users found");
    logger.info("Create default administrative user");

    const identifier = "admin";
    const password = "admin";
    const admin = true;
    const locked = false;
    const preferences = {};

    const hash = await bcrypt.hash(password, 12);

    const { insertedId } = await db.users.insertOne({
      identifier,
      hash,
      admin,
      locked,
      preferences
    });

    logger.info(`Created user with ID ${insertedId}`);
  }

  server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });
})();
