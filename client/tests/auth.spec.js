global.fetch = require("jest-fetch-mock");

describe("auth tests", () => {
  let app;

  beforeEach(() => {
    app = require("../auth/auth");
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  describe("request login", () => {
    test("it makes a post request to /auth/login", () => {
      const fakeSubmitEvent = {
        preventDefault: jest.fn(),
        target: {
          username: { value: "vincent" },
          psw: { value: "vincent" },
        },
      };

      app.requestLogin(fakeSubmitEvent);

      console.log(fetch.mock.calls);
      expect(fetch.mock.calls[0][0]).toString(
        "https://better-work.herokuapp.com/auth/login"
      );
      expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST");
    });
  });

  describe("requestRegistration", () => {
    test("it makes a post request to /auth/register", () => {
      const fakeSubmitEvent = {
        preventDefault: jest.fn(),
        target: {
          username: { value: "vincent" },
          psw: { value: "vincent" },
          org: { value: "Noahs_Arg" },
        },
      };

      app.requestRegistration(fakeSubmitEvent);

      expect(fetch.mock.calls[0][0]).toString(
        "https://better-work.herokuapp.com/auth/register"
      );
      expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST");
      expect(fetch.mock.calls[0].length).toBe(2);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
