const imageInput = document.getElementById('imgInput');
const message = document.getElementById('message');

imageInput.addEventListener('change', async () => {
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


// user info update function
const savebtn = document.getElementById("saveBtn");
savebtn.onclick = async function () {
    event.preventDefault();

    // 1. Get the selected image file (if any)
    const imageFile = document.getElementById("imgInput").files[0];
    let imageUrl = ""; // Will hold the Cloudinary image URL if uploaded

    // 2. Upload image to Cloudinary only if a new image was selected
    if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const uploadRes = await fetch("/api/cloudinary/upload", {
                method: "POST",
                body: formData
            });

            const result = await uploadRes.json();

            if (uploadRes.ok) {
                imageUrl = result.url; // ✅ Cloudinary image URL
            } else {
                console.log(result.url)
                alert("Image upload failed.");
                return;
            }
        } catch (err) {
            console.error("Image upload error:", err);
            alert("Failed to upload image.");
            return;
        }
    }

    // 3. Prepare the user object, including image URL if uploaded
    const user = {
        fname: document.getElementById("firstname").value,
        lname: document.getElementById("lastname").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        country: document.getElementById("country").value,
        dateOfBirth: document.getElementById("date-of-birth").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        profileImgUrl: imageUrl || document.getElementById("preview").src // use new image or keep current
    };

    // 4. Send update request
    try {
        const res = await fetch("/users/" + document.getElementById("email").value, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!res.ok) {
            const error = await res.json();
            alert(error.message || "Update failed.");
            return;
        }

        alert("User updated successfully!");
    } catch (e) {
        console.error("Update error:", e);
    }
};



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
