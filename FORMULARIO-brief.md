# Brief: formulario de contacto / presupuesto (para mañana)

Objetivo: captar leads alineados con el flujo actual (Discord + datos mínimos para presupuesto en 24 h), sin sustituir el copy-to-clipboard si no quieres; el formulario puede ser complemento o paso previo.

---

## 1. Objetivo y resultado

- **Qué debe hacer el usuario:** enviar datos estructurados en &lt; 1 minuto.
- **Qué recibes tú:** notificación (email, webhook, hoja, etc.) con los mismos campos que ya pides en `#contacto`.
- **CTA:** tras envío, mensaje claro: «Te respondo por Discord / email» (según implementes).

---

## 2. Campos recomendados (mínimo viable)

| Campo | Tipo | Obligatorio | Notas |
|--------|------|-------------|--------|
| Formato | select o radio | Sí | Vertical / YouTube largo / Miniaturas / Varios |
| Minutos de bruto | number o select (rangos) | Sí | Ej.: &lt;10 / 10–30 / 30–60 / 60+ |
| Objetivo del vídeo | textarea corta (max 500) | Sí | Placeholder: «Ej.: episodio semanal, lanzamiento…» |
| Enlace al canal o material | url | No | Drive, canal YouTube, etc. |
| Usuario Discord | text | No | Opcional si ya contactan por copiar `ch3riff4` |
| Email | email | Depende | Obligatorio si el envío es por email y no usas solo webhook |
| Consentimiento RGPD | checkbox | Sí | Texto corto + enlace a condiciones |

**Nice to have:** fecha deseada, nivel de plan si ya lo tienen claro (dropdown), archivo único (subida solo si el backend lo soporta; mañana puede quedar fuera del MVP).

---

## 3. Validación (front)

- HTML5: `required`, `type="email"`, `maxlength`, `pattern` solo donde aporte (evitar regex frágiles en URL).
- Mensajes de error en español, visibles y asociados con `aria-describedby`.
- Botón deshabilitado o estado «Enviando…» para doble envío.

---

## 4. Dónde colgarlo (opciones para decidir mañana)

1. **Formspree / Getform / Web3Forms** — rápido, sin servidor; revisar límites y spam.
2. **Netlify Forms / Vercel** — si el sitio migra a esas plataformas.
3. **Google Apps Script + Sheet** — gratuito, algo de setup; cuidado con cuotas y spam.
4. **Backend propio** — máximo control; más tiempo.

**GitHub Pages** (repo estático actual): no ejecuta servidor; hace falta servicio externo (1–4) o serverless (ej. función en otro proveedor).

**Si quieres Discord como bandeja de entrada:** lee la sección **10** (no pongas la URL del webhook en el navegador).

---

## 5. Integración en la página

- Sección `#contacto`: bloque actual (Discord) + debajo o al lado un `<form>` con el mismo estilo (`btn-primary`, `section-block`).
- `action` y `method` según proveedor; si es JS `fetch`, CORS y endpoint documentados.
- Mantener **meta CSP** en `index.html`: si el POST va a otro dominio, añadir ese origen en `connect-src` (y `form-action` si aplica).

---

## 6. Accesibilidad

- `<label for="id">` en todos los campos.
- `fieldset` + `legend` si agrupas radios.
- Foco visible; orden de tab lógico.
- `aria-live="polite"` en mensaje de éxito / error.

---

## 7. RGPD (mínimo)

- Checkbox explícito antes de enviar.
- Texto tipo: «He leído la información sobre tratamiento de datos [enlace a condiciones / política].»
- Si mañana no hay política aparte, enlazar bloque condiciones o añadir párrafo breve en la misma página.

---

## 8. Checklist día de implementación

- [ ] Elegir proveedor de envío (Formspree, Worker+Discord, Make, etc.).
- [ ] Si usas Discord: seguir checklist **13** (webhook nunca en el repo público).
- [ ] Crear cuenta / endpoint y probar POST de prueba.
- [ ] Maquetar formulario en `index.html` (o componente si migras).
- [ ] Ajustar CSP si el POST es cross-origin.
- [ ] Probar en móvil + lector de pantalla básico (labels).
- [ ] Añadir evento GA4 `form_submit` / `generate_lead` (opcional, coherente con `analytics.js`).
- [ ] Commit + push; verificar GitHub Pages tras el deploy.

---

## 9. Texto de éxito / error (borrador)

- **Éxito:** «Recibido. Si dejaste Discord o email, te respondo en unas horas.»
- **Error:** «No se ha podido enviar. Escríbeme por Discord con los mismos datos.»

---

## 10. Notificaciones en Discord: análisis y mejora

### Qué quieres lograr

1. El visitante envía el formulario desde tu web estática.
2. Tú recibes algo **legible y corto** (móvil, push de Discord).
3. Opcional: histórico en un canal privado solo tuyo (o staff).

### Lo que no debes hacer

- **No** incrustar la **URL del webhook de Discord** en `index.html` ni en JS público. Cualquiera podría robarla y spamear tu canal o agotar cuotas.
- **No** confiar solo en el front para anti-spam: añade capa en el intermediario (rate limit, honeypot, o token oculto).

### Cómo funciona bien (patrón recomendado)

