const container = document.querySelector("#inner-container");

let x0;
container.addEventListener("mousedown", (e) => {
  x0 = e.clientX;
  let x1;
  container.addEventListener("mouseup", (e) => {
    x1 = e.clientX;
    slider(x0, x1);
  });
});

container.addEventListener("touchstart", (e) => {
  let x0 = e.touches.item(0).clientX;
  let x1;
  container.addEventListener("touchend", (e) => {
    x1 = e.changedTouches.item(0).clientX;
    slider(x0, x1);
  });
});

function slider(x0, x1) {
  const i = getComputedStyle(document.documentElement).getPropertyValue("--i");
  console.log(i);
  if (i == 0 && x0 >= x1) {
    document.documentElement.style.setProperty("--i", 1);
  } else if (i == 1 && x1 > x0) {
    document.documentElement.style.setProperty("--i", 0);
  }
}
