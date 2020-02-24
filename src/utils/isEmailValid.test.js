const { validateEmail } = require("./isEmailValid");

describe("utils/isEmailValid", () => {
  test("valid email", () => {
    const email = "test@codeship.de";
    const isEmailValid = validateEmail(email);

    expect(isEmailValid).toBe(true);
  });

  test("no prefix", () => {
    const email = "@codeship.de";
    const isEmailValid = validateEmail(email);

    expect(isEmailValid).toBe(false);
  });

  test("no toplevel domain", () => {
    const email = "test@codeship";
    const isEmailValid = validateEmail(email);

    expect(isEmailValid).toBe(false);
  });

  test("missing @", () => {
    const email = "codeship.de";
    const isEmailValid = validateEmail(email);

    expect(isEmailValid).toBe(false);
  });
});
