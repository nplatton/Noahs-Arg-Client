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

function createHabitForm(data) {}

// Generate Habit Form Title for Already made habits- Welcomes User
const generateTitle = () => {
  const formDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Welcome User"; // Get user's name
  formDiv.appendChild(titleLabel);

  return formDiv;
};

// Generates the users habits

function generateHabits(data) {
  const habitDiv = document.createElement("div");
  // habitDiv.classList.add("habit_form", "title_habit");

  for (const habit in data.tracked_habits) {
    const habitLabel = document.createElement("label");
    habitLabel.for = habit;
    habitLabel.innerText = habit;

    const habitCheck = document.createElement("input");
    habitCheck.type = "checkbox";
    habitDiv.appendChild(habitLabel);
    habitDiv.appendChild(habitCheck);
    // const weekDaysss = document.createElement("ul")
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    weekdays.forEach((day) => {
      const dayLabel = document.createElement("label");
      dayLabel.innerText = day;
      const dayCheck = document.createElement("input");
      dayCheck.type = "checkbox";
      habitDiv.appendChild(dayLabel);
      habitDiv.appendChild(dayCheck);
    });
  }

  return habitDiv;
}
function generateStreak(data) {
  const habitDiv = console.log(data);
}

function generateHabitForm(data) {
  const habitData = generateHabits(data);
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  // add class list for styling

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Create Habits";
  submit.id = "create_btn";
  // add class list for styling

  form.appendChild(generateTitle());
  form.appendChild(habitData);
  form.appendChild(submit);

  wrapper.prepend(form);
}

// Create Habits form, must include 3 Habits, checkboxes, current score, goal.

function showHabits() {}

// Create form elements:

// Convert checkbox value into json

// Show Form When Button is Clicked

const showForm = () => {
  generateForm();
  document.querySelector(".add_div");
};

module.exports = { generateTitle, generateHabits, generateHabitForm };
