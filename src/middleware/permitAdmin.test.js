const { permitAdmin } = require("./permitAdmin");
const RequestBuilder = require("../../test/RequestBuilder");
const ResponseBuilder = require("../../test/ResponseBuilder");

describe("middleware/permitAdmin", () => {
  test("allows admin", () => {
    const user = {
      admin: true
    };

    const req = new RequestBuilder().property("user", user).build();
    const res = new ResponseBuilder().formatted().build();
    const next = jest.fn();

    permitAdmin(req, res, next);

    expect(res.failure).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
