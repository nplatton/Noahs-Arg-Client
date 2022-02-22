# Source of Truth

Here we will define what we expect the paths to be for our routes and the format of the data we expect to recieve on the client side as a result of the requests.

This initial idea won't account for values recieved as a result of authentication such as JWTs from logging in.

| Action  | HTTP Verb | Path                                                                         | Use                                                                              |
| ------- | --------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Index   | GET       | "/:org/users/"                                                               | Making the leaderboard                                                           |
| Show    | GET       | "/:org/users/:username/"                                                     | Info for logged in users habit page                                              |
| Create  | POST      | "/:org/users/"                                                               | Create a new user                                                                |
| Update  | PATCH/PUT | "/:org/users/:username/habits/" <br/> "/:org/users/:username/habits/:habit/" | Update habit info on weekly selection <br/> Update habit based on daily progress |
| Destroy | DELETE    | "/:org/users/:username/"                                                     | User deletes their account                                                       |

### For any requests that have a body it is defined below:

**Create body**:

```
{
  username: "Person",
  password_digest: "hashed_password",
  org: "organisation",
  habits: {},
  streaks: {
    <habit_name>: {
      highest: 0,
      current: 0,
    },
    <habit_name>: {
      highest: 0,
      current: 0,
    },
  }
}
```

**Update body**:

There are 2 situations:

1. When we send off the information about the weekly habit selection in which `daily_count` and `weekly_count` will be 0

```
{
  habits: {
    <habit_name>: {
      target_amount: x
      daily_count: 0,
      weekly_count: 0,
    }
  }
}
```

2. When we update the daily information on the user's habit page for a specific habit

```
{
  // Empty body - we just increment on the server side
}
```

Note: We will deal with `weekly_count` on the server side

### What we expect to recieve on the client side:

**Index**:

```JSON
{
  "1": {
    "username": "Person",
    "password_digest": "hashed_password",
    "org": "organisation",
    "habits": {
      "<habit_name>": {
        "target_amount": 5,
        "daily_count": 0,
        "weekly_count": 12
      }
    },
    "streaks": {
      "<habit_name>": {
        "highest": 6,
        "current": 0
      }
    }
  }
}
```

**Show**:

```JSON
{
  "username": "Person",
  "password_digest": "hashed_password",
  "org": "organisation",
  "habits": {
    "<habit_name>": {
      "target_amount": 5,
      "daily_count": 0,
      "weekly_count": 12
    }
  },
  "streaks": {
    "<habit_name>": {
      "highest": 6,
      "current": 0
    }
  }
}
```

**Create**:

```JSON

```

**Update**:

We will recieve all the data about the user after the update

```JSON
{
  "username": "Person",
  "password_digest": "hashed_password",
  "org": "organisation",
  "habits": {
    "<habit_name>": {
      "target_amount": 5,
      "daily_count": 0,
      "weekly_count": 0
    }
  },
  "streaks": {
    "<habit_name>": {
      "highest": 6,
      "current": 0
    }
  }
}
```
