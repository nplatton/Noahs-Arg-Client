function populateLeaderboards(data) {
  const above = document.querySelector("#above");
  above.textContent = `${data[0].org}`;
  // First we want to comput everybody's ranks
  const sortedArray = rankUsers(data);
  const ranks = {};
  for (const user of data) {
    ranks[`${user.username}`] = getRank(user.username, sortedArray);
  }

  const leaderboard = document.querySelector("#leaderboard");
  data.forEach((user) => {
    leaderboard.appendChild(addUser(user, ranks));
  });
}

function addUser(userData, ranks) {
  const userBar = document.createElement("div");
  userBar.classList.add("leaderboard-bar");

  const rank = document.createElement("div");
  rank.classList.add("rank-circle");
  const userRank = ranks[`${userData.username}`];
  rank.textContent = userRank;

  const points = document.createElement("div");
  points.classList.add("points-circle");
  const userPoints = computePoints(userData);
  points.textContent = userPoints + " points";

  if (userData.username == localStorage.getItem("username")) {
    const pointsHolder = document.querySelector("#points-container");
    pointsHolder.textContent = userPoints;
  }

  const usernameSctn = document.createElement("div");
  usernameSctn.classList.add("username-sctn");
  const username = userData.username;
  usernameSctn.textContent = username;

  userBar.appendChild(rank);
  userBar.appendChild(usernameSctn);
  userBar.appendChild(points);

  return userBar;
}

function getRank(username, sortedArray) {
  // Get actual rank from output of rankUsers()
  for (const item of sortedArray) {
    if (item.split(":")[0] == username) {
      return sortedArray.length - sortedArray.indexOf(item);
    }
  }
}

function rankUsers(users) {
  let arr = [];
  for (const user of users) {
    arr.push(`${user.username}: ${computePoints(user)}`);
  }
  const sortedArray = reorder(arr);
  return sortedArray;
}

function computePoints(userData) {
  const habits = userData.tracked_habits;
  let points = 0;
  for (const habit in habits) {
    points += parseInt(habits[`${habit}`].weekly_count);
  }
  return points;
}

function reorder(arr) {
  let sortedArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      sortedArr.push(arr[i]);
    } else {
      for (let j = 0; j < sortedArr.length; j++) {
        if (
          parseInt(arr[i].split(" ")[1]) < parseInt(sortedArr[j].split(" ")[1])
        ) {
          sortedArr = sortedArr.splice(j, 0, arr[i]);
          break;
        } else if (
          j == sortedArr.length - 1 &&
          parseInt(arr[i].split(" ")[1]) >= parseInt(sortedArr[j].split(" ")[1])
        ) {
          sortedArr.push(arr[i]);
          break;
        }
      }
    }
  }
  return sortedArr;
}

module.exports = {
  populateLeaderboards,
};
