const carouselList = document.querySelector(".carousel__list");
let elems = Array.from(document.querySelectorAll(".carousel__item"));

// <li class="carousel__item border border-2 border-primary" data-pos="-3">0</li>

carouselList.addEventListener("click", function (event) {
  const newActive = event.target.closest(".carousel__item");
  if (!newActive || newActive.classList.contains("carousel__item_active")) {
    return;
  }
  elems = Array.from(document.querySelectorAll(".carousel__item"));
  update(newActive);
});

const update = function (newActive) {
  const currentActive = document.querySelector(".carousel__item_active");
  if (currentActive) {
    currentActive.classList.remove("carousel__item_active");
  }
  const newActivePos = parseInt(newActive.dataset.pos);
  elems.forEach((elem) => {
    console.log("update");
    const currentPos = parseInt(elem.dataset.pos);
    elem.dataset.pos = calculateNewPos(currentPos, newActivePos);
  });
  newActive.classList.add("carousel__item_active");
};
/*
const calculateNewPos = function (current, active) {
  const totalItems = 7; // Assuming 7 items from -3 to 3
  const diff = active - current;
  const absDiff = Math.abs(diff);

  if (absDiff > totalItems / 2) {
    if (diff > 0) {
      return current + totalItems;
    } else {
      return current - totalItems;
    }
  }

  return diff;
};
*/

const calculateNewPos = function (current, active) {
  const diff = current - active;
  console.log("hey: " + diff);
  if (Math.abs(current - active) > 3) {
    return -current;
  }

  return diff;
};
