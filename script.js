// --- HEADER SCROLL ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        
    }
});

// --- ROW SCROLL ---
function scrollRow(button, direction) {
    const row = button.closest('.row-container').querySelector('.row-scroll');
    const scrollAmount = row.clientWidth * 0.8; // Scroll by 80%
    
    if (direction === 'left') {
        row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// --- HERO SLIDER LOGIC ---
const sliderTrack = document.querySelector('.hero-slider-track');
const sliderDots = document.querySelectorAll('.slider-dot');
const slides = document.querySelectorAll('.hero-slide');
const slideCount = slides.length;
let currentSlide = 0;

function moveToSlide(slideIndex) {
    // 1. Move the track
    sliderTrack.style.transform = `translateX(-${slideIndex * (100 / slideCount)}%)`;
    
    // 2. Update active dot
    sliderDots.forEach(dot => dot.classList.remove('active'));
    sliderDots[slideIndex].classList.add('active');
    
    // 3. Update current slide index
    currentSlide = slideIndex;
}

function nextSlide() {
    let nextSlideIndex = (currentSlide + 1) % slideCount;
    moveToSlide(nextSlideIndex);
}

function prevSlide() {
    let prevSlideIndex = (currentSlide - 1 + slideCount) % slideCount;
    moveToSlide(prevSlideIndex);
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        moveToSlide(index);
    });
});
