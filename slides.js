// Slide navigation
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Update slide counter and progress
function updateUI() {
    document.querySelector('.slide-counter .current').textContent = currentSlide + 1;
    document.querySelector('.slide-counter .total').textContent = slides.length;
    
    const progress = ((currentSlide + 1) / slides.length) * 100;
    document.querySelector('.progress-fill').style.width = progress + '%';
}

// Show slide
function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    
    updateUI();
}

// Next slide
function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

// Previous slide
function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Toggle keyboard help with ?
    if (e.key === '?') {
        const help = document.getElementById('keyboardHelp');
        if (help) {
            help.classList.toggle('show');
        }
        return;
    }
    
    // Arrow keys, J/K, Space
    switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'j':
        case 'J':
        case ' ':
            e.preventDefault();
            nextSlide();
            break;
            
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'k':
        case 'K':
            e.preventDefault();
            prevSlide();
            break;
            
        case 'Home':
            e.preventDefault();
            showSlide(0);
            break;
            
        case 'End':
            e.preventDefault();
            showSlide(slides.length - 1);
            break;
    }
    
    // Number keys 1-9 for quick jump
    if (e.key >= '1' && e.key <= '9') {
        const slideNum = parseInt(e.key) - 1;
        if (slideNum < slides.length) {
            e.preventDefault();
            showSlide(slideNum);
        }
    }
});

// Mouse/Touch navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}

// Click navigation (left/right side of screen)
document.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    
    if (clickX < screenWidth / 3) {
        prevSlide();
    } else if (clickX > (screenWidth * 2) / 3) {
        nextSlide();
    }
});

// Show keyboard help on load
window.addEventListener('load', () => {
    updateUI();
    
    const help = document.getElementById('keyboardHelp');
    if (help) {
        setTimeout(() => {
            help.classList.add('show');
            setTimeout(() => {
                help.classList.remove('show');
            }, 4000);
        }, 1000);
    }
});

// Prevent default scrolling
document.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
        nextSlide();
    } else {
        prevSlide();
    }
}, { passive: false });
