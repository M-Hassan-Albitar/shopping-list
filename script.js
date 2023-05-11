const form = document.getElementById("item-form");
const inputItem = document.getElementById("item-input");
const itemsList = document.querySelector("ul");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

// Functions
// Add new item
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
  clearBtn.style.display = "block";
  filter.style.display = "block";
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

// Delete item
function delItem(e) {
  const targetElement = e.target;
  if (targetElement.className === "fa-solid fa-xmark") {
    targetElement.parentElement.parentElement.remove();
  }
  const list = document.querySelectorAll("li");
  if (list.length === 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  }
}

// Delete all items
function delAllItems() {
  const items = document.querySelectorAll("li");
  while (itemsList.firstChild) {
    itemsList.firstChild.remove();
  }
  clearBtn.style.display = "none";
  filter.style.display = "none";
}

// Filter the items list
function filterList() {
  const search = filter.value.toLowerCase();
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    const txt = item.textContent.toLocaleLowerCase();
    if (txt.indexOf(search) > -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Events
form.addEventListener("submit", addItem);
itemsList.addEventListener("click", delItem);
clearBtn.addEventListener("click", delAllItems);
filter.addEventListener("input", filterList);
