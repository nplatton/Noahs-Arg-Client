// Create Choose Habits Form Function, must include habit checkboxes and submit to database.

const generateSelectTitle = () => {
  const habitSDiv = document.createElement("div");
  habitSDiv.classList.add("habitS_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Please Choose Your Habits";
  habitSDiv.appendChild(titleLabel);

  return habitSDiv;
};

function generateSelector() {
  const habitDiv = document.createElement("div");
  habitDiv.classList.add("habitS_form", "label_habit");
  const habits = ["water", "break", "stretch"];

  habits.forEach((habit) => {
    const habitLabel = document.createElement("label");
    habitLabel.innerText = habit;
    const habitCheck = document.createElement("input");
    habitCheck.type = "checkbox";

    const habitSelect = document.createElement("select");
    habitSelect.id = "selector";
    habitSelect.classList.add("habit_selector");

    const goalNums = [1, 2, 3, 4, 5];
    goalNums.forEach((goalNum) => {
      const habitOption = document.createElement("option");
      habitOption.selected = true;
      habitOption.innerText = goalNum;
      habitSelect.appendChild(habitOption);
    });

    // Add Elements to Each Option
    // options.forEach((option) => {
    // const optionElem = document.createElement("option");
    // optionElem.value = option;
    // optionElem.innerText = option;
    // optionElem.classList.add("tag_option");
    // select.appendChild(optionElem);

    habitDiv.appendChild(habitLabel);
    habitDiv.appendChild(habitCheck);
    habitDiv.appendChild(habitSelect);
  });
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
  submit.classList.add("habit_submit");

  form.appendChild(generateSelectTitle());
  form.appendChild(habitData);
  form.appendChild(submit);

  wrapper.append(form);
}

module.exports = {
  generateSelectTitle,
  generateSelector,
  generateSelectorForm,
};
