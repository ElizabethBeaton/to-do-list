export const sidebar = document.createElement("div");
export const main = document.createElement("div");
sidebar.className = "sidebar";
main.className = "main";
document.body.append(sidebar, main);

// Sidebar
export const title = document.createElement("h2");
title.textContent = "Projects";
export const addProjectButton = document.createElement("button");
addProjectButton.className = "addProjectButton";
addProjectButton.textContent = "+ Add Project";
export const projectList = document.createElement("ul");
sidebar.append(title, addProjectButton, projectList);

//Main
export const projectTitle = document.createElement("h2");
export const taskTable = document.createElement("table");
const thead = document.createElement("thead");
thead.innerHTML = `<tr><th>Task</th><th>Due Date</th><th>Priority</th><th>Delete</th></tr>`;
export const tbody = document.createElement("tbody");
taskTable.append(thead, tbody);
export const addTaskButton = document.createElement("button");
addTaskButton.textContent = "+ Add New Task";
addTaskButton.style.backgroundColor = "#F0F0F0";
addTaskButton.style.border = "none";
addTaskButton.style.marginTop = "10px";
addTaskButton.style.padding = "16px";
addTaskButton.style.borderRadius = "6px";
addTaskButton.style.fontSize = "16px";
main.append(projectTitle, taskTable, addTaskButton);

// Hide initially
taskTable.style.display = "none";
addTaskButton.style.display = "none";
projectTitle.textContent = "Select a project";

// Modal
export const modalOverlay = document.createElement("div");
modalOverlay.className = "modal-overlay";
export const modal = document.createElement("div");
modal.className = "modal";
modal.style.backgroundColor = "#ffffff";
modal.style.width = "200px";
export const modalTitle = document.createElement("h3");
modalTitle.textContent = "Enter Project Name";
export const modalInput = document.createElement("input");
modalInput.type = "text";
modalInput.placeholder = "Project Name";
modalInput.style.margin = "0 auto";
modalInput.style.display = "block";
modalInput.style.padding = "0.5rem";
modalInput.style.fontSize = "1rem";
modalInput.style.width = "80%";
modalInput.style.border = "1px solid #ccc";
modalInput.style.borderRadius = "4px";
export const modalSubmit = document.createElement("button");
modalSubmit.textContent = "Submit";
export const modalCancel = document.createElement("button");
modalCancel.textContent = "Cancel";
modal.append(modalTitle, modalInput, modalSubmit, modalCancel);
modalOverlay.appendChild(modal);
document.body.appendChild(modalOverlay);
modalOverlay.style.display = "none";

// Modal styling
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









// Task Modal
export const taskModalOverlay = document.createElement("div");
taskModalOverlay.className = "modal-overlay";

export const taskModal = document.createElement("div");
taskModal.className = "modal";
taskModal.style.backgroundColor = "#ffffff";
taskModal.style.width = "300px";

const taskModalTitle = document.createElement("h3");
taskModalTitle.textContent = "Add New Task";

export const taskTitleInput = document.createElement("input");
taskTitleInput.type = "text";
taskTitleInput.placeholder = "Task Title";
taskTitleInput.style.margin = "0.5rem auto";
taskTitleInput.style.display = "block";
taskTitleInput.style.padding = "0.5rem";
taskTitleInput.style.fontSize = "1rem";
taskTitleInput.style.width = "90%";
taskTitleInput.style.border = "1px solid #ccc";
taskTitleInput.style.borderRadius = "4px";

export const taskDueDateInput = document.createElement("input");
taskDueDateInput.type = "date";
taskDueDateInput.style.margin = "0.5rem auto";
taskDueDateInput.style.display = "block";
taskDueDateInput.style.padding = "0.5rem";
taskDueDateInput.style.fontSize = "1rem";
taskDueDateInput.style.width = "90%";
taskDueDateInput.style.border = "1px solid #ccc";
taskDueDateInput.style.borderRadius = "4px";

export const taskPrioritySelect = document.createElement("select");
taskPrioritySelect.style.margin = "0.5rem auto";
taskPrioritySelect.style.display = "block";
taskPrioritySelect.style.padding = "0.5rem";
taskPrioritySelect.style.fontSize = "1rem";
taskPrioritySelect.style.width = "95%";
taskPrioritySelect.style.border = "1px solid #ccc";
taskPrioritySelect.style.borderRadius = "4px";

["Low", "Medium", "High"].forEach(level => {
  const option = document.createElement("option");
  option.value = level.toLowerCase();
  option.textContent = level;
  taskPrioritySelect.appendChild(option);
});

export const taskModalSubmit = document.createElement("button");
taskModalSubmit.textContent = "Add Task";
taskModalSubmit.style.margin = "10px 5px";

export const taskModalCancel = document.createElement("button");
taskModalCancel.textContent = "Cancel";
taskModalCancel.style.margin = "10px 5px";

taskModal.append(
  taskModalTitle,
  taskTitleInput,
  taskDueDateInput,
  taskPrioritySelect,
  taskModalSubmit,
  taskModalCancel
);

taskModalOverlay.appendChild(taskModal);
document.body.appendChild(taskModalOverlay);
taskModalOverlay.style.display = "none";
