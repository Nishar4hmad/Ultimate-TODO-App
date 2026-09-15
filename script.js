const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", () => {
  addTask();
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

let tasks = [];
loadTasks();

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    createTaskItem(task);
    taskInput.value = "";
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasksJson = JSON.parse(savedTasks);
    tasks = tasksJson;
    renderTasks(tasks);
  }
}

function renderTasks(tasksArray) {
  tasksArray.forEach((task) => {
    createTaskItem(task);
  });
}

function createTaskItem(task) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  taskItem.textContent = task.text;
  taskItem.classList.toggle("completed", task.completed);
  taskList.appendChild(taskItem);
  deleteTask(taskItem);
  taskCompleted(taskItem, task);
  editTask(taskItem, task);
}

function taskCompleted(taskItem, task) {
  taskItem.addEventListener("click", () => {
    task.completed = !task.completed;
    taskItem.classList.toggle("completed", task.completed);
    saveTasks();
  });
}

function deleteTask(taskItem) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  const taskText = taskItem.textContent;
  taskItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const index = tasks.findIndex((task) => task.text === taskText);
    tasks.splice(index, 1);
    taskList.removeChild(taskItem);
    saveTasks();
  });
}

function editTask(taskItem, task) {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  taskItem.appendChild(editButton);
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const newTaskText = prompt("Edit task:", task.text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      task.text = newTaskText.trim();
      taskItem.textContent = task.text;
      deleteTask(taskItem);
      taskItem.appendChild(editButton);
      saveTasks();
    }
  });
}
