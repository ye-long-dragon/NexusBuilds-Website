const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    // Get current input values
    const email = document.querySelector(".email-input").value;
    const password = document.querySelector(".pword-input").value;

    // Validate inputs
    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        // First verify email exists
        const userCheck = await axios.get(`/api/users/email/${email}`);
        
        // Then attempt login
        const loginResponse = await axios.post('/api/auth/login', {
            email,
            password
        });

        // Handle successful login
        if (loginResponse.status === 200) {
            localStorage.setItem('token', loginResponse.data.token);
            alert(`Welcome back, ${userCheck.data.username}!`);
            window.location.href = "/";
        }

    } catch (error) {
        const errorMessage = error.response?.data?.message || 
                           (error.response?.status === 401 
                            ? "Invalid credentials" 
                            : "Login failed. Please try again.");
        
        alert(errorMessage);
        console.error("Login Error:", error);
    }
});
