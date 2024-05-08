let user;
let url = new URL(window.location.href);
let uid = url.searchParams.get("uid");

let response = fetch(`http://localhost:8080/api/users/${uid}`);
response.then(res => res.json())
    .then(data => {
        user = data.response;
        console.log("From fetch:", user);

        const imgUser = document.querySelector("#img-user");
        imgUser.src = user.photo;

        document.getElementById("email-user").innerHTML = "Email:" + user.email;
        document.getElementById("password-user").innerHTML = "Password:" + user.password;
        document.getElementById("role-user").innerHTML = "Role:" + user.role;
    })
    .catch(error => console.error('Error:', error));