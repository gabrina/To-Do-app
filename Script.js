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
            const rowName = document.createElement("td");
            rowName.textContent = task.name;
            const rowDue = document.createElement("td");
            rowDue.textContent = task.dueDate;
            const rowStatus = document.createElement("td");
            rowStatus.textContent = task.completed;
            rowName.classList.add("column");
            rowDue.classList.add("column");
            rowStatus.classList.add("column");
            const rowActions = document.createElement("td");


            row.append(rowName, rowDue, rowStatus)
            tbody.append(row);
            // console.log("append success");

        });
        // 
    }
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
        localStorage.setItem(todos.lastIndexOf(todo) + 1, JSON.stringify(todo));
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



window.onload = updateTableView();