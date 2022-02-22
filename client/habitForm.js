// Create form elements:

//
const generateTitle = () => {
  const formDiv = document.createElement("div");
  // formDiv.classList.add("habit_form", "title_habit");

  const titleLabel = document.createElement("label");
  titleLabel.for = "habit";
  titleLabel.innerText = "Please Select Three Habits";
  formDiv.appendChild(toLabel);

  return formDiv;
};

const generateHabits = () => {
  const habitDiv = document.createElement("div");
};
