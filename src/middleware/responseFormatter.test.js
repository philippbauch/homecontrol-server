const { formatResponse, responseFormatter } = require("./responseFormatter");
const RequestBuilder = require("../../test/RequestBuilder");
const ResponseBuilder = require("../../test/ResponseBuilder");

describe("middleware/responseFormatter", () => {
  test("add success and failure", () => {
    const req = new RequestBuilder().build();

    const res = new ResponseBuilder().build();

    const next = jest.fn();

    responseFormatter(req, res, next);

    expect(res).toHaveProperty("success");
    expect(res).toHaveProperty("failure");

    expect(next).toHaveBeenCalled();
  });
});

describe("middleware/responseFormatter/formatReponse", () => {
  test("format data response", () => {
    const payload = formatResponse("data", {});

    expect(payload).toHaveProperty("data");
  });

  test("format error response", () => {
    const payload = formatResponse("error", {});

    expect(payload).toHaveProperty("error");
  });

  test("format number", () => {
    const payload = formatResponse("data", 42);

    expect(payload.data).toBe(42);
  });

  test("format string", () => {
    const payload = formatResponse("data", "Foo");

    expect(payload.data).toBe("Foo");
  });

  test("format null", () => {
    const payload = formatResponse("data", null);

    expect(payload.data).toBe(null);
  });

  test("format undefined", () => {
    const payload = formatResponse("data", undefined);

    expect(payload.data).toBe(undefined);
  });

  test("format array", () => {
    const data = [];

    const payload = formatResponse("data", data);

    expect(payload.data).toMatchObject(data);
  });

  test("format array of strings", () => {
    const payload = formatResponse("data", ["Foo", "Bar"]);

    expect(payload.data).toMatchObject(["Foo", "Bar"]);
  });

  test("format object", () => {
    const payload = formatResponse("data", {});

    expect(payload.data).toMatchObject({});
  });
});
