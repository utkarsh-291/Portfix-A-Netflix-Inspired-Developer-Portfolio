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

    // Duplicate the original items so the second set follows
    // immediately after the first set.
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    function getCycleWidth() {
        const gap = parseFloat(getComputedStyle(track).gap) || 0;

        return originalItems.reduce((total, item) => {
            return total + item.getBoundingClientRect().width;
        }, 0) + gap * originalItems.length;
    }

    function normalizeScroll() {
        const cycleWidth = getCycleWidth();

        if (cycleWidth > 0 && carousel.scrollLeft >= cycleWidth) {
            carousel.scrollLeft -= cycleWidth;
        }
    }

    /*
     * Other carousels keep the original step-by-step auto-scroll.
     */
    let paused = false;

    function advance() {
        if (paused) return;

        const firstItem = track.children[0];

        if (!firstItem) return;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const amount = firstItem.getBoundingClientRect().width + gap;

        carousel.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }

    setInterval(advance, interval);

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
