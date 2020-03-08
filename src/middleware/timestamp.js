const moment = require("moment");
const {
  ExpiredTimestampError,
  FutureTimestampError,
  InvalidTimestampError,
  MissingHeaderError
} = require("../errors");
const { wrapSync } = require("../utils");

const CONTEXT = "timestamp";

const timestamp = wrapSync(function(req, res, next) {
  let { timestamp } = req.headers;

  if (!timestamp) {
    throw new MissingHeaderError("timestamp");
  }

  if (!Number.isInteger(timestamp)) {
    timestamp = Number.parseInt(timestamp);

    if (Number.isNaN(timestamp)) {
      throw new InvalidTimestampError();
    }
  }

  const timeOfRequest = moment(timestamp);

  if (!timeOfRequest.isValid()) {
    throw new InvalidTimestampError();
  }

  const now = moment();
  const timeDiffInMinutes = now.diff(timeOfRequest, "minutes");

  if (timeDiffInMinutes < 0) {
    throw new FutureTimestampError();
  }

  if (timeDiffInMinutes >= 2) {
    throw new ExpiredTimestampError();
  }

  req.time = timeOfRequest;

  next();
}, CONTEXT);

module.exports = { CONTEXT, timestamp };
