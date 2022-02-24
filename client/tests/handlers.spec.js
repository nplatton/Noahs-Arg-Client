/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

global.fetch = require("jest-fetch-mock");

const url = "http://localhost:3000";

describe("handlers.js in index.html", () => {
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
  });
});

const html2 = fs.readFileSync(
  path.resolve(__dirname, "../personal.html"),
  "utf8"
);

describe("handlers.js in index.html", () => {
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
  });

  // describe();
});
