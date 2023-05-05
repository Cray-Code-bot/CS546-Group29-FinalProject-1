let emailAddress = document.getElementById("emailAddressInput");
let passwordInput = document.getElementById("passwordInput");
let errorEmail = document.getElementById("errorEmail");
let errorPassword = document.getElementById("errorPassword");
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let emailCheck = false;
let passwordCheck = false;
let preventEvent = true;

function checkCredentials() {
    if (emailAddress.value.trim() !== "" && regex.test(emailAddress.value.trim())) {
        errorEmail.hidden = true;
        emailCheck = true;
    } else if (emailAddress.value.trim() === "") {
        errorEmail.hidden = false;
        errorEmail.textContent = "You should provide an email";
        emailCheck = false;
    } else if (!regex.test(emailAddress.value.trim())) {
        errorEmail.hidden = false;
        errorEmail.textContent = "Please provide correct email format";
        emailCheck = false;
    } else {
        errorEmail.hidden = true;
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
        preventEvent = false;
    } else {
        preventEvent = true;
    }
}

var form = document.querySelector('.login-form');
form.addEventListener('submit', function(event){
    if (preventEvent) {
        event.preventDefault();
    }
})