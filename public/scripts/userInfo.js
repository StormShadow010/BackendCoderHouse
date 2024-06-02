import { printIcons } from "./modules/printLayout.js";

//Get User ID from Params
let url = new URL(window.location.href);
let uid = url.searchParams.get("uid");

const detailInfoUser = async () => {
  let user;

  let response = await fetch(`/api/users/${uid}`);
  let data = await response.json();
  console.log(data);
  user = data.response;

  const imgUser = document.querySelector("#img-user");
  imgUser.src = user.photo;
  document.getElementById("email-user").innerHTML = "Email:" + user.email;
  document.getElementById("password-user").innerHTML =
    "Password:" + user.password;
  document.getElementById("role-user").innerHTML = "Role:" + user.role;
};

const initAppUserInfo = () => {
  printIcons();
  detailInfoUser();
};

initAppUserInfo();
