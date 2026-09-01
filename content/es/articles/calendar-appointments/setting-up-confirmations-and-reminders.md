---
title: Configurar confirmaciones y recordatorios de citas
description: Envía mensajes automáticos a los pacientes para confirmar sus próximas citas.
collection: calendar-appointments
order: 3
---

Ve a **Settings &rarr; Communication &rarr; General** para controlar los mensajes automáticos de confirmación y recordatorio. Ambos están activados por defecto.

![Página de configuración General con los interruptores de Appointment Confirmations y Appointment Reminders, ambos activados con WhatsApp marcado](/screenshots/settings-communications-general.png)

## Appointment Confirmations

Se envía justo después de reservar una cita (ya sea reservada por el personal o por el paciente online). Elige por qué canales enviarla:

- **WhatsApp** -- usa la plantilla de confirmación configurada en **Settings &rarr; WhatsApp**.
- **Email** -- escribe tu propio asunto y cuerpo aquí, con campos combinables como el nombre del paciente, la fecha de la cita, el profesional y el tipo de cita.

## Appointment Reminders

Se envía un número determinado de horas antes de la cita (24 horas por defecto, ajustable aquí). Mismas opciones de canal que las confirmaciones, con su propia plantilla de WhatsApp (también configurada en **Settings &rarr; WhatsApp**) y asunto/cuerpo de correo.

## Cómo se gestionan las respuestas de los pacientes

Sea cual sea el mensaje que se envíe -- confirmación o recordatorio --, el paciente puede responder directamente por WhatsApp para confirmar, pedir cambiar la cita o cancelarla. QuiroFlow lee esa respuesta automáticamente y actualiza el estado de la cita; consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained) para ver qué hace cada respuesta.

Esto solo funciona si tu cuenta tiene WhatsApp conectado -- consulta la colección **Comunicaciones** para configurarlo.
