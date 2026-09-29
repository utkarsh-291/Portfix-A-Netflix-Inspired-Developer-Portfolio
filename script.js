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


/* --- SEAMLESS INFINITE CAROUSELS --- */

function setupInfiniteCarousel(selector, trackSelector, interval = 3500) {
    const carousel = document.querySelector(selector);
    const track = document.querySelector(trackSelector);

    if (!carousel || !track) return;

    const originalItems = [...track.children];
    const originalWidth = track.scrollWidth;

    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    let timer;
    let paused = false;

    function normalizeScroll() {
        if (carousel.scrollLeft >= originalWidth) {
            carousel.scrollLeft -= originalWidth;
        }
    }

    function advance() {
        if (paused) return;

        const firstItem = track.children[0];
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const amount = firstItem.getBoundingClientRect().width + gap;

        carousel.scrollBy({
            left: amount,
            behavior: 'smooth'
        });

        setTimeout(normalizeScroll, 500);
    }

    timer = setInterval(advance, interval);

    carousel.addEventListener('mouseenter', () => {
        paused = true;
    });

    carousel.addEventListener('mouseleave', () => {
        paused = false;
    });

    carousel.addEventListener('focusin', () => {
        paused = true;
    });

    carousel.addEventListener('focusout', () => {
        paused = false;
    });

    carousel.addEventListener('scroll', normalizeScroll);
}

setupInfiniteCarousel('.hero-slides', '.hero-slides', 5000);
setupInfiniteCarousel('.skills-carousel', '.skills-track', 3500);
