const imageInput = document.getElementById("imgInput");
const message = document.getElementById("message");

imageInput.addEventListener("change", async () => {
  const file = imageInput.files[0];
  const maxSizeMB = 1;

  if (file && file.size > maxSizeMB * 1024 * 1024) {
    alert("File is too large. Maximum size is 1MB.");
    imageInput.value = ""; // clear the input
  } else {
    // message.textContent = '';
    console.log("File Bigger Than 1mb");
    preview.src = URL.createObjectURL(file);
    // proceed with the file (preview/upload)
  }
});

async function updateUser() {
  event.preventDefault

  const user = {
      fname: document.getElementById("firstname").value,
      lname: document.getElementById("lastname").value,
      address: document.getElementById("address").value,
      phone: document.getElementById("phone").value,
      country: document.getElementById("country").value,
      dateOfBirth: document.getElementById("date-of-birth").value,
      gender: document.querySelector('input[name="gender"]:checked')?.value || ""
  }

  try {
      const res = await fetch("/users/"+document.getElementById("email").value, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
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
