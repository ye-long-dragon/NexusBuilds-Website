
async function login() {
    const pword = document.querySelector(".pword-input").value;
    const email = document.querySelector(".email-input").value;
    
    const res = await fetch(`/users/${email}`);
    const data =  await res.json();
    
    console.log(data.password);

    if (pword == data.password) {
        alert(`Welcome, ${data.username}.`);
        window.location.href = "/";
    } else {
        alert("Incorrect password or email does not exist.");
    }
    
}