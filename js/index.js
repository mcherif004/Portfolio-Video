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

    /** Carruseles de clientes: clona grupos hasta cubrir ~2,4× el ancho del viewport para que no quede hueco; bucle infinito con --marquee-shift. */
    function initChannelMarquees() {
        const tracks = document.querySelectorAll('.channel-marquee__track');
        if (!tracks.length) return;

        tracks.forEach((track) => {
            const marquee = track.closest('.channel-marquee');
            const template = track.firstElementChild;
            if (!marquee || !template || !template.classList.contains('channel-marquee__group')) return;

            let resizeDebounce = null;

            function markGroupAsClone(group) {
                group.setAttribute('aria-hidden', 'true');
                group.querySelectorAll('a[href]').forEach((a) => {
                    a.setAttribute('tabindex', '-1');
                });
            }

            // Normaliza a: 1 grupo base + 1 réplica inicial.
            if (track.children.length < 2) {
                const fallbackClone = template.cloneNode(true);
                markGroupAsClone(fallbackClone);
                track.appendChild(fallbackClone);
            } else {
                markGroupAsClone(track.children[1]);
            }

            function sync() {
                while (track.children.length > 2) {
                    track.lastElementChild.remove();
                }

                const minW = marquee.offsetWidth * 2.4;
                let guard = 0;
                while (track.scrollWidth < minW && guard++ < 24) {
                    const clone = template.cloneNode(true);
                    markGroupAsClone(clone);
                    track.appendChild(clone);
                }
                const n = track.children.length;
                if (n > 0) {
                    track.style.setProperty('--marquee-shift', `${(-100 / n).toFixed(6)}%`);
                }
            }

            function scheduleSync() {
                if (resizeDebounce !== null) cancelAnimationFrame(resizeDebounce);
                resizeDebounce = requestAnimationFrame(() => {
                    resizeDebounce = null;
                    sync();
                });
            }

            requestAnimationFrame(() => {
                requestAnimationFrame(sync);
            });

            if (typeof ResizeObserver !== 'undefined') {
                const ro = new ResizeObserver(() => scheduleSync());
                ro.observe(marquee);
            } else {
                window.addEventListener('resize', scheduleSync);
            }

            window.addEventListener('load', sync, { once: true });
        });
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

    /** YouTube: no descarga el iframe hasta que el bloque entra en vista (ahorra red y JS del reproductor). */
    function initDeferredYouTubeEmbeds() {
        const selector = '.embed-yt-deferred';

        function buildSrc(id, params) {
            const q = params && params.length ? String(params) : 'autoplay=0&rel=0';
            return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?' + q;
        }

        function mount(el) {
            if (el.dataset.youtubeLoaded === '1') return;
            el.dataset.youtubeLoaded = '1';
            const id = el.getAttribute('data-youtube-id');
            if (!id) return;
            const title = el.getAttribute('data-youtube-title') || 'YouTube';
            const params = el.getAttribute('data-youtube-params') || 'autoplay=0&rel=0';
            const iframe = document.createElement('iframe');
            iframe.src = buildSrc(id, params);
            iframe.title = title;
            iframe.loading = 'lazy';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.setAttribute(
                'allow',
                'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            );
            iframe.setAttribute('allowfullscreen', '');
            el.appendChild(iframe);
            el.querySelectorAll('.embed-yt-deferred__thumb, .embed-yt-deferred__play').forEach((n) => n.remove());
            el.removeAttribute('role');
            el.removeAttribute('tabindex');
            el.removeAttribute('aria-label');
            document.dispatchEvent(
                new CustomEvent('yt_embed_loaded', {
                    detail: { youtubeId: id, title }
                })
            );
        }

        const nodes = document.querySelectorAll(selector);
        if (!nodes.length) return;

        nodes.forEach((el) => {
            const title = el.getAttribute('data-youtube-title') || 'Video de YouTube';
            el.setAttribute('role', 'button');
            el.setAttribute('tabindex', '0');
            el.setAttribute('aria-label', 'Cargar vídeo: ' + title);

            el.addEventListener('click', () => {
                mount(el);
            });

            el.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                mount(el);
            });
        });

        if (!('IntersectionObserver' in window)) {
            nodes.forEach(mount);
            return;
        }

        const io = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    mount(entry.target);
                    obs.unobserve(entry.target);
                });
            },
            { root: null, rootMargin: '280px 0px', threshold: 0.01 }
        );

        nodes.forEach((el) => io.observe(el));
    }

    function initDiscordCopy() {
        const btn = document.getElementById('discord-copy-btn');
        const idEl = document.getElementById('discord-user-id');
        const feedback = document.getElementById('discord-copy-feedback');
        if (!btn || !idEl) return;

        const discordId = (idEl.textContent || '').trim();
        let resetTimer = null;

        function showFeedback(msg) {
            if (feedback) {
                feedback.textContent = msg;
            }
            if (resetTimer) window.clearTimeout(resetTimer);
            resetTimer = window.setTimeout(() => {
                if (feedback) feedback.textContent = '';
                resetTimer = null;
            }, 3500);
        }

        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(discordId);
                showFeedback('Copiado. Abre Discord y pégalo en «Añadir amigo».');
            } catch {
                try {
                    idEl.focus();
                    const range = document.createRange();
                    range.selectNodeContents(idEl);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    showFeedback('Selecciona el texto y cópialo con Ctrl+C (o Cmd+C).');
                } catch {
                    showFeedback('Copia manualmente: ' + discordId);
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') applyTheme(false);
        else applyTheme(true);
        setMobileMenuExpanded(false);
        initThumbSlider();
        initHeaderScroll();
        initChannelMarquees();
        initDeferredYouTubeEmbeds();
        initDiscordCopy();
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
