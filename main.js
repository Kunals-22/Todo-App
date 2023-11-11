let textInput = document.getElementById("textInput");
let form = document.getElementById("form");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.innerHTML = "";
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("task can't be blank");
    msg.innerHTML = "Task can't be blank";
  } else {
    console.log("Success");
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })(); // iife function (if textInputs are blank and Add btn is clicked is should not dismiss or closed.)
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    desc: textArea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  createTask();
};

let createTask = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    // y will get index ele of each element
    return (tasks.innerHTML += `
    <div id=${y}>
      <span class="fw-bold">${x.text}</span>
      <span class="small text-secondary">${x.date}</span>
      <p>${x.desc}</p>

      <span class="options text-center">
        <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onclick="deleteTask(this);createTask()" class="fas fa-trash-alt"></i>
      </span>
    </div>
  `);
  });
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textArea.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTask();
})();
