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
  event.preventDefault();
  console.log(document.getElementById("email").value);
  try {
    const result = await fetch(
      "/users/" + document.getElementById("email").value,
      {
        method: "PUT", // Use PUT for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: document.getElementById("firstname").value,
          lname: document.getElementById("lastname").value,
          address: document.getElementById("address").value,
          phone: document.getElementById("phone").value,
          country: document.getElementById("country").value,
        }),
      }
    );

    const data = await result.json();
    console.log(data);

    if (result.ok) {
      alert("User updated successfully");
    } else {
      alert(data.message || "Failed to update user");
    }
    
  } catch (e) {
    alert("An error occurred while updating user", e.message);
    console.error("Update error:", e.message);
  }
}

async function logout(event) {
  event.preventDefault();

  try {
    const res = await fetch("/logout", {
      method: "POST",
      credentials: "include", // important if using cookies/session
    });

    const data = await res.json(); // ✅ correct way to read JSON response

    if (!res.ok) {
      alert(data.message || "Logout Failed.");
      return;
    }

    // ✅ redirect after logout
    window.location.href = "/";
  } catch (e) {
    console.error("Logout error:", e.message);
  }
}
