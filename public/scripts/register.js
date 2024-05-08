const createNewUser = () => {
    let email = document.querySelector('input[name="email"]').value;
    let password = document.querySelector('input[name="password"]').value;
    let role = document.querySelector('input[name="role"]').value;
    let photo = document.querySelector('input[name="photo"]').value;

    let dataNewUser = {
        email: email,
        password: password,
        role: role,
        photo: photo
    }

    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataNewUser)
    })
        .then(response => response.json())
        .then(data => {
            if (data.statusCode == 201) {
                alert("User created")
                location.replace("../../index.html") //Se redigire a la landing page
                // Reset input fields
                document.querySelector('input[name="email"]').value = "";
                document.querySelector('input[name="password"]').value = "";
                document.querySelector('input[name="role"]').value = "";
                document.querySelector('input[name="photo"]').value = "";
            } else {
                alert("Email already exists");
                // Reset input fields
                document.querySelector('input[name="email"]').value = "";
                document.querySelector('input[name="password"]').value = "";
                document.querySelector('input[name="role"]').value = "";
                document.querySelector('input[name="photo"]').value = "";
            }
        })
        .catch(error => console.error('Error:', error));
}