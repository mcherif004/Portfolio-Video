/**
 * Analítica opcional (Google Analytics 4).
 * 1) Crea la propiedad en https://analytics.google.com y copia el ID tipo G-XXXXXXXXXX.
 * 2) Pon el ID abajo. Si lo dejas vacío, no se carga ningún script de terceros.
 *
 * RGPD/LOPD: si tienes visitantes en el EEE, suele hacer falta aviso de cookies y base legal
 * antes de cargar GA; valorar Plausible/Umami o consent mode. Más info en la respuesta al usuario.
 */
(function () {
    var GA4_MEASUREMENT_ID = 'G-4JPXFEWDEL';
    var TRACK_HASH_NAV = true;
    var TRACK_EXTERNAL_LINKS = true;
    var TRACK_VIDEO_LOAD_EVENTS = true;

    if (!GA4_MEASUREMENT_ID || typeof document === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, { send_page_view: true });

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
    document.head.appendChild(s);

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
        },
        { passive: true }
    );

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
