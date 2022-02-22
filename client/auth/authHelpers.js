function incorrectPassword() {
  const passwordBox = document.querySelector("#login-password");
  passwordBox.style.outline = "1px solid red";
}

module.exports = {
  incorrectPassword,
};
