// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

let registrationForm = document.getElementById("registration-form");
let regErrorDiv = document.getElementById("regErrorDiv");

if (registrationForm) {
  registrationForm.addEventListener("submit", (event) => {
    console.log("Form submission fired");
    event.preventDefault();
    console.log("Has a form");
    regErrorDiv.innerText = "";
    let firstName = document.getElementById("firstNameInput").value.trim();
    let lastName = document.getElementById("lastNameInput").value.trim();
    let emailAddress = document
      .getElementById("emailAddressInput")
      .value.trim();
    let password = document.getElementById("passwordInput").value.trim();
    let confirmPassword = document
      .getElementById("confirmPasswordInput")
      .value.trim();

    if (!firstName || !lastName || !emailAddress || !password) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText = "Error all the fields must be supplied";
      regErrorDiv.append(errorDesc);
    }

    if (firstName.trim().length == 0) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText = "Error first name should not contain empty spaces";
      regErrorDiv.append(errorDesc);
    }

    let firstNameRegex=/^[a-zA-Z]+$/;

    if(!firstNameRegex.test(firstName)){
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error first name  should not contain numbers in it";
      regErrorDiv.append(errorDesc);
    }

    let lastNameRegex=/^[a-zA-Z]+$/;

    if(!lastNameRegex.test(lastName)){
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error last name should not contain numbers in it";
      regErrorDiv.append(errorDesc);
    }

    if (firstName.length < 2) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText ="Error firstName length should be atleast 2 characters";
      regErrorDiv.append(errorDesc);
    }

    if (firstName.length > 25) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error firstName length should be upto 25 characters";
      regErrorDiv.append(errorDesc);
    }

    if (lastName.trim().length == 0) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error lastName should not contain empty spaces";
      regErrorDiv.append(errorDesc);
    }

    if (lastName.length < 2) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error lastName length should be atleast 2 characters";
      regErrorDiv.append(errorDesc);
    }

    if (lastName.length > 25) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error lastName length should be upto 25 characters";
      regErrorDiv.append(errorDesc);
    }

    if (password.trim().length == 0) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error password should not be empty or contains empty spaces";
      regErrorDiv.append(errorDesc);
    }

    if (password.trim().length < 8) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error password should be minimum 8 characters long";
      regErrorDiv.append(errorDesc);
    }

    if (password !== confirmPassword) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Both the password and confirm password need to be same";
      console.log(password, confirmPassword);
      regErrorDiv.append(errorDesc);
    }

    let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?&])[A-Za-z\d@#$!%^*?&]{8,}$/;

    if (!regex.test(password)) {
      let errorDesc = document.createElement("p");
      errorDesc.innerText="Error password should contain at least one captial letter,special character or number";
      regErrorDiv.append(errorDesc);
    }

  
    console.log(regErrorDiv.innerText);
    if (regErrorDiv.innerText == 0) {
      event.target.submit();
    }
    // if (errors.innerText.length == 0) {
    //   event.target.submit();
    // }
  });
}