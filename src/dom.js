import Project from "./project";
import Task from "./task";

let projects = []
let currentProject = null;

const sidebar = document.createElement("div")
const main = document.createElement("div")
sidebar.className = "sidebar"
main.className = "main"

document.body.append(sidebar, main);

// sidebar elements
const title = document.createElement("h2")
title.textContent = "Projects"
const addProjectButton = document.createElement("button")
addProjectButton.textContent = "+ Add Project"
const projectList = document.createElement("ul")
sidebar.append(title, addProjectButton, projectList)

// main elements

const projectTitle = document.createElement("h2")
const taskTable = document.createElement("table")
const thead = document.createElement("thead")
thead.innerHTML = `<tr><th>Task</th><th>Due Date</th><th>Priority</th><th>Delete</th></tr>`;
const tbody = document.createElement("tbody")
taskTable.append(thead, tbody)
const addTaskButton = document.createElement("button")
addTaskButton.textContent = "+ Add New Task"
main.append(projectTitle, taskTable, addTaskButton)

// hide initially
taskTable.style.display = "none"
addTaskButton.style.display = "none"
projectTitle.textContent = "Select a project"

// events
addProjectButton.addEventListener("click", () => {
    const name = prompt("Project name?")
    if (!name) return;
    const project = new Project(name)
    projects.push(project)
    renderProjects();
    selectProject(project.id)
})

//add task button
addTaskButton.addEventListener("click", () => {
    if (!currentProject) return alert("Select a project first");

    const title = prompt("task name?")
    const dueDate = prompt("due date?")
    const priority = prompt("Priority? high medium low")
    if (!title || !dueDate || !priority) return;

    const task = new Task(title, dueDate, priority);
    currentProject.addTask(task)
    renderTasks()
})

//renderes
function renderProjects() {
    projectList.innerHTML = ""
    projects.forEach(project => {
        const li = document.createElement("li")
        li.textContent = project.name
        li.addEventListener("click", () => selectProject(project.id))
        projectList.appendChild(li)
    })
}


function selectProject(id) {
  currentProject = projects.find((p) => p.id === id);
  projectTitle.textContent = currentProject.name;
  taskTable.style.display = "table";
  addTaskButton.style.display = "inline-block";
  renderTasks();
}

//how table will look
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