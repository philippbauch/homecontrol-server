const { isObject } = require("./isObject");

describe("utils/isObject", () => {
  test("object is an object, given that null is allowed", () => {
    const object = {};
    const allowNull = true;

    expect(isObject(object, allowNull)).toBe(true);
  });

  test("null is an object, given that null is allowed", () => {
    const object = null;
    const allowNull = true;

    expect(isObject(object, allowNull)).toBe(true);
  });

  test("object is an object, given that null is not allowed", () => {
    const object = {};
    const allowNull = false;

    expect(isObject(object, allowNull)).toBe(true);
  });

  test("null is not an object, given that null is not allowed", () => {
    const object = null;
    const allowNull = false;

    expect(isObject(object, allowNull)).toBe(false);
  });

  test("object is an object", () => {
    const object = {};

    expect(isObject(object)).toBe(true);
  });

  test("null is not an object", () => {
    const object = null;

    expect(isObject(object)).toBe(false);
  });

  test("number is not an object", () => {
    const number = 42;

    expect(isObject(number)).toBe(false);
  });

  test("string is not an object", () => {
    const string = "Foo";

    expect(isObject(string)).toBe(false);
  });
});
