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
     






    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try {
        const res = await fetch(`${USER_API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";  // Redirect to your dashboard
    } catch (err) {
        alert("Invalid credentials or server error.");
        console.error(err);
    }
});
</script>
