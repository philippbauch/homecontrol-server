const cookieParser = require('cookie-parser');
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const api = require("./api");
const { ORIGIN } = require("./environment");
const { errorHandler, success } = require("./middleware");
const { expressLogger } = require("./logger/express");

// Create an express app.
const app = express();

app.use(helmet());

// Log each incoming HTTP request that is handled by express.
app.use(expressLogger);

console.log(ORIGIN);

const corsOptions = {
  origin: ORIGIN,
  credentials:  true
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS.
app.use(cors(corsOptions));

// https://www.npmjs.com/package/cookie-parser
// TODO: Manage secret securely
app.use(cookieParser("secret"));

// Express middleware that parses incoming requests with JSON payloads.
app.use(express.json());

// Format successful API responses.
app.use(success);

// Mount the actual API router.
app.use(api);

// Handle errors and send formatted responses.
app.use(errorHandler);

module.exports = app;
