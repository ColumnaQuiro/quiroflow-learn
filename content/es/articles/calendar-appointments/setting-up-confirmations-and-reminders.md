---
title: Configurar confirmaciones y recordatorios de citas
description: Envía mensajes automáticos a los pacientes para confirmar sus próximas citas.
collection: calendar-appointments
order: 3
---

Ve a **Settings &rarr; Communication &rarr; General** para controlar los mensajes automáticos de confirmación y recordatorio. Ambos están activados por defecto cuando se configura tu cuenta, así que la mayoría de las clínicas nunca necesitan tocar esto más allá de decidir los canales y los tiempos.

::image-carousel
---
images:
  - src: /screenshots/settings-communications-general.png
    alt: Página General de Settings con los interruptores de Appointment Confirmations y Appointment Reminders, ambos activados con WhatsApp marcado
    caption: "Settings &rarr; Communication &rarr; General -- activa o desactiva confirmaciones y recordatorios"
  - src: /screenshots/settings-whatsapp.png
    alt: Página de configuración de WhatsApp con los campos de plantilla por defecto de confirmación, recordatorio y recall
    caption: "Settings &rarr; WhatsApp -- las plantillas de mensaje que usa cada uno"
---
::

## Appointment Confirmations

Se envía justo después de reservar una cita (ya sea reservada por el personal o por el paciente online). Elige por qué canales enviarla:

- **WhatsApp** -- usa la plantilla de confirmación configurada en **Settings &rarr; WhatsApp**. Es el canal por el que más responden realmente los pacientes, ya que contestar es tan fácil como responder un mensaje.
- **Email** -- escribe tu propio asunto y cuerpo aquí, con campos combinados como el nombre del paciente, la fecha de la cita, el profesional y el tipo de cita.

Puedes activar ambos canales a la vez -- un paciente con número de teléfono recibe WhatsApp, y el correo se envía de todas formas como respaldo, así que nada depende de que funcione un único canal de envío.

## Appointment Reminders

Se envía un número determinado de horas antes de la cita (24 horas por defecto, ajustable en el campo **hours before the appointment**). Las mismas opciones de canal que las confirmaciones, con su propia plantilla de WhatsApp (también configurada en **Settings &rarr; WhatsApp**) y su propio asunto/cuerpo de correo.

Una ventana más corta (por ejemplo, 2-4 horas) detecta mejor los no presentados del mismo día pero da menos margen al paciente para reprogramar si no puede acudir; una ventana más larga (24-48 horas) da más antelación pero es más fácil que se olvide para cuando llega la cita. La mayoría de las clínicas se quedan alrededor de las 24 horas como equilibrio entre ambas.

## Cómo se gestionan las respuestas de los pacientes

Sea cual sea el mensaje que se envía -- confirmación o recordatorio -- el paciente puede responder directamente por WhatsApp para confirmar, pedir cambiar la cita o cancelarla. QuiroFlow lee esa respuesta automáticamente y actualiza el estado de la cita; consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained) para ver qué hace cada tipo de respuesta.

Esto solo funciona si tu cuenta tiene WhatsApp conectado -- consulta [Conectar WhatsApp](/es/articles/communications/connecting-whatsapp) en la colección **Comunicaciones** para configurarlo. Si WhatsApp aún no está conectado, deja las casillas de WhatsApp desactivadas aquí y confía en el correo hasta que lo esté -- activar WhatsApp sin conexión solo hace que los mensajes se queden en cola sin enviarse.

## Elegir plantilla por tipo de mensaje

Cada tipo de mensaje (confirmación, recordatorio, recall, notificación al personal) tiene su propia **plantilla por defecto** configurada en **Settings &rarr; WhatsApp**, más una variante de idioma. Si el idioma preferido de un paciente tiene su propia variante de plantilla aprobada, QuiroFlow la usa automáticamente en lugar de la plantilla por defecto -- no hay nada más que configurar por paciente para que esto funcione, siempre que la variante exista y esté aprobada en tu cuenta de WhatsApp Business.