```
[Formulario en GitHub Pages] --HTTPS POST JSON--> [Intermediario con SECRETO]
                                                        |
                        +-------------------------------+-------------------------------+
                        v                               v                               v
                 [Discord Webhook]                 [Email opcional]              [Sheet / log]
                 mensaje resumido                   (Formspree, etc.)
```

- El **navegador** solo conoce la URL de tu **Worker / función / Zap** (dominio tuyo o de terceros de confianza).
- El **intermediario** guarda en variables de entorno: `DISCORD_WEBHOOK_URL`, y opcionalmente `FORM_SECRET` (string que el formulario envía en header o campo oculto generado en build — lo más simple es un secreto compartido fijo en env del worker).

### Discord: webhook vs bot

| | Webhook entrante | Bot (Gateway) |
|---|------------------|----------------|
| Complejidad | Baja | Media-alta (hosting, intents, token) |
| Uso típico | Publicar mensajes en **un canal** | DMs, slash commands, hilos complejos |
| Notificación a ti | Sí, si activas notificaciones para ese canal o @mentions | Puedes DM si programas el bot |
| Recomendación MVP | **Webhook en canal privado** «#leads» solo tú | Solo si necesitas lógica extra |

**Flujo cómodo para ti:** servidor Discord tuyo → canal **privado** `#presupuestos` → crear **webhook** (Ajustes del canal → Integraciones → Webhooks). En el móvil: notificaciones solo para ese canal o para «todas las menciones» si el worker hace `@tuUsuario` (requiere user ID en el mensaje; en webhooks puro a veces se usa `<@USER_ID>`).

### Formato del mensaje en Discord (resumen)

Usar **embed** para que en móvil se lea bien:

- **Título:** `Nuevo lead — [Formato]`
- **Campos:** Bruto | Objetivo (truncar a ~200 chars + «…») | Enlace | Discord usuario | Email
- **Footer:** timestamp ISO o «web portfolio»
- Color lateral: uno fijo (ej. rojo marca) para distinguir de chat normal

Ejemplo de cuerpo lógico (el intermediario lo convierte a JSON de Discord):

```json
{
  "embeds": [{
    "title": "Presupuesto · Vertical",
    "color": 16729156,
    "fields": [
      { "name": "Bruto", "value": "10–30 min", "inline": true },
      { "name": "Discord", "value": "usuario#0 o @handle", "inline": true },
      { "name": "Objetivo", "value": "Episodio semanal estilo X…" },
      { "name": "Enlace", "value": "https://…" }
    ],
    "timestamp": "2026-04-08T12:00:00.000Z"
  }]
}
```

`POST` a `DISCORD_WEBHOOK_URL?wait=true` con `Content-Type: application/json`.

---

## 11. Tres formas de montar el intermediario (elige una)

### A) Cloudflare Worker (recomendada si quieres gratis y control)

- Plan gratuito generoso; el Worker tiene la URL del webhook solo en **secrets**.
- El formulario hace `fetch('https://tu-worker.tu-dominio.workers.dev/lead', { method: 'POST', body: JSON.stringify(...) })`.
- En el Worker: validar JSON, opcional `if (request.headers.get('X-Form-Secret') !== env.SECRET) return 403`, construir embed, `fetch(DISCORD_WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ embeds: [...] }) })`.
- CORS: responder `OPTIONS` con `Access-Control-Allow-Origin: https://mcherif004.github.io` (o tu dominio) solo para ese origen.
- **CSP** en `index.html`: añadir el origen del Worker en `connect-src`.

### B) Vercel / Netlify serverless function

- Misma lógica que el Worker; repo puede ser aparte o monorepo.
- Variables de entorno en el panel del proveedor.

### C) Make.com / Zapier / n8n (sin código)

- Formulario → Webhooks module «Custom webhook» → Discord module «Create a message».
- El HTML puede POST a la URL que te da Make; **revisa límites** del plan gratuito y filtra spam con módulos básicos.
- Menos control fino sobre CORS y formato embed que A/B.

---

## 12. Seguridad y spam (mínimo viable)

- Campo **honeypot** oculto con CSS (`display:none` + `tabindex=-1`); si viene relleno, responder 200 sin enviar a Discord (falsa positividad baja).
- **Rate limit** por IP en Worker (KV o memoria limitada) o aceptar riesgo inicial y monitorizar.
- Opcional: **Cloudflare Turnstile** (captcha invisible) delante del Worker.
- Rotar webhook si se filtra: revocar en Discord y crear otro; actualizar secret en el Worker.

---

## 13. Checklist específico Discord + form

- [ ] Servidor Discord + canal privado `#presupuestos` (solo tú).
- [ ] Crear webhook → copiar URL → **solo** pegarla como secret del Worker / entorno Zap.
- [ ] Desplegar intermediario (A, B o C) y probar con `curl` antes de enchufar el front.
- [ ] Ajustar CORS y **CSP** (`connect-src`) en la web.
- [ ] Probar desde móvil: llega embed y la notificación te interrumpe como quieres.
- [ ] Documentar en un `.env.example` qué variables hacen falta (sin valores reales).

---

*Última referencia de repo remoto: push a `main` en el remoto configurado (GitHub). Pages se actualiza según la configuración del repo (Settings → Pages → rama/fuente).*
