/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../org.html"), "utf8");

describe("handlers.js in index.html", () => {
  let helpers;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    helpers = require("../src/js/orgHelpers");
  });

  // describe("reorder", () => {
  //   test("it reorders an array of strings based on the integer part", () => {
  //     const testArr = ["Test: 2", "Test: 1"];
  //     const newArr = helpers.reorder(testArr);
  //     // expect(newArr).toStrictEqual(["Test: 1", "Test: 2"]);
  //     expect(newArr).toStrictEqual([]);
  //   });
  // });

  describe("computePoints", () => {
    test("it calculates points for a user", () => {
      const testData = {
        tracked_habits: {
          habit1: {
            weekly_count: 2,
          },
          habit2: {
            weekly_count: 3,
          },
        },
      };
      const points = helpers.computePoints(testData);
      expect(points).toEqual(5);
    });
  });

  describe("rankUsers", () => {
    test("it returns sorted array of users", () => {
      const testData = [
        {
          username: "tester1",
          tracked_habits: {
            habit1: {
              weekly_count: 1,
            },
            habit2: {
              weekly_count: 1,
            },
          },
        },
        {
          username: "tester2",
          tracked_habits: {
            habit1: {
              weekly_count: 2,
            },
            habit2: {
              weekly_count: 2,
            },
          },
        },
      ];
      const result = helpers.rankUsers(testData);
      expect(result).toStrictEqual(["tester1: 2", "tester2: 4"]);
    });
  });

  describe("getRank", () => {
    test("it gets the rank of a user", () => {
      const sortedArray = ["tester1: 2", "tester2: 4"];
      const username = "tester1";
      const result = helpers.getRank(username, sortedArray);
      expect(result).toEqual(2);
    });
  });

  describe("addUser", () => {
    test("returns a user bar containing info about a user", () => {
      localStorage.setItem("username", "tester");
      const testRanks = {
        tester: 1,
      };
      const testUser = {
        username: "tester",
        tracked_habits: {
          habit1: {
            weekly_count: 2,
          },
          habit2: {
            weekly_count: 2,
          },
        },
      };
      const userBar = helpers.addUser(testUser, testRanks);
      expect(userBar.children).toHaveLength(3);
      const rank = userBar.querySelector(".rank-circle");
      expect(rank).toBeTruthy();
      const points = userBar.querySelector(".points-circle");
      expect(points).toBeTruthy();
      const username = userBar.querySelector(".username-sctn");
      expect(username).toBeTruthy();
      expect(userBar.classList).toContain("leaderboard-bar");
    });
  });

  describe("populateLeaderboards", () => {
    test("it adds elements to the leaderboards", () => {
      const testUsers = [
        {
          username: "tester1",
          org: "test_org",
          tracked_habits: {
            habit1: {
              weekly_count: 2,
            },
            habit2: {
              weekly_count: 2,
            },
          },
        },
        {
          username: "tester2",
          org: "test_org",
          tracked_habits: {
            habit1: {
              weekly_count: 2,
            },
            habit2: {
              weekly_count: 2,
            },
          },
        },
      ];
      const leaderboard = document.querySelector("#leaderboard");
      const numChildren = leaderboard.children.length;
      helpers.populateLeaderboards(testUsers);
      const newLeaderboard = document.querySelector("#leaderboard");
      const newNumChildren = newLeaderboard.children.length;
      expect(newNumChildren).toEqual(numChildren + 2);
    });
  });
});
