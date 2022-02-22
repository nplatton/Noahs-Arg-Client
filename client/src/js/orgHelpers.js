function populateLeaderboards(data) {
  // First we want to comput everybody's ranks

  const leaderboard = document.querySelector("#leaderboard");
  data.forEach((user) => {
    leaderboard.appendChild(addUser(user));
  });
}

function addUser(userData) {
  const userBar = document.createElement("div");
  userBar.classList.add("leaderboard-bar");

  const rank = document.createElement("div");
  rank.classList.add("rank-circle");
  // const userRank = rankedList.indexOf(username)
  rank.textContent = userRank;

  const points = document.createElement("div");
  points.classList.add("points-circle");
  const userPoints = computePoints(userData);
  points.textContent = userPoints;

  const usernameSctn = document.createElement("div");
  usernameSctn.classList.add("username-sctn");
  const username = userData.username;
  usernameSctn.textContent = username;

  userBar.appendChild(rank);
  userBar.appendChild(username);
  userBar.appendChild(points);

  return userBar;
}

function getRank(username) {
  // Get actual rank from output of rankUsers()
}

function rankUsers(users) {
  let arr = [];
  for (const user of users) {
    arr.push(`${user.username}: ${computePoints(user)}`);
  }
  // Now we need to sort the array
}

function computePoints(userData) {
  const habits = userData.habits;
  const points = 0;
  for (const habit in habits) {
    points += habit.weekly_count;
  }
  return points;
}

function reorder(arr) {}

module.exports = {
  populateLeaderboards,
};
