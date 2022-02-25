const habitForm = require("../../habitForm");
const habitSelect = require("../../selectHabits");
const { populateLeaderboards } = require("./orgHelpers");

const url = "https://better-work.herokuapp.com";

async function getOrgUsers() {
  // e.preventDefault();
  try {
    const org = localStorage.getItem("org");

    const options = {
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (
      await fetch(`${url}/users/org/${org}`, options)
    ).json();

    populateLeaderboards(response);
  } catch (err) {
    console.warn(err);
  }
}

async function getUser(e) {
  e.preventDefault();

  try {
    const username = localStorage.getItem("username");

    const options = {
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (
      await fetch(`${url}/users/${username}`, options)
    ).json();

    // Use response to populate the habits page

    habitForm.generateHabitForm(response);
    habitForm.updateHabits(response);
    // habitSelect.generateSelectorForm(response);
  } catch (err) {
    console.warn(err);
  }
}

async function updateHabitSelection(e) {
  e.preventDefault();
  try {
    const container = document.querySelector(".wrapper");
    container.innerHTML = "";

    const username = localStorage.getItem("username");

    let arr = [];
    let selectorIds = ["1", "3", "5", "7", "9", "11"];
    for (const id of selectorIds) {
      arr.push(e.target[id].value);
    }

    const habits = [
      "drink_water",
      "break_from_screen",
      "stretch",
      "eat_fruit",
      "fresh_air",
      "socialise",
    ];
    let data = {};
    for (const habit of habits) {
      data[`${habit}`] = {
        target_amount: arr[habits.indexOf(habit)],
        mon: 0,
        tues: 0,
        wed: 0,
        thurs: 0,
        fri: 0,
        weekly_count: 0,
      };
    }

    const options = {
      method: "PATCH",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(data),
    };

    const response = await (
      await fetch(`${url}/users/${username}/habits`, options)
    ).json();

    habitForm.generateHabitForm(response);
    habitForm.updateHabits(response);
  } catch (err) {
    console.warn(err);
  }
}

// async function incrementHabit(e) {
//   e.preventDefault();
//   try {
//     console.log(2);
//     const username = localStorage.getItem("username");
//     const habitId = e.target.id;
//     const habit = habitId.split("-")[0];
//     const day = habitId.split("-")[1];

//     const data = {
//       dayOfWeek: day,
//     };

//     const options = {
//       method: "PATCH",
//       headers: new Headers({
//         authorization: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       }),
//       body: JSON.stringify(data),
//     };

//     await (
//       await fetch(`${url}/users/${username}/habits/${habit}`, options)
//     ).json();
//   } catch (err) {
//     console.warn(err);
//   }
// }

async function checkForHabits(e) {
  try {
    const username = localStorage.getItem("username");

    const options = {
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (
      await fetch(`${url}/users/${username}/habits`, options)
    ).json();

    if (!Object.keys(response).length) {
      habitSelect.generateSelectorForm();
    } else {
      getUser(e);
    }
  } catch (err) {
    console.warn(err);
  }
}

module.exports = {
  getOrgUsers,
  getUser,
  updateHabitSelection,
  // incrementHabit,
  checkForHabits,
};
