const fs = require("fs");
const https = require("https");
const app = require("./app");
const { db } = require("./db");
const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  PORT
} = require("./environment");
const logger = require("./logger");

const URL = `mongodb://${DB_HOST}:27017`;

const cert = fs.readFileSync("./certs/server.cert");
const key = fs.readFileSync("./certs/server.key");

const options = { cert, key };

const server = https.createServer(options, app);

db.connect(URL, DB_NAME, {
  auth: {
    user: DB_USER,
    password: DB_PASSWORD
  }
})
  .then(() => {
    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}...`);
    });
  })
  .catch(error => {
    logger.error(error);
  });
