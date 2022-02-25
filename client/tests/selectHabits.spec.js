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
  let select;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    select = require("../selectHabits");
  });

  describe("generateSelectTitle", () => {
    test("it returns a div containing a title", () => {
      const result = select.generateSelectTitle();
      expect(result.classList).toContain("habitS_form");
      expect(result.classList).toContain("title_habit");
      expect(result.children).toHaveLength(1);
      const title = result.querySelector("label");
      expect(title).toBeTruthy();
      expect(title.innerText).toBe("Please Choose Your Weekly Habit Goals!");
    });
  });

  describe("generateSelector", () => {
    test("it generates a div containing checkbox & label for each habit", () => {
      const result = select.generateSelector();
      expect(result.children).toHaveLength(18);
      const boxes = result.querySelectorAll("input");
      expect(boxes).toHaveLength(6);
      const labels = result.querySelectorAll("label");
      expect(labels).toHaveLength(6);
      // const habits = [
      //   "Drink One Glass of Water",
      //   "Take A Screen Break",
      //   "5 Minute Stretch",
      //   "Eat One Piece of Fruit",
      //   "Go for a 10 Minute Walk",
      //   "Socialise for Five Minutes",
      // ];
      // for (const habit of habits) {
      //   const habitLabel = result.querySelector(`#${habit}-box-label`);
      //   expect(habitLabel).toBeTruthy();
      // }
    });
  });

  describe("generateSelectorForm", () => {
    test("it adds a new form to the element with class 'wrapper'", () => {
      const wrapper = document.querySelector(".wrapper");
      const numForms = wrapper.querySelectorAll("form").length;
      select.generateSelectorForm();
      const newNumForms = wrapper.querySelectorAll("form").length;
      expect(newNumForms).toEqual(numForms + 1);
      const newForm = wrapper.querySelector("#select-form");
      expect(newForm).toBeTruthy();
    });
  });
});
