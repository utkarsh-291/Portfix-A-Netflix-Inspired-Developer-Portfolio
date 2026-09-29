// --- HEADER SCROLL ---
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');

    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// --- ROW SCROLL ---
function scrollRow(button, direction) {

    const row = button
        .closest('.row-container')
        .querySelector('.row-scroll');

    const scrollAmount = row.clientWidth * 0.8;

    if (direction === 'left') {
        row.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        row.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}


// --- HERO SLIDER ---

function scrollHero(direction) {

    const slider = document.querySelector('.hero-slides');

    if (!slider) {
        return;
    }

    const slideWidth = slider.clientWidth;

    slider.scrollBy({
        left: direction * slideWidth,
        behavior: 'smooth'
    });
}


/* --- CAROUSEL AUTOPLAY --- */

function setupCarouselAutoplay(selector, interval = 5000) {
    const carousel = document.querySelector(selector);

    if (!carousel) return;

    let autoplayTimer;
    let isPaused = false;

    function startAutoplay() {
        clearInterval(autoplayTimer);

        autoplayTimer = setInterval(() => {
            if (isPaused) return;

            const scrollAmount = carousel.clientWidth * 0.8;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            if (carousel.scrollLeft >= maxScroll - 5) {
                carousel.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, interval);
    }

    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    carousel.addEventListener('focusin', () => {
        isPaused = true;
    });

    carousel.addEventListener('focusout', () => {
        isPaused = false;
    });

    startAutoplay();
}

setupCarouselAutoplay('.hero-slides', 5000);
setupCarouselAutoplay('.skills-carousel', 3500);
