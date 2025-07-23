const API_BASE = "http://localhost:8080";
const USER_API =  `${API_BASE}/users`;

document.getElementById("submit").addEventListener("click", async(event)=> {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastname = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = getElementById("password").value;
    const confirmPassword = getElementById("").value;
    const checkbox = getElementById("").checked;
    // const password = getElementById("").value.trim();

    let validCredentials = firstName || lastName || email || password || confirmPassword || checkbox;
    if(!firstName ||)
})



    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const checkbox = document.getElementById("checkbox").checked;

    if ( !email || !password || !confirmPassword || !checkbox) {
        alert("Please fill out all fields and accept the terms.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

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
