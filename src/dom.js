import Project from "./project";
import Task from "./task";
import {
  addProjectButton,
  projectTitle,
  projectList,
  addTaskButton,
  taskTable,
  tbody,
  modalOverlay,
  modalInput,
  modalSubmit,
  modalCancel,
} from "./layout";

let projects = [];
let currentProject = null;

// Utility
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Event Listeners
addProjectButton.addEventListener("click", () => {
  modalInput.value = "";
  modalOverlay.style.display = "flex";
  modalInput.focus();
});

modalSubmit.addEventListener("click", () => {
  const name = modalInput.value.trim();
  if (!name) return alert("Please enter project name");
  const project = new Project(capitalizeFirstLetter(name));
  projects.push(project);
  renderProjects();
  selectProject(project.id);
  modalOverlay.style.display = "none";
});

modalCancel.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

addTaskButton.addEventListener("click", () => {
  if (!currentProject) return alert("Select a project first");

  const title = prompt("Task name?");
  const dueDate = prompt("Due date?");
  const priority = prompt("Priority? high medium low");
  if (!title || !dueDate || !priority) return;

  const task = new Task(title, dueDate, priority);
  currentProject.addTask(task);
  renderTasks();
});

// Render Functions
function renderProjects() {
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.style.paddingBottom = "30px";
    li.style.fontSize = "20px";
    li.textContent = project.name;
    li.addEventListener("click", () => selectProject(project.id));
    projectList.appendChild(li);
  });
}

function selectProject(id) {
  currentProject = projects.find((p) => p.id === id);
  projectTitle.textContent = currentProject.name;
  taskTable.style.display = "table";
  addTaskButton.style.display = "inline-block";
  renderTasks();
}

function renderTasks() {
  tbody.innerHTML = "";
  currentProject.tasks.forEach((task) => {
    const row = document.createElement("tr");

    const tdTitle = document.createElement("td");
    tdTitle.textContent = task.title;

    const tdDate = document.createElement("td");
    tdDate.textContent = task.dueDate;

    const tdPrio = document.createElement("td");
    tdPrio.textContent = task.priority;
    tdPrio.style.color = getPriorityColor(task.priority);

    const tdDelete = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = () => {
      currentProject.removeTask(task.id);
      renderTasks();
    };
    tdDelete.appendChild(delBtn);

    row.append(tdTitle, tdDate, tdPrio, tdDelete);
    tbody.appendChild(row);
  });
}

function getPriorityColor(priority) {
  if (priority === "high") return "red";
  if (priority === "medium") return "orange";
  return "green";
}
