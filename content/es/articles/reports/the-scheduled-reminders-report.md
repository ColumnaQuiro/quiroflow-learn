---
title: El informe Scheduled Reminders
description: Ve quién ha confirmado, quién no ha respondido, y quién quiere reprogramar.
collection: reports
order: 2
---

Ve a **Reports &rarr; Scheduled Reminders**. Este informe solo cuenta citas a las que se les envió un mensaje de confirmación o recordatorio -- necesita tener configurado el webhook de respuestas de WhatsApp (consulta [Conectar WhatsApp](/es/articles/communications/connecting-whatsapp)), y si no está configurado, los contadores aquí se quedarán en cero aunque los mensajes se sigan enviando.

![Informe Scheduled Reminders con estadísticas de entrega de WhatsApp y los contadores Confirmed / Pending / Wants to reschedule](/screenshots/reports-scheduled-reminders.png)

## Qué muestra

**WhatsApp delivery status**, para el rango de fechas seleccionado:

- **Sent** -- mensajes que QuiroFlow intentó enviar.
- **Delivered** -- confirmados como entregados por WhatsApp.
- **Read** -- el paciente abrió el mensaje.
- **Failed** -- no llegó a enviarse. Un contador de Failed distinto de cero merece investigarse enseguida -- suele significar un número inválido, un paciente que ha bloqueado el número de tu negocio, o un problema con tu propia conexión de WhatsApp (consulta [Conectar WhatsApp](/es/articles/communications/connecting-whatsapp)).

**Appointment confirmations**, desglosado en tres contadores:

- **Confirmed** -- pacientes que respondieron confirmando su cita.
- **Pending** -- se envió un mensaje y todavía no hay respuesta (o la respuesta no fue un confirmar/reprogramar/cancelar claro).
- **Wants to reschedule** -- pacientes que respondieron pidiendo cambiar su cita en lugar de confirmarla.

Al seleccionar un contador se abre la lista de citas detrás de él, y el nombre de cada paciente enlaza directamente a su ficha -- así que pasar de "12 pending" a llamar realmente a esos 12 pacientes son un par de clics, no un cruce manual contra el calendario.

## Cambiar el rango de fechas

El selector de fechas de arriba (por defecto **This month**) controla a la vez tanto las estadísticas de entrega como los contadores de confirmación -- no hay forma de ver uno con un rango distinto al otro. Acótalo a un solo día cuando estés revisando específicamente las citas de mañana, o amplíalo para detectar un problema de entrega que se ha ido acumulando durante una semana o más.

## Usarlo en el día a día

Es la forma más rápida de ver quién realmente necesita una llamada de seguimiento antes de su visita, en lugar de recorrer todo el Calendario buscando puntos ámbar o morados -- consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained) para ver qué significan esos colores en el propio calendario. Muchas clínicas revisan esto cada mañana como parte de la apertura: cualquiera que siga en Pending para una cita del mismo día es una llamada rápida que vale la pena.
