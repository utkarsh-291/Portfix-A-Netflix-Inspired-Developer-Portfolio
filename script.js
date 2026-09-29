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

/* --- PROJECT AUTOPLAY --- */

const heroSlider = document.querySelector('.hero-slides');

if (heroSlider) {
    let autoplayTimer;
    let isHeroPaused = false;

    function startHeroAutoplay() {
        clearInterval(autoplayTimer);

        autoplayTimer = setInterval(() => {
            if (isHeroPaused) return;

            const slideWidth = heroSlider.clientWidth;
            const maxScroll = heroSlider.scrollWidth - heroSlider.clientWidth;

            if (heroSlider.scrollLeft >= maxScroll - 5) {
                heroSlider.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                heroSlider.scrollBy({
                    left: slideWidth,
                    behavior: 'smooth'
                });
            }
        }, 5000);
    }

    heroSlider.addEventListener('mouseenter', () => {
        isHeroPaused = true;
    });

    heroSlider.addEventListener('mouseleave', () => {
        isHeroPaused = false;
    });

    heroSlider.addEventListener('focusin', () => {
        isHeroPaused = true;
    });

    heroSlider.addEventListener('focusout', () => {
        isHeroPaused = false;
    });

    startHeroAutoplay();
}
