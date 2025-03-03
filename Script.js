//selecting elements
const todoName = document.getElementById("todo-name");
const todoDate = document.getElementById("todo-due");
const addNewToDo = document.getElementById("addNewToDo");
const alertBox = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");
const editButton = document.getElementById("editToDo");
const filterButton = document.querySelectorAll(".filter");

//defining global variables
const todos = JSON.parse(localStorage.getItem("todos")) || [];

//defining handlers and methods
const createUniqueID = () => {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomPart = Math.floor(Math.random() * 1e6); // Random 6-digit number
  return Number(`${timestamp}${randomPart}`); // Combine and return as a number
};

const saveTasks = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const showAlert = (message, type) => {
  alertBox.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertBox.append(alert);
};

const addNewToDoHandler = () => {
  if (todoName.value) {
    const task = {
      id: createUniqueID(),
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

const displayTodos = (filteredTodos) => {
  const todosList = filteredTodos || todos;
  todosBody.innerHTML = "";
  if (todosList.length) {
    todosList.forEach((task) => {
      //preserving previous looped taskes
      todosBody.innerHTML += `<tr>
      <td>${task.name}</td>
      <td>${task.date || "No Date"}</td>
      <td>${task.status}</td>
      <td>
      <button class="editButton actionButton" onclick="editHandler('${
        task.id
      }')">edit</button>
      <button class="doButton actionButton" onclick="doHandler('${task.id}')">${
        task.status === "pending" ? `do` : `undo`
      }</button>
      <button class="deleteButton actionButton" onclick="deleteHandler('${
        task.id
      }')">delete</button>
      </td></tr>`;
    });
  } else if (!todosList.length) {
    todosBody.innerHTML = `<tr><td colspan="4">No data found</td></tr>`;
    return;
  }
}; //note: task.id converts to string when it's added to html code

const deleteAllHandler = () => {
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

const deleteHandler = (ID) => {
  ID = Number(ID); //ID is an string when it's passed to the method
  const newTasks = todos.filter((task) => task.id !== ID);
  if (todos.length !== newTasks.length) {
    todos.length = 0;
    todos.push(...newTasks);
    saveTasks();
    displayTodos();
    showAlert("Task deleted", "success");
  } else {
    showAlert("Something went wrong, try again", "error");
  }
};

const doHandler = (ID) => {
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

const filterTodo = (event) => {
  const filter = event.target.dataset.filter;
  let filteredTodos = null;
  switch (filter) {
    case "completed":
      filteredTodos = todos.filter((task) => task.status === "completed");
      break;
    case "pending":
      filteredTodos = todos.filter((task) => task.status === "pending");
      break;
    default:
      filteredTodos = todos;
      break;
  }
  displayTodos(filteredTodos);
};

//defining event listeners
addNewToDo.addEventListener("click", addNewToDoHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditing);
filterButton.forEach((button) => {
  button.addEventListener("click", filterTodo);
});

window.addEventListener("load", () => displayTodos());
// When adding the window.onload event, you're just referring to the function name instead of calling the function.
