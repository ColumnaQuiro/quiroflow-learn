---
title: Enviar campañas
description: Envía mensajes automáticos a pacientes en torno a eventos como cumpleaños, reservas o visitas completadas -- con segmentación de audiencia, consentimiento de marketing, y acciones de WhatsApp, correo o webhook.
collection: communications
order: 3
---

**Campaigns** permite configurar mensajes (WhatsApp, correo, o un webhook) que se disparan automáticamente en torno a algo que ocurre en la clínica, dirigirlos a los pacientes adecuados, y enviar un mensaje puntual cuando lo necesites.

## Campañas automáticas: disparador + audiencia + acciones

Cada campaña es una regla con tres partes:

### 1. Cuándo ocurre (el disparador)

- Cita reservada, registrada (checked in), completada, cancelada, marcada como no presentada, o reprogramada
- Día de la cita (un envío fijo por la mañana, sobre las 9h, para quien tenga cita ese día)
- **X horas antes de la cita** -- elige tú mismo cualquier número de horas. ¿Quieres un recordatorio 3 días antes *y* otro a las 24 horas? Crea dos campañas con este disparador y valores distintos.
- Factura pagada
- Cumpleaños del paciente (comprobado una vez al día)
- Membresía iniciada, cancelada, o pago de membresía procesado

Deja el disparador sin establecer para que la campaña sea **solo manual** -- nunca se dispara sola, solo cuando seleccionas **Send now**.

### 2. Solo cuando (la audiencia)

![Panel de nueva campaña con el disparador configurado como "Appointment completed" y filtros de audiencia por tipo de cita y número de visitas](/screenshots/campaigns-new-top.png)

Limita un disparador a los pacientes a los que realmente debería aplicarse:

- **Tipo de cita** -- dispara solo para un tipo concreto (por ejemplo, solo "New Patient Exam").
- **Número de visitas** -- el total de visitas *completadas* del paciente de ese tipo. `1` significa la primera vez que se completa para ese paciente -- ideal para un seguimiento tipo "¿qué tal tu primer ajuste?" que no debería repetirse en cada visita.
- **Solo pacientes nuevos** -- sin ninguna otra cita en absoluto, pasada o futura, para ese paciente en toda la cuenta.

### 3. Entonces haz esto (las acciones)

Una campaña puede tener más de una acción -- WhatsApp *y* correo para el mismo disparador, por ejemplo. Tres tipos de acción:

- **WhatsApp template** -- elige entre las plantillas realmente aprobadas de tu cuenta de Meta (obtenidas en directo), adjunta opcionalmente una plantilla de documento como una de las variables, y asigna cada marcador numerado de la plantilla a una fuente: nombre, apellidos, correo, fecha de la cita, hora de la cita, o texto fijo.

  ![Acción de plantilla de WhatsApp con un espacio para "Document" y una lista ordenada de variables de la plantilla](/screenshots/campaigns-new-actions.png)

- **Email** -- tu propio asunto y cuerpo en texto enriquecido, con campos combinables de un clic (nombre, apellidos, correo) y compatibilidad con imágenes.

  ![Acción de correo con un asunto con campos combinables, barra de herramientas de texto enriquecido, y Marketing message activado para una campaña de cumpleaños](/screenshots/campaigns-email-action.png)

- **Webhook** -- envía un POST a cualquier URL que indiques, con un secreto de firma opcional. Este es el punto de integración para Zapier, Make, o cualquier cosa personalizada que quieras disparar a partir de eventos de la clínica.

## Consentimiento de marketing

Toda campaña tiene un interruptor **Marketing message**. Actívalo para contenido promocional -- ofertas, felicitaciones de cumpleaños -- y solo llegará a los pacientes que hayan dado su consentimiento explícito para ese canal en **Marketing channels** en su propia ficha. Déjalo desactivado para mensajes transaccionales ligados a una cita o factura concreta, que no necesitan consentimiento de marketing por separado. El disparador de cumpleaños sugiere activarlo, ya que una felicitación de cumpleaños es un ejemplo típico de mensaje de marketing y no transaccional.

## Probar antes de activarla

Toda campaña tiene **Send test to me** -- introduce tu propio número de WhatsApp y verás exactamente lo que recibiría un paciente, antes de activar la campaña de verdad.

## Enviar una ahora

Selecciona **Send now** desde la lista de campañas para enviar un mensaje a un grupo de pacientes inmediatamente, al margen de cualquier disparador -- útil para un anuncio puntual (un cierre por vacaciones, un nuevo servicio) en lugar de una regla automática continua. Una campaña sin disparador configurado está pensada precisamente para esto.

## Dónde quedan registrados

Cada envío de campaña se registra igual que cualquier otro mensaje de WhatsApp, así que aparece en la pestaña **Communications** de ese paciente y en la **Inbox** compartida.
