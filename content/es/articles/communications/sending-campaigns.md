---
title: Enviar campañas
description: Mensajes automáticos a pacientes en torno a eventos como cumpleaños, reservas o visitas completadas -- con segmentación de audiencia, consentimiento de marketing y acciones de WhatsApp, correo o webhook.
collection: communications
order: 3
---

**Campaigns** te permite configurar mensajes (WhatsApp, correo o un webhook) que se disparan automáticamente en torno a algo que ocurre en la clínica, dirigirlos a los pacientes adecuados, y enviar una difusión puntual cuando lo necesites.

::image-carousel
---
images:
  - src: /screenshots/campaigns-new-top.png
    alt: Panel de nueva campaña con el trigger en "Appointment completed" y filtros de audiencia por tipo de cita y número de visitas
    caption: "1. Trigger y audiencia"
  - src: /screenshots/campaigns-new-actions.png
    alt: Acción de plantilla de WhatsApp con un campo Document y una lista ordenada de variables de plantilla
    caption: "2. Acción -- una plantilla de WhatsApp con variables asignadas"
  - src: /screenshots/campaigns-email-action.png
    alt: Acción de correo con un asunto con campos combinados, barra de texto enriquecido, y Marketing message activado para una campaña de cumpleaños
    caption: "...o una acción de correo en su lugar"
---
::

## Campañas automáticas: trigger + audiencia + acciones

Cada campaña es una regla con tres partes.

### 1. Cuándo ocurre esto (el trigger)

- Cita reservada, registrada (checked in), completada, cancelada, marcada como no presentada, o reprogramada
- Día de la cita (un envío fijo por la mañana, sobre las 9h, para cualquiera con cita ese día)
- **X horas antes de la cita** -- elige tú mismo cualquier número de horas. ¿Quieres un recordatorio a 3 días *y* otro a 24 horas? Crea dos campañas con este trigger y valores distintos.
- Factura pagada
- Cumpleaños del paciente (se comprueba una vez al día)
- Membresía iniciada, cancelada, o un pago de membresía procesado

Deja el trigger sin definir para que la campaña sea **solo manual** -- nunca se dispara sola, solo cuando seleccionas **Send now**.

### 2. Solo cuando (la audiencia)

Acota un trigger a los pacientes a los que realmente debería aplicarse:

- **Appointment type** -- se dispara solo para un tipo concreto (por ejemplo, solo "New Patient Exam").
- **Visit count** -- el total de visitas *completadas* de ese tipo para el paciente. `1` significa la primera vez que se completa para él o ella -- ideal para un seguimiento tipo "¿qué tal tu primer ajuste?" que no debería repetirse en cada visita.
- **Only for first-time patients** -- sin ninguna otra cita, pasada o futura, para ese paciente en toda la cuenta.

### 3. Entonces haz esto (las acciones)

Una campaña puede tener más de una acción -- WhatsApp *y* correo en el mismo trigger, por ejemplo. Tres tipos de acción:

- **WhatsApp template** -- elige entre las plantillas de tu cuenta realmente aprobadas por Meta (obtenidas en tiempo real), adjunta opcionalmente una plantilla de documento como una de las variables, y asigna cada marcador numerado de la plantilla a un origen: nombre, apellidos, correo, fecha de la cita, hora de la cita, o texto fijo.
- **Email** -- tu propio asunto y cuerpo en texto enriquecido, con campos combinados de inserción rápida (First name, Last name, Email) y soporte de imágenes. Arrastra una imagen directamente al editor (máximo 3 MB).
- **Webhook** -- hace POST a cualquier URL que indiques, con un secreto de firma opcional. Es el punto de integración para Zapier, Make, o cualquier cosa personalizada que quieras disparar a partir de eventos de la clínica.

Usa **+ Add action** para apilar más de una -- un patrón habitual es una plantilla de WhatsApp como canal principal con una acción de correo de respaldo para los pacientes que no han aceptado recordatorios por WhatsApp.

## Consentimiento de marketing

Cada campaña tiene un interruptor de **Marketing message**. Actívalo para contenido promocional -- ofertas, felicitaciones de cumpleaños -- y solo llegará a los pacientes que hayan aceptado explícitamente ese canal en **Marketing channels** en su propia ficha. Déjalo desactivado para mensajes transaccionales ligados a una cita o factura concreta, que no necesitan consentimiento de marketing aparte. El trigger de cumpleaños te sugiere activarlo, ya que una felicitación de cumpleaños es un ejemplo de manual de mensaje de marketing y no transaccional.

Equivocarse con este interruptor en cualquiera de los dos sentidos tiene consecuencias reales: marcar un recordatorio transaccional como marketing hace que, en silencio, no llegue a los pacientes que no han dado su consentimiento (aunque lo estén esperando), mientras que marcar contenido de marketing genuino como transaccional arriesga enviar mensajes promocionales a personas que nunca accedieron a recibirlos.

## Probar antes de publicar

Cada campaña tiene **Send test to me** -- introduce tu propio número de WhatsApp y verás exactamente lo que recibiría un paciente, antes de activar la campaña de verdad. Hazlo con cada campaña nueva, especialmente las que tienen varios campos combinados o un documento adjunto -- es la forma más fácil de detectar una variable mal asignada antes de que llegue a pacientes reales.

## Enviar una ahora

Selecciona **Send now** en la lista de campañas para escribir a un grupo de pacientes de inmediato, sin depender de ningún trigger -- útil para un anuncio puntual (un cierre por vacaciones, un servicio nuevo) en lugar de una regla automática continua. Una campaña sin trigger definido está pensada específicamente para esto.

## Dónde queda registrado

Cada envío de campaña se registra igual que cualquier otro mensaje de WhatsApp, así que aparece en la pestaña **Communications** de ese paciente y en el **Inbox** compartido -- no hay un "historial de campañas" separado que consultar. Las estadísticas en la parte superior de la página de Campaigns (enviados, % entregados, respuestas) te dan la vista agregada sin necesidad de revisar paciente por paciente.
