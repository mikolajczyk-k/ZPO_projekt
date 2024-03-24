const slides = document.querySelectorAll(".slide")

showSlide(0)

function showSlide(index) {
    if (index >= slides.length) {
        return showSlide(0);
    }
    slides[index].classList.add('visible');
    setTimeout(function() {
        slides[index].classList.remove('visible');
        showSlide(index + 1); 
    }, 15000); 
}