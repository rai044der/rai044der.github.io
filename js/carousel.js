function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const setSlide = (targetIndex) => {
        const amountToMove = slides[0].getBoundingClientRect().width;
        const xPosition = targetIndex * -amountToMove;

        track.style.transform = `translateX(${xPosition}px)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');
    };

    const moveToNextSlide = () => {
        const currentIndex = dots.findIndex(dot => dot.classList.contains('active'));
        const newIndex = (currentIndex + 1) % slides.length;
        setSlide(newIndex);
    };

    const moveToPrevSlide = () => {
        const currentIndex = dots.findIndex(dot => dot.classList.contains('active'));
        const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        setSlide(newIndex);
    };

    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const targetIndex = parseInt(e.target.dataset.index);
            setSlide(targetIndex);
        });
    });

    if (slides.length > 0) {
        setSlide(0);
    }
}

if (document.querySelector('.image-carousel')) {
    setupCarousel();
}
