document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-button');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array
    let tasks = [];

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks); // Parse tasks from JSON
            tasks.forEach(task => {
                createTaskElement(task); // Create DOM elements for each task
            });
        }
    }

    // Function to create a task element and add it to the DOM
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add event listener to the remove button
        removeButton.onclick = function () {
            removeTask(taskText, li); // Remove task from array and DOM
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert('Please enter a task!');
            return;
        }

        tasks.push(taskText); // Add task to the array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to Local Storage
        createTaskElement(taskText); // Create and append the task element
        taskInput.value = ''; // Clear the input field
    }

    // Function to remove a task
    function removeTask(taskText, liElement) {
        tasks = tasks.filter(task => task !== taskText); // Remove task from the array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update Local Storage
        taskList.removeChild(liElement); // Remove task from the DOM
    }

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener to the input field for the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});