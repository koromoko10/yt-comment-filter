const newUserInput = document.getElementById("newUser");
const addUserButton = document.getElementById("addUser");
const userList = document.getElementById("userList");

const newRegexInput = document.getElementById("newRegex");
const addRegexButton = document.getElementById("addRegex");
const regexList = document.getElementById("regexList");

function loadFilters() {
  chrome.storage.local.get({ userFilters: [], regexFilters: [] }, (data) => {
    userList.innerHTML = "";
    data.userFilters.forEach(user => addUserToDOM(user));

    regexList.innerHTML = "";
    data.regexFilters.forEach(regex => addRegexToDOM(regex));
  });
}

function addUserToDOM(user) {
  const li = document.createElement("li");
  li.textContent = user;
  const delBtn = document.createElement("button");
  delBtn.textContent = "削除";
  delBtn.addEventListener("click", () => removeUser(user, li));
  li.appendChild(delBtn);
  userList.appendChild(li);
}

function addRegexToDOM(regex) {
  const li = document.createElement("li");
  li.textContent = regex;
 
  const delBtn = document.createElement("button");
  delBtn.textContent = "削除";
  delBtn.addEventListener("click", () => removeRegex(regex, li));
  li.appendChild(delBtn);
  regexList.appendChild(li);
}

function addUser() {
  const user = newUserInput.value.trim();
  if (!user) return;
  chrome.storage.local.get({ userFilters: [] }, (data) => {
    if (!data.userFilters.includes(user)) {
      const updated = [...data.userFilters, user];
      chrome.storage.local.set({ userFilters: updated }, loadFilters);
    }
  });
  newUserInput.value = "";
}

function addRegex() {
  const regex = newRegexInput.value.trim();
  if (!regex) return;
  chrome.storage.local.get({ regexFilters: [] }, (data) => {
    if (!data.regexFilters.includes(regex)) {
      const updated = [...data.regexFilters, regex];
      chrome.storage.local.set({ regexFilters: updated }, loadFilters);
    }
  });
  newRegexInput.value = "";
}

function removeUser(user, li) {
  chrome.storage.local.get({ userFilters: [] }, (data) => {
    const updated = data.userFilters.filter(u => u !== user);
    chrome.storage.local.set({ userFilters: updated }, loadFilters);
  });
}

function removeRegex(regex, li) {
  chrome.storage.local.get({ regexFilters: [] }, (data) => {
    const updated = data.regexFilters.filter(r => r !== regex);
    chrome.storage.local.set({ regexFilters: updated }, loadFilters);
  });
}

addUserButton.addEventListener("click", addUser);
addRegexButton.addEventListener("click", addRegex);
window.addEventListener("DOMContentLoaded", loadFilters);