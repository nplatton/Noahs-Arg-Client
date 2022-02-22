const { populateLeaderboards } = require("./orgHelpers");

const url = "http://localhost:3000";

async function getOrgUsers(e) {
  e.preventDefault();
  try {
    const org = localStorage.getItem("org");

    const options = {
      headers: new Headers({
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      }),
    };

    const response = await (await fetch(`${url}/users/org/${org}`),
    options).json();

    console.log(response);
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

    const response = await await (await fetch(`${url}/${username}`)).json();

    console.log(response);
    // Use response to populate the habits page
  } catch (err) {
    console.warn(err);
  }
}
