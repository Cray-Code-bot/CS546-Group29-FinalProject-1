let form = document.querySelector(".housepost-form");
let rommType = document.getElementById("roomType");
let roomCategory = document.getElementById("roomCategory");
let gender = document.getElementById("gender");
let address = document.getElementById("address");
let city = document.getElementById("city");
let state = document.getElementById("state");
let rent = document.getElementById("rent");
let images = document.getElementById("images");
let description = document.getElementById("description");
let roomTypeError = document.getElementById("roomTypeError");
let roomCategoryError = document.getElementById("roomCategoryError");
let genderError = document.getElementById("genderError");
let addressError = document.getElementById("addressError");
let cityError = document.getElementById("cityError");
let stateError = document.getElementById("stateError");
let rentError = document.getElementById("rentError");
let imagesError = document.getElementById("imagesError");
let descriptionError = document.getElementById("descriptionError");
let roomTypeCheck = false;
let roomCategoryCheck = false;
let genderCheck = false;
let addressCheck = false;
let cityCheck = false;
let stateCheck = false;
let rentCheck = false;
let imagesCheck = false;
let descriptionCheck = false;
const addressRegex = /^[0-9a-zA-Z\s,'-]*$/;
const cityRegex = /^[a-zA-Z\s]+$/i;
const rentRegex = /[0-9]+/;
const imagesRegex = /\.jpe?g$/;
const descriptionRegex = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/i;
const statesArray = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  
let preventEvent = true;

function house_validator() {
    if (!rommType.value || rommType.value.trim() == '') {
        roomTypeError.hidden = false;
        roomTypeError.textContent = "Room Type cannot be empty";
        roomTypeCheck = false;
    } else if (roomType.value != "1BHK" && roomType.value != "2BHK" && roomType.value != "3BHK") {
        roomTypeError.hidden = false;
        roomTypeError.textContent = "Room Type cannot have other than 1BHK/2BHK/3BHK values";
        roomTypeCheck = false;
    } else {
        roomTypeError.hidden = true;
        roomTypeCheck = true;
    }

    if (!roomCategory.value || roomCategory.value.trim() == '') {
        roomCategoryError.hidden = false;
        roomCategoryError.textContent = "Category Type cannot be empty";
        roomCategoryCheck = false;
    } else if (roomCategory.value != "Shared" && roomCategory.value != "Private") {
        roomCategoryError.hidden = false;
        roomCategoryError.textContent = "Category Type cannot have other than Shared/Private values";
        roomCategoryCheck = false;
    } else {
        roomCategoryError.hidden = true;
        roomCategoryCheck = true;
    }

    if (!gender.value || gender.value.trim() == '') {
        genderError.hidden = false;
        genderError.textContent = "Gender cannot be empty";
        genderCheck = false;
    } else if (gender.value != "Male" && gender.value != "Female" && gender.value != "Any") {
        genderError.hidden = false;
        genderError.textContent = "Gender cannot be other than Male/Female/Any";
        genderCheck = false;
    } else {
        genderError.hidden = true;
        genderCheck = true;
    }

    if (!address.value || address.value.trim() == '') {
        addressError.hidden = false;
        addressError.textContent = "Address cannot be empty";
        addressCheck = false;
    } else if (!addressRegex.test(address.value)) {
        addressError.hidden = false;
        addressError.textContent = "Address can only be letters, numbers, whitespace, - or '";
        addressCheck = false;
    } else {
        addressError.hidden = true;
        addressCheck = true;
    }

    if (!city.value || city.value.trim() == "") {
        cityError.hidden = false;
        cityError.textContent = "City cannot be empty";
        cityCheck = false;
    } else if (!cityRegex.test(city.value)) {
        cityError.hidden = false;
        cityError.textContent = "City cannot have numbers or special characters";
        cityCheck = false;
    } else {
        cityError.hidden = true;
        cityCheck = true;
    }

    if (!state.value || state.value.trim() == "") {
        stateError.hidden = false;
        stateError.textContent = "State cannot be empty";
        stateCheck = false;
    } else if (!statesArray.includes(state.value)) {
        stateError.hidden = false;
        stateError.textContent = "State must be in US only";
        stateCheck = false;
    } else {
        stateError.hidden = true;
        stateCheck = true;
    }

    if (!rent.value || rent.value.trim() == "") {
        rentError.hidden = false;
        rentError.textContent = "Rent cannot be empty";
        rentCheck = false;
    } else if (!rentRegex.test(rent.value)) {
        rentError.hidden = false;
        rentError.textContent = "Rent must be numbers only";
        rentCheck = false;
    } else if (rent.value <= 0) {
        rentError.hidden = false;
        rentError.textContent = "Rent must be greater than 0";
        rentCheck = false;
    } else {
        rentError.hidden = true;
        rentCheck = true;
    }

    if (!images.files || images.files.length <= 0) {
        imagesError.hidden = false;
        imagesError.textContent = "You should upload atleast 1 image";
        imagesCheck = false;
    } else if (!imagesRegex.test(images.value)) {
        imagesError.hidden = false;
        imagesError.textContent = "You should upload either jpg/jpeg only";
        imagesCheck = false;
    } else {
        imagesError.hidden = true;
        imagesCheck = true;
    }

    if (!description.value || description.value.trim() == "") {
        descriptionError.hidden = false;
        descriptionError.textContent = "Description cannot be empty";
        descriptionCheck = false;
    } else if (descriptionRegex.test(description.value)) {
        descriptionError.hidden = false;
        descriptionError.textContent = "Description cannot be special characters or numbers only";
        descriptionCheck = false;
    } else {
        descriptionError.hidden = true;
        descriptionCheck = true;
    }

    if (roomTypeCheck && roomCategoryCheck && genderCheck && cityCheck && stateCheck && rentCheck && descriptionCheck && addressCheck && imagesCheck) {
        preventEvent = false;
    } else{
        preventEvent = true;
    }
}

form.addEventListener('submit', function(event){
    if (preventEvent) {
        event.preventDefault();
    }
})