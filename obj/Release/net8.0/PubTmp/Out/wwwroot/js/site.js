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
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.nd-item');
    const panels = document.querySelectorAll('.nd-panel');

    function switchPanel(target) {
        items.forEach(i => i.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        const activeItem = document.querySelector(`.nd-item[data-target="${target}"]`);
        const activePanel = document.querySelector(`.nd-panel[data-section="${target}"]`);

        if (activeItem) activeItem.classList.add('active');
        if (activePanel) activePanel.classList.add('active');
    }

    items.forEach(item => {
        item.addEventListener('click', () => {
            switchPanel(item.dataset.target);
        });
    });

    // Set default
    switchPanel('awards');
});
// Milestones accordion
document.querySelectorAll('.mls-acc-header').forEach(header => {
    header.addEventListener('click', () => {
        const acc = header.closest('.mls-accordion');
        acc.classList.toggle('open');
        const btn = header.querySelector('.mls-toggle');
        btn.textContent = acc.classList.contains('open') ? '+' : '+';
    });
});
// Legal nav scroll
document.querySelectorAll('.legal-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {

    function switchPanel(target) {
        document.querySelectorAll('.nd-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.nd-panel').forEach(p => p.classList.remove('active'));

        const activeItem = document.querySelector(`.nd-item[data-target="${target}"]`);
        const activePanel = document.querySelector(`.nd-panel[data-section="${target}"]`);

        if (activeItem) activeItem.classList.add('active');
        if (activePanel) activePanel.classList.add('active');
    }

    // Sidebar click handler
    document.querySelectorAll('.nd-item[data-target]').forEach(item => {
        item.addEventListener('click', () => switchPanel(item.dataset.target));
    });

    // ✅ Show intro on load — no switchPanel() call so HTML active class is preserved

});
// Cement sub-tabs
document.querySelectorAll('.cement-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.cement-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.cement-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.cement).classList.add('active');
    });
});
// Service icon cards → switch sub-panel + activate matching tab
document.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('click', () => {
        const target = card.dataset.svc;
        document.querySelectorAll('.cement-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.cement-panel').forEach(p => p.classList.remove('active'));
        document.querySelector(`.cement-tab[data-cement="${target}"]`)?.classList.add('active');
        document.getElementById(target)?.classList.add('active');
    });
});
// Parts Supply Carousel
const track = document.querySelector('.svc-carousel-track');
const slides = document.querySelectorAll('.svc-carousel-slide');
let current = 0;

function goToSlide(index) {
    if (!track || slides.length === 0) return;
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
}

document.querySelector('.svc-carousel-prev')?.addEventListener('click', () => goToSlide(current - 1));
document.querySelector('.svc-carousel-next')?.addEventListener('click', () => goToSlide(current + 1));

// ── Parts Supply Carousel ────────────────
(function () {
    const track = document.getElementById('psmCarTrack');
    const slides = document.querySelectorAll('.psm-car-slide');
    const counter = document.getElementById('psmCarCounter');
    const dotsWrap = document.getElementById('psmCarDots');
    const total = slides.length;
    let current = 0;
    let autoTimer = null;  // ✅ ADD

    if (!track || total === 0) return;

    // Build dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'psm-car-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { goTo(i); resetAuto(); }); // ✅ resetAuto on dot click
        dotsWrap.appendChild(dot);
    });

    function getDots() {
        return dotsWrap.querySelectorAll('.psm-car-dot');
    }

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        counter.textContent = `${current + 1} / ${total}`;
        getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }

    // ✅ Auto-play every 3 seconds
    function startAuto() {
        autoTimer = setInterval(() => goTo(current + 1), 3000);
    }

    // ✅ Reset timer when user manually navigates
    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    document.getElementById('psmCarPrev')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.getElementById('psmCarNext')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    // Keyboard support
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
        if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
    });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
    });

    // ✅ Start auto-play on load
    startAuto();
})();
// ── Revamps Carousel ────────────────────
(function () {
    const track = document.getElementById('rrCarTrack');
    const slides = track ? track.querySelectorAll('.psm-car-slide') : [];
    const counter = document.getElementById('rrCarCounter');
    const dotsWrap = document.getElementById('rrCarDots');
    const total = slides.length;
    let current = 0;
    let autoTimer = null;

    if (!track || total === 0) return;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'psm-car-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
        dotsWrap.appendChild(dot);
    });

    function getDots() { return dotsWrap.querySelectorAll('.psm-car-dot'); }

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        counter.textContent = `${current + 1} / ${total}`;
        getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 3000); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }

    document.getElementById('rrCarPrev')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.getElementById('rrCarNext')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
    });

    startAuto();
})();
// ── Field Services Carousel ──────────────
(function () {
    const track = document.getElementById('fsCarTrack');
    const slides = track ? track.querySelectorAll('.psm-car-slide') : [];
    const counter = document.getElementById('fsCarCounter');
    const dotsWrap = document.getElementById('fsCarDots');
    const total = slides.length;
    let current = 0;
    let autoTimer = null;

    if (!track || total === 0) return;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'psm-car-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
        dotsWrap.appendChild(dot);
    });

    function getDots() { return dotsWrap.querySelectorAll('.psm-car-dot'); }

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        counter.textContent = `${current + 1} / ${total}`;
        getDots().forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 3000); }
    function resetAuto() { clearInterval(autoTimer); startAuto(); }

    document.getElementById('fsCarPrev')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    document.getElementById('fsCarNext')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
    });

    startAuto();
})();

