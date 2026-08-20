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