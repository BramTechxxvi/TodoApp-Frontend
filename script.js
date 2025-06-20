const API_URL = "http://localhost:8080/tasks";

function fetchTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                const li = document.createElement("li");
                li.className = "task" + (task.completed ? " completed" : "");
                li.innerHTML = `
          <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete('${task.id}', ${!task.completed})">
          <span>${task.title}</span>
          <button onclick="deleteTask('${task.id}')">🗑️</button>
        `;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const task = { title: input.value };
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    })
        .then(() => {
            input.value = "";
            fetchTasks();
        });
}

function deleteTask(id) {
    fetch(`${API_URL}/delete/${id}`, { method: "DELETE" })
        .then(() => fetchTasks());
}

function toggleComplete(id, isComplete) {
    const endpoint = isComplete ? `${API_URL}/${id}/complete` : `${API_URL}/${id}/in-progress`;
    fetch(endpoint, { method: "PATCH" })
        .then(() => fetchTasks());
}

document.addEventListener("DOMContentLoaded", fetchTasks);
