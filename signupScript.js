const API_BASE = "http://localhost:8080";
const USER_API =  `${API_BASE}/users`;

document.getElementById("submit").addEventListener("click", async(event)=> {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const checkbox = document.getElementById("checkbox").checked;

    let validCredentials = firstName || lastName || email || password || confirmPassword || checkbox;
    if(!validCredentials) {
        alert("Please fill out all fields and accept the terms.");
        return;
    }

    let validNames = /^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName);
    if (!validNames) {
        alert("First and last names must contain only letters.");
        return;
    }

    let samePassword = password === confirmPassword;
    if (!samePassword) {
        alert("Passwords do not match.");
        return;
    }
    
    try {
        const response = await fetch(`${USER_API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${errorText}`);
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    }   catch (err) {
            console.error("Signup failed:", err);
            alert("Signup failed. Please try again.");
        }

})