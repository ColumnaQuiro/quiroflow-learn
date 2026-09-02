---
title: Añadir la tarjeta de un paciente
description: Guarda una tarjeta introduciéndola tú mismo, o envía al paciente un enlace para que la introduzca él.
collection: billing-payments
order: 2
---

Una tarjeta guardada te permite cobrar sin pedir los datos de la tarjeta en cada visita, y habilita el cobro automático (autopay) para las cuotas de bonos y las membresías. Stripe debe estar conectado antes -- consulta **Settings &rarr; Payments**.

![Barra de herramientas de la pestaña Billing mostrando los botones Add credit, Take payment, Add card y Copy card link, con Card on file en None](/screenshots/patient-billing.png)

En la pestaña **Billing** de un paciente tienes dos formas de añadir una.

## Opción 1: Introducirla tú mismo

Selecciona **Add card** (o **Replace card** si ya hay una guardada). Se abre ahí mismo un formulario de tarjeta seguro, alojado por Stripe -- los datos de la tarjeta van directamente a Stripe y nunca se guardan en QuiroFlow, ni los ve nadie fuera de ese formulario.

![Modal Add card con los campos Card number, Expiration date, Security code y Country, además de un correo y móvil opcionales para un pago más rápido](/screenshots/billing-add-card-modal.png)

El formulario también ofrece guardar el correo y el número de móvil para un pago más rápido la próxima vez -- esto es opcional y solo afecta a futuros pagos con Stripe, no a la ficha de contacto del paciente en QuiroFlow.

## Opción 2: Enviar un enlace al paciente

Selecciona **Copy card link**. Esto crea una página de un solo uso alojada por Stripe y copia su enlace al portapapeles. Envíaselo al paciente como prefieras -- WhatsApp, correo, SMS -- y él introduce su propia tarjeta en la página de Stripe, sin que el personal la vea ni la toque en ningún momento. Es la mejor opción cuando el paciente no está físicamente delante de ti, o cuando prefieres no manejar sus datos de tarjeta ni siquiera brevemente en una pantalla compartida de recepción.

En cuanto la envía, el estado de **Card on file** del paciente se actualiza automáticamente, normalmente en unos segundos -- no hace falta recargar manualmente, aunque hacerlo nunca está de más si quieres confirmar que ya llegó.

## Eliminar una tarjeta

Selecciona **Remove card** junto a los datos de la tarjeta del paciente. Esto la desvincula de Stripe y la borra de su ficha -- pide confirmación antes de hacerlo si el paciente tiene un calendario de autopay activo que depende de ella, ya que esos cobros empezarán a fallar hasta que se añada una tarjeta nueva. Eliminar una tarjeta no cancela ningún bono ni membresía en sí, solo el método de cobro automático asociado.
