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


const signupBtn = document.querySelector(".signup-btn");
signupBtn.onclick = function () {
    // Validate Pword
    if (pword.value === cpword.value) {
        postUser(
            uname.value,
            email.value,
            pword.value
        );
        // redirect to login page

        // window.location.href="./login";

    } else if (pword.value == "" || cpword.value == "") {
        alert("A password field are empty");
    } else if (uname.value === "") {
        alert("Username field is empty!");
    } else if (email.value === "") {
        alert("email field is empty!");
    } else if (pword.value !== cpword.value) {
        alert("Passwords does not match! please try again.");
    }
};

async function postUser(unameString, emailString, pwordString) {
    const res = await fetch("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            username: unameString,
            email: emailString,
            password: pwordString
        })
    });

    
    if (!res.ok) {
        try {
            const err = body ? JSON.parse(body) : {};
            alert(err.message || "Login failed");
        } catch {
            alert("Login failed");
            }
        return;
    } 

    window.location.href="/auth/login";
        
}
