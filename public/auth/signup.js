
    // Get the form elements
    const signupBtn = document.querySelector(".signup-btn");

    const form = document.querySelector(".sign-up-form");

    const uname = document.querySelector(".uname-input");
    const email = document.querySelector(".email-input");
    const pword = document.querySelector(".pword-input");
    const cpword = document.querySelector(".cpword-input");

    // add show and hide functionality for password fields
    const pwordicon = document.querySelector(".pword-eye-icon");
    const pwordfield = document.querySelector(".pword-input");
    function showp() {
        if (pwordfield.type == "password") {
            pwordfield.type = "text";
            pwordicon.src = "/assets/eye.svg"
        } else {
            pwordfield.type = "password";
            pwordicon.src = "/assets/eye-slash.svg"
        }
    }

    const cpwordicon = document.querySelector(".cpword-eye-icon");
    const cpwordfield = document.querySelector(".cpword-input");
    function showcp() {
        if (cpwordfield.type == "password") {
            cpwordfield.type = "text";
            cpwordicon.src = "/assets/eye.svg"
        } else {
            cpwordfield.type = "password";
            cpwordicon.src = "/assets/eye-slash.svg"
        }
    }


signupBtn.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Validate input fields
    if (pword.value === "" || cpword.value === "") {
        return alert("A password field is empty");
    } 
    if (uname.value === "") {
        return alert("Username field is empty!");
    } 
    if (email.value === "") {
        return alert("Email field is empty!");
    } 
    if (pword.value !== cpword.value) {
        return alert("Passwords do not match! Please try again.");
    }

    // Prepare user data
    const userData = {
        username: uname.value,
        email: email.value,
        password: pword.value,
    };

    try {
        // Send POST request using axios
        const res = await axios.post("/users", userData);

        // Check response status
        if (res.status === 201) {
            alert("User  created successfully");
            window.location.href = "/auth/login";
        } else {
            alert("User  creation failed");
        }
    } catch (error) {
        // Handle errors
        if (error.response && error.response.data) {
            alert(error.response.data.message || "User  creation failed");
        } else {
            alert("Signup failed. Please try again.");
        }
    }
});
