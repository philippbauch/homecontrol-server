const moment = require("moment");
const { CONTEXT, timestamp } = require("./timestamp");
const {
  EXPIRED_TIMESTAMP,
  FUTURE_TIMESTAMP,
  INVALID_TIMESTAMP,
  MISSING_HEADER
} = require("../errors");
const RequestBuilder = require("../../test/RequestBuilder");
const ResponseBuilder = require("../../test/ResponseBuilder");

// Moment will complain about the invalid string format in test("invalid timestamp", ...)
moment.suppressDeprecationWarnings = true;

describe("middleware/timestamp", () => {
  test("valid timestamp", () => {
    const now = moment();

    const req = new RequestBuilder().timestamp(now.valueOf()).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    timestamp(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req).toHaveProperty("time");
  });

  test("invalid timestamp", () => {
    const req = new RequestBuilder().timestamp("Foo").build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    timestamp(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(INVALID_TIMESTAMP);
  });

  test("future timestamp", () => {
    const inTwoMinutes = moment().add(2, "minutes");

    const req = new RequestBuilder().timestamp(inTwoMinutes.valueOf()).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    timestamp(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(FUTURE_TIMESTAMP);
  });

  test("expired timestamp", () => {
    const twoMinutesAgo = moment().subtract(2, "minutes");

    const req = new RequestBuilder().timestamp(twoMinutesAgo.valueOf()).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    timestamp(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(EXPIRED_TIMESTAMP);
  });

  test("missing timestamp", () => {
    const req = new RequestBuilder().build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    timestamp(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(
      MISSING_HEADER("timestamp", CONTEXT)
    );
  });
});
