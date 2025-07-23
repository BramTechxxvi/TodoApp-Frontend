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
    if (!task) return;
    fetch(`${TASK_API}/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(content)
    })
    .then(res => res.json())
    .then(() => {
        input.value = " ";
        loadTasks();
    })
}

function deleteTask(id) {
    fetch(`${TASK_API}/delete/${id}`, {
        method: "DELETE",
        headers
    }).then(()=> loadTasks())
}

function updateTask(id, oldContent) {
    const newContent = prompt(`Edit task: `, oldContent)
    if(!newContent || newContent === oldContent) return;

    fetch(`${TASK_API}/update/ ${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify()
    })
}


//   fetch(`${API_BASE}/tasks/${id}`, {
//     method: 'PUT',
//     headers,
//     body: JSON.stringify({ content: newContent })
//   }).then(() => loadTasks());
// }

// function toggleComplete(id, isComplete) {
//     const endpoint = isComplete ? `${URL}/${id}/complete` : `${URL}/${id}/in-progress`;
//     fetch(endpoint, { method: "PATCH" })
//         .then(() => fetchTasks());
// }
