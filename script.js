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
    tasks.push({
      text: taskText,
      completed: false,
    });
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);

    deleteTask(taskItem);
    taskCompleted(taskItem);
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
  taskList.appendChild(taskItem);
  deleteTask(taskItem);
  taskCompleted(taskItem);
}

function taskCompleted(taskItem) {
  taskItem.addEventListener("click", () => {
    tasks.find((task) => task.text === taskItem.textContent).completed =
      !tasks.find((task) => task.text === taskItem.textContent).completed;
    taskItem.classList.toggle("completed");
    saveTasks();
  });
}

function deleteTask(taskItem) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  taskItem.appendChild(deleteButton);
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    taskList.removeChild(taskItem);
    saveTasks();
  });
}
