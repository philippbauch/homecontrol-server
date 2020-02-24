const jwt = require("jsonwebtoken");
const { authentication, CONTEXT } = require("./authentication");
const {
  INVALID_PAYLOAD_TYPE,
  INVALID_TOKEN,
  MISSING_HEADER
} = require("../errors");
const RequestBuilder = require("../../test/RequestBuilder");
const ResponseBuilder = require("../../test/ResponseBuilder");

describe("middleware/authentication", () => {
  test("authentication header holds a valid token", async () => {
    const token = await jwt.sign({ user: { _id: 42 } }, "secret");

    const req = new RequestBuilder().token(token).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req).toHaveProperty("auth");
  });

  test("authentication token has an invalid type", async () => {
    const token = await jwt.sign("Foo", "secret");

    const req = new RequestBuilder().token(token).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(INVALID_PAYLOAD_TYPE(CONTEXT));
    expect(next).not.toHaveBeenCalled();
  });

  test("token payload is missing the a property", async () => {
    const token = await jwt.sign({}, "secret");

    const req = new RequestBuilder().token(token).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(INVALID_TOKEN);
    expect(next).not.toHaveBeenCalled();
  });

  test("encoded user has no id", async () => {
    const token = await jwt.sign({ user: {} }, "secret");

    const req = new RequestBuilder().token(token).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(INVALID_TOKEN);
    expect(next).not.toHaveBeenCalled();
  });

  test("authentication header doesn't exists", async () => {
    const req = new RequestBuilder().build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(
      MISSING_HEADER("authentication", CONTEXT)
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("authentication header is null", async () => {
    const req = new RequestBuilder().token(null).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(
      MISSING_HEADER("authentication", CONTEXT)
    );
    expect(next).not.toHaveBeenCalled();
  });

  test("Incorrect JWT secret", async () => {
    const token = await jwt.sign({}, "incorrect-secret");

    const req = new RequestBuilder().token(token).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(INVALID_TOKEN);
    expect(next).not.toHaveBeenCalled();
  });

  test("JWT token is a random string", async () => {
    const token = "random string";

    const req = new RequestBuilder().token(token).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await authentication(req, res, next);

    expect(res.failure).toHaveBeenCalledWith(INVALID_TOKEN);
    expect(next).not.toHaveBeenCalled();
  });
});
