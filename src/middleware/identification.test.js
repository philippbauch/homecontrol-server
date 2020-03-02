const { ObjectID } = require("mongodb");
const { identification } = require("./identification");
const { db } = require("../db");
const RequestBuilder = require("../../test/RequestBuilder");
const ResponseBuilder = require("../../test/ResponseBuilder");

describe("middleware/identification", () => {
  beforeAll(async () => {
    const [url, dbName] = await db.launchMemoryServer();

    return await db.connect(url, dbName);
  });

  afterAll(async () => {
    return await db.close();
  });

  afterEach(async () => {
    await db.users.deleteMany({});
  });

  test("request object has no auth property", () => {
    const req = new RequestBuilder().build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    identification(req, res, next);

    // expect(res.failure).toHaveBeenCalledWith(INTERNAL_ERROR(CONTEXT));
    expect(next).not.toHaveBeenCalled();
  });

  test("auth object has no userId property", () => {
    const req = new RequestBuilder().property("auth", {}).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    identification(req, res, next);

    // expect(res.failure).toHaveBeenCalledWith(INTERNAL_ERROR(CONTEXT));
    expect(next).not.toHaveBeenCalled();
  });

  test("auth object has an invalid userId property", () => {
    const req = new RequestBuilder()
      .property("auth", { userId: "Foo" })
      .build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    identification(req, res, next);

    // expect(res.failure).toHaveBeenCalledWith(INVALID_OBJECT_ID(CONTEXT));
    expect(next).not.toHaveBeenCalled();
  });

  test("userId does not belong to an existing user", async () => {
    const userId = new ObjectID().toHexString();

    const req = new RequestBuilder().property("auth", { userId }).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await identification(req, res, next);

    // expect(res.failure).toHaveBeenCalledWith(UNKNOWN_AUTH_ENTITY);
    expect(next).not.toHaveBeenCalled();
  });

  test("successfully identify an existing user", async () => {
    const user = {
      identifier: "Foo",
      password: "Foobarista"
    };

    const { insertedId } = await db.users.insertOne(user);

    const userId = insertedId.toHexString();

    const req = new RequestBuilder().property("auth", { userId }).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    await identification(req, res, next);

    expect(req).not.toHaveProperty("auth");
    expect(req).toHaveProperty("user");

    expect(res.failure).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
