(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        const jwt_decode = require("jwt-decode");
        const API_URL = "http://localhost:3000";

        const { incorrectPassword } = require("./authHelpers.js");

        async function requestLogin(e) {
          e.preventDefault();

          try {
            console.log(e.target);
            const data = {
              username: e.target.username.value,
              password: e.target.psw.value,
            };
            const options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            };

            const r = await fetch(`${API_URL}/auth/login`, options);
            const response = await r.json();
            if (!response.success) {
              incorrectPassword();
              throw new Error("Login not authorised");
            }
            login(response.token);
          } catch (err) {
            console.warn(err);
          }
        }

        async function requestRegistration(e) {
          e.preventDefault();
          try {
            const data = {
              username: e.target.username.value,
              password: e.target.psw.value,
              org: e.target.org.value,
            };
            const options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            };
            const response = await (
              await fetch(`${API_URL}/auth/register`, options)
            ).json();
            if (response.err) {
              throw Error(response.err);
            }
            requestLogin(e);
          } catch (err) {
            console.warn(err);
          }
        }

        function login(token) {
          const user = jwt_decode(token);
          localStorage.setItem("token", token);
          localStorage.setItem("username", user.username);
          localStorage.setItem("org", user.org);

          document.getElementById("register-form").style.display = "none";
          document.getElementById("login-form").style.display = "none";

          // window.location.replace("personal.html");
        }

        function logout() {
          localStorage.clear();
          location.reload();
        }

        function currentUser() {
          const username = localStorage.getItem("username");
          return username;
        }

        module.exports = {
          requestLogin,
          requestRegistration,
          logout,
          currentUser,
          login,
        };
      },
      { "./authHelpers.js": 2, "jwt-decode": 4 },
    ],
    2: [
      function (require, module, exports) {
        function incorrectPassword() {
          const passwordBox = document.querySelector("#login-password");
          passwordBox.style.outline = "1px solid red";
        }

        module.exports = {
          incorrectPassword,
        };
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        const { requestLogin, requestRegistration } = require("./auth/auth");

        const handlers = require("./src/js/handlers");

        const loginForm = document.querySelector("#login-form");
        const registerForm = document.querySelector("#register-form");

        loginForm && loginForm.addEventListener("submit", requestLogin);
        registerForm &&
          registerForm.addEventListener("submit", requestRegistration);

        // If the user is logged in, don't show login forms when returning to homepage
        if (
          window.location.pathname == "/index.html" &&
          !!localStorage.getItem("username")
        ) {
          const formContainer = document.querySelector("#home-form-container");
          formContainer.innerHTML = "";
        } else if (window.location.pathname == "/org.html") {
          handlers.getOrgUsers();
        }

        // ---------------- ORG PAGE -----------------------

        const container = document.querySelector("#inner-container");

        let x0;
        container &&
          container.addEventListener("mousedown", (e) => {
            x0 = e.clientX;
            let x1;
            container.addEventListener("mouseup", (e) => {
              x1 = e.clientX;
              slider(x0, x1);
            });
          });

        container &&
          container.addEventListener("touchstart", (e) => {
            let x0 = e.touches.item(0).clientX;
            let x1;
            container.addEventListener("touchend", (e) => {
              x1 = e.changedTouches.item(0).clientX;
              slider(x0, x1);
            });
          });

        function slider(x0, x1) {
          const i = getComputedStyle(document.documentElement).getPropertyValue(
            "--i"
          );
          if (i == 0 && x0 >= x1) {
            document.documentElement.style.setProperty("--i", 1);
          } else if (i == 1 && x1 > x0) {
            document.documentElement.style.setProperty("--i", 0);
          }
        }
      },
      { "./auth/auth": 1, "./src/js/handlers": 5 },
    ],
    4: [
      function (require, module, exports) {
        "use strict";
        function e(e) {
          this.message = e;
        }
        (e.prototype = new Error()),
          (e.prototype.name = "InvalidCharacterError");
        var r =
          ("undefined" != typeof window &&
            window.atob &&
            window.atob.bind(window)) ||
          function (r) {
            var t = String(r).replace(/=+$/, "");
            if (t.length % 4 == 1)
              throw new e(
                "'atob' failed: The string to be decoded is not correctly encoded."
              );
            for (
              var n, o, a = 0, i = 0, c = "";
              (o = t.charAt(i++));
              ~o && ((n = a % 4 ? 64 * n + o : o), a++ % 4)
                ? (c += String.fromCharCode(255 & (n >> ((-2 * a) & 6))))
                : 0
            )
              o =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
                  o
                );
            return c;
          };
        function t(e) {
          var t = e.replace(/-/g, "+").replace(/_/g, "/");
          switch (t.length % 4) {
            case 0:
              break;
            case 2:
              t += "==";
              break;
            case 3:
              t += "=";
              break;
            default:
              throw "Illegal base64url string!";
          }
          try {
            return (function (e) {
              return decodeURIComponent(
                r(e).replace(/(.)/g, function (e, r) {
                  var t = r.charCodeAt(0).toString(16).toUpperCase();
                  return t.length < 2 && (t = "0" + t), "%" + t;
                })
              );
            })(t);
          } catch (e) {
            return r(t);
          }
        }
        function n(e) {
          this.message = e;
        }
        function o(e, r) {
          if ("string" != typeof e) throw new n("Invalid token specified");
          var o = !0 === (r = r || {}).header ? 0 : 1;
          try {
            return JSON.parse(t(e.split(".")[o]));
          } catch (e) {
            throw new n("Invalid token specified: " + e.message);
          }
        }
        (n.prototype = new Error()), (n.prototype.name = "InvalidTokenError");
        const a = o;
        (a.default = o), (a.InvalidTokenError = n), (module.exports = a);
      },
      {},
    ],
    5: [
      function (require, module, exports) {
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
      },
      { "./orgHelpers": 6 },
    ],
    6: [
      function (require, module, exports) {
        function populateLeaderboards(data) {
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
          points.textContent = userPoints;

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
                  parseInt(arr[i].split(" ")[1]) <
                  parseInt(sortedArr[j].split(" ")[1])
                ) {
                  sortedArr = sortedArr.splice(j, 0, arr[i]);
                  break;
                } else if (
                  j == sortedArr.length - 1 &&
                  parseInt(arr[i].split(" ")[1]) >=
                    parseInt(sortedArr[j].split(" ")[1])
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
      },
      {},
    ],
  },
  {},
  [3]
);
