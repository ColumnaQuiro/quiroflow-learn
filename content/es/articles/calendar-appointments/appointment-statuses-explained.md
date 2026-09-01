---
title: Estados de las citas explicados
description: Qué significa cada punto de color en un bloque del calendario, y cómo cambia.
collection: calendar-appointments
order: 2
---

Cada bloque de cita en el Calendario muestra un pequeño punto de color que indica su estado. Al pasar el cursor sobre un bloque se ve el estado completo en texto.

| Estado | Color | Significado |
| --- | --- | --- |
| Booked | Azul | Programada, sin respuesta de confirmación todavía y sin recordatorio enviado. |
| Unconfirmed | Ámbar | Se envió un mensaje de confirmación o recordatorio, y el paciente aún no ha respondido. |
| Confirmed | Verde | El paciente respondió confirmando la cita. |
| Wants to reschedule | Morado | El paciente respondió pidiendo cambiar la cita, en lugar de confirmarla. |
| Completed | Verde | La visita tuvo lugar. |
| No-show | Rojo | El paciente no acudió y no se marcó como cancelada de antemano. |
| Cancelled | Gris | La cita fue cancelada. |

![Calendario mostrando citas con estados Booked, Confirmed, Wants to reschedule y Missed, junto con la leyenda de estados](/screenshots/calendar.png)

## Cómo se establecen Confirmed / Wants to reschedule / Unconfirmed

Si has configurado [confirmaciones y recordatorios automáticos](/es/articles/calendar-appointments/setting-up-confirmations-and-reminders), QuiroFlow envía al paciente un mensaje de WhatsApp pidiéndole que confirme. Cuando responde:

- Algo como "Confirmar", "Sí" u "Ok" &rarr; la cita pasa a **Confirmed**.
- Algo como "Cambiar cita" o que mencione querer cambiar la hora &rarr; pasa a **Wants to reschedule**, para que el personal sepa que debe contactar en lugar de dar por hecho que está confirmada.
- Algo como "Cancelar" &rarr; se cancela la cita en sí.

Si la respuesta no encaja claramente en ninguna de estas categorías, la cita se queda como **Unconfirmed**, y merece la pena echar un vistazo a la conversación en la **Inbox**.

## Cambiar un estado manualmente

Booked, Completed, No-show y Cancelled se pueden establecer directamente por el personal abriendo la cita. Confirmed y Wants to reschedule dependen de la respuesta del propio paciente y no están pensados para establecerse a mano.
