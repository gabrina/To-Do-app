// Select the element

const addNewToDo = document.getElementById('addNewToDo');
const taskName = document.getElementById('todo-name');
const taskDue = document.getElementById('todo-due');
const alertMessage = document.getElementById('alert-massage');
const tbody = document.getElementById('tbody');


function getLastKeyUsed() {
    const keys = Object.keys(localStorage);
    if (keys.length === 0) {
        return null;
    }
    // Assuming the last key used is the most recent one added
    return keys[keys.length - 1];
}

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

            const row = document.createElement("tr");
            row.classList.add('task');
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


        });
        // 
    }
    else {
        tbody.innerHTML = ""

        const taskRowNoData = document.createElement("tr");
        taskRowNoData.id = "no-task";


        // <td colspan="4" id="no-data-found">No data found</td>
        const columnNoData = document.createElement("td");
        columnNoData.textContent = "No data Found";
        columnNoData.id = "no-data-found"
        columnNoData.colSpan = "4";

        taskRowNoData.append(columnNoData);

        //<tbody id="tbody" class="column">

        tbody.append(taskRowNoData);

    }

}

//filters
const allFilter = (event) => {
    const keys = Object.keys(localStorage);
    const taskRow = document.getElementsByClassName('task');

    // console.log(taskRow);

    keys.forEach(key => {
        const value = localStorage.getItem(key);
        // Check if value is not null and parse it
        if (value) {
            const task = JSON.parse(value);
            taskRow[key].classList.remove("filter");
        }
    });
}

const completedFilter = () => {

    const keys = Object.keys(localStorage);
    const taskRow = document.getElementsByClassName('task');

    // console.log(taskRow);

    keys.forEach(key => {

        const value = localStorage.getItem(key);

        // Check if value is not null and parse it
        if (value) {
            const task = JSON.parse(value);

            if (task.completed) {
                taskRow[key].classList.remove("filter");

            } else {
                taskRow[key].classList.add("filter");

            }
        }
    });
}

const PendingFilter = () => {
    const keys = Object.keys(localStorage);
    const taskRow = document.getElementsByClassName('task');

    // console.log(taskRow);

    keys.forEach(key => {

        const value = localStorage.getItem(key);

        // Check if value is not null and parse it
        if (value) {
            const task = JSON.parse(value);

            if (task.completed) {
                taskRow[key].classList.add("filter");

            } else {
                taskRow[key].classList.remove("filter");

            }
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
        console.log(getLastKeyUsed());
        localStorage.setItem(getLastKeyUsed() + 1, JSON.stringify(todo));
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

const deleteAll = () => {
    localStorage.clear();
    showAlert("All todos deleted successfully", "success");
    updateTableView();
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

const deleteAllButton = document.getElementById('delete-all-button');
deleteAllButton.addEventListener('click', deleteAll);

const editbuttons = document.getElementByclass("actionButton");
console.log(editbuttons);

window.onload = updateTableView();

