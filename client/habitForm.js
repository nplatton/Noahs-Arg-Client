// Questions, how do I get the forms to run?

// require handlers

// Write function for Identifying Habits, If habits, show habits. If not show form.
const url = "http://localhost:3000";

// Create Habits form, must include 3 Habits, checkboxes, current score, goal.

// Generate Habit Form Title for Already made habits- Welcomes User
const generateTitle = (data) => {
  const formDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Welcome"; // Check
  formDiv.appendChild(titleLabel);

  return formDiv;
};

// Generates the users habits

function generateHabits(data) {
  const habitsDiv = document.createElement("div");
  // habitsDiv.classList.add("habit_form", "title_habit");

  for (const habit in data.tracked_habits) {
    const habitDiv = document.createElement("div");
    habitDiv.id = habit;
    const habitLabel = document.createElement("label");
    habitLabel.for = habit;
    habitLabel.innerText = habit;

    habitDiv.appendChild(habitLabel);

    const habitGoal = document.createElement("label");
    habitGoal.innerText =
      "Your Goal: " + data.tracked_habits[`${habit}`].target_amount;
    habitDiv.appendChild(habitGoal);
    // const weekDaysss = document.createElement("ul")

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const weekdayIds = ["mon", "tues", "wed", "thurs", "fri"];

    weekdays.forEach((day) => {
      const dayLabel = document.createElement("label");
      dayLabel.innerText = day;

      const dayCheck = document.createElement("input");
      dayCheck.type = "checkbox";
      dayCheck.id = habit + "-" + day;
      habitDiv.appendChild(dayLabel);
      habitDiv.appendChild(dayCheck);
    });

    habitsDiv.appendChild(habitDiv);
  }

  return habitsDiv;
}

function updateHabits(data) {
  const updateButton = document.getElementById("create_btn");
  updateButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");

    var jsonData1 = "{";

    for (const habit in data.tracked_habits) {
      jsonData1 += '"' + habit + '":';

      var monCount = document.getElementById(`${habit}-Monday`).checked ? 1 : 0;
      var tuesCount = document.getElementById(`${habit}-Tuesday`).checked
        ? 1
        : 0;
      var wedCount = document.getElementById(`${habit}-Wednesday`).checked
        ? 1
        : 0;
      var thursCount = document.getElementById(`${habit}-Thursday`).checked
        ? 1
        : 0;
      var friCount = document.getElementById(`${habit}-Friday`).checked ? 1 : 0;
      var weeklyCount = monCount + tuesCount + wedCount + thursCount + friCount;

      var jsonHabit = {
        target_amount: data.tracked_habits[`${habit}`].target_amount,
        mon: monCount,
        tues: tuesCount,
        wed: wedCount,
        thurs: thursCount,
        fri: friCount,
        weekly_count: weeklyCount,
      };

      jsonData1 += JSON.stringify(jsonHabit) + ",";
    }

    var jsonData = jsonData1.slice(0, -1);

    jsonData += "}";

    const options = {
      method: "PATCH",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
      body: jsonData,
    };

    const updateUrl = `${url}/users/${username}/habits`;
    fetch(updateUrl, options).catch((error) => console.log(error));
  });
}

// function generateStreak(data) {
//   const habitDiv = console.log(data);
// }

function generateHabitForm(data) {
  const habitData = generateHabits(data);
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  // add class list for styling

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Update Habits";
  submit.id = "create_btn";
  // add class list for styling

  form.appendChild(generateTitle());
  form.appendChild(habitData);
  form.appendChild(submit);

  wrapper.prepend(form);
}

module.exports = {
  generateTitle,
  generateHabits,
  generateHabitForm,
  updateHabits,
};
