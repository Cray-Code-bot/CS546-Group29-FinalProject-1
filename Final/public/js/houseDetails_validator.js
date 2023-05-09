let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("image-container");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}

let preventEvent = true;
function validateComment() {
  let comment = document.getElementById("commentInput");
  let errorComment = document.getElementById("errorComment");
  if (comment.value.trim() == "") {
    preventEvent = true;
    errorComment.hidden = false;
    errorComment.textContent = "Comment cannot be empty or only spaces";
  } else {
    errorComment.hidden = true;
    preventEvent = false;
  }
}

var form = document.querySelector('.comments-form');
form.addEventListener('submit', function(event){
    if (preventEvent) {
        event.preventDefault();
    }
})

// Interest Check Validation and posting:
function validateInterest() {
  let interest = document.getElementById("interestInput").value.trim();
  let errorInterest = document.getElementById("errorInterest");
  let name = document.getElementById("interestName").value.trim();
  let errorName = document.getElementById("errorName");
  let nameCheck = false;
  let numberCheck = false;
  const number_regex = /[0-9]+/;
  
  if (parseInt(interest) == "") {
    numberCheck = false;
    errorInterest.hidden = false;
    errorInterest.textContent = "Phone number cannot be empty!";
  }
  else if (!number_regex.test(parseInt(interest)))
  {
    numberCheck = false;
    errorInterest.hidden = false;
    errorInterest.textContent = "Enter numerical values only for the phone number. Do not include +, -, or ()!";
  }
  else if(interest.length < 7 || interest.length > 25)
  {
    numberCheck = false;
    errorInterest.hidden = false;
    errorInterest.textContent = "A phone number should have a minimum of 7 digits and a maximum of 25 digits";
  }
  else {
    errorInterest.hidden = true;
    numberCheck = true;
  }

  let name_regex = /^[a-z ]+$/i;
  if (name == "" ) {
    nameCheck = false;
    errorName.hidden = false;
    errorName.textContent = "Name cannot be empty";
  } else if (!name_regex.test(name) ) {
    nameCheck = false;
    errorName.hidden = false;
    errorName.textContent = "Name can be letters and spaces only";
  } else {
    nameCheck = true;
    errorName.hidden = true;
  }

  if (numberCheck && nameCheck) {
    preventEvent = false;
  } else{
    preventEvent = true;
  }
}

var form_interest = document.querySelector('.interest-form');
form_interest.addEventListener('submit', function(event){
    console.log(preventEvent);
    if (preventEvent) {
        event.preventDefault();
    }
})