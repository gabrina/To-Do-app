//selecting elements
const todoName = document.getElementById("todo-name");
const todoDate = document.getElementById("todo-due");
const addNewToDo = document.getElementById("addNewToDo");
const alertBox = document.getElementById("alert-massage");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
const editButton = document.getElementById("editToDo");

//defining global variables
const todos = JSON.parse(localStorage.getItem("todos")) || [];

//defining handlers and methods
const createUniqeID = () => {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomPart = Math.floor(Math.random() * 1e6); // Random 6-digit number
  return Number(`${timestamp}${randomPart}`); // Combine and return as a number
};

const saveTasks = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const showAlert = (massage, type) => {
  alertBox.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = massage;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertBox.append(alert);
};

const addNewToDoHandler = () => {
  if (todoName.value) {
    const task = {
      id: createUniqeID(),
      name: todoName.value,
      date: todoDate.value,
      status: "pending",
    };
    todos.push(task);
    saveTasks();
    todoName.value = ""; //getting ready for the next input
    todoDate.value = "";
    showAlert("Task added", "success");
    displayTodos();
  } else {
    showAlert("Enter valid values", "error");
  }
};

const displayTodos = () => {
  todosBody.innerHTML = "";
  if (todos.length) {
    todos.forEach((task) => {
      //preserving previous looped taskes
      todosBody.innerHTML += `<tr>
      <td>${task.name}</td>
      <td>${task.date || "No Date"}</td>
      <td>${task.status}</td>
      <td>
      <button class="editButton actionButton" onclick="editHandler('${
        task.id
      }')">edit</button>
      <button class="doButton actionButton" onclick="doHandeler('${
        task.id
      }')">${task.status === "pending" ? `do` : `undo`}</button>
      <button class="deleteButton actionButton" onclick="deleteHandeler('${
        task.id
      }')">delete</button>
      </td></tr>`;
    });
  } else {
    todosBody.innerHTML = `<tr id="no-task"><td colspan="4" id="no-data-found">No data found</td></tr>`;
    return;
  }
}; //note: task.id converts to string when it's added to html code

const deleteAllHandeler = () => {
  if (todos.length) {
    const areYouSure = confirm("Are you sure you want to proceed?");
    if (areYouSure) {
      todos.length = 0; //clear a constant array
      saveTasks();
      displayTodos();
      showAlert("Tasks removed", "success");
    }
  } else {
    showAlert("Todos is empty", "error");
  }
};

const deleteHandeler = (ID) => {
  const taskToGo = todos.find((task) => task.id === Number(ID));
  if (taskToGo) {
    todos.splice(taskToGo, 1);
    saveTasks();
    displayTodos();
    showAlert("Task deleted", "success");
  } else {
    showAlert("Something went wrong, try again", "error");
  }
};

const doHandeler = (ID) => {
  const taskToGo = todos.find((task) => task.id === Number(ID));
  if (taskToGo) {
    if (taskToGo.status === "pending") {
      taskToGo.status = "completed";
    } else {
      taskToGo.status = "pending";
    }
    saveTasks();
    displayTodos();
    showAlert("Tasked toggled", "success");
  } else {
    showAlert("Something went wrong, try again", "error");
  }
};

const editHandler = (ID) => {
  const taskToGo = todos.find((task) => task.id === Number(ID));

  if (taskToGo) {
    todoName.value = taskToGo.name;
    todoDate.value = taskToGo.date;
    addNewToDo.style.display = "none";
    editButton.style.display = "inline-block";
    editButton.dataset.id = ID;
  } else {
    showAlert("Something went wrong, try again", "error");
  }
};

const applyEditing = (event) => {
  const id = Number(event.target.dataset.id);
  const todo = todos.find((task) => task.id === id);
  todo.name = todoName.value;
  todo.date = todoDate.value;
  addNewToDo.style.display = "inline-block";
  editButton.style.display = "none";
  todoName.value = "";
  todoDate.value = "";
  saveTasks();
  displayTodos();
  showAlert("Task edited", "success");
};

//defining event listeners
addNewToDo.addEventListener("click", addNewToDoHandler);
deleteAllButton.addEventListener("click", deleteAllHandeler);
editButton.addEventListener("click", applyEditing);
window.onload = displayTodos;
