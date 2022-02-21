# Source of Truth

Here we will define what we expect the paths to be for our routes and the format of the data we expect to recieve on the client side as a result of the requests.

This initial idea won't account for values recieved as a result of authentication such as JWTs from logging in.

| Action  | HTTP Verb | Path                                  | Use                                    |
| ------- | --------- | ------------------------------------- | -------------------------------------- |
| Index   | GET       | "/:org/users/"                        | Making the leaderboard                 |
| Show    | GET       | "/:org/users/:username/"              | Info for logged in users habit page    |
| Create  | POST      | "/:org/users/"                         | Create a new user                      |
| Update  | PATCH/PUT | "/:org/users/:username/habits/"        | Update habit info                      |
| Destroy | DELETE    | "/:org/users/:username/habits/:habit/" | Delete a habit thats no longer tracked |

For any requests that have a body it is defined below:

Create body:

```
{
  username: "Person",
  password_digest: "hashed_password",
  org: "organisation",
  habits: {}
}
```

Update body:

```
{
  habits: {
    habit: {
      target_amount: x,
      dailyCount: 0,
      weeklyCount: 12,
      streak: 1,
      recentStreak: 4,
      highestStreak: 6,
    }
  }
}
```

Note: By adding a `targeted` boolean to each habit we don't have to worry about differentiating between habits that a user has or hasn't already chosen in the past. However this means storing data when it isnt needed (waste of space)

Note: We can deal with this server side

What we expect to recieve on the client side:

Index/Show:

```JSON
{
  "1": {
    username: "Person",
    password_digest: "hashed_password",
    org: "organisation",
    habits: {
      habit: {
        target_amount: x,
        dailyCount: 0,
        weeklyCount: 12,
        streak: 1,
        recentStreak: 4,
        highestStreak: 6,
      }
    }
  }
}
```

Create:

```JSON

```

Update:

We will recieve all the data about the user after the update

```JSON
{
  "1": {
    username: "Person",
    password_digest: "hashed_password",
    org: "organisation",
    habits: {
      habit: {
        target_amount: x,
        dailyCount: 0,
        weeklyCount: 12,
        streak: 1,
        recentStreak: 4,
        highestStreak: 6,
      }
    }
  }
}
```
