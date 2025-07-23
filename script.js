const API_BASE = "http://localhost:8080";
const TASK_API = `${API_BASE}/tasks`;
const USER_API =  `${API_BASE}/users`;

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
    const content = input.value.trim();
    if (!content) return;
    fetch(`${TASK_API}/add`, {
        method: "POST",
        headers,
        body: JSON.stringify({content})
    })
    .then(res => res.json())
    .then(() => {
        input.value = "";
        loadTasks();
    })
    .catch(err => console.error("Failed to add task:", err));
}

function deleteTask(id) {
    fetch(`${TASK_API}/delete/${id}`, {
        method: "DELETE",
        headers
    }).then(()=> loadTasks())
}

function updateTask(id, oldContent) {
    const input = prompt(`Edit task: `, oldContent)
    const newContent = input?.trim();
    if(!newContent || newContent === oldContent) return;
    fetch(`${TASK_API}/update/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ content: newContent })
    }).then(() =>  loadTasks());
}

function loadTasks() {
    fetch(`${TASK_API}/getAllTasks`, { headers })
    .then(res=> res.json())
    .then(tasks=> {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.taskId = task.id;
            li.innerHTML = `
            <span class="task-content ${task.status}">${task.content}</span>
    
            <button onclick="updateStatus('${task.id}', '${task.content}')"></button>
            <button onclick="deleteTask('${task.id}')
            `;
    })



// function toggleComplete(id, isComplete) {
//     const endpoint = isComplete ? `${URL}/${id}/complete` : `${URL}/${id}/in-progress`;
//     fetch(endpoint, { method: "PATCH" })
//         .then(() => fetchTasks());
// }

//   
//       tasks.forEach(task => {
//         const item = document.createElement('li');
//         item.innerHTML = `
//           <span class="task-content ${task.status}">${task.content}</span>
//           <button onclick="markAsCompleted('${task.id}')">✅</button>
//           <button onclick="markInProgress('${task.id}')">⏳</button>
//           <button onclick="editTask('${task.id}', '${task.content}')">✏️</button>
//           <button onclick="deleteTask('${task.id}')">🗑️</button>
//         `;
//         list.appendChild(item);
//       });
//     });
// }
