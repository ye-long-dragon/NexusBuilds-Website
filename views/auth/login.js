
async function login() {
    const pword = document.querySelector(".pword-input").value;
    const email = document.querySelector(".email-input").value;
    
    const res = await fetch(`/users/${email}`);
    const data =  await res.json();
    
    // console.log(data.password);

    if (pword == data.password) {
        window.location.href = "/";
        alert(`Welcome, ${data.username}.`);
    } else {
        alert("Incorrect password or email does not exist.");
    }
    
}