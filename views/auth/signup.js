const uname = document.querySelector(".uname-input");
const email = document.querySelector(".email-input");
const pword = document.querySelector(".pword-input");
const cpword = document.querySelector(".cpword-input");

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

function postUser(unameString, emailString, pwordString) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/api/users");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    
    const body = JSON.stringify({
        username: unameString,
        email: emailString,
        password: pwordString
    });


    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status == 201) {
            try {
                if (xhr.responseText) {
                    console.log(JSON.parse(xhr.responseText));
                } else {
                    console.log("Success, but no JSON returned");
                }
            } catch (e) {
                console.error("INvalid JSON resoonse:", e);
            }
            alert("User infomration stored");
            window.location.href="/auth/login";
        } else {
            console.log(`Error: ${xhr.status}`);
            alert("Email already exists!");
        }
    };

    xhr.send(body);

    console.log("done");
}
