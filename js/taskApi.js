async function getTasks() {
    return apiRequest("/tasks/add", "POST", { title, description, status });
}
async