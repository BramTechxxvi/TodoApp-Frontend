const API_BASE = "http://localhost:8080";
const USER_API =  `${API_BASE}/users`;

document.getElementById("submit").addEventListener("click", async(event)=> {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = getElementById("password").value;
    const confirmPassword = getElementById("").value;
    const checkbox = getElementById("").checked;
    // const password = getElementById("").value.trim();

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
})

    try {
        const res = await fetch(`${USER_API}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        if (!res.ok) throw new Error("Signup failed");

        const data = await res.json();
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } catch (err) {
        alert("Signup failed. Please try again.");
        console.error(err);
    }
}); */}
</script>
