const habitForm = require("../../habitForm");
const habitSelect = require("../../selectHabits");
const { populateLeaderboards } = require("./orgHelpers");

const url = "http://localhost:3000";

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

    console.log(response);

    // habitForm.generateHabitForm(response);
    habitSelect.generateSelectorForm(response);

    console.log(response);
    // Use response to populate the habits page
  } catch (err) {
    console.warn(err);
  }
}

// async function updateHabitSelection(e) {
//   e.preventDefault();
//   try {
//     const username = localStorage.getItem("username");

//     const data = {};
//     for (const habit of e.target) {
//       data[`${habit}`] = {
//         target_amount: e.target[`${habit}`].value,
//         daily_count: 0,
//         weekly_count: 0,
//       };
//     }

//     const options = {
//       method: "PATCH",
//       headers: new Headers({
//         authorization: localStorage.getItem("token"),
//         "Content-Type": "application/json",
//       }),
//       body: JSON.stringify(data),
//     };

//     const reponse = await (
//       await fetch(`${url}/users/${username}/habits`, options)
//     ).json();
//     console.log(response);
//   } catch (err) {
//     console.warn(err);
//   }
// }

async function incrementHabit(e) {
  e.preventDefault();
  try {
    const username = localStorage("username");
    const habit = e.target.id;

    const options = {
      method: "PATCH",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (
      await fetch(`${url}/users/${username}/habits/${habit}`)
    ).json();

    console.log(response);
  } catch (err) {
    console.warn(err);
  }
}

// async function deleteHabits(e) {
//   e.preventDefault();
//   try {
//     const username = localStorage.getItem("username");

//     const options = {
//       method: "DELETE",
//     };

//     const response = await (
//       await fetch(`${url}/users/${username}/habits`, options)
//     ).json();
//     console.log(response);
//   } catch (err) {
//     console.warn(err);
//   }
// }

module.exports = {
  getOrgUsers,
  getUser,
  // updateHabitSelection,
  incrementHabit,
  // deleteHabits,
};
