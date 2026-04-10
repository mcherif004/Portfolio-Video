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
            heroTitle: 'Edición de vídeo para creadores que quieren publicar mejor y crecer con constancia.',
            heroSubtitle: 'Edición para <strong>vertical</strong>, <strong>YouTube largo</strong> y <strong>miniaturas</strong> con procesos claros, entregas puntuales y precios por plan.',
            heroCtas: ['Ver trabajos', 'Solicitar presupuesto'],
            heroTags: ['Ritmo', 'Narrativa', 'Retención'],
            showreelTitle: 'Video resumen (en preparación)',
            showreelIntro: 'Estoy creando un video corto para explicar mi proceso y qué hago en cada servicio. Estará disponible pronto.',
            showreelStatus: 'En proceso de producción',
            showreelNote: 'Cuando esté listo, se publicará aquí en YouTube (no listado), con reproducción automática al abrir el bloque.',
            serviciosTitle: 'Servicios',
            serviceTitles: ['Vertical', 'Horizontal (YouTube)', 'Miniaturas'],
            serviceDescs: [
                'Cortes para publicar a menudo: hook, subtítulos, SFX y ritmo adaptados al feed.',
                'Episodios 16:9 listos para subir: audio limpio, montaje y retención según el nivel que elijas.',
                'Imágenes pensadas para CTR y legibilidad en móvil, alineadas con la estética de tu canal.'
            ],
            serviceLists: [
                ['Shorts, Reels, TikTok: hook, subtítulos, SFX, ritmo', 'Planes por duración final y minutos de bruto', 'Pack 10 para volumen semanal', 'Entrega lista para subir'],
                ['16:9, audio limpio, tres niveles de profundidad', 'Montaje base → retención → acabado premium', 'Límites de duración final y bruto por plan', 'Extras de bruto/duración acotados'],
                ['CTR y legibilidad en feed', 'PNG/JPG; PSD si se acuerda', 'Coherencia con tu marca', 'Suelta, pack 5 o combo con episodio']
            ],
            serviceCtas: ['Ver Vertical', 'Ver Horizontal', 'Ver Miniaturas'],
            clientesTitle: 'Clientes con los que he trabajado',
            clientesIntro: 'Colaboraciones recientes. Abre cada perfil para validar estilo y consistencia de entrega.',
            trabajoTitle: 'Trabajos recientes',
            trabajoIntro: 'Trabajos reales para evaluar calidad de edición, ritmo y acabado.',
            verticalTitle: 'Vertical · Trabajos',
            verticalIntro: 'Cortes para Shorts, Reels y TikTok con foco en retención. Puedes revisar cada ejemplo publicado.',
            verticalCards: [
                { title: 'YouTube Short #01', copy: 'Edición vertical tipo Short; el resultado publicado está en el canal del cliente.' },
                { title: 'YouTube Short #02', copy: 'Otro corte vertical entregado; ritmo y texto en pantalla pensados para el feed.' },
                { title: 'YouTube Short #03', copy: 'Ejemplo de vídeo corto listo para publicar.' }
            ],
            ytMetricsLink: 'Ver vistas y me gusta en YouTube',
            verticalPricingTitle: 'Precios · Vertical',
            verticalPlanTitles: ['Sistema de Tracción Diaria', 'Plan Crecimiento 10', 'Ritmo Plus Retención'],
            verticalPlanBadges: ['Pack', 'Recomendado'],
            verticalPlanBenefits: [
                ['Hasta 60 s final', 'Subtítulos + SFX base', 'Hasta 10 min bruto', 'Publicación frecuente'],
                ['10 vídeos (7 €/u)', 'Alcance nivel Esencial', 'Material organizado', 'Fechas cerradas al reservar'],
                ['Hasta 90 s final', 'B-roll, memes, retención', 'Hasta 20 min bruto', 'Mejor relación calidad/tiempo']
            ],
            selectCta: 'Solicitar presupuesto',
            horizontalTitle: 'Horizontal · Trabajos',
            horizontalIntro: 'Episodios 16:9 listos para publicar en YouTube con edición limpia y narrativa clara.',
            horizontalCards: [
                { title: 'YouTube #01', copy: 'Episodio en formato largo; montaje y audio listos para el canal del cliente.' },
                { title: 'YouTube #02', copy: 'Otro trabajo de edición para vídeo horizontal; mismo criterio de entrega profesional.' },
                { title: 'YouTube #03', copy: 'Tercer ejemplo de episodio largo; puedes comprobar el resultado en el enlace.' }
            ],
            horizontalPricingTitle: 'Precios · Horizontal (YouTube)',
            horizontalPlanTitles: ['Nivel 01 Estructura', 'Nivel 02 Retención', 'Nivel 03 Autoridad'],
            horizontalPlanBenefits: [
                ['10–15 min final', 'Montaje + audio limpio', 'Hasta 30 min bruto', 'Base sin motion pesado'],
                ['20–25 min final', 'Ritmo + apoyos en pantalla', 'Hasta 60 min bruto', 'Enfoque retención'],
                ['30–35 min final', 'Narrativa + acabado premium', 'Hasta 120 min bruto', 'Máximo del plan']
            ],
            extrasNote: 'Extras: +15 € / 30 min bruto · +10 € / 2 min sobre límite horizontal.',
            miniTitle: 'Miniaturas · Trabajos',
            miniIntro: 'Diseño orientado a CTR, legibilidad y coherencia visual para tu canal.',
            miniPricingTitle: 'Precios · Miniaturas',
            miniPlanTitles: ['Miniatura suelta', 'Pack 5 miniaturas'],
            miniPlanBenefits: [
                ['Diseño para CTR y claridad en feed', 'Entrega en PNG/JPG', 'Turno según cola de trabajo'],
                ['Mismo estilo visual en toda la serie', 'Entrega optimizada para publicación', 'Mejor coste por unidad']
            ],
            miniNote: 'Combo episodio + miniatura: presupuesto cerrado según alcance.',
            contactoTitle: 'Contacto',
            contactoLead: 'Presupuesto en 24 h: <strong>formato</strong>, <strong>minutos de bruto</strong>, <strong>objetivo</strong>. Opcional: enlace al canal.',
            contactoCupo: 'Cupo de clientes mensual: 2/5',
            contactoLabel: 'Discord: copia el usuario → Añadir amigo en la app.',
            contactoCopyBtn: 'Copiar usuario',
            condicionesTitle: 'Condiciones',
            condicionesLead: 'Condiciones clave para trabajar con tiempos claros, alcance definido y pagos sin sorpresas.',
            condicionesSummaries: ['Primer mensaje y presupuesto', 'Material: envío y organización', 'Vertical (Shorts, Reels, TikTok)', 'Horizontal (YouTube largo)', 'Miniaturas', 'Pagos, plazos y ajustes', 'Extras, urgencias y cancelaciones'],
            condicionesItems: [
                ['Datos mínimos: formato, objetivo, bruto y fecha.', 'Precio y alcance cerrados antes de reservar.', 'Referencias opcionales para ajustar estilo.'],
                ['Entrega todo en una sola carpeta o drive.', 'Material ordenado para evitar retrasos.', 'Si la calidad limita el resultado, se avisa antes de producir.'],
                ['Planes por nivel de edición y duración.', 'Pack 10 solo con material organizado y calendario cerrado.', 'Re-montaje total o cambio de concepto se cotiza aparte.'],
                ['Niveles 01/02/03 según profundidad de edición.', 'Ajustes sobre el enfoque acordado.', 'Material muy desordenado puede requerir extra de organización.'],
                ['Brief con idea, referencias y estilo visual.', 'Entrega en PNG/JPG; PSD bajo acuerdo.', 'Rediseño completo cuenta como nuevo encargo.'],
                ['Reserva: 50%; saldo al cierre de entrega.', 'Plazo corre desde briefing y material completos.', 'Revisiones razonables incluidas según plan.'],
                ['Extras: +15 € / 30 min bruto y +10 € / 2 min final horizontal.', 'Pago: Bizum, Revolut, PayPal o Binance (USDT).', 'Urgencias extremas y trabajos fuera de alcance se cotizan aparte.']
            ],
            footerScarcity: '<strong>Cupo limitado</strong> · pocos proyectos, más foco por entrega.',
            footerTitles: ['Navegación', 'Trabajo y precios', 'Contacto rápido'],
            footerCol1: ['Servicios', 'Clientes', 'Vertical', 'Horizontal', 'Miniaturas'],
            footerCol2: ['Precio por plan; extras fuera de límites.', 'Vertical · Horizontal', 'Ajustes según alcance acordado.', 'Condiciones'],
            footerCol3: ['Formato · duración · objetivo', 'Enlace al material', 'Ir a contacto'],
            copyFeedback: {
                success: 'Copiado. Abre Discord y pégalo en «Añadir amigo».',
                fallback: 'Selecciona el texto y cópialo con Ctrl+C (o Cmd+C).',
                manual: 'Copia manualmente: '
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
            heroTitle: 'Video editing for creators who want better publishing quality and steady growth.',
            heroSubtitle: 'Editing for <strong>vertical</strong>, <strong>long-form YouTube</strong>, and <strong>thumbnails</strong> with clear process, reliable delivery, and plan-based pricing.',
            heroCtas: ['View work', 'Request a quote'],
            heroTags: ['Pacing', 'Story', 'Retention'],
            showreelTitle: 'Explainer video (coming soon)',
            showreelIntro: 'I am creating a short video explaining my process and what I deliver in each service. It will be available soon.',
            showreelStatus: 'Currently in production',
            showreelNote: 'Once ready, it will be published here on YouTube (unlisted) with autoplay when opening this block.',
            serviciosTitle: 'Services',
            serviceTitles: ['Vertical', 'Horizontal (YouTube)', 'Thumbnails'],
            serviceDescs: [
                'High-frequency short edits: hook, subtitles, SFX, and pace adapted to the feed.',
                '16:9 episodes ready to upload: clean audio, solid structure, and retention by level.',
                'Thumbnail design focused on CTR and mobile readability, aligned with your channel style.'
            ],
            serviceLists: [
                ['Shorts, Reels, TikTok: hook, subtitles, SFX, pacing', 'Plans based on final length and raw footage minutes', '10-video pack for weekly volume', 'Delivery ready to publish'],
                ['16:9 workflow with clean audio and three depth levels', 'Base edit → retention-focused → premium finish', 'Final length and raw-footage limits per plan', 'Extra raw minutes / runtime charged clearly'],
                ['CTR and feed readability', 'PNG/JPG delivery; PSD if agreed', 'Consistent with your channel branding', 'Single, 5-pack, or episode combo']
            ],
            serviceCtas: ['View Vertical', 'View Horizontal', 'View Thumbnails'],
            clientesTitle: 'Creators I have worked with',
            clientesIntro: 'Recent collaborations. Open each profile to validate style and delivery consistency.',
            trabajoTitle: 'Recent work',
            trabajoIntro: 'Real work samples to evaluate editing quality, pacing, and finish.',
            verticalTitle: 'Vertical · Work',
            verticalIntro: 'Short edits for Shorts, Reels, and TikTok focused on retention. Each example links to a published result.',
            verticalCards: [
                { title: 'YouTube Short #01', copy: 'Vertical short edit; published result available on the client channel.' },
                { title: 'YouTube Short #02', copy: 'Another delivered short edit, paced and formatted for feed retention.' },
                { title: 'YouTube Short #03', copy: 'Example of a short-form video ready to publish.' }
            ],
            ytMetricsLink: 'View public views and likes on YouTube',
            verticalPricingTitle: 'Pricing · Vertical',
            verticalPlanTitles: ['Daily Traction System', 'Growth Plan 10', 'Retention Plus Flow'],
            verticalPlanBadges: ['Pack', 'Recommended'],
            verticalPlanBenefits: [
                ['Up to 60s final runtime', 'Subtitles + base SFX', 'Up to 10 min raw footage', 'Built for frequent posting'],
                ['10 videos (7 €/each)', 'Essential-level scope', 'Organized source material', 'Dates locked on booking'],
                ['Up to 90s final runtime', 'B-roll, memes, retention support', 'Up to 20 min raw footage', 'Best quality/time balance']
            ],
            selectCta: 'Request quote',
            horizontalTitle: 'Horizontal · Work',
            horizontalIntro: '16:9 episodes ready for YouTube publishing with clean editing and clear narrative.',
            horizontalCards: [
                { title: 'YouTube #01', copy: 'Long-form episode edit with clean structure and audio, ready for upload.' },
                { title: 'YouTube #02', copy: 'Another long-form delivery with the same professional editing standard.' },
                { title: 'YouTube #03', copy: 'Third long-form sample; you can check the final result on YouTube.' }
            ],
            horizontalPricingTitle: 'Pricing · Horizontal (YouTube)',
            horizontalPlanTitles: ['Level 01 Structure', 'Level 02 Retention', 'Level 03 Authority'],
            horizontalPlanBenefits: [
                ['10–15 min final runtime', 'Clean edit + clean audio', 'Up to 30 min raw footage', 'Core edit without heavy motion'],
                ['20–25 min final runtime', 'Pacing + on-screen supports', 'Up to 60 min raw footage', 'Retention-focused edit'],
                ['30–35 min final runtime', 'Narrative + premium finish', 'Up to 120 min raw footage', 'Highest scope level']
            ],
            extrasNote: 'Extras: +15 € / 30 min raw footage · +10 € / 2 min over horizontal limit.',
            miniTitle: 'Thumbnails · Work',
            miniIntro: 'CTR-focused design with strong readability and consistent channel branding.',
            miniPricingTitle: 'Pricing · Thumbnails',
            miniPlanTitles: ['Single thumbnail', '5-thumbnail pack'],
            miniPlanBenefits: [
                ['CTR-focused design and feed readability', 'PNG/JPG delivery', 'Turnaround based on queue'],
                ['Consistent style across the full set', 'Publishing-ready assets', 'Lower cost per thumbnail']
            ],
            miniNote: 'Episode + thumbnail combo: fixed quote based on scope.',
            contactoTitle: 'Contact',
            contactoLead: 'Quote in 24h: <strong>format</strong>, <strong>raw footage minutes</strong>, <strong>video goal</strong>. Optional: channel link.',
            contactoCupo: 'Monthly client slots: 2/5',
            contactoLabel: 'Discord: copy the username → Add Friend in the app.',
            contactoCopyBtn: 'Copy username',
            condicionesTitle: 'Terms',
            condicionesLead: 'Core terms for clear scope, predictable delivery, and simple payments.',
            condicionesSummaries: ['First message and quote', 'Material: delivery and organization', 'Vertical (Shorts, Reels, TikTok)', 'Horizontal (Long-form YouTube)', 'Thumbnails', 'Payments, turnaround and revisions', 'Extras, urgency and cancellations'],
            condicionesItems: [
                ['Minimum input: format, objective, raw footage, deadline.', 'Final scope and quote are confirmed before booking.', 'References are optional.'],
                ['Share all assets in a single drive/folder.', 'Keep source files organized to protect delivery time.', 'If source quality limits output, this is flagged before production.'],
                ['Plans are defined by editing depth and runtime.', '10-video pack requires organized assets and fixed schedule.', 'Full rebuild or concept shift is quoted separately.'],
                ['Levels 01/02/03 by editing depth.', 'Revisions apply to agreed direction.', 'Highly disorganized source can require an organization fee.'],
                ['Brief includes concept, references, and visual style.', 'PNG/JPG delivery; PSD on request.', 'Full redesign is treated as a new order.'],
                ['Booking: 50% upfront; remainder on final delivery.', 'Timeline starts after full brief + assets.', 'Reasonable revisions are included by plan scope.'],
                ['Extras: +15 € / 30 min raw footage, +10 € / 2 extra final minutes (horizontal).', 'Payments: Bizum, Revolut, PayPal, Binance (USDT).', 'Extreme urgency and out-of-scope requests are quoted separately.']
            ],
            footerScarcity: '<strong>Limited slots</strong> · fewer projects, more focus per delivery.',
            footerTitles: ['Navigation', 'Work and pricing', 'Quick contact'],
            footerCol1: ['Services', 'Clients', 'Vertical', 'Horizontal', 'Thumbnails'],
            footerCol2: ['Plan-based pricing; extras outside limits.', 'Vertical · Horizontal', 'Revisions follow agreed scope.', 'Terms'],
            footerCol3: ['Format · duration · objective', 'Material link', 'Go to contact'],
            copyFeedback: {
                success: 'Copied. Open Discord and paste it in "Add Friend".',
                fallback: 'Select the text and copy it with Ctrl+C (or Cmd+C).',
                manual: 'Copy manually: '
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
        setText('.pricing-after__intro', locale.verticalIntro);
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
        const verticalPlans = document.querySelectorAll('#planes + .saas-pricing-grid .saas-plan');
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
        const horizontalPlans = document.querySelectorAll('#planes-horizontal + .saas-pricing-grid .saas-plan');
        horizontalPlans.forEach((plan, i) => {
            const h4 = plan.querySelector('h4');
            if (h4) {
                const badge = h4.querySelector('span');
                h4.childNodes[0].nodeValue = `${locale.horizontalPlanTitles[i]} `;
                if (badge) badge.textContent = locale.verticalPlanBadges[1];
            }
            const benefits = plan.querySelectorAll('.saas-benefit');
            benefits.forEach((b, j) => {
                const text = locale.horizontalPlanBenefits[i] && locale.horizontalPlanBenefits[i][j];
                if (text) b.textContent = text;
            });
            const cta = plan.querySelector('.saas-cta');
            if (cta) cta.textContent = locale.selectCta;
        });
        setText('.saas-extras-note', locale.extrasNote);

        setText('#miniaturas-pack', locale.miniTitle);
        const miniIntro = document.querySelector('#miniaturas-pack + .section-intro');
        if (miniIntro) miniIntro.textContent = locale.miniIntro;
        setText('#planes-miniaturas', locale.miniPricingTitle);
        const miniPlans = document.querySelectorAll('#planes-miniaturas + .saas-pricing-grid .saas-plan');
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

        setText('#condiciones-title', locale.condicionesTitle);
        setText('.condiciones-lead', locale.condicionesLead);
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
            if (col2Items[3]) {
                const link = col2Items[3].querySelector('a');
                if (link) link.textContent = locale.footerCol2[3];
            }
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

    document.addEventListener('DOMContentLoaded', () => {
        applyLanguage(getPreferredLanguage());
        setMobileMenuExpanded(false);
        initThumbSlider();
        initHeaderScroll();
        initChannelMarquees();
        initDeferredYouTubeEmbeds();
        initDiscordCopy();

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
