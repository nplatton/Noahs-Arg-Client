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

    generateHabits(response);
    console.log(response);
    // Use response to populate the habits page
  } catch (err) {
    console.warn(err);
  }
}
