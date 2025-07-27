async function loginUser(email, password) {
    return apiRequest("/users/login", "POST", { email, password}, false);
}

async function registerUser(firstName, lastName, email, password) {
    return apiRequest("/users/register", "POST", { firstName, lastName, email, password }, false);
}

async function getProfile() {
    return apiRequest("/users/profile", "Get", true);
}

async function changeEmail(oldEmail, newEmail) {
    return apiRequest("/users/changeEmail/{id}", "PUT", { oldEmail, newEmail }, true)
}

async function changePassword(oldPassword, newPassword) {
    return apiRequest("users/changePassword/{id}", "PUT", { oldPassword, newPassword }, true)
}

async function logout() {
    return apiRequest("/users/logout/{id}", "POST", true)
}