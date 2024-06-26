const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider__btn--left");
const nextBtn = document.querySelector(".slider__btn--right");
let dots = document.querySelectorAll(".dots__dot");

let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, idx) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
    });

    dots.forEach((dot, idx) => {
        if (idx === index) {
            dot.classList.add("dots__dot--active");
        } else {
            dot.classList.remove("dots__dot--active");
        }
    });
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
});

dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
        currentIndex = idx;
        showSlide(currentIndex);
    });
});

showSlide(currentIndex);

// Slider for the Team
let swiperCards = new Swiper('.card-content', {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    breakpoints: {
        600: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 3,
        }
    }
});

// Testimonials
let testSlide = document.querySelectorAll('.testItem');
let testDots = document.querySelectorAll('.dot');

let counter = 0;

function switchTest(currentTest) {
    currentTest.classList.add('active');
    let testId = currentTest.getAttribute('attr');
    if (testId > counter) {
        testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
        counter = testId;
        testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
    } else if (testId == counter) {
        return;
    } else {
        testSlide[counter].style.animation = 'prev1 0.5s ease-in forwards';
        counter = testId;
        testSlide[counter].style.animation = 'prev2 0.5s ease-in forwards';
    }
    updateIndicators();
}

function updateIndicators() {
    testDots.forEach(dot => dot.classList.remove('active'));
    testDots[counter].classList.add('active');
}

function slideNext() {
    testSlide[counter].style.animation = 'next1 0.5s ease-in forwards';
    counter = (counter >= testSlide.length - 1) ? 0 : counter + 1;
    testSlide[counter].style.animation = 'next2 0.5s ease-in forwards';
    updateIndicators();
}

function autoSliding() {
    slideInterval = setInterval(slideNext, 5000);
}

autoSliding();

const indicatorsContainer = document.querySelector('.indicators');

indicatorsContainer.addEventListener('mouseover', () => {
    clearInterval(slideInterval);
});

indicatorsContainer.addEventListener('mouseout', autoSliding);

// Attach click events to testimonial dots
testDots.forEach(dot => {
    dot.addEventListener('click', () => {
        let currentTest = dot;
        switchTest(currentTest);
    });
});
