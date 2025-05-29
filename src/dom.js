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
  taskModalOverlay,
  taskModal,
  taskTitleInput,
  taskDueDateInput,
  taskPrioritySelect,
  taskModalSubmit,
  taskModalCancel,
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








// Show task modal when clicking add task
addTaskButton.addEventListener("click", () => {
  if (!currentProject) return alert("Select a project first");

  // Clear previous inputs
  taskTitleInput.value = "";
  taskDueDateInput.value = "";
  taskPrioritySelect.value = "low";

  // Show the modal
  taskModalOverlay.style.display = "flex";
  taskTitleInput.focus();
});

// Submit new task from modal
taskModalSubmit.addEventListener("click", () => {
  const title = taskTitleInput.value.trim();
  const dueDate = taskDueDateInput.value;
  const priority = taskPrioritySelect.value;

  if (!title || !dueDate || !priority) {
    alert("Please fill out all fields");
    return;
  }

  const capitaliseTitle = capitalizeFirstLetter(title) // varible to capitalise first letter of title. 
  const task = new Task(capitaliseTitle, dueDate, priority);
  currentProject.addTask(task);
  renderTasks();

  taskModalOverlay.style.display = "none";
});

// Cancel task modal
taskModalCancel.addEventListener("click", () => {
  taskModalOverlay.style.display = "none";
});