const cors = require("cors");
const express = require("express");
const api = require("./api");
const { errorHandler, errors, success } = require("./middleware");
const { expressLogger } = require("./logger/express");

// Create an express app.
const app = express();

// Log each incoming HTTP request that is handled by express.
app.use(expressLogger);

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS.
app.use(cors());

// Express middleware that parses incoming requests with JSON payloads.
app.use(express.json());

// Format successful API reponses.
app.use(success);

// Standard error responses.
app.use(errors);

// Mount the actual API router.
app.use(api);

// Handle errors and send formatted responses.
app.use(errorHandler);

module.exports = app;
