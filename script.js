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
    saveData(inputValue);
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
    checkLi(targetElement);
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
  removeAllData();
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
window.addEventListener("DOMContentLoaded", showDataList);
form.addEventListener("submit", addItem);
itemsList.addEventListener("click", delItem);
clearBtn.addEventListener("click", delAllItems);
filter.addEventListener("input", filterList);

// save the data in local storage
function saveData(txt) {
  const arr = testData();
  arr.push(txt);
  localStorage.setItem("item", JSON.stringify(arr));
}

// Test data is there
function testData() {
  const getItems = JSON.parse(localStorage.getItem("item"));
  let dtArr;
  if (getItems === null) {
    dtArr = [];
  } else {
    dtArr = getItems;
  }
  return dtArr;
}

// Show the data onload
function showDataList() {
  const getItems = JSON.parse(localStorage.getItem("item"));
  if (getItems !== null) {
    getItems.forEach((item) => {
      const li = newItem(item);
      itemsList.appendChild(li);
      clearBtn.style.display = "block";
      filter.style.display = "block";
    });
  }
}

// Clear all data from local storage
function removeAllData() {
  localStorage.removeItem("item");
}

// Delete data also from local storage
function checkLi(ele) {
  const items = JSON.parse(localStorage.getItem("item"));
  // const li = document.querySelectorAll("li");
  const parent = ele.parentElement.parentElement;
  items.forEach((i, index) => {
    if (i === parent.textContent) {
      items.splice(index, 1);
    }
    localStorage.setItem("item", JSON.stringify(items));
  });
}
