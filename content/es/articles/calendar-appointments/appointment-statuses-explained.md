---
title: Estados de las citas explicados
description: Qué significa cada punto de color en un bloque del calendario, y cómo cambia.
collection: calendar-appointments
order: 2
---

Cada bloque de cita en el Calendario muestra un pequeño punto de color que indica su estado. Pasar el cursor sobre un bloque muestra el estado completo en texto, así que nunca tienes que memorizar los colores -- son una forma rápida de revisar de un vistazo un día ajetreado, no la única manera de ver el estado.

![Calendario mostrando citas con estados Booked, Confirmed, Wants to reschedule y Missed, junto con la leyenda de estados](/screenshots/calendar.png)

| Estado | Color | Significado |
| --- | --- | --- |
| Booked | Azul | Programada, sin respuesta de confirmación todavía y sin recordatorio enviado. |
| Unconfirmed | Ámbar | Se envió un mensaje de confirmación o recordatorio, y el paciente aún no ha respondido. |
| Confirmed | Verde | El paciente respondió confirmando la cita. |
| Wants to reschedule | Morado | El paciente respondió pidiendo cambiar la cita, en lugar de confirmarla. |
| Completed | Verde | La visita tuvo lugar. |
| No-show | Rojo | El paciente no vino y no se marcó como cancelada de antemano. |
| Cancelled | Gris | La cita se canceló. |

El panel **Status Key** del Calendario (en el menú lateral, debajo del mini calendario) muestra esta misma leyenda de un vistazo, para que los nuevos miembros del equipo no tengan que volver a este artículo una vez que se la aprenden.

## Cómo se establecen Confirmed / Wants to reschedule / Unconfirmed

Si has configurado las [confirmaciones y recordatorios automáticos](/es/articles/calendar-appointments/setting-up-confirmations-and-reminders), QuiroFlow envía al paciente un mensaje de WhatsApp pidiéndole que confirme. Cuando responde:

- Algo como "Confirmar", "Sí" u "Ok" &rarr; la cita pasa a **Confirmed**.
- Algo como "Cambiar cita" o que mencione querer cambiar la hora &rarr; pasa a **Wants to reschedule**, para que el personal sepa que debe contactar en lugar de asumir que está reservada.
- Algo como "Cancelar" &rarr; la cita se cancela directamente.

Si la respuesta no coincide claramente con ninguna de estas, la cita se queda en **Unconfirmed** y merece la pena echar un vistazo rápido a la conversación en el **Inbox** -- puede que el paciente haya respondido con algo que QuiroFlow no pudo interpretar automáticamente (una pregunta, una errata, una nota de voz), y es fácil pasarlo por alto si solo miras el calendario.

Ten en cuenta que **Booked** y **Unconfirmed** parecen similares en intención (ninguno tiene aún una respuesta positiva) pero significan cosas distintas: Booked significa que todavía no se ha enviado ningún mensaje (o que las confirmaciones están desactivadas), mientras que Unconfirmed significa que *sí* se envió un mensaje y QuiroFlow sigue esperando respuesta.

## Cambiar un estado manualmente

Booked, Completed, No-show y Cancelled pueden establecerse directamente por el personal abriendo la cita -- útil cuando un paciente confirma por teléfono o en persona en lugar de responder por WhatsApp. Confirmed y Wants to reschedule dependen de la propia respuesta del paciente y no están pensados para establecerse a mano; si un paciente confirma verbalmente, el equivalente práctico es dejarla como Booked (o marcarla como Completed cuando ocurra la visita) en lugar de intentar forzarla a Confirmed.

## Por qué importa esto en tu día a día

Los estados no son solo decorativos -- determinan qué aparece en otras partes de QuiroFlow:

- Los **Reports** cuentan las visitas Completed y No-show por separado al calcular las tasas de asistencia.
- El **Flow Tracker** (consulta [Seguimiento de pacientes durante su visita](/es/articles/calendar-appointments/flow-tracker)) es un flujo independiente del mismo día -- no lee ni cambia estos estados, pero el Completed de ahí es el mismo estado subyacente que el Completed de aquí.
- Un bloque de citas **Unconfirmed** cerca de su horario suele ser la señal de alerta más clara de un día que está a punto de tener huecos -- merece la pena revisarlo cada mañana.
