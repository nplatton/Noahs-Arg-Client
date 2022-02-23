// Create Choose Habits Form Function, must include habit checkboxes and submit to database.

const generateSelectTitle = () => {
  const habitSDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Please Choose Your Habits"; // Get user's name
  habitSDiv.appendChild(titleLabel);

  return habitSDiv;
};

function generateSelector() {
  const habitDiv = document.createElement("div");
  // drink more water
  const waterLabel = document.createElement("label");
  waterLabel.innerText = "drink_water";

  const waterCheck = document.createElement("input");
  waterCheck.type = "checkbox";

  habitDiv.appendChild(waterLabel);
  habitDiv.appendChild(waterCheck);
  // take breaks
  const breakLabel = document.createElement("label");
  breakLabel.innerText = "break_from_screen";

  const breakCheck = document.createElement("input");
  breakCheck.type = "checkbox";

  habitDiv.appendChild(breakLabel);
  habitDiv.appendChild(breakCheck);

  // stretch
  const stretchLabel = document.createElement("label");
  stretchLabel.innerText = "stretch";

  const stretchCheck = document.createElement("input");
  stretchCheck.type = "checkbox";

  habitDiv.appendChild(stretchLabel);
  habitDiv.appendChild(stretchCheck);

  return habitDiv;
}

function generateSelectorForm() {
  const habitData = generateSelector();
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  // add class list for styling

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Create Habits";
  submit.id = "create_btn";
  // add class list for styling

  form.appendChild(generateSelectTitle());
  form.appendChild(habitData);
  form.appendChild(submit);

  wrapper.prepend(form);
}

module.exports = {
  generateSelectTitle,
  generateSelector,
  generateSelectorForm,
};
