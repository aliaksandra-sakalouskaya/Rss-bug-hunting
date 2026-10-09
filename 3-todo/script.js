const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value.trim();
  if(!text.length) {
    errorEl.hidden = false; 
    return;
  }

  errorEl.hidden = true; 

  tasks.push({ 
    id: nextId++, 
    text: text, 
    done: false 
  });

  input.value = "";
  render();
}

function getVisibleTasks() {
  if(currentFilter === 'active') {
    return tasks.filter((task) => !task.done);
  } else if(currentFilter === 'done') {
    return tasks.filter((task) => task.done);
  }

  return tasks;
}

function toggleTask(id) {
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.done);
  render();
}

function updateCounter() {
  const activeTasks = tasks.filter((task) => !task.done);
  counter.textContent = "Активных задач: " + activeTasks.length;
}

function render() {
  list.replaceChildren();
  const tasks = getVisibleTasks();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");
    li.className = "task";

    if (task.done) {
      li.classList.add("completed");
    } 

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }

  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;

    render();
  });
});

render();
