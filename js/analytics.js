/**
 * GA4 opcional. Deja GA4_MEASUREMENT_ID vacío para no cargar terceros.
 * Carga diferida tras idle/load para no competir con el primer render.
 */
(function () {
    var GA4_MEASUREMENT_ID = 'G-4JPXFEWDEL';
    var TRACK_HASH_NAV = true;
    var TRACK_EXTERNAL_LINKS = true;
    var TRACK_VIDEO_LOAD_EVENTS = true;
    var TRACK_CONVERSION_EVENTS = true;

    if (!GA4_MEASUREMENT_ID || typeof document === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    function loadGtag() {
        gtag('js', new Date());
        gtag('config', GA4_MEASUREMENT_ID, { send_page_view: true });
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
        document.head.appendChild(s);
    }

    function onIdle(fn) {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(fn, { timeout: 2500 });
        } else {
            window.setTimeout(fn, 1);
        }
    }

    function scheduleLoad() {
        if (document.readyState === 'complete') {
            onIdle(loadGtag);
        } else {
            window.addEventListener(
                'load',
                function () {
                    onIdle(loadGtag);
                },
                { once: true }
            );
        }
    }

    scheduleLoad();

    function track(eventName, params) {
        if (typeof window.gtag !== 'function') return;
        window.gtag('event', eventName, params || {});
    }

    document.addEventListener(
        'click',
        function (e) {
            var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!link) return;

            var href = link.getAttribute('href') || '';
            var isHashNav = href.charAt(0) === '#';
            var isExternal = /^https?:\/\//i.test(href) && link.origin !== window.location.origin;

            if (TRACK_HASH_NAV && isHashNav) {
                track('section_navigation_click', { target_section: href.slice(1) || 'unknown' });
            }

            if (TRACK_EXTERNAL_LINKS && isExternal) {
                track('outbound_click', {
                    destination: href,
                    link_text: (link.textContent || '').trim().slice(0, 120) || 'no_text'
                });
            }

            if (!TRACK_CONVERSION_EVENTS) return;

            if (link.matches('.hero-cta .btn-primary')) {
                track('hero_primary_cta_click', {
                    target: href || 'unknown',
                    link_text: (link.textContent || '').trim().slice(0, 80) || 'unknown'
                });
            }

            if (link.matches('.hero-cta .btn-secondary')) {
                track('hero_secondary_cta_click', {
                    target: href || 'unknown',
                    link_text: (link.textContent || '').trim().slice(0, 80) || 'unknown'
                });
            }

            if (link.matches('.saas-cta')) {
                var planCard = link.closest('.saas-plan');
                var planTitle = planCard ? (planCard.querySelector('h4') || {}).textContent : '';
                track('pricing_plan_click', {
                    plan_title: (planTitle || '').trim().slice(0, 120) || 'unknown',
                    target: href || 'unknown'
                });
            }
        },
        { passive: true }
    );

    if (TRACK_CONVERSION_EVENTS) {
        document.addEventListener(
            'click',
            function (e) {
                var copyBtn = e.target && e.target.closest ? e.target.closest('#discord-copy-btn') : null;
                if (copyBtn) {
                    track('discord_copy_click', { location: 'contact_section' });
                    return;
                }

                var langBtn = e.target && e.target.closest ? e.target.closest('#lang-toggle') : null;
                if (langBtn) {
                    track('language_toggle_click', {
                        lang_button_text: (langBtn.textContent || '').trim() || 'unknown'
                    });
                }
            },
            { passive: true }
        );
    }

    if (TRACK_VIDEO_LOAD_EVENTS) {
        document.addEventListener('yt_embed_loaded', function (e) {
            var d = (e && e.detail) || {};
            track('video_embed_loaded', {
                youtube_id: d.youtubeId || 'unknown',
                video_title: d.title || 'unknown'
            });
        });
    }
})();
