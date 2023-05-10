let city = document.getElementById("cityTerm");
let cityError = document.getElementById("citySearchError");
let cityCheck = false;
const cityRegex = /^[a-zA-Z\s]+$/i;
let preventEvent = true;

function checkSearchTerm() {
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

    if (cityCheck) {
        preventEvent = false;
    } else {
        preventEvent = true;
    }
}

var form = document.querySelector('.dashboard-form');
form.addEventListener('submit', function(event){
    if (preventEvent) {
        event.preventDefault();
    }
})