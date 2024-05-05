const getData = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/users`, { mode: 'no-cors' });

        const data = await response.json();
        const users = data.response;
        // Return the user data
        return users;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


const getInfoLogIn = async () => {
    let email = document.querySelector('input[name="email"]').value;
    let password = document.querySelector('input[name="password"]').value;

    let users = await getData();
    const result = users.find((user) => email === user.email);

    if (result && password === result.password) {
        alert("User Found");
        location.replace("../../index.html") //Se redigire a la landing page
    } else {
        alert("User Not Found");
    }


}