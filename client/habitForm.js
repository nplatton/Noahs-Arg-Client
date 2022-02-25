// Questions, how do I get the forms to run?

// require handlers

// Write function for Identifying Habits, If habits, show habits. If not show form.
const url = "http://localhost:3000";

// Create Habits form, must include 3 Habits, checkboxes, current score, goal.

// Generate Habit Form Title for Already made habits- Welcomes User
const generateTitle = (data) => {
  const formDiv = document.createElement("div");
  formDiv.classList.add("title_got");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Welcome to Your Personal Habit Tracker Page"; // Check
  formDiv.appendChild(titleLabel);

  return formDiv;
};

// Generates the users habits

function generateHabits(data) {
  const habitsDiv = document.createElement("div");
  const dataHabits = [
    "drink_water",
    "break_from_screen",
    "stretch",
    "eat_fruit",
    "fresh_air",
    "socialise",
  ];
  const habitNames = [
    "Drink One Glass of Water",
    "Take A Screen Break",
    "5 Minute Stretch",
    "Eat One Piece of Fruit",
    "Go for a 10 Minute Walk",
    "Socialise for Five Minutes",
  ];

  for (const habit in data.tracked_habits) {
    const habitDiv = document.createElement("div");
    habitDiv.id = habit;
    const habitLabel = document.createElement("label");
    habitLabel.for = habit;
    habitLabel.innerText = habitNames[dataHabits.indexOf(habit)];

    habitDiv.appendChild(habitLabel);

    // const weekDaysss = document.createElement("ul")

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const weekdayIds = ["mon", "tues", "wed", "thurs", "fri"];

    weekdays.forEach((day) => {
      const dayLabel = document.createElement("label");
      dayLabel.innerText = day;

      const dayCheck = document.createElement("input");
      dayCheck.type = "checkbox";
      dayCheck.id = habit + "-" + day;
      habitDiv.appendChild(dayCheck);
      habitDiv.appendChild(dayLabel);
    });

    const habitGoal = document.createElement("label");
    habitGoal.innerText =
      "Your Goal: " + data.tracked_habits[`${habit}`].target_amount;
    habitDiv.appendChild(habitGoal);

    const currentStreak = document.createElement("label");
    currentStreak.innerText =
      "Current Streak: " + data.streaks[`${habit}`].current;
    habitDiv.appendChild(currentStreak);

    const highestStreak = document.createElement("label");
    highestStreak.innerText =
      "Highest Streak: " + data.streaks[`${habit}`].highest;
    habitDiv.appendChild(highestStreak);

    habitDiv.classList.add("habit_got");
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
  const formEle = document.createElement("form");
  formEle.classList.add("form_got");

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Update Habits";
  submit.id = "create_btn";
  // add class list for styling

  formEle.appendChild(generateTitle());
  formEle.appendChild(habitData);
  formEle.appendChild(submit);
  submit.classList.add("got_submit");

  wrapper.prepend(formEle);
}

module.exports = {
  generateTitle,
  generateHabits,
  generateHabitForm,
  updateHabits,
};
