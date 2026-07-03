const COMMON_I18N = {
    ru: {
        "nav.about": "Обо мне",
        "nav.experience": "Опыт",
        "nav.projects": "Проекты",
        "nav.back": "← Назад к Портфолио",

        "hero.title": "Офицеров Александр",
        "hero.subtitle": "Разработчик встраиваемых устройств",
        "hero.tagline": "Занимаюсь разработкой встраиваемых устройств полного цикла — от схемотехники и печатной платы до прошивки и прикладного программного обеспечения.",
        "hero.expBtn": "Смотреть опыт",

        "skills.toggle": "Показать мои навыки",
        "skills.languages": "Языки",
        "skills.embedded": "Встраиваемые системы и электроника",
        "skills.tools": "Инструменты и платформы",

        "error.title": "Кажется, вы свернули не туда",
        "error.subtext": "Запрошенный ресурс не существует или был перемещён. Мы проверили все пути, но эта страница ускользнула от нас.",
        "error.homeBtn": "Перейти на Главную",
        "error.docTitle": "404 | Страница не найдена"
    },
    en: {
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.back": "← Back to Portfolio",

        "hero.title": "Ofitserov Aleksandr",
        "hero.subtitle": "Embedded Systems Developer",
        "hero.tagline": "I develop embedded devices across the full cycle — from circuit design and PCB layout to firmware and application software.",
        "hero.expBtn": "View Experience",

        "skills.toggle": "Show my skills",
        "skills.languages": "Languages",
        "skills.embedded": "Embedded & Electronics",
        "skills.tools": "Tools & Platforms",

        "error.title": "Looks like you took a wrong turn",
        "error.subtext": "The requested resource does not exist or has been moved. We checked all the paths, but this page escaped us.",
        "error.homeBtn": "Go to Homepage",
        "error.docTitle": "404 | Page Not Found"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const ruBtn = document.getElementById('lang-ru');
    const enBtn = document.getElementById('lang-en');

    const pageI18n = window.PAGE_I18N || {};
    const dictionaries = {
        ru: Object.assign({}, COMMON_I18N.ru, pageI18n.ru || {}),
        en: Object.assign({}, COMMON_I18N.en, pageI18n.en || {})
    };

    let currentLang = 'ru';
    const savedLang = localStorage.getItem('portfolioLang');
    if (savedLang === 'ru' || savedLang === 'en') {
        currentLang = savedLang;
    } else if (navigator.language && navigator.language.toLowerCase().startsWith('en')) {
        currentLang = 'en';
    }

    function setLanguage(lang) {
        if (lang !== 'ru' && lang !== 'en') return;
        localStorage.setItem('portfolioLang', lang);

        const data = dictionaries[lang];
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                el.textContent = data[key];
            }
        });

        const titleHost = document.querySelector('[data-i18n-doc-title]');
        if (titleHost) {
            const titleKey = titleHost.dataset.i18nDocTitle;
            if (Object.prototype.hasOwnProperty.call(data, titleKey)) {
                document.title = data[titleKey];
            }
        }

        if (ruBtn) ruBtn.classList.toggle('active', lang === 'ru');
        if (enBtn) enBtn.classList.toggle('active', lang === 'en');
    }

    if (ruBtn) ruBtn.addEventListener('click', (e) => { e.preventDefault(); setLanguage('ru'); });
    if (enBtn) enBtn.addEventListener('click', (e) => { e.preventDefault(); setLanguage('en'); });

    const skillsToggle = document.getElementById('skills-toggle');
    const skillsContent = document.getElementById('skills-content');
    if (skillsToggle && skillsContent) {
        skillsToggle.addEventListener('click', () => {
            skillsToggle.classList.toggle('expanded');
            skillsContent.classList.toggle('expanded');
        });
    }

    setLanguage(currentLang);

    function setupCarousel() {
        const track = document.querySelector('.carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-btn.next');
        const prevButton = document.querySelector('.carousel-btn.prev');
        const dotsContainer = document.querySelector('.carousel-dots');

        if (slides.length === 0) return;

        let currentIndex = 0;
        const slideCount = slides.length;

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        const setSlide = (targetIndex) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            if (slideWidth === 0) return;

            const xPosition = targetIndex * -slideWidth;

            track.style.transform = `translateX(${xPosition}px)`;
            currentIndex = targetIndex;

            dots.forEach(dot => dot.classList.remove('active'));
            dots[targetIndex].classList.add('active');
        };

        const moveToNextSlide = () => {
            const newIndex = (currentIndex + 1) % slideCount;
            setSlide(newIndex);
        };

        const moveToPrevSlide = () => {
            const newIndex = currentIndex === 0 ? slideCount - 1 : currentIndex - 1;
            setSlide(newIndex);
        };

        if (nextButton) nextButton.addEventListener('click', moveToNextSlide);
        if (prevButton) prevButton.addEventListener('click', moveToPrevSlide);

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.dataset.index);
                setSlide(targetIndex);
            });
        });

        let isDragging = false;
        let startX;
        let currentSlideWidth;

        const dragStart = (e) => {
            isDragging = true;
            track.style.transition = 'none';
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            currentSlideWidth = slides[0].getBoundingClientRect().width;
        };

        const dragging = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diffX = startX - currentX;
            track.style.transform = `translateX(${currentIndex * -currentSlideWidth - diffX}px)`;
        };

        const dragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.4s ease-in-out';

            const currentPosition = track.style.transform.match(/(-?\d+)px/)?.[1];
            const movedDistance = currentPosition ? parseFloat(currentPosition) : 0;

            const dragThreshold = currentSlideWidth * 0.25;
            let newIndex = currentIndex;

            if (movedDistance < -(currentIndex * currentSlideWidth) + dragThreshold) {
                newIndex = currentIndex + 1;
            } else if (movedDistance > -(currentIndex * currentSlideWidth) - dragThreshold) {
                newIndex = currentIndex - 1;
            }

            newIndex = Math.max(0, Math.min(slideCount - 1, newIndex));
            setSlide(newIndex);
        };

        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mousemove', dragging);
        document.addEventListener('mouseup', dragEnd);

        track.addEventListener('touchstart', dragStart, { passive: false });
        track.addEventListener('touchmove', dragging, { passive: false });
        document.addEventListener('touchend', dragEnd);

        setSlide(0);
    }

    if (document.querySelector('.image-carousel')) {
        setupCarousel();
    }
});
