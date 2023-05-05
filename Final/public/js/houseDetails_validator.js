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