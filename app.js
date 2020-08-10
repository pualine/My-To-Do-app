// Select all html elements
const clear = document.querySelector(".clear");
const appTime = document.getElementById("appTime");
const appDate = document.getElementById("appDate");
const list = document.getElementById("list");
const plusIcon = document.querySelector(".plusIcon");
const input = document.getElementById("input");

// Initialize Variables for check, uncheck and linethrough
const TICK = "fa-check-circle";
const UNTICK = "fa-circle-thin";
const LINE_THRU = "ruleLine";

// Date and Time
const hour = new Date();
appTime.innerHTML = hour.toLocaleTimeString([], { timeStyle: "short" });

// Date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
appDate.innerHTML = today.toLocaleDateString("en-US", options);

// let LIST = [],
//   id = 0;
let LIST, id;

// Get items from localstorage ---
let data = localStorage.getItem("To-Do");
//  check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; //This set the id of the last item in the list.
  loadItems(LIST);
} else {
  // if data is empty
  LIST = [];
  id = 0;
}

// Load items to the screen ---
function loadItems(array) {
  array.forEach(function (item) {
    addItem(item.name, item.id, item.complete, item.trash);
  });
}

// Clear the local  storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// A To-Do function --(upDate)---
function addItem(todo, id, complete, trash) {
  if (trash) {
    return;
  }
  // Else if a to-do is complete, check and rule line through/uncheck ---
  const SUCCESS = complete ? TICK : UNTICK;
  const LINE = complete ? LINE_THRU : "";

  const items = `<li class="items">
  <i class="fa ${SUCCESS} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${todo}</p>
  <i class="fa fa-trash fa-2x de" job="delete" id="${id}"></i>
</li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, items);
}
// addItem("code the app", 0, true, false);

// Allow the user to press the enter key to add a to-do
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const todo = input.value;
    if (todo) {
      addItem(todo, id, false, false);
      LIST.push({
        name: todo,
        id: id,
        complete: false,
        trash: false,
      });
      // Store items to the localeStorage
      localStorage.setItem("To-Do", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

// The plus Icon
plusIcon.addEventListener("click", function (event) {
  if (event) {
    const clickPlus = input.value;
    if (clickPlus) {
      addItem(clickPlus, id, false, false);
      LIST.push({
        name: clickPlus,
        id: id,
        complete: false,
        trash: false,
      });
      // Store items to the localeStorage
      localStorage.setItem("To-Do", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

// Check out if a to-do is done or uncheck if not
function checkTodo(element) {
  element.classList.toggle(TICK);
  element.classList.toggle(UNTICK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THRU);

  // Update the array
  LIST[element.id].complete = LIST[element.id].complete ? false : true;
}

// Remove To-do
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

// session for the target element created dynamiclly
list.addEventListener("click", function (event) {
  const element = event.target; //this will return the click element in the list
  const jobComplete = element.attributes.job.value;
  if (jobComplete == "complete") {
    checkTodo(element);
  } else if (jobComplete == "delete") {
    removeTodo(element);
  }
  // Store items to the localeStorage
  localStorage.setItem("To-Do", JSON.stringify(LIST));
});
