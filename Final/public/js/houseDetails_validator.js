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
    console.log(preventEvent);
    if (preventEvent) {
        event.preventDefault();
    }
})

// Interest Check Validation and posting:
function validateInterest() {
  let interest = document.getElementById("interestInput");
  let errorComment = document.getElementById("errorInterest");
  if (interest.value.trim() == "") {
    preventEvent = true;
    errorComment.hidden = false;
    errorComment.textContent = "Phone number cannot be empty!";
  } 
  else if (typeof parseInt(interest.trim()) != "number")
  {
    preventEvent = true;
    errorComment.hidden = false;
    errorComment.textContent = "Enter numerical values only for the phone number. Do not include +, -, or ()!";
  }
  else if(interestInt.length > 25)
  {
    preventEvent = true;
    errorComment.hidden = false;
    errorComment.textContent = "A phone number can have a maximum of 25 digits.";
  }
  else {
    errorComment.hidden = true;
    preventEvent = false;
  }
}

var form = document.querySelector('.interest-form');
form.addEventListener('submit', function(event){
    console.log(preventEvent);
    if (preventEvent) {
        event.preventDefault();
    }
})