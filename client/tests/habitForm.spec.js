/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../personal.html"),
  "utf8"
);

describe("handlers.js in index.html", () => {
  let habitForm;
  let testData;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    habitForm = require("../habitForm");
    testData = {
      tracked_habits: {
        drink_water: {
          target_amount: 3,
          mon: 0,
          tues: 1,
          wed: 1,
          thurs: 0,
          fri: 0,
          weekly_count: 6,
        },
        break_from_screen: {
          target_amount: 3,
          mon: 1,
          tues: 1,
          wed: 1,
          thurs: 0,
          fri: 0,
          weekly_count: 9,
        },
        stretch: {
          target_amount: 4,
          mon: 1,
          tues: 0,
          wed: 1,
          thurs: 0,
          fri: 0,
          weekly_count: 8,
        },
        eat_fruit: {
          target_amount: 4,
          mon: 0,
          tues: 1,
          wed: 1,
          thurs: 0,
          fri: 0,
          weekly_count: 8,
        },
        fresh_air: {
          target_amount: 1,
          mon: 1,
          tues: 0,
          wed: 1,
          thurs: 0,
          fri: 0,
          weekly_count: 2,
        },
        socialise: {
          target_amount: 3,
          mon: 1,
          tues: 1,
          wed: 1,
          thurs: 0,
          fri: 0,
          weekly_count: 9,
        },
      },
      streaks: {
        drink_water: {
          highest: 3,
          current: 2,
        },
        break_from_screen: {
          highest: 6,
          current: 4,
        },
        stretch: {
          highest: 8,
          current: 1,
        },
        eat_fruit: {
          highest: 5,
          current: 0,
        },
        fresh_air: {
          highest: 1,
          current: 0,
        },
        socialise: {
          highest: 2,
          current: 0,
        },
      },
    };
  });

  describe("generateTitle", () => {
    test("it generates a div with a title element", () => {
      const result = habitForm.generateTitle();
      expect(result.children).toHaveLength(1);
      const title = result.querySelector("label");
      expect(title).toBeTruthy();
      expect(title.innerText).toBe(
        "Welcome to Your Personal Habit Tracker Page"
      );
    });
  });

  describe("generateHabits", () => {
    test("it generates a div containing all weekly habit info on user", () => {
      const result = habitForm.generateHabits(testData);
      expect(result.children).toHaveLength(6);
      const habits = [
        "drink_water",
        "break_from_screen",
        "stretch",
        "eat_fruit",
        "fresh_air",
        "socialise",
      ];
      for (const habit of habits) {
        const habitDiv = result.querySelector(`#${habit}`);
        expect(habitDiv).toBeTruthy();
      }
    });
  });

  describe("generateHabitForm", () => {
    test("it builds the form and adds it to the page", () => {
      const wrapper = document.querySelector(".wrapper");
      const numForms = wrapper.querySelectorAll("form").length;
      habitForm.generateHabitForm(testData);
      const newNumForms = wrapper.querySelectorAll("form").length;
      expect(newNumForms).toEqual(numForms + 1);
      const newForm = wrapper.querySelector("#weekly-habit-form");
      expect(newForm).toBeTruthy();
      expect(newForm.children).toHaveLength(3);
      const submitBtn = newForm.querySelector("#create_btn");
      expect(submitBtn).toBeTruthy();
    });
  });
});
