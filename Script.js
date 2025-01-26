// Select the element
const addNewToDo = document.getElementById('addNewToDo');
const taskName = document.getElementById('todo-name');
const taskDue = document.getElementById('todo-due');
const alertMessage = document.getElementById('alert-massage');


//Define global array of all to dos
const todos = [];

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
        showAlert("Todo created succesfully", "success")

    } else {
        showAlert("Enter name and date", "error")
    }

    console.dir(todos)


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