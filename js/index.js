(function () {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle && themeToggle.querySelector('.theme-icon');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const siteHeader = document.getElementById('site-header');

    const SLIDER_MS = 10000;

    function applyTheme(dark) {
        body.classList.toggle('dark-mode', dark);
        if (themeIcon) themeIcon.textContent = dark ? '🌙' : '☀️';
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }

    function toggleTheme() {
        applyTheme(!body.classList.contains('dark-mode'));
    }

    function setMobileMenuExpanded(open) {
        if (!mobileMenuToggle) return;
        mobileMenuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileMenuToggle.setAttribute(
            'aria-label',
            open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
        );
    }

    function toggleMobileMenu() {
        if (!mobileMenuToggle || !navMenu) return;
        mobileMenuToggle.classList.toggle('menu-open');
        navMenu.classList.toggle('is-open');
        const open = navMenu.classList.contains('is-open');
        setMobileMenuExpanded(open);
    }

    function closeMobileMenu() {
        if (!mobileMenuToggle || !navMenu) return;
        mobileMenuToggle.classList.remove('menu-open');
        navMenu.classList.remove('is-open');
        setMobileMenuExpanded(false);
    }

    function initHeaderScroll() {
        if (!siteHeader) return;
        const onScroll = () => {
            siteHeader.classList.toggle('is-scrolled', window.scrollY > 10);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function initThumbSlider() {
        const root = document.getElementById('thumb-slider');
        if (!root) return;

        const slides = root.querySelectorAll('.thumb-slider__slide');
        const dots = root.querySelectorAll('.thumb-slider__dot');
        if (!slides.length) return;

        let current = 0;
        let timerId = null;

        function show(i) {
            const n = slides.length;
            current = ((i % n) + n) % n;
            slides.forEach((slide, j) => slide.classList.toggle('is-active', j === current));
            dots.forEach((dot, j) => {
                const on = j === current;
                dot.classList.toggle('is-active', on);
                dot.setAttribute('aria-selected', on ? 'true' : 'false');
            });
        }

        function nextSlide() {
            show(current + 1);
        }

        function startAutoplay() {
            if (timerId != null) clearInterval(timerId);
            timerId = window.setInterval(nextSlide, SLIDER_MS);
        }

        function stopAutoplay() {
            if (timerId != null) {
                clearInterval(timerId);
                timerId = null;
            }
        }

        dots.forEach((dot, j) => {
            dot.addEventListener('click', () => {
                show(j);
                startAutoplay();
            });
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileMenu();
        });

        show(0);
        startAutoplay();
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('theme') === 'dark') {
            applyTheme(true);
        }
        setMobileMenuExpanded(false);
        initThumbSlider();
        initHeaderScroll();
    });

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) closeMobileMenu();
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth > 768) return;
            if (navMenu.contains(e.target) || mobileMenuToggle.contains(e.target)) return;
            closeMobileMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMobileMenu();
        });
    }
})();
