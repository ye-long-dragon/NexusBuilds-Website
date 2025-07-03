async function login() {
    const email = document.querySelector(".email-input").value;
    const password = document.querySelector(".pword-input").value;

    try {
        const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
        throw new Error(data.message);
        }

        alert(`Welcome, ${data.username}.`);
        window.location.href = "/";
    } catch (error) {
        alert("Login failed: " + error.message);
    }
}