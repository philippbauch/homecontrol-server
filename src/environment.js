const {
  DEFAULT_DB_NAME,
  DEFAULT_LOGS_DIR,
  DEFAULT_PORT
} = require("./defaults");

let { DB_NAME, LOGS_DIR, PORT } = process.env;

const { DB_HOST, DB_PASSWORD, DB_USER, HOST, ORIGIN } = process.env;

/** ************************************************************** **/
/*                           Defaultables                           */
/** ************************************************************** **/

if (!DB_NAME) {
  console.warn(`No DB_NAME specified - use default value '${DEFAULT_DB_NAME}'`);
  DB_NAME = DEFAULT_DB_NAME;
}

if (!LOGS_DIR) {
  console.warn(
    `No LOGS_DIR specified - use default value '${DEFAULT_LOGS_DIR}'`
  );
  LOGS_DIR = DEFAULT_LOGS_DIR;
}

if (!PORT) {
  console.warn(`No PORT specified - use default value '${DEFAULT_PORT}'`);
  PORT = DEFAULT_PORT;
}

/** ************************************************************** **/
/*                         Non-Defaultables                         */
/** ************************************************************** **/

if (!DB_HOST) {
  throw new Error("Missing environment variable DB_HOST");
}

if (!DB_PASSWORD) {
  throw new Error("Missing environment variable DB_PASSWORD");
}

if (!DB_USER) {
  throw new Error("Missing environment variable DB_USER");
}

if (!HOST) {
  throw new Error("Missing environment variable HOST");
}

if (!ORIGIN) {
  throw new Error("Missing environment variable ORIGIN");
}

module.exports = {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  HOST,
  LOGS_DIR,
  ORIGIN,
  PORT
};
