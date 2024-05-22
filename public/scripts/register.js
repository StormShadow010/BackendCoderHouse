const createNewUser = async () => {
  // Crear el objeto data
  const data = {
    email: document.querySelector("#email").value.trim(),
    password: document.querySelector("#password").value.trim(),
    role: document.querySelector("#role").value.trim(),
    photo: document.querySelector("#photo").value.trim(),
  };

  // Filtrar los campos vacíos
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "")
  );

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filteredData),
  };
  let response = await fetch("/api/sessions/register", opts);
  response = await response.json();

  if (response.statusCode === 201) {
    Swal.fire({
      title: response.message,
      icon: "success",
      allowOutsideClick: false,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      location.replace("../users/login.html");
      document.querySelector("#email").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#role").value = "";
      document.querySelector("#photo").value = "";
    });
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
};
