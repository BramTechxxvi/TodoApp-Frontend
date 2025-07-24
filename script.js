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
        body: JSON.stringify({
            title
        })
    })
    .then(res => res.json())
    .then((data) => {
        console.log("Task added: ", data)
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
            li.className = "task"
            li.innerHTML = `
            <span class="task-content ${task.status}">${task.content}</span>
    
            <button onclick="updateTask('${task.id}', '${task.content}')">Edit task</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
            <button>Completed</button>
            <button>In Progress</button>
            `;
            taskList.appendChild(li);
        });
    });
}


        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "task"; // ← You need to add this!
            li.innerHTML = `
                <span class="task-content ${task.status}">${task.content}</span>
                <button onclick="updateTask('${task.id}', '${task.content}')">Edit</button>
                <button onclick="deleteTask('${task.id}')">Delete</button>
            `;
            taskList.appendChild(li);
        });
        })
        
    .catch(err => console.error("Failed to load tasks:", err));
}




// function toggleComplete(id, isComplete) {
//     const endpoint = isComplete ? `${URL}/${id}/complete` : `${URL}/${id}/in-progress`;
//     fetch(endpoint, { method: "PATCH" })
//         .then(() => fetchTasks());
// }



<div class="add-task">
    <input type="text" id="task-title" placeholder="Enter task title..." onkeydown="handleTitleKey(event)">
    
    <div id="description-section" class="hidden">
        <input type="text" id="task-description" placeholder="Enter task description...">
        <select id="task-status">
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
        </select>
        <button onclick="addTask()">Add Task</button>
    </div>
</div>
