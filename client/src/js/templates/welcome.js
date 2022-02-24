function welcomeTemplate(username) {
  return `<div id="rule-container">
  <h2>Hi, ${username}!</h2>
  <div class="rules-square">
    <h3>Website Guide:</h3>
    <p>Welcome! Now you are logged in you have access to everything our site has to offer!<br/>
    Let us start with a quick breakdown of your pages:</p>
    <h4>Habits Page</h4>
    <p>Use this page to view and update your weekly habits!<br/>
    At the start of each week you make a choice of your daily targets for each habit.<br/>
    You can then view your progress on your habit page!<br/>
    When you're there you can also check off your completed habit for the day and view the current streak you are on for that habit!</p>
    <h4>Organisation Page</h4>
    <p>View the leaderboards of all your peers within your organisation! Who said we can't make habit tracking competitive!<br/>
    I bet you're wondering, how does the scoring system even work?<br/>
    Well, as we mentioned above, you choose how many of a task you want to complete in a day. For example, you may choose to set your daily target for drinking water to be 5 cups. Then each day you complete this task you would get 5 point and this gets added to your weekly total!
    It's as simple as that!</p>
    <h5>Go ahead and enjoy!</h5>
  </div>
</div>
  `;
}

module.exports = welcomeTemplate;
