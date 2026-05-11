(function () {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const siteHeader = document.getElementById('site-header');
    const langToggle = document.getElementById('lang-toggle');

    const SLIDER_MS = 10000;
    const LANG_STORAGE_KEY = 'site-lang';
    const SUPPORTED_LANGS = ['es', 'en'];
    let currentLang = 'es';

    const I18N = {
        es: {
            pageTitle: 'Mostafa Cherif | Edición de vídeo para creadores — YouTube, vertical y miniaturas',
            pageDescription: 'Edición para creadores: vertical (Shorts/TikTok), YouTube 16:9 y miniaturas. Precios por plan. Contacto por Discord.',
            ogTitle: 'Mostafa Cherif | Edición para creadores',
            ogDescription: 'Edición vertical, YouTube y miniaturas. Precios visibles; contacto directo.',
            twitterTitle: 'Mostafa Cherif | Edición para creadores',
            twitterDescription: 'Vertical, YouTube y miniaturas. Precios en la web.',
            logoLabel: 'Mostafa Cherif — Inicio',
            navLabel: 'Principal',
            nav: ['Inicio', 'Servicios', 'Clientes', 'Trabajo', 'Contacto'],
            menuOpen: 'Abrir menú de navegación',
            menuClose: 'Cerrar menú de navegación',
            langToggle: { text: 'ES', aria: 'Cambiar idioma a inglés' },
            heroEyebrow: 'Mostafa Cherif · Edición para creadores',
            heroTitle: 'Edición de vídeo para creadores: vertical, YouTube largo y miniaturas.',
            heroSubtitle: '<strong>Claro en alcance</strong>, entregas puntuales y <strong>precio por plan</strong>.',
            heroCtas: ['Ver portfolio', 'Contactar'],
            heroTags: ['Ritmo', 'Narrativa', 'Retención'],
            showreelTitle: 'Showreel (pronto)',
            showreelIntro: 'Vídeo corto del proceso y de cada servicio.',
            showreelStatus: 'En producción',
            showreelNote: 'Se publicará en YouTube (no listado) y enlazado aquí.',
            serviciosTitle: 'Servicios',
            serviceTitles: ['Vertical', 'Horizontal (YouTube)', 'Miniaturas'],
            serviceDescs: [
                'Shorts/Reels: hook, subtítulos, SFX y ritmo.',
                '16:9 listo para subir; Base o Pro retención.',
                'CTR, legible en móvil, estilo de canal.'
            ],
            serviceLists: [
                ['Clip listo; precio en la tarjeta', 'Pack 10 clips o marketing desde', 'Ver condiciones · vídeo vertical'],
                ['Episodio listo; precio en la tarjeta', 'Base 45 min bruto · Pro 90 min', 'Ver condiciones · vídeo largo'],
                ['PNG/JPG (PSD si se acuerda)', 'Suelta, pack 5 o combo episodio']
            ],
            serviceCtas: ['Ver packs', 'Ver packs', 'Ver packs'],
            clientesTitle: 'Clientes con los que he trabajado',
            clientesIntro: 'Canales recientes; enlaces a perfiles.',
            trabajoTitle: 'Trabajos recientes',
            trabajoIntro: 'Ejemplos publicados; pulsa la miniatura para ver el vídeo.',
            verticalTitle: 'Vertical · Trabajos',
            verticalWorkIntro: 'Shorts / Reels / TikTok.',
            verticalPricingIntro: 'Qué te entrego, cuánto bruto entra en el precio y cuánto pagas.',
            verticalCards: [
                { title: 'YouTube Short #01', copy: 'Short vertical; publicado en el canal del cliente.' },
                { title: 'YouTube Short #02', copy: 'Corte vertical para feed.' },
                { title: 'YouTube Short #03', copy: 'Ejemplo corto listo para publicar.' }
            ],
            ytMetricsLink: 'Ver en YouTube',
            verticalPricingTitle: 'Precios · Vertical',
            verticalPlanTitles: ['Plan Base Vertical', 'Pack Streamers/YouTubers', 'Pack Redes Marketing'],
            verticalPlanBadges: ['Fijo', 'Desde'],
            verticalPlanBenefits: [
                ['Te entrego: 1 clip vertical hasta 60 s · 9:16, listo para publicar', 'Bruto incluido: hasta 10 min', 'Precio: 20 € base · sube si amplias alcance'],
                ['Te entrego: 10 clips hasta 60 s · 9:16', 'Bruto: hasta 10 min por clip', 'Precio: 150 € fijos · sin captions −5 €/clip'],
                ['Te entrego: clip(s) vertical hasta 60 s · foco anuncio o campaña', 'Bruto: hasta 10 min · +15 €/30 min si pasas', 'Precio: desde 35 €+ según brief']
            ],
            verticalCondLink: '<a href="#condiciones-vertical">Ver condiciones · vídeo vertical</a>',
            selectCta: 'Contactar',
            horizontalTitle: 'Horizontal · Trabajos',
            horizontalIntro: 'Episodios 16:9 en YouTube.',
            horizontalCards: [
                { title: 'YouTube #01', copy: 'Largo 16:9; montaje y audio listos.' },
                { title: 'YouTube #02', copy: 'Otro episodio horizontal.' },
                { title: 'YouTube #03', copy: 'Tercer ejemplo largo.' }
            ],
            horizontalPricingTitle: 'Precios · Horizontal (YouTube)',
            horizontalPlanTitles: ['Plan Base 10–15 min', 'Plan Pro Retención 10–15 min'],
            horizontalProBadge: 'Recomendado',
            horizontalPlanBenefits: [
                ['Te entrego: episodio 10–15 min · 16:9, listo para YouTube', 'Bruto incluido: hasta 45 min revisados', 'Si te pasas del cupo: +15 € / 30 min'],
                ['Te entrego: episodio 10–15 min · 16:9, más retención en pantalla', 'Bruto incluido: hasta 90 min revisados', 'Si te pasas del cupo: +15 € / 30 min']
            ],
            horizontalCondLink: '<a href="#condiciones-horizontal">Ver condiciones · vídeo largo (YouTube)</a>',
            condicionesExtrasResumen:
                'Bruto fuera de cupo: +15 €/30 min. Horizontal: minuto final >15 min: +5 €/min. Revisiones: aparte.',
            miniTitle: 'Miniaturas · Trabajos',
            miniIntro: 'Miniaturas: CTR y legibilidad.',
            miniPricingTitle: 'Precios · Miniaturas',
            miniPlanTitles: ['Miniatura suelta', 'Pack 5 miniaturas'],
            miniPlanBenefits: [
                ['Diseño para CTR y claridad en feed', 'Entrega en PNG/JPG', 'Turno según cola de trabajo'],
                ['Mismo estilo visual en toda la serie', 'Entrega optimizada para publicación', 'Mejor coste por unidad']
            ],
            miniNote: 'Combo episodio + miniatura: presupuesto cerrado según alcance.',
            contactoTitle: 'Contacto',
            contactoLead:
                '<strong>Respuesta en 24 h</strong> (orientativa, días laborables): envía <strong>formato</strong>, <strong>bruto</strong>, <strong>objetivo</strong> y enlace al material. <strong>Discord</strong>. Flujo: mensaje → precio → reserva → edición → entrega.',
            discordEjemploLabel: 'Ejemplo de mensaje (cópialo y rellena los campos):',
            discordExampleMsg: `Hola,

Canal: [enlace o @]
Servicio: vertical / YouTube largo / miniaturas
Bruto aprox: [X] min · final deseado: [Y] min
Objetivo: [una frase]
Material: [enlace Drive o carpeta]
¿Fecha objetivo aprox.?

Gracias.`,
            discordCopyMsgBtn: 'Copiar plantilla',
            discordCopyMsgBtnAria: 'Copiar plantilla de mensaje para Discord al portapapeles',
            contactoCupo: 'Cupo de clientes mensual: 2/5',
            contactoLabel: 'Discord: copia el usuario → Añadir amigo en la app.',
            contactoCopyBtn: 'Copiar usuario',
            condicionesTitle: 'Condiciones',
            condicionesLead: 'Alcance, plazos y pagos acordados por escrito antes de editar.',
            condicionesSummaries: ['1) Primer mensaje y presupuesto · Ver más', '2) Material y organización · Ver más', '3) Planes verticales · Ver más', '4) Horizontal (YouTube largo) · Ver más', '5) Tiempos de entrega · Ver más', '6) Pagos y revisiones · Ver más', '7) Extras y cancelación · Ver más'],
            condicionesItems: [
                [
                    'Formato, minutos finales y de bruto, objetivo, fecha y enlace al material. Discord, un hilo por proyecto.',
                    'Te respondo con precio y lo que entra en ese precio; lo que falte se dice antes de reservar.',
                    'Flujo: mensaje → presupuesto → reserva → edición → entrega.'
                ],
                [
                    'Un solo enlace (carpeta/drive); archivos ordenados. Música: tuya con licencia o stock; indícalo al pedir.',
                    'Si el material no basta para lo acordado, se avisa antes de editar (ajuste o suplemento).'
                ],
                [
                    'Base 20 €: 1 clip hasta 60 s listo para publicar; hasta 10 min bruto. Esencial: hook, subtítulos, ritmo y edición limpia. Más alcance = más precio.',
                    'Pack 150 €: 10 clips misma regla; captions en picos clave; −5 €/clip sin captions.',
                    'Marketing desde 35 €+: clips para campaña/CTA; bruto extra +15 €/30 min si pasas de 10 min por pieza.'
                ],
                [
                    'Base 60 €: 10–15 min final · 16:9; hasta 45 min bruto. Edición y audio listos; sin motion pesado.',
                    'Pro 90 €: lo mismo + retención en pantalla; hasta 90 min bruto; gráficos ligeros (no pack motion completo salvo acuerdo).',
                    'Extras: +15 €/30 min bruto fuera de cupo; +5 €/min si el final pasa de 15 min; combo Base + miniatura 65 €; revisiones aparte.'
                ],
                [
                    'La cola arranca con el 50 % y el material completo. Cambios de brief o archivos faltantes = nueva fecha.',
                    'La fecha se confirma al cerrar el pedido.'
                ],
                ['50 % al reservar; saldo al cierre acordado.', 'Las revisiones no van en el precio del plan; lo que no esté cerrado se cotiza aparte.'],
                [
                    'Bruto fuera de cupo: +15 €/30 min (vertical por pieza; horizontal Base >45 min, Pro >90 min). Final horizontal >15 min: +5 €/min.',
                    'Revisiones: desde 10 € (puntual) / desde 20 € (varias).',
                    'Pago: Bizum, Revolut, PayPal, Binance (USDT). Urgencias fuertes o re-montaje total: siempre cotizado antes.',
                    'Cancelación: el anticipo cubre hueco y lo ya hecho; el resto según lo entregado o lo acordado.'
                ]
            ],
            footerScarcity: '<strong>Cupo limitado</strong> · pocos proyectos, más foco por entrega.',
            footerTitles: ['Navegación', 'Trabajo y precios', 'Contacto rápido', 'Redes'],
            footerCol1: ['Servicios', 'Clientes', 'Vertical', 'Horizontal', 'Miniaturas'],
            footerCol2: ['Precio por plan; extras fuera de límites.', 'Vertical · Horizontal', 'Revisiones y cambios se cotizan aparte.'],
            footerCol3: ['Formato · duración · objetivo', 'Enlace al material', 'Ir a contacto'],
            footerCol4: ['TikTok', 'Instagram', 'YouTube'],
            copyFeedback: {
                success: 'Copiado. Abre Discord y pégalo en «Añadir amigo».',
                fallback: 'Selecciona el texto y cópialo con Ctrl+C (o Cmd+C).',
                manual: 'Copia manualmente: '
            },
            copyMsgFeedback: {
                success: 'Plantilla copiada. Pégala en Discord y sustituye lo que va entre corchetes.',
                fallback: 'Selecciona el texto del recuadro y cópialo con Ctrl+C (o Cmd+C).',
                manual: 'Copia manualmente la plantilla del recuadro.'
            },
            embedLoadLabel: 'Cargar vídeo: ',
            navAnchorAria: 'Ir a sección'
        },
        en: {
            pageTitle: 'Mostafa Cherif | Video Editing for Creators — YouTube, Vertical & Thumbnails',
            pageDescription: 'Editing for creators: vertical (Shorts/TikTok), long-form YouTube, and thumbnails. Clear plan pricing. Contact via Discord.',
            ogTitle: 'Mostafa Cherif | Editing for Creators',
            ogDescription: 'Vertical, YouTube and thumbnails. Visible pricing and direct contact.',
            twitterTitle: 'Mostafa Cherif | Editing for Creators',
            twitterDescription: 'Vertical, YouTube and thumbnails. Pricing available on site.',
            logoLabel: 'Mostafa Cherif — Home',
            navLabel: 'Main navigation',
            nav: ['Home', 'Services', 'Clients', 'Work', 'Contact'],
            menuOpen: 'Open navigation menu',
            menuClose: 'Close navigation menu',
            langToggle: { text: 'EN', aria: 'Switch language to Spanish' },
            heroEyebrow: 'Mostafa Cherif · Editing for creators',
            heroTitle: 'Video editing for creators: vertical, long-form YouTube, and thumbnails.',
            heroSubtitle: '<strong>Clear scope</strong>, reliable delivery, <strong>plan pricing</strong>.',
            heroCtas: ['View portfolio', 'Contact'],
            heroTags: ['Pacing', 'Story', 'Retention'],
            showreelTitle: 'Showreel (soon)',
            showreelIntro: 'Short video on process and each service.',
            showreelStatus: 'In production',
            showreelNote: 'Will be published on YouTube (unlisted) and linked here.',
            serviciosTitle: 'Services',
            serviceTitles: ['Vertical', 'Horizontal (YouTube)', 'Thumbnails'],
            serviceDescs: [
                'Shorts/Reels: hook, subtitles, SFX, and pace.',
                '16:9 ready to upload; Base or Pro retention.',
                'CTR, mobile-readable, on-brand.'
            ],
            serviceLists: [
                ['Ready clip; price on the card', '10-clip pack or marketing from', 'View terms · vertical video'],
                ['Ready episode; price on the card', 'Base 45 min raw · Pro 90 min', 'View terms · long-form'],
                ['PNG/JPG (PSD if agreed)', 'Single, 5-pack, or episode combo']
            ],
            serviceCtas: ['View plans', 'View plans', 'View plans'],
            clientesTitle: 'Creators I have worked with',
            clientesIntro: 'Recent channels; profile links.',
            trabajoTitle: 'Recent work',
            trabajoIntro: 'Published samples; tap the thumbnail to play.',
            verticalTitle: 'Vertical · Work',
            verticalWorkIntro: 'Shorts / Reels / TikTok.',
            verticalPricingIntro: 'What you receive, raw included in the price, and what you pay.',
            verticalCards: [
                { title: 'YouTube Short #01', copy: 'Vertical short; live on the client channel.' },
                { title: 'YouTube Short #02', copy: 'Vertical cut for the feed.' },
                { title: 'YouTube Short #03', copy: 'Short sample ready to post.' }
            ],
            ytMetricsLink: 'Watch on YouTube',
            verticalPricingTitle: 'Pricing · Vertical',
            verticalPlanTitles: ['Vertical Base Plan', 'Streamers/YouTubers Pack', 'Marketing Social Pack'],
            verticalPlanBadges: ['Fixed', 'From'],
            verticalPlanBenefits: [
                ['You get: 1 vertical clip up to 60s · 9:16, ready to publish', 'Raw included: up to 10 min', 'Price: €20 base · increases if scope grows'],
                ['You get: 10 clips up to 60s · 9:16', 'Raw: up to 10 min per clip', 'Price: €150 fixed · no captions −€5/clip'],
                ['You get: vertical clip(s) up to 60s · ad/campaign focus', 'Raw: up to 10 min · +€15/30 min over cap', 'Price: from €35+ per brief']
            ],
            verticalCondLink: '<a href="#condiciones-vertical">View terms · vertical video</a>',
            selectCta: 'Contact',
            horizontalTitle: 'Horizontal · Work',
            horizontalIntro: '16:9 episodes on YouTube.',
            horizontalCards: [
                { title: 'YouTube #01', copy: 'Long-form 16:9; edit and audio ready.' },
                { title: 'YouTube #02', copy: 'Another long-form episode.' },
                { title: 'YouTube #03', copy: 'Third long-form sample.' }
            ],
            horizontalPricingTitle: 'Pricing · Horizontal (YouTube)',
            horizontalPlanTitles: ['Base Plan 10–15 min', 'Pro Retention Plan 10–15 min'],
            horizontalProBadge: 'Recommended',
            horizontalPlanBenefits: [
                ['You get: 10–15 min · 16:9 episode, ready for YouTube', 'Raw included: up to 45 min reviewed', 'Over cap: +€15 / 30 min'],
                ['You get: 10–15 min · 16:9 with stronger on-screen retention', 'Raw included: up to 90 min reviewed', 'Over cap: +€15 / 30 min']
            ],
            horizontalCondLink: '<a href="#condiciones-horizontal">View terms · long-form (YouTube)</a>',
            condicionesExtrasResumen:
                'Raw over cap: +€15/30 min. Horizontal: final over 15 min: +€5/min. Revisions: quoted separately.',
            miniTitle: 'Thumbnails · Work',
            miniIntro: 'Thumbnails: CTR and readability.',
            miniPricingTitle: 'Pricing · Thumbnails',
            miniPlanTitles: ['Single thumbnail', '5-thumbnail pack'],
            miniPlanBenefits: [
                ['CTR-focused design and feed readability', 'PNG/JPG delivery', 'Turnaround based on queue'],
                ['Consistent style across the full set', 'Publishing-ready assets', 'Lower cost per thumbnail']
            ],
            miniNote: 'Episode + thumbnail combo: fixed quote based on scope.',
            contactoTitle: 'Contact',
            contactoLead:
                '<strong>Reply within 24h</strong> (indicative, business days): send <strong>format</strong>, <strong>raw</strong>, <strong>goal</strong>, and asset link. <strong>Discord</strong>. Flow: message → quote → booking → edit → delivery.',
            discordEjemploLabel: 'Example message (copy and fill in the brackets):',
            discordExampleMsg: `Hi,

Channel: [link or @]
Service: vertical / long-form YouTube / thumbnails
Approx raw: [X] min · target final: [Y] min
Goal: [one sentence]
Assets: [Drive link or folder]
Rough deadline: [date/week]

Thanks.`,
            discordCopyMsgBtn: 'Copy template',
            discordCopyMsgBtnAria: 'Copy Discord message template to clipboard',
            contactoCupo: 'Monthly client slots: 2/5',
            contactoLabel: 'Discord: copy the username → Add Friend in the app.',
            contactoCopyBtn: 'Copy username',
            condicionesTitle: 'Terms',
            condicionesLead: 'Scope, timelines, and payments agreed in writing before editing.',
            condicionesSummaries: ['1) First message and quote · Expand', '2) Materials and organization · Expand', '3) Vertical plans · Expand', '4) Horizontal (Long-form YouTube) · Expand', '5) Delivery times · Expand', '6) Payments and revisions · Expand', '7) Extras and cancellation · Expand'],
            condicionesItems: [
                [
                    'Format, final and raw minutes, goal, deadline, asset link. Discord, one thread per project.',
                    'You get a quote and what it covers; gaps are called out before booking.',
                    'Flow: message → quote → booking → edit → delivery.'
                ],
                [
                    'One drive/folder link; organized files. Music: yours (licensed) or stock—state it in the request.',
                    'If assets are not enough for the agreed scope, you are told before editing (adjustment or surcharge).'
                ],
                [
                    'Base €20: one clip up to 60s ready to publish; up to 10 min raw. Essential: hook, subtitles, pacing, clean edit. More scope = higher price.',
                    'Pack €150: 10 clips same rules; captions on key beats; −€5/clip without captions.',
                    'Marketing from €35+: campaign/CTA clips; extra raw +€15/30 min beyond 10 min per piece.'
                ],
                [
                    'Base €60: 10–15 min final · 16:9; up to 45 min raw. Edit and audio ready; no heavy motion.',
                    'Pro €90: same + on-screen retention; up to 90 min raw; light graphics (not a full motion pack unless agreed).',
                    'Extras: +€15/30 min raw over cap; +€5/min if final is over 15 min; €65 Base + thumbnail combo; revisions quoted separately.'
                ],
                [
                    'Queue starts with 50% and complete assets. Brief changes or missing files = new date.',
                    'Deadline is confirmed when the order is closed.'
                ],
                ['50% to book; balance at agreed closing.', 'Revisions are not in the plan price; anything not locked is quoted separately.'],
                [
                    'Raw over cap: +€15/30 min (vertical per piece; horizontal Base >45 min, Pro >90 min). Horizontal final over 15 min: +€5/min.',
                    'Revisions: from €10 (small) / from €20 (multiple).',
                    'Payments: Bizum, Revolut, PayPal, Binance (USDT). Rush or full remount: always quoted first.',
                    'Cancellation: deposit covers slot and work done; remainder per delivery or agreement.'
                ]
            ],
            footerScarcity: '<strong>Limited slots</strong> · fewer projects, more focus per delivery.',
            footerTitles: ['Navigation', 'Work and pricing', 'Quick contact', 'Socials'],
            footerCol1: ['Services', 'Clients', 'Vertical', 'Horizontal', 'Thumbnails'],
            footerCol2: ['Plan-based pricing; extras outside limits.', 'Vertical · Horizontal', 'Revisions and changes are quoted separately.'],
            footerCol3: ['Format · duration · objective', 'Material link', 'Go to contact'],
            footerCol4: ['TikTok', 'Instagram', 'YouTube'],
            copyFeedback: {
                success: 'Copied. Open Discord and paste it in "Add Friend".',
                fallback: 'Select the text and copy it with Ctrl+C (or Cmd+C).',
                manual: 'Copy manually: '
            },
            copyMsgFeedback: {
                success: 'Template copied. Paste it in Discord and replace the bracketed parts.',
                fallback: 'Select the box text and copy with Ctrl+C (or Cmd+C).',
                manual: 'Copy the template from the box manually.'
            },
            embedLoadLabel: 'Load video: ',
            navAnchorAria: 'Go to section'
        }
    };

    function setText(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    }

    function setHtml(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = value;
    }

    function setList(selector, values) {
        const nodes = document.querySelectorAll(selector);
        nodes.forEach((node, i) => {
            if (values[i] !== undefined) {
                node.textContent = values[i];
            }
        });
    }

    function getPreferredLanguage() {
        const stored = localStorage.getItem(LANG_STORAGE_KEY);
        if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
        const preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'es'];
        for (const lang of preferred) {
            const base = String(lang).toLowerCase().split('-')[0];
            if (SUPPORTED_LANGS.includes(base)) return base;
        }
        return 'es';
    }

    function updateMeta(locale) {
        document.title = locale.pageTitle;
        const desc = document.querySelector('meta[name="description"]');
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (desc) desc.setAttribute('content', locale.pageDescription);
        if (ogTitle) ogTitle.setAttribute('content', locale.ogTitle);
        if (ogDesc) ogDesc.setAttribute('content', locale.ogDescription);
        if (twTitle) twTitle.setAttribute('content', locale.twitterTitle);
        if (twDesc) twDesc.setAttribute('content', locale.twitterDescription);
    }

    function applyLanguage(lang) {
        currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'es';
        const locale = I18N[currentLang];
        document.documentElement.lang = currentLang;
        updateMeta(locale);

        const logoLink = document.querySelector('.logo-suite-link');
        if (logoLink) logoLink.setAttribute('aria-label', locale.logoLabel);
        if (navMenu) navMenu.setAttribute('aria-label', locale.navLabel);

        const navLinks = document.querySelectorAll('.nav-links .nav-link');
        navLinks.forEach((link, idx) => {
            if (locale.nav[idx]) link.textContent = locale.nav[idx];
            if (idx < 4) link.setAttribute('aria-label', `${locale.navAnchorAria}: ${locale.nav[idx]}`);
        });

        if (langToggle) {
            langToggle.textContent = locale.langToggle.text;
            langToggle.setAttribute('aria-label', locale.langToggle.aria);
        }

        const deferredEmbeds = document.querySelectorAll('.embed-yt-deferred');
        deferredEmbeds.forEach((el) => {
            if (el.dataset.youtubeLoaded === '1') return;
            const title = el.getAttribute('data-youtube-title') || 'YouTube';
            el.setAttribute('aria-label', locale.embedLoadLabel + title);
        });

        setText('.hero-eyebrow', locale.heroEyebrow);
        setText('#hero-title', locale.heroTitle);
        setHtml('.hero-subtitle', locale.heroSubtitle);
        setList('.hero-cta .btn', locale.heroCtas);
        setList('.hero-panel__tag', locale.heroTags);

        setText('#showreel-title', locale.showreelTitle);
        setText('.showreel-intro', locale.showreelIntro);
        setText('.showreel-card__status', locale.showreelStatus);
        setText('.showreel-card__note', locale.showreelNote);

        setText('#servicios-title', locale.serviciosTitle);
        setText('#pillar-vertical-title', locale.serviceTitles[0]);
        setText('#pillar-yt-title', locale.serviceTitles[1]);
        setText('#pillar-thumb-title', locale.serviceTitles[2]);
        setList('.service-pillar__desc', locale.serviceDescs);

        const serviceLists = document.querySelectorAll('.service-pillar__list');
        serviceLists.forEach((list, i) => {
            const items = list.querySelectorAll('li');
            items.forEach((item, j) => {
                const value = locale.serviceLists[i] && locale.serviceLists[i][j];
                if (value) item.textContent = value;
            });
        });
        setList('.service-pillar__cta', locale.serviceCtas);

        setText('#clientes-title', locale.clientesTitle);
        setText('.channel-intro', locale.clientesIntro);

        setText('#prueba-title', locale.trabajoTitle);
        setText('#prueba .container > .section-intro', locale.trabajoIntro);
        setText('#vertical-pack', locale.verticalTitle);
        setText('#intro-vertical-work', locale.verticalWorkIntro);
        setHtml('#intro-vertical-pricing', locale.verticalPricingIntro);
        const verticalCards = document.querySelectorAll('.work-grid--vertical .work-card');
        verticalCards.forEach((card, i) => {
            const data = locale.verticalCards[i];
            if (!data) return;
            const title = card.querySelector('.card-title');
            const copy = card.querySelector('.work-copy');
            const link = card.querySelector('.work-metrics a');
            if (title) title.textContent = data.title;
            if (copy) copy.textContent = data.copy;
            if (link) link.textContent = locale.ytMetricsLink;
        });

        setText('#planes', locale.verticalPricingTitle);
        const verticalPlans = document.querySelectorAll('#pricing-vertical .saas-plan');
        verticalPlans.forEach((plan, i) => {
            const h4 = plan.querySelector('h4');
            if (h4) {
                const badge = h4.querySelector('span');
                h4.childNodes[0].nodeValue = `${locale.verticalPlanTitles[i]} `;
                if (badge) {
                    badge.textContent = i === 1 ? locale.verticalPlanBadges[0] : i === 2 ? locale.verticalPlanBadges[1] : badge.textContent;
                }
            }
            const benefits = plan.querySelectorAll('.saas-benefit');
            benefits.forEach((b, j) => {
                const text = locale.verticalPlanBenefits[i] && locale.verticalPlanBenefits[i][j];
                if (text) b.textContent = text;
            });
            const cta = plan.querySelector('.saas-cta');
            if (cta) cta.textContent = locale.selectCta;
        });

        setText('#horizontal-pack', locale.horizontalTitle);
        const horizontalIntroEl = document.querySelector('#horizontal-pack + .section-intro');
        if (horizontalIntroEl) horizontalIntroEl.textContent = locale.horizontalIntro;
        const allWorkCards = document.querySelectorAll('#prueba .work-grid .work-card');
        allWorkCards.forEach((card, i) => {
            if (i < 3) return;
            const idx = i - 3;
            const data = locale.horizontalCards[idx];
            if (!data) return;
            const title = card.querySelector('.card-title');
            const copy = card.querySelector('.work-copy');
            const link = card.querySelector('.work-metrics a');
            if (title) title.textContent = data.title;
            if (copy) copy.textContent = data.copy;
            if (link) link.textContent = locale.ytMetricsLink;
        });

        setText('#planes-horizontal', locale.horizontalPricingTitle);
        const horizontalPlans = document.querySelectorAll('#pricing-horizontal .saas-plan');
        horizontalPlans.forEach((plan, i) => {
            const h4 = plan.querySelector('h4');
            if (h4) {
                const badge = h4.querySelector('span');
                h4.childNodes[0].nodeValue = `${locale.horizontalPlanTitles[i]} `;
                if (badge && badge.classList.contains('badge-recommended')) {
                    badge.textContent = locale.horizontalProBadge;
                }
            }
            const benefits = plan.querySelectorAll('.saas-benefit');
            benefits.forEach((b, j) => {
                const text = locale.horizontalPlanBenefits[i] && locale.horizontalPlanBenefits[i][j];
                if (text) b.textContent = text;
            });
            const cta = plan.querySelector('.saas-cta');
            if (cta) cta.textContent = locale.selectCta;
        });
        setHtml('#saas-cond-vertical', locale.verticalCondLink);
        setHtml('#saas-cond-horizontal', locale.horizontalCondLink);

        setText('#miniaturas-pack', locale.miniTitle);
        const miniIntro = document.querySelector('#miniaturas-pack + .section-intro');
        if (miniIntro) miniIntro.textContent = locale.miniIntro;
        setText('#planes-miniaturas', locale.miniPricingTitle);
        const miniPlans = document.querySelectorAll('#pricing-mini .saas-plan');
        miniPlans.forEach((plan, i) => {
            const title = plan.querySelector('h4');
            if (title) title.textContent = locale.miniPlanTitles[i] || title.textContent;
            const benefits = plan.querySelectorAll('.saas-benefit');
            benefits.forEach((b, j) => {
                const text = locale.miniPlanBenefits[i] && locale.miniPlanBenefits[i][j];
                if (text) b.textContent = text;
            });
            const cta = plan.querySelector('.saas-cta');
            if (cta) cta.textContent = locale.selectCta;
        });
        setText('.mini-pricing-note', locale.miniNote);

        setText('#contacto-title', locale.contactoTitle);
        setHtml('.contacto-final__lead', locale.contactoLead);
        const cupo = document.querySelector('.contacto-cupo strong');
        if (cupo) cupo.textContent = locale.contactoCupo;
        setText('.contacto-discord-block__label', locale.contactoLabel);
        setText('#discord-copy-btn', locale.contactoCopyBtn);
        setText('#discord-ejemplo-label', locale.discordEjemploLabel);
        const discordEjemploPre = document.getElementById('discord-ejemplo-msg');
        if (discordEjemploPre) discordEjemploPre.textContent = locale.discordExampleMsg;
        setText('#discord-copy-msg-btn', locale.discordCopyMsgBtn);
        const discordCopyMsgBtn = document.getElementById('discord-copy-msg-btn');
        if (discordCopyMsgBtn) discordCopyMsgBtn.setAttribute('aria-label', locale.discordCopyMsgBtnAria);

        setText('#condiciones-title', locale.condicionesTitle);
        setText('.condiciones-lead', locale.condicionesLead);
        setText('#condiciones-extras-resumen', locale.condicionesExtrasResumen);
        setList('.condiciones-item > summary', locale.condicionesSummaries);
        const conditionBlocks = document.querySelectorAll('.condiciones-item .card-list');
        conditionBlocks.forEach((block, i) => {
            const items = block.querySelectorAll('li');
            items.forEach((item, j) => {
                const text = locale.condicionesItems[i] && locale.condicionesItems[i][j];
                if (text) item.textContent = text;
            });
        });

        setHtml('.footer-manifesto--scarcity', locale.footerScarcity);
        setList('.footer-box h3', locale.footerTitles);
        const footerBoxes = document.querySelectorAll('.footer-box');
        if (footerBoxes[0]) setList('.footer-box:nth-child(1) li a', locale.footerCol1);
        if (footerBoxes[1]) {
            const col2Items = footerBoxes[1].querySelectorAll('li');
            if (col2Items[0]) col2Items[0].textContent = locale.footerCol2[0];
            if (col2Items[1]) {
                const anchors = col2Items[1].querySelectorAll('a');
                if (anchors[0]) anchors[0].textContent = locale.footerCol2[1].split(' · ')[0];
                if (anchors[1]) anchors[1].textContent = locale.footerCol2[1].split(' · ')[1];
            }
            if (col2Items[2]) col2Items[2].textContent = locale.footerCol2[2];
        }
        if (footerBoxes[2]) {
            const col3Items = footerBoxes[2].querySelectorAll('li');
            if (col3Items[0]) col3Items[0].textContent = locale.footerCol3[0];
            if (col3Items[1]) col3Items[1].textContent = locale.footerCol3[1];
            if (col3Items[2]) {
                const link = col3Items[2].querySelector('a');
                if (link) link.textContent = locale.footerCol3[2];
            }
        }
        if (footerBoxes[3]) {
            const col4Items = footerBoxes[3].querySelectorAll('.social-link__label');
            if (col4Items[0]) col4Items[0].textContent = locale.footerCol4[0];
            if (col4Items[1]) col4Items[1].textContent = locale.footerCol4[1];
            if (col4Items[2]) col4Items[2].textContent = locale.footerCol4[2];
        }

    }

    function setMobileMenuExpanded(open) {
        if (!mobileMenuToggle) return;
        const locale = I18N[currentLang];
        mobileMenuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileMenuToggle.setAttribute(
            'aria-label',
            open ? locale.menuClose : locale.menuOpen
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

        show(0);
        startAutoplay();
    }

    /** YouTube: no descarga el iframe hasta que el bloque entra en vista (ahorra red y JS del reproductor). */
    /** Abre el acordeón correcto con #condiciones-vertical o #condiciones-horizontal */
    function initCondicionesHashLink() {
        function openFromHash() {
            const id = location.hash === '#condiciones-vertical' ? 'condiciones-vertical' : location.hash === '#condiciones-horizontal' ? 'condiciones-horizontal' : null;
            if (!id) return;
            const d = document.getElementById(id);
            if (d && d.tagName === 'DETAILS') {
                d.open = true;
                requestAnimationFrame(() => {
                    d.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }
        openFromHash();
        window.addEventListener('hashchange', openFromHash);
    }

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
            const params =
                el.getAttribute('data-youtube-params') || 'autoplay=0&rel=0&playsinline=1&modestbranding=1';
            const iframe = document.createElement('iframe');
            /* No usar loading="lazy" en iframes inyectados: en Chromium a veces no llega a cargar el embed. */
            iframe.src = buildSrc(id, params);
            iframe.title = title;
            iframe.loading = 'eager';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.setAttribute(
                'allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
            );
            iframe.setAttribute('allowfullscreen', '');
            el.appendChild(iframe);
            el.querySelectorAll('.embed-yt-deferred__watch, .embed-yt-deferred__thumb, .embed-yt-deferred__play').forEach((n) =>
                n.remove()
            );
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
            const title = el.getAttribute('data-youtube-title') || 'YouTube';
            const locale = I18N[currentLang];
            el.setAttribute('role', 'button');
            el.setAttribute('tabindex', '0');
            el.setAttribute('aria-label', locale.embedLoadLabel + title);

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
            const locale = I18N[currentLang];
            try {
                await navigator.clipboard.writeText(discordId);
                showFeedback(locale.copyFeedback.success);
            } catch {
                try {
                    idEl.focus();
                    const range = document.createRange();
                    range.selectNodeContents(idEl);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    showFeedback(locale.copyFeedback.fallback);
                } catch {
                    showFeedback(locale.copyFeedback.manual + discordId);
                }
            }
        });
    }

    function initDiscordTemplateCopy() {
        const btn = document.getElementById('discord-copy-msg-btn');
        const pre = document.getElementById('discord-ejemplo-msg');
        const feedback = document.getElementById('discord-copy-msg-feedback');
        if (!btn || !pre) return;

        let resetTimer = null;

        function showFeedback(msg) {
            if (feedback) feedback.textContent = msg;
            if (resetTimer) window.clearTimeout(resetTimer);
            resetTimer = window.setTimeout(() => {
                if (feedback) feedback.textContent = '';
                resetTimer = null;
            }, 3500);
        }

        btn.addEventListener('click', async () => {
            const locale = I18N[currentLang];
            const text = (pre.textContent || '').trim();
            if (!text) return;
            try {
                await navigator.clipboard.writeText(text);
                showFeedback(locale.copyMsgFeedback.success);
            } catch {
                try {
                    pre.focus();
                    const range = document.createRange();
                    range.selectNodeContents(pre);
                    const sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    showFeedback(locale.copyMsgFeedback.fallback);
                } catch {
                    showFeedback(locale.copyMsgFeedback.manual);
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        applyLanguage(getPreferredLanguage());
        setMobileMenuExpanded(false);
        initThumbSlider();
        initHeaderScroll();
        initChannelMarquees();
        initDeferredYouTubeEmbeds();
        initDiscordCopy();
        initDiscordTemplateCopy();
        initCondicionesHashLink();

        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const nextLang = currentLang === 'es' ? 'en' : 'es';
                localStorage.setItem(LANG_STORAGE_KEY, nextLang);
                applyLanguage(nextLang);
                setMobileMenuExpanded(navMenu && navMenu.classList.contains('is-open'));
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

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
