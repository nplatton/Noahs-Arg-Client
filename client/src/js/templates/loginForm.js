function loginFormTemplate() {
  return `<form id="register-form" action="submit" class="formWrapper1">
  <div class="container">
    <h2>Sign Up</h2>
    <p>Please fill in this form to create an account.</p>
    <hr />

    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" id="username" required />

    <label for="org"><b>Organisation</b></label>
    <input
    type="text"
    placeholder="Enter Organisation"
    name="org"
    required
    />

    <label for="psw"><b>Password</b></label>
    <input
      type="password"
      placeholder="Enter Password"
      name="psw"
      id="password"
      required
    />

    <div class="clearfix">
      <button type="submit" class="signupbtn">Sign Up</button>
    </div>
  </div>
</form>

<form id="login-form" action="submit" class="formWrapper2">
  <div class="container">
    <h2>Sign In</h2>
    <p>Please fill in this form to sign into your account.</p>
    <hr />

    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required />

    <label for="psw"><b>Password</b></label>
    <input
      id="login-password"
      type="password"
      placeholder="Enter Password"
      name="psw"
      required
    />

    <div class="clearfix">
      <button type="submit" class="signinbtn">Sign In</button>
    </div>
  </div>
</form>`;
}

module.exports = loginFormTemplate;
