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

db.connect(URL, DB_NAME, {
  auth: {
    user: DB_USER,
    password: DB_PASSWORD
  }
})
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}...`);
    });
  })
  .catch(error => {
    logger.error(error);
  });
