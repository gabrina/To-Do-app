// Select the element

const addNewToDo = document.getElementById('addNewToDo');
const taskName = document.getElementById('todo-name');
const taskDue = document.getElementById('todo-due');
const alertMessage = document.getElementById('alert-massage');
const tbody = document.getElementById('tbody');

//Define global array of all to dos
const todos = [];


const updateTableView = () => {

    // Get the keys of all items in localStorage
    const keys = Object.keys(localStorage);
    if (keys.length) {
        tbody.innerHTML = "";
        // Loop through each key and retrieve its value
        keys.forEach(key => {
            const value = localStorage.getItem(key);

            // Check if value is not null and parse it

            const task = JSON.parse(value);
            // console.log(task.name, task.dueDate, task.completed);
            const row = document.createElement("tr");
            row.classList.add("tasks");
            const rowName = document.createElement("td");
            rowName.textContent = task.name;
            const rowDue = document.createElement("td");
            rowDue.textContent = task.dueDate;
            const rowStatus = document.createElement("td");
            rowStatus.textContent = task.completed;

            //add 3 buttons
            const editButtom = document.createElement("button");
            editButtom.classList.add("editButton");
            editButtom.classList.add("actionButton");
            editButtom.textContent = "Edit";


            const deleteButtom = document.createElement("button");
            deleteButtom.classList.add("deleteButton");
            deleteButtom.classList.add("actionButton");
            deleteButtom.textContent = "Delete";

            const doButtom = document.createElement("button");
            doButtom.classList.add("doButton");
            doButtom.classList.add("actionButton");
            doButtom.textContent = "Do";


            const actionButtonColumn = document.createElement("td");
            actionButtonColumn.classList.add("column");


            rowName.classList.add("column");
            rowDue.classList.add("column");
            rowStatus.classList.add("column");
            const rowActions = document.createElement("td");
            rowActions.append(editButtom, doButtom, deleteButtom);


            row.append(rowName, rowDue, rowStatus, rowActions)
            tbody.append(row);
            // console.log("append success");

        });
        // 
    }
}

//filters
const allFilter = (event) => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {

        const value = localStorage.getItem(key);

        // Check if value is not null and parse it

        const task = JSON.parse(value);
        const tasksRow = document.getElementsByClassName("tasks");
        tasksRow[key].classList.remove("filter");

    });
}

const completedFilter = () => {

    const keys = Object.keys(localStorage);
    keys.forEach(key => {

        const value = localStorage.getItem(key);

        // Check if value is not null and parse it

        const task = JSON.parse(value);
        const tasksRow = document.getElementsByClassName("tasks");

        if (!task.completed) {
            tasksRow[key].classList.add("filter");
        }else{
            tasksRow[key].classList.remove("filter");
        }
    });
}

const PendingFilter = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {

        const value = localStorage.getItem(key);

        // Check if value is not null and parse it

        const task = JSON.parse(value);
        const tasksRow = document.getElementsByClassName("tasks");

        if (task.completed) {
            console.log(tasksRow[key]);
            tasksRow[key].classList.add("filter");
            console.log("Done")
        }else{
            tasksRow[key].classList.remove("filter");

        }
    });
}


// Define the event handler function
const addNewToDoHandler = (event) => {
    // Your code here


    const todo = {
        name: taskName.value,
        dueDate: taskDue.value,
        completed: false,
    };


    if (todo.name && todo.dueDate) {
        todos.push(todo);
        localStorage.setItem(todos.lastIndexOf(todo), JSON.stringify(todo));
        updateTableView();
        showAlert("Todo created succesfully", "success");

    } else {
        showAlert("Enter name and date", "error")
    }

    // console.dir(todos)


    // localStorage.setItem(1, todo);

}

const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert")
    alert.classList.add(`alert-${type}`)
    alertMessage.append(alert)
}

// Add the event listener
addNewToDo.addEventListener('click', addNewToDoHandler);

// Optionally, you can remove the event listener if needed
// element.removeEventListener('click', handleClick);

const allFilterButton = document.getElementById('all-filter');
allFilterButton.addEventListener('click', allFilter);

const completedFilterButton = document.getElementById('completed-filter');
completedFilterButton.addEventListener('click', completedFilter);

const pendingFilterButton = document.getElementById('pending-filter');
pendingFilterButton.addEventListener('click', PendingFilter);

window.onload = updateTableView();