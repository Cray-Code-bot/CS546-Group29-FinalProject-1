let emailAddress = document.getElementById("emailAddressInput");
let passwordInput = document.getElementById("passwordInput");
let button = document.querySelector('.login-button');
let errorLogin = document.querySelector(".error-email");
let errorPassword = document.querySelector(".error-password")
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let emailCheck = false;
let passwordCheck = false;

function checkCredentials() {
    if (emailAddress.value.trim() !== "" && regex.test(emailAddress.value.trim())) {
        errorLogin.hidden = true;
        emailCheck = true;
    } else if (emailAddress.value.trim() === "") {
        errorLogin.hidden = false;
        errorLogin.textContent = "You should provide an email";
        emailCheck = false;
    } else if (!regex.test(emailAddress.value.trim())) {
        errorLogin.hidden = false;
        errorLogin.textContent = "Please provide correct email format";
        emailCheck = false;
    } else {
        errorLogin.hidden = true;
        emailCheck = false;
    }

    if (passwordInput.value.trim() !== "") {
        errorPassword.hidden = true;
        passwordCheck = true;
    } else {
        errorPassword.hidden = false;
        errorPassword.textContent = "Password cannot be empty spaces";
        passwordCheck = false;
    }

    if (emailCheck && passwordCheck) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}