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

  describe("generateTitle", () => {
    test("it generates a div with a title element", () => {
      const result = select.generateTitle();
      expect(result.children).toHaveLength(1);
      const title = result.querySelector("label");
      expect(title).toBeTruthy();
      expect(title.innerText).toBe("Welcome");
    });
  });
});
