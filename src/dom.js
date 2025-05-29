import Project from "./project";
import Task from "./task";

let projects = [];
let currentProject = null;

const sidebar = document.createElement("div");
const main = document.createElement("div");
sidebar.className = "sidebar";
main.className = "main";

document.body.append(sidebar, main);

// Sidebar elements
const title = document.createElement("h2");
title.textContent = "Projects";
const addProjectButton = document.createElement("button");
addProjectButton.className = "addProjectButton";
addProjectButton.textContent = "+ Add Project";

const projectList = document.createElement("ul");
sidebar.append(title, addProjectButton, projectList);

// Main elements
const projectTitle = document.createElement("h2");
const taskTable = document.createElement("table");
const thead = document.createElement("thead");
thead.innerHTML = `<tr><th>Task</th><th>Due Date</th><th>Priority</th><th>Delete</th></tr>`;
const tbody = document.createElement("tbody");
taskTable.append(thead, tbody);
const addTaskButton = document.createElement("button");
addTaskButton.textContent = "+ Add New Task";
addTaskButton.style.backgroundColor = "#F0F0F0";
addTaskButton.style.border = "none"
addTaskButton.style.marginTop = "10px"
addTaskButton.style.padding = "16px"
addTaskButton.style.borderRadius = "6px"
addTaskButton.style.fontSize = "16px"
// move task button to top right of page
main.append(projectTitle, taskTable, addTaskButton);





// Hide initially
taskTable.style.display = "none";
addTaskButton.style.display = "none";
projectTitle.textContent = "Select a project";

// Modal elements
const modalOverlay = document.createElement("div");
modalOverlay.className = "modal-overlay";

const modal = document.createElement("div");
modal.className = "modal";
modal.style.backgroundColor = "#ffffff";
modal.style.width = "200px"

const modalTitle = document.createElement("h3");
modalTitle.textContent = "Enter Project Name";

const modalInput = document.createElement("input");
modalInput.type = "text";
modalInput.placeholder = "Project Name";

// modalInput.className = "modalInput"
modalInput.style.margin = "0 auto";
modalInput.style.display = "block";
modalInput.style.padding = "0.5rem";
modalInput.style.fontSize = "1rem";
modalInput.style.width = "80%";
modalInput.style.border = "1px solid #ccc";
modalInput.style.borderRadius = "4px";


const modalSubmit = document.createElement("button");
modalSubmit.textContent = "Submit";

const modalCancel = document.createElement("button");
modalCancel.textContent = "Cancel";

modal.append(modalTitle, modalInput, modalSubmit, modalCancel);
modalOverlay.appendChild(modal);
document.body.appendChild(modalOverlay);

// Hide modal initially
modalOverlay.style.display = "none";

// modal styling

const style = document.createElement("style");
style.textContent = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 250px;
}
.modal input {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}
.modal button {
  margin: 5px;
}
`;
document.head.appendChild(style);

// Events
addProjectButton.addEventListener("click", () => {
  modalInput.value = "";
  modalOverlay.style.display = "flex";
  modalInput.focus();
});

modalSubmit.addEventListener("click", () => {
  const name = modalInput.value.trim();
  if (!name)  return alert("Please enter project name")
  const project = new Project(capitalizeFirstLetter(name));
  projects.push(project);
  renderProjects();
  selectProject(project.id);
  modalOverlay.style.display = "none";
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1); // make first letter of project list capitalised
}

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

// Render functions
function renderProjects() {
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.style.paddingBottom = "30px"
    li.style.fontSize = "20px"
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
