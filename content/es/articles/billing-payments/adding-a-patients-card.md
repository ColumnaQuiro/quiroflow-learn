---
title: Añadir la tarjeta de un paciente
description: Guarda una tarjeta enviándola tú mismo, o envía al paciente un enlace para que la introduzca él.
collection: billing-payments
order: 2
---

Una tarjeta guardada permite cobrar sin pedir los datos de la tarjeta en cada visita, y habilita el cobro automático (autopay) para plazos de bonos y membresías. Primero hay que conectar Stripe -- consulta **Settings &rarr; Payments**.

En la pestaña **Billing** de un paciente, tienes dos formas de añadir una:

## Opción 1: Introducirla tú mismo

Selecciona **Add card** (o **Replace card** si ya hay una guardada). Se abre ahí mismo un formulario de tarjeta seguro -- los datos de la tarjeta van directos a Stripe y nunca se guardan en QuiroFlow.

![Barra de herramientas de Billing con los botones Add credit, Take payment, Add card y Copy card link, con Card on file en None](/screenshots/patient-billing.png)

## Opción 2: Enviar un enlace al paciente

Selecciona **Copy card link**. Esto crea una página alojada en Stripe de un solo uso y copia su enlace al portapapeles. Envíaselo al paciente como prefieras -- WhatsApp, correo, SMS -- y él introduce su propia tarjeta en la página de Stripe, sin que el personal la vea ni la toque en ningún momento.

Una vez que la envía, el estado **Card on file** del paciente se actualiza automáticamente, normalmente en unos segundos.

## Eliminar una tarjeta

Selecciona **Remove card** junto a los datos de la tarjeta del paciente. Esto la desvincula de Stripe y la elimina de su ficha -- pide confirmación antes de hacerlo si el paciente tiene un calendario de autopay activo que dependa de ella, ya que esos cobros empezarán a fallar hasta que se añada una tarjeta nueva.
