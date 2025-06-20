const URL = "http://localhost:8080/tasks";

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

function addTask() {
    const input = document.getElementById("add-task");
    const task = { title: input.value };
    fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    })
        .then(() => {
            input.value = "";
            fetchTasks();
        });
}

// function addTask() {
//     const taskInput = document.getElementById("addTask");
//     const text = taskInput.value.trim();
//     if (text !== "") {
//         tasks.push({text: text, completed: false});
//         saveTask();
//         displayTasks()
//         taskInput.value = "";
//     }
// }













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
