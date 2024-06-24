const onLogin = async () => {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch("/api/auth/login", opts);
  response = await response.json();
  console.log(response);
  if (response.statusCode === 200) {
    Swal.fire({
      title: "Login successful",
      width: 300,
      padding: "0.2em",
      color: "#00FF00",
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/005/163/927/original/login-success-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg",
      imageWidth: 250,
      imageHeight: 250,
      imageAlt: "Login successful",
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      location.replace("../../index.html"); // The landing page is redirected
    });
  } else {
    Swal.fire({
      title: "Login Failed",
      width: 300,
      padding: "0.2em",
      color: "#FF0000",
      imageUrl:
        "https://cdn-icons-png.freepik.com/256/12083/12083237.png?semt=ais_hybrid",
      imageWidth: 250,
      imageHeight: 250,
      imageAlt: "Login failed",
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};
