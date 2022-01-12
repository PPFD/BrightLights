const slider = document.querySelector(".about__slider"),
      images = slider.querySelectorAll(".about__slider__element");

let index = images.length;


slider.addEventListener("click", ()=>{
        const hidden = slider.querySelectorAll(".about__slider__element_hidden");
        let current = slider.querySelector(".about__slider__element_current");
        let next = slider.querySelector(".about__slider__element_next");
        current.classList.remove("about__slider__element_current");
        current.classList.add("about__slider__element_hidden");
        next.classList.remove("about__slider__element_next");
        next.classList.add("about__slider__element_current");
        hidden[0].classList.remove("about__slider__element_hidden");
        hidden[0].classList.add("about__slider__element_next");
}); 