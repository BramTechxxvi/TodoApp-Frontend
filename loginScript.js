const API_BASE = "http://localhost:8080";
const USER_API =  `${API_BASE}/users`;

document.getElementById("submit").addEventListener("click", async()=> {
    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value.trim();
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch(`${USER_API}/login`, {
            method: "POST",
            headers : { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }       
        
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html"; 
    } catch (err) {
        alert("Error: " + err.message);
        console.error("Login failed:", err);
    }
});