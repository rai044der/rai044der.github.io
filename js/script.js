document.addEventListener('DOMContentLoaded', () => {
    const ruBtn = document.getElementById('lang-ru');
    const enBtn = document.getElementById('lang-en');
    const body = document.body; 

    let currentLang = 'ru'; // По умолчанию
    
    // Проверяем LocalStorage (Приоритет 1)
    const savedLang = localStorage.getItem('portfolioLang');
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
        currentLang = savedLang;
    } 
    // Проверяем системные настройки (Приоритет 2)
    else if (navigator.language) {
        const userLang = navigator.language.toLowerCase();
        if (userLang.startsWith('en')) {
            currentLang = 'en';
        } 
    }

    const contentMap = {
        ru: {
            title: "Офицеров Александр Сергеевич",
            subtitle: "Разработчик встраиваемых устройств",
            tagline: "Говнокожу.",
            exp_btn: "Смотреть опыт",
            error_title: "Кажется, вы свернули не туда",
            error_subtext: "Запрошенный ресурс не существует или был перемещен. Мы проверили все пути, но эта страница ускользнула от нас.",
            error_home_btn: "Перейти на Главную"
        },
        en: {
            title: "Hello, I'm [Your Name]",
            subtitle: "[Your Profession/Specialization]",
            tagline: "I build fast, scalable, and beautiful digital solutions, focusing on clean code and user experience.",
            exp_btn: "View Experience",
            error_title: "404: Page Not Found",
            error_subtext: "The requested resource does not exist or has been moved. We checked all paths, but this page escaped us.",
            error_home_btn: "Go to Homepage"
        }
    };

    function setLanguage(lang) {
        // Сохраняем выбор пользователя
        localStorage.setItem('portfolioLang', lang); 
        
        const data = contentMap[lang];
        
        // 1. Обновление основного текста (index.html)
        const title = document.getElementById('hero-title');
        if (title) title.textContent = data.title;
        
        const subtitle = document.getElementById('hero-subtitle');
        if (subtitle) subtitle.textContent = data.subtitle;
        
        const tagline = document.getElementById('hero-tagline');
        if (tagline) tagline.textContent = data.tagline;

        // 2. Обновление контактов
        document.querySelectorAll('.contact-link[data-contact-type]').forEach(link => {
            const type = link.dataset.contactType;
            const textElement = link.querySelector('.text');
            if (textElement && data.contacts[type]) {
                textElement.textContent = data.contacts[type];
            }
        });

        // 3. Обновление кнопки "Смотреть опыт"
        const expButton = document.querySelector('.contact-links .btn-secondary');
        if (expButton) expButton.textContent = data.exp_btn;

        // 4. Обновление 404 страницы 
        const errorTitle = document.getElementById('error-title');
        if (errorTitle) errorTitle.textContent = data.error_title;
        
        const errorSubtext = document.getElementById('error-subtext');
        if (errorSubtext) errorSubtext.textContent = data.error_subtext;
        
        const errorHomeBtn = document.getElementById('error-home-btn');
        if (errorHomeBtn) errorHomeBtn.textContent = data.error_home_btn;
        
        // 5. Обновление активного состояния кнопок
        if (ruBtn) ruBtn.classList.toggle('active', lang === 'ru');
        if (enBtn) enBtn.classList.toggle('active', lang === 'en');
    }

    // Обработчики кликов
    if (ruBtn) {
        ruBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('ru');
        });
    }
    if (enBtn) {
        enBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage('en');
        });
    }

    const skillsToggle = document.getElementById('skills-toggle');
    const skillsContent = document.getElementById('skills-content');

    if (skillsToggle && skillsContent) {
    skillsToggle.addEventListener('click', () => {
        skillsToggle.classList.toggle('expanded');
        skillsContent.classList.toggle('expanded');
    });
}
    
    // *** ИНИЦИАЛИЗАЦИЯ ***
    setLanguage(currentLang); 

    // --- НОВАЯ ЛОГИКА ДЛЯ КАРОУСЕЛИ (ДОБАВИТЬ В КОНЕЦ script.js) ---

function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (slides.length === 0) return;

    // Индекс текущего активного слайда
    let currentIndex = 0;
    const slideCount = slides.length;

    // --- Создание точек навигации ---
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);

    // --- Функция установки слайда ---
    const setSlide = (targetIndex) => {
        // Проверяем, что ширина слайда доступна
        const slideWidth = slides[0].getBoundingClientRect().width;
        if (slideWidth === 0) return; // Если ширина 0, ничего не делаем

        const xPosition = targetIndex * -slideWidth;

        track.style.transform = `translateX(${xPosition}px)`;
        currentIndex = targetIndex;

        // Обновление точек
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');
    };

    // --- Навигация по кнопкам ---
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

    // --- ЛОГИКА СВАЙПА (Mouse & Touch) ---
    let isDragging = false;
    let startX;
    let currentSlideWidth;

    const dragStart = (e) => {
        isDragging = true;
        // Отключаем плавный переход во время свайпа
        track.style.transition = 'none';
        
        // Определяем начальную позицию
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        currentSlideWidth = slides[0].getBoundingClientRect().width;
    };

    const dragging = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Предотвращаем скролл страницы
        
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diffX = startX - currentX; // Насколько далеко сдвинуто от начальной точки

        // Применяем смещение (текущая позиция - смещение)
        track.style.transform = `translateX(${currentIndex * -currentSlideWidth - diffX}px)`;
    };

    const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        
        // Включаем плавный переход обратно
        track.style.transition = 'transform 0.4s ease-in-out';

        // Считаем, насколько далеко мы сдвинулись в пикселях от базовой позиции
        const currentPosition = track.style.transform.match(/(-?\d+)px/)?.[1];
        const movedDistance = currentPosition ? parseFloat(currentPosition) : 0;
        
        const dragThreshold = currentSlideWidth * 0.25; // 25%
        let newIndex = currentIndex;

        // Если сдвинулись вправо (положительное значение diffX, отрицательное currentPosition)
        if (movedDistance < -(currentIndex * currentSlideWidth) + dragThreshold) {
            // Свайп влево (к следующему слайду)
            newIndex = currentIndex + 1;
        } 
        // Если сдвинулись влево (отрицательное значение diffX, положительное currentPosition)
        else if (movedDistance > -(currentIndex * currentSlideWidth) - dragThreshold) {
            // Свайп вправо (к предыдущему слайду)
            newIndex = currentIndex - 1;
        }
        
        // Ограничение индекса
        newIndex = Math.max(0, Math.min(slideCount - 1, newIndex));

        setSlide(newIndex);
    };

    // Добавление обработчиков для мыши
    track.addEventListener('mousedown', dragStart);
    track.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragEnd);
    
    // Добавление обработчиков для тачскрина
    track.addEventListener('touchstart', dragStart, { passive: false });
    track.addEventListener('touchmove', dragging, { passive: false });
    document.addEventListener('touchend', dragEnd);

    // 3. Инициализация: Установка первого слайда
    setSlide(0);
}

// Запуск карусели после всех настроек языка/темы
if (document.querySelector('.image-carousel')) {
    setupCarousel();
}
// --- КОНЕЦ ЛОГИКИ КАРОУСЕЛИ ---
});