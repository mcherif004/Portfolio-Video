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

- [ ] Elegir proveedor de envío (Formspree u otro).
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

*Última referencia de repo remoto: push a `main` en el remoto configurado (GitHub). Pages se actualiza según la configuración del repo (Settings → Pages → rama/fuente).*
