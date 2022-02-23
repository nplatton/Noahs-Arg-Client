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

// Generate Habit Form Title

const generateHabits = () => {
  const habitDiv = document.createElement("div");
  // habitDiv.classList.add("habit_form", "title_habit");

  const habitLabel = document.createElement("label");
  habitLabel.for = "habit1";
  habitLabel.innerText = "Drink 3 cups of Water";

  const habitCheck = document.createElement("input");
  habitCheck.type = "checkbox";
};

const generateHabitForm = () => {
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  // add class list for styling

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Create Habits";
  submit.id = "create_btn";
  // add class list for styling

  form.appendChild(generateTitle());
  form.appendChild(generateHabits());
  form.appendChild(submit);

  wrapper.prepend(form);
};

// Create Habits form, must include 3 Habits, checkboxes, current score, goal.

function showHabits() {}

// Create form elements:

// Convert checkbox value into json

// Show Form When Button is Clicked

const showForm = () => {
  generateForm();
  document.querySelector(".add_div");
};
