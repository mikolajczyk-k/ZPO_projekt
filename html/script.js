const slides = document.querySelectorAll(".slide")
const nextButton = document.querySelector(".next")
const previousButton = document.querySelector(".prev")

let slideshowFlag = false



function showSlide() {
        for (i=0; i< slides.length; i++){
            slides[index].classList.add('visible');
            setTimeout(function() {
                slides[index].classList.remove('visible');
                showSlide(index + 1); 
            }, 15000); 
        }
    }