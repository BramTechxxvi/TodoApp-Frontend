async function loginUser(email, password) {
    return apiRequest("/users/login", "POST", { email, password}, false);
}

async function registerUser(firstName, lastName, email, password) {
    return apiRequest("/users/register", "POST", { firstName, lastName, email, password });
}

async function getProfile() {
    return apiRequest("/users/profile", "Get");
}

async function changeEmail(oldEmail, newEmail) {
    return apiRequest("/users/changeEmail/{id}", "PUT", { oldEmail, newEmail })
}

async func