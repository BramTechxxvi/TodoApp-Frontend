const API_BASE = "http://localhost:8080";

const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

const logout = ()=> {
    localStorage.removeItem("token");
    window.location.href = "login.html";
};

function addTask() {
    const input = document.getElementById("add-task");
    const task = input.value.trim();
    if (!task) return;
    fetch(`${APP_URL}`, {
        method: "POST",
        headers,
        body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(() => {
        input.value = " ";
        loadTasks();
    })
}

function fetchTasks() {
    fetch(URL)
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















function deleteTask(id) {
    fetch(`${URL}/delete/${id}`, { method: "DELETE" })
        .then(() => fetchTasks());
}

function toggleComplete(id, isComplete) {
    const endpoint = isComplete ? `${URL}/${id}/complete` : `${URL}/${id}/in-progress`;
    fetch(endpoint, { method: "PATCH" })
        .then(() => fetchTasks());
}

document.addEventListener("DOMContentLoaded", fetchTasks);
