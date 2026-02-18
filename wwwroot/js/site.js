document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // BACKGROUND IMAGE SLIDER (7 seconds cycle)
    // ============================================
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 7000);

    // ============================================
    // NUMBER COUNTER ANIMATION (with + signs)
    // ============================================
    const statsSection = document.querySelector('.hero-stats-below');

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    function animateCounters() {
        const numbers = document.querySelectorAll('.stat-number');

        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const duration = 2500;
            const easeOutQuart = (t) => 1 - (--t) * t * t * t;
            let startTime = null;

            function update(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeOutQuart(progress);
                const current = Math.floor(target * eased);

                number.textContent = current.toLocaleString() + '+';

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    number.textContent = target.toLocaleString() + '+';
                }
            }

            requestAnimationFrame(update);
        });
    }
});

// ============================================
// BUSINESS UNITS ROTATING WHEEL
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('businessWheel');
    const units = document.querySelectorAll('.unit-item');
    const title = document.getElementById('unitTitle');
    const description = document.getElementById('unitDescription');

    let currentIndex = 0;
    const anglePerUnit = 45;
    let interval;

    function getRadius() {
        const width = window.innerWidth;
        if (width <= 480) return 115;
        if (width <= 640) return 130;
        if (width <= 768) return 150;
        if (width <= 1024) return 180;
        if (width <= 1200) return 170;
        if (width >= 1400) return 200;
        return 180;
    }

    function updateContent(index) {
        const currentUnit = units[index];

        if (!title || !description || !currentUnit) {
            console.error('Content elements not found');
            return;
        }

        title.style.opacity = '0';
        description.style.opacity = '0';

        setTimeout(() => {
            title.textContent = currentUnit.dataset.title || 'Business Unit';
            description.textContent = currentUnit.dataset.description || 'Description not available';

            title.style.opacity = '1';
            description.style.opacity = '1';
        }, 300);
    }

    function rotateToIndex(index) {
        if (!container || units.length === 0) {
            console.error('Container or units not found');
            return;
        }

        units.forEach(unit => unit.classList.remove('active'));
        units[index].classList.add('active');

        const rotation = -index * anglePerUnit;
        container.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

        const radius = getRadius();

        units.forEach((unit, i) => {
            const itemAngle = i * anglePerUnit;
            const counterRotation = -rotation;
            let transform = `rotate(${itemAngle}deg) translate(${radius}px) rotate(${-itemAngle + counterRotation}deg)`;
            unit.style.transform = transform;
        });

        updateContent(index);
    }

    function autoRotate() {
        currentIndex = (currentIndex + 1) % 8;
        rotateToIndex(currentIndex);
    }

    rotateToIndex(0);
    interval = setInterval(autoRotate, 5000);

    units.forEach((unit, idx) => {
        unit.addEventListener('click', (e) => {
            e.preventDefault();
            clearInterval(interval);
            currentIndex = idx;
            rotateToIndex(idx);
            setTimeout(() => {
                interval = setInterval(autoRotate, 5000);
            }, 10000);
        });
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            rotateToIndex(currentIndex);
        }, 250);
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function () {
    const header = document.querySelector('.main-header');
    const scrollTop = window.scrollY;

    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, { passive: true });

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuDropdown = document.querySelector('.menu-dropdown');

    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });

        document.addEventListener('click', function () {
            menuToggle.classList.remove('active');
        });

        menuDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
