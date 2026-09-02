---
title: Personalizar tu página de reservas
description: Códigos de descuento, diseño, reglas de reserva por tipo y textos personalizados.
collection: online-booking
order: 2
---

**Settings &rarr; Online Booking** tiene varias pestañas además de General para dar forma a la experiencia de reserva -- desde reglas por tipo de cita hasta el texto exacto que ven los pacientes.

::image-carousel
---
images:
  - src: /screenshots/settings-online-booking-entities.png
    alt: Pestaña Bookable Entities con una lista de tipos de cita y un enlace Configure para cada uno
    caption: "Bookable Entities -- reglas de reserva por tipo"
  - src: /screenshots/settings-online-booking-discounts.png
    alt: Pestaña Discount Codes con un formulario para Code, porcentaje de descuento, importe de descuento, fecha de caducidad y usos máximos
    caption: "Discount Codes -- crea uno en un solo formulario"
---
::

## Bookable Entities

Para cada tipo de cita, selecciona **Configure** para establecer:

- **Bookable by** -- todos, solo pacientes nuevos, o solo pacientes existentes. Útil para evitar que un tipo "New Patient Exam" lo reserve alguien que ya es paciente, o al revés.
- **Bypass practitioner selection** -- salta directamente a fecha/hora en lugar de preguntar qué profesional, para clínicas donde ese tipo siempre lo atiende quien esté disponible.
- **Max days ahead override** -- un límite por tipo, si es distinto del valor por defecto de toda la cuenta configurado en General.
- **Deposit amount** -- cobra una señal fija en lugar del precio completo, cuando ese tipo requiere pago online (se configura junto al interruptor **online payment required** en Settings &rarr; Appointment Types).

## Discount Codes

Crea un código con:

- **Code** -- el texto que los pacientes escriben al pagar (por ejemplo, "WELCOME10").
- **% off** o **€ off** -- elige uno; son alternativas, no se pueden combinar en el mismo código.
- **Expires** -- una fecha de caducidad opcional, tras la cual el código deja de funcionar automáticamente.
- **Max uses** -- un límite opcional al total de usos entre todos los pacientes; déjalo en blanco para que sea ilimitado.

Los pacientes introducen el código al pagar en la página de reservas, y el descuento se aplica antes de cobrar. No hay un límite integrado por paciente más allá del **Max uses** de toda la cuenta -- si necesitas evitar que un paciente reutilice un código repetidamente, establece un límite de usos bajo o retira el código después de su reserva.

## Layout

Configura tus colores primario y secundario y elige si mostrar el logo de tu clínica, para que la página de reservas coincida con tu marca en lugar de parecer una herramienta genérica de terceros. Los cambios aquí se aplican de inmediato a tu enlace público de reserva en producción -- no hay un paso separado de "publicar".

## Language Overrides

El texto de la página de reservas (títulos, etiquetas de botones, nombres de los pasos) se puede sobrescribir aquí si quieres una redacción distinta a la que viene por defecto -- útil para traducirla por completo a otro idioma, o simplemente para ajustarla al tono de tu clínica (más informal, más formal, términos propios de tu sector que tus pacientes esperan ver).
