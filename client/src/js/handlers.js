const { populateLeaderboards } = require("./orgHelpers");

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

    const response = await (await fetch(
      `http://localhost:3000/users/org/${org}`
    ),
    options).json();

    console.log(response);
    populateLeaderboards(response);
  } catch (err) {
    console.warn(err);
  }
}
