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

// Generate Habit Form Title
const generateTitle = () => {
  const formDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Please Select Three Habits";
  formDiv.appendChild(titleLabel);

  return formDiv;
};

// Generate Habit Form Title

function generateStreak(data){
 console.log(data);
}

function generateHabits(data){


  console.log(data.tracked_habits.textContent);

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
  }


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

module.exports= {generateHabits, generateHabitForm};