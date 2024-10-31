let currentSlide = 0;
const slidesContainer = document.querySelector('.slides-container');
const totalSlides = 7;

function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
    resetAnimations();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function resetAnimations() {
    const contents = document.querySelectorAll('.slide-content, .slide-image');
    contents.forEach(content => {
        content.style.animation = 'none';
        content.offsetHeight;
        content.style.animation = content.classList.contains('slide-content') ?
            'fadeInUp 1s forwards' : 'fadeInRight 1s forwards';
    });
}

function createHearts() {
    const hearts = document.createElement('div');
    hearts.className = 'hearts';

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDelay = Math.random() * 2 + 's';
        hearts.appendChild(heart);
    }

    document.body.appendChild(hearts);
    setTimeout(() => hearts.remove(), 4000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

let touchStartX = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});

function createFirework(x, y) {
    const colors = ['#ff0000', '#ffd700', '#ff69b4', '#00ff00', '#ff4500'];
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(firework);

    firework.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(20)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => firework.remove();
}

function createFloatingHearts() {
    const container = document.createElement('div');
    container.className = 'floating-hearts';
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }

    setTimeout(() => container.remove(), 6000);
}

function showForgiveness() {
    // Create multiple fireworks
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }

    // Start floating hearts
    createFloatingHearts();

    // Show message overlay
    const overlay = document.querySelector('.message-overlay');
    const card = document.querySelector('.message-card');
    overlay.style.display = 'flex';
    setTimeout(() => card.classList.add('show'), 100);

    // Automatically close message card after 20 seconds
    setTimeout(() => {
        overlay.style.display = 'none';
        card.classList.remove('show');
    }, 20000); // 20,000 milliseconds = 20 seconds

    // Close popup when clicking outside the card
    overlay.addEventListener('click', (e) => {
        if (!card.contains(e.target)) {
            overlay.style.display = 'none';
            card.classList.remove('show');
        }
    });
}
