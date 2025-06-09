document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  document.getElementById("toggleMode").addEventListener("click", toggleDarkMode);
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  const taskList = document.getElementById("taskList");

  if (taskText === "") return;

  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.setAttribute("data-status", "pending"); // Mark task as pending by default

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Toggle status on click
  taskSpan.onclick = () => {
    const status = taskItem.getAttribute("data-status");
    taskItem.setAttribute("data-status", status === "pending" ? "completed" : "pending");
    filterTasks(currentFilter); // Refresh view based on current filter
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "🗑️";

  deleteBtn.onclick = () => {
    taskItem.remove();
  };

  taskItem.appendChild(taskSpan);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);

  taskInput.value = "";
}


// function renderTasks() {
//   const taskList = document.getElementById("taskList");
//   taskList.innerHTML = "";

//   const tasks = getTasks();

//   tasks.forEach((task, index) => {
//     const li = document.createElement("li");
//     if (task.completed) li.classList.add("completed");

//     li.innerHTML = `
//       <span onclick="toggleComplete(${index})">${task.text}</span>
//       <button class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
//     `;

//     taskList.appendChild(li);
//   });
// }

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function loadTasks() {
  renderTasks();

  // Load dark mode
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}
let currentFilter = "all";

function filterTasks(filter) {
  currentFilter = filter;

  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach(task => {
    const status = task.getAttribute("data-status");
    if (filter === "all") {
      task.style.display = "flex";
    } else {
      task.style.display = status === filter ? "flex" : "none";
    }
  });

  document.querySelectorAll(".filter").forEach(btn =>
    btn.classList.remove("active")
  );
  document.querySelector(`.filter[onclick="filterTasks('${filter}')"]`).classList.add("active");
}
