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
    // loadUserProfile();
});

const logout = ()=> {
    localStorage.removeItem("token");
    window.location.href = "login.html";
};

function toggleProfileSideBar() {
    const sideBar = document.getElementById("profile-sidebar");
    sideBar.classList.toggle("hidden");
}

// function loadUserProfile() {
//     fetch(`${USER_API}/profile`, { headers })
//     .then(res => {
//         if (!res.ok) throw new Error("Failed to fetch user profile");
//         return res.json();
//     })
//     .then(user => {
//         document.getElementById("user-name").textContent = user.name;
//         document.getElementById("user-email").textContent = user.email;
//     })
//     .catch(err => console.error("Failed to load user profile: ", err));
// }

function addTask() {
    const title = document.getElementById("task-title").value.trim();
    const description =document.getElementById("task-description").value.trim();
    const status = document.getElementById("task-status").value;

    if (!title || !description) {
        alert("Fill in both fields.")
        return;
    }
    fetch(`${TASK_API}/add`, {
        method: "POST",
        headers,
        body: JSON.stringify({ title, description, status })
    })
    .then(response => {
        if(!response.ok) return response.text().then(message => {
            throw new Error(message);
        });
        return response.json(); 
    })
    .then((data) => {
        console.log("Task added: ", data)
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("task-status").value ="PENDING";
        document.getElementById("description-section").classList.add("hidden");
    
        loadTasks();
    })
    .catch(err => console.error("Failed to add task:", err));
}

function deleteTask(id) {
    fetch(`${TASK_API}/delete/${id}`, {
        method: "DELETE",
        headers
    })
    .then(()=> loadTasks())
    .catch(err => console.error("Failed to delete task: ", err));
}

function updateTask(id, oldTitle) {
    const newTitle = prompt(`Edit task: `, oldTitle)
    if(!newTitle || newTitle === oldTitle) return;
    fetch(`${TASK_API}/update/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ title: newTitle })
    }).then(() =>  loadTasks());
}

function markComplete(id) {
    fetch(`${TASK_API}/status/${id}/complete`, {
        method: "PATCH",
        headers,
        body: ({taskId: id, status: "COMPLETED"})
    })
    .then(() => loadTasks())
    .catch((err) => {
        console.error("Failed to mark task as complete: ", err)
    });
}

function markInProgress(id) {
    fetch(`${TASK_API}/${id}/in-progress`, {
        method: "PATCH",
        headers,
        body: ({taskId: id, status: "IN_PROGRESS"})
    })
    .then(() => loadTasks())
    .catch((err) => {
        console.error("Failed to mark task as in progress: ", err)
    });
}

function loadTasks() {
    fetch(`${TASK_API}/getAll`, {
        method: "GET",
        headers 
    })
    .then(res=> {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
    })
    .then(tasks=> {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.className = "task-box"
            li.innerHTML = `
            <div>
                <span class="task-title ${task.status.toLowerCase()}">${task.title}</span>
                <div>
                    <button onclick="deleteTask('${task.id}')">Delete</button>
                    <button onclick="markComplete('${task.id}')">Completed</button>
                    <button onclick="markInProgress('${task.id}')">In Progress</button>
                    <button onclick="updateTask('${task.id}', '${task.title}')">Edit</button>
                </div>
            </div>
            `;
            taskList.appendChild(li);
        });
    })
    .catch(err => console.error("Failed to load tasks: ", err))
}

function handleTitleKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const title = event.target.value.trim();
        if (title) {
            document.getElementById("description-section").classList.remove("hidden");
        }
    }
}

function searchTask() {
    const query = document.getElementById("searchTask").value.trim().toLowerCase();
    fetch(`${TASK_API}/getAll`, {
        method: "GET",
        headers
    })
    .then((res)=> {
        if(!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
    })
    .then((tasks)=> {
        const filteredTasks = tasks.filter((task) =>
            task.title.toLowerCase().include(query) ||
            task.description.toLowerCase().includes(query)
        );
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        filteredTasks.forEach((task)=> {
            const li = document.createElement("li");
            li.className = "task-box";
            li.innerHTML = `
            <div>
                <span class="task-title ${task.status.toLowerCase()}">${task.title}</span>
                <div>
                    <button onclick="deleteTask('${task.id}')">Delete</button>
                    <button onclick="markComplete('${task.id}')">Completed</button>
                    <button onclick="markInProgress('${task.id}')">In Progress</button>
                    <button onclick="updateTask('${task.id}', '${task.title}')">Edit</button>
                </div>
            </div>
            `;
            taskList.appendChild(li);
        });
    })
    .catch(err=> console.error("Failed to search tasks, kindly try again", err))
}

function changePassword() {
    const oldPassword = document.getElementById("old-password").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    if(!oldPassword || !newPassword) {
        alert("Please fill in both password fields");
        return;
    }
    fetch(`${USER_API}/changePassword/{id}`, {
        method: "PATCH",
        headers, 
        body: JSON.stringify({ oldPassword, newPassword })
    })
    .then((response)=> {
        if(!response.ok) return response.text().then((message) => {
            throw new Error(message);
        });
        alert("Password updated succesfully.");
        document.getElementById("old-password").value ="";
        document.getElementById("new-password").value ="";
    })
    .catch((err)=> {
        console.error("Failed to change password: ", err);
    });
}

function changeEmail() {
    const oldEmail = document.getElementById("old-email").value.trim();
    const newEmail = document.getElementById("new-email").value.trim();
    if(!oldEmail || !newEmail) {
        alert("Please in both email fields");
        return
    }
    fetch(`${USER_API}/changeEmail/{id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify( {oldEmail, newEmail} )
    })
    .then((response)=> {
        if(!response.ok) return response.text().then((message)=> {
            throw new Error(message);
        });
        alert("Email updated succesfully.");
        document.getElementById("old-email").value ="";
        document.getElementById("new-email").value = "";
    })
    .catch((err) => {
        console.error("Failed to change email", err);
    })
}