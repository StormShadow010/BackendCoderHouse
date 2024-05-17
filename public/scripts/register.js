const createNewUser = async () => {
    const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        role: document.querySelector('#role').value,
        photo: document.querySelector('#photo').value
    }
    const opts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json();
    if (response.statusCode === 201) {
        Swal.fire({
            title: response.message,
            icon: "success",
            allowOutsideClick: false,
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
        location.replace("../users/login.html");
        document.querySelector('#email').value = ""
        document.querySelector('#password').value = ""
        document.querySelector('#role').value = ""
        document.querySelector('#photo').value = ""
    } else {
        Swal.fire({
            title: response.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
            showConfirmButton: false,
        });
    }
}