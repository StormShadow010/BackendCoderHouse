export const printIcons = async () => {
    let template = "";
    let online = await fetch("/api/sessions");
    online = await online.json();
    if (online.statusCode === 200) {
        template = `
        <a href="../../pages/users/userInfo.html?uid=${online.user_id}"> <img src="${online.photo}" class="h-[40px] w-[40px] mr-2"> </a>
        <a href="./cart.html"><img src="../../assets/icons/cart.png" alt="Cart"
                        class="h-[50px] w-[50px] mr-2"></a>
        <button id="signout"><img src="../../assets/icons/logout.png" alt="Login"
                        class="h-[40px] w-[40px] mr-2"></button>
        `;
        document.querySelector("#headerIcons").innerHTML = template;
        document.querySelector("#signout").addEventListener("click", async () => {
            const opts = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            };
            let response = await fetch("/api/sessions/signout", opts);
            response = await response.json();
            console.log(response);
            if (response.statusCode === 200) {
                location.replace("/");
            }
        });
    } else {
        template = `
        <a href="../../pages/users/login.html"><img src="../../assets/icons/user-login.png" alt="Login"
                        class="h-[50px] w-[50px] mr-2"></a>
        `;
        document.querySelector("#headerIcons").innerHTML = template;
    }
}
