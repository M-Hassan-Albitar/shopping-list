const form = document.getElementById("item-form");
const inputItem = document.getElementById("item-input");
const itemsList = document.querySelector("ul");

// Functions
function addItem(e) {
  e.preventDefault();
  const inputValue = inputItem.value;

  if (inputValue === "") {
    alert("Please enter value");
    return;
  } else {
    const li = newItem(inputValue);
    itemsList.appendChild(li);
  }
  inputItem.value = "";
}

// Create new li element
function newItem(txt) {
  const i = createEle("icon", "fa-solid fa-xmark");
  const btn = createEle("button", "remove-item btn-link text-red");
  btn.appendChild(i);
  const li = createEle("li");
  li.textContent = txt;
  li.appendChild(btn);
  return li;
}

// Create new element
function createEle(eleName, classes) {
  const ele = document.createElement(eleName);
  ele.className = classes;
  return ele;
}

// Events
form.addEventListener("submit", addItem);
