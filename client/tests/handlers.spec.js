/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

const selectHabits = require("../selectHabits");
jest.mock("../selectHabits");

global.fetch = require("jest-fetch-mock");

const url = "https://better-work.herokuapp.com";

describe("handlers.js in org.html & index.html", () => {
  let api;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    api = require("../src/js/handlers.js");
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  describe("getOrgUsers", () => {
    test("it makes GET request to /users/org/:orgName", () => {
      localStorage.setItem("org", "testOrg");
      api.getOrgUsers();
      console.log(fetch.mock.calls);
      expect(fetch.mock.calls[0][0]).toBe(`${url}/users/org/testOrg`);
    });

    test("it warns console on error", () => {
      localStorage.setItem("org", "testOrg");
      fetch.mockReject(new Error("test"));
      try {
        api.getOrgUsers();
      } catch (error) {
        expect(error.message).toBe("test");
      }
    });
  });

  describe("getUser", () => {
    test("it makes GET request to /users/:username", () => {
      localStorage.setItem("username", "tester");
      const fakeEvent = {
        preventDefault: jest.fn(),
      };
      api.getUser(fakeEvent);
      expect(fetch.mock.calls[0][0]).toBe(`${url}/users/tester`);
    });

    test("it warns console on error", () => {
      localStorage.setItem("username", "tester");
      const fakeEvent = {
        preventDefault: jest.fn(),
      };
      fetch.mockReject(new Error("test"));
      try {
        api.getUser(fakeEvent);
      } catch (error) {
        expect(error.message).toBe("test");
      }
    });
  });
});

const html2 = fs.readFileSync(
  path.resolve(__dirname, "../personal.html"),
  "utf8"
);

describe("handlers.js in personal.html", () => {
  let api;
  beforeEach(() => {
    document.documentElement.innerHTML = html2.toString();
    api = require("../src/js/handlers.js");
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  describe("updateHabitSelection", () => {
    test("it sends PATCH request to /users/:username/habits with data", () => {
      localStorage.setItem("username", "tester");
      const fakeEvent = {
        preventDefault: jest.fn(),
        target: {
          1: { value: 1 },
          3: { value: 2 },
          5: { value: 3 },
          7: { value: 4 },
          9: { value: 5 },
          11: { value: 6 },
        },
      };
      console.log(fetch.mock.calls);
      api.updateHabitSelection(fakeEvent);
      expect(fetch.mock.calls[0][1]).toHaveProperty("method", "PATCH");
    });

    test("it makes call to given users habits", () => {
      localStorage.setItem("username", "tester");
      const fakeEvent = {
        preventDefault: jest.fn(),
        target: {
          1: { value: 1 },
          3: { value: 2 },
          5: { value: 3 },
          7: { value: 4 },
          9: { value: 5 },
          11: { value: 6 },
        },
      };
      api.updateHabitSelection(fakeEvent);
      expect(fetch.mock.calls[0][0]).toBe(`${url}/users/tester/habits`);
    });

    test("it warns console on error", () => {
      localStorage.setItem("username", "tester");
      const fakeEvent = {
        preventDefault: jest.fn(),
        target: {
          1: { value: 1 },
          3: { value: 2 },
          5: { value: 3 },
          7: { value: 4 },
          9: { value: 5 },
          11: { value: 6 },
        },
      };
      fetch.mockReject(new Error("test"));
      try {
        api.updateHabitSelection(fakeEvent);
      } catch (error) {
        expect(error.message).toBe("test");
      }
    });
  });

  // describe("updateFct", () => {
  //   test("", () => {});
  // });

  describe("checkForHabits", () => {
    test("it sends GET request to /users/:username/habits", () => {
      localStorage.setItem("username", "tester");
      api.checkForHabits();
      expect(fetch.mock.calls[0][0]).toBe(`${url}/users/tester/habits`);
    });

    test("it warns console on error", () => {
      fetch.mockReject(new Error("test"));
      try {
        api.checkForHabits();
      } catch (error) {
        expect(error.message).toBe("test");
      }
    });
  });
});

describe("helpers", () => {
  let api;
  beforeEach(() => {
    api = require("../src/js/handlers.js");
  });

  describe("helper", () => {
    test("it calls generateSelectorForm on if condition", () => {
      const response = {};
      const fakeEvent = {};
      api.helper(response, fakeEvent);
      expect(selectHabits.generateSelectorForm).toBeCalled();
    });
  });
});
