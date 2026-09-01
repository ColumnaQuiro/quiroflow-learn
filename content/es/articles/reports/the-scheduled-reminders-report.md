---
title: El informe Scheduled Reminders
description: Ve quién ha confirmado, quién no ha respondido y quién quiere cambiar la cita.
collection: reports
order: 2
---

Ve a **Reports &rarr; Scheduled Reminders**. Este informe solo cuenta las citas a las que se les envió un mensaje de confirmación o recordatorio -- necesita tener configurado el webhook de respuestas de WhatsApp (consulta [Conectar WhatsApp](/es/articles/communications/connecting-whatsapp)).

## Qué muestra

- **Mensajes de WhatsApp** enviados en el rango de fechas seleccionado, con su estado de entrega.
- **Confirmed** -- pacientes que respondieron confirmando su cita.
- **Pending** -- se envió un mensaje y todavía no hay respuesta (o la respuesta no fue un confirmar/cambiar/cancelar claro).
- **Wants to reschedule** -- pacientes que respondieron pidiendo cambiar su cita en lugar de confirmarla.

![Informe Scheduled Reminders con las estadísticas de entrega de WhatsApp y los contadores Confirmed / Pending / Wants to reschedule](/screenshots/reports-scheduled-reminders.png)

Cada nombre enlaza directamente a la ficha de ese paciente.

## Cómo usarlo en el día a día

Esta es la forma más rápida de ver quién realmente necesita una llamada de seguimiento antes de su visita, en lugar de recorrer todo el Calendario buscando puntos ámbar o morados -- consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained) para saber qué significan esos puntos en el propio calendario.
