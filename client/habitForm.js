// Questions, how do I get the forms to run?

// require handlers

// Write function for Identifying Habits, If habits, show habits. If not show form.

function checkHabits() {
  if ((getHabits = {})) {
    getHabitForm();
  } else {
    showHabits();
  }
}

// Create Choose Habits Form Function, must include habit checkboxes and submit to database.

function createHabitForm() {}
// Generate Habit Form Title
const generateTitle = () => {
  const formDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Please Select Three Habits";
  formDiv.appendChild(toLabel);

  return formDiv;
};

// Create Habits form, must include 3 Habits, checkboxes, current score, goal.

function showHabits() {}

// Create form elements:

//

const generateHabits = () => {
  const habitDiv = document.createElement("div");
};

submitButton.addEventListener("submit", generateTitle);
