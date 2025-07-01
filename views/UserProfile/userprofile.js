const imageInput = document.getElementById('imgInput');
const message = document.getElementById('message');

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    const maxSizeMB = 1;

    if (file && file.size > maxSizeMB * 1024 * 1024) {
        alert("File is too large. Maximum size is 1MB.");
        imageInput.value = ''; // clear the input
    } else {
        // message.textContent = '';
        console.log("File Bigger Than 1mb")
        preview.src = URL.createObjectURL(file);
        // proceed with the file (preview/upload)
    }
});

const savebtn = document.querySelector(".save-btn");
savebtn.onclick = async function() {
    const user = {
        email,
        // username,
        // password,
        // firstname,
        // lastname,
        // birthdate,
        // address,
        // phonenumber,
        // country,
        // genderF
    }

    try {
        const res = await fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "applcation/json" },
            body: JSON.stringify(user)
        })

        if (!res.ok) {
            const error = await res.json();
            alert(error.message || "Registration failed.");
            return;
        }

        alert("User registered successfully!");
        window.location.href = "/"; // redirect to home

    } catch(e) {
        return console.log(e.message);
    }
}

async function logout() {
    event.preventDefault();

    try {
        const res = await fetch("/logout", {
            method: "POST",
            credentials: "include"
        })
        const data = res.data;

        if (!res.ok) {
            const error = await res.json();
            alert(error.message || "Logout Failed.");
            return;
        }

        // alert(data.message);
        window.location.href = "/"; // redirect to home
    } catch(e) {
        return console.log(e.message);
    }
}
