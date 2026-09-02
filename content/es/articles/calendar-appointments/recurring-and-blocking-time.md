---
title: Citas recurrentes y bloqueo de horario
description: Reserva una serie de citas de una vez, o bloquea el tiempo en que un profesional, una sala o toda la clínica no está disponible.
collection: calendar-appointments
order: 5
---

## Citas recurrentes

Al reservar una cita, el campo **Repeat** crea una serie en lugar de una única visita: Daily, Weekly o Monthly, generando 8 repeticiones de una vez.

![Panel de nueva cita con Repeat configurado como "Weekly (8 occurrences)"](/screenshots/new-appointment-repeat.png)

Está limitado a 8 de forma intencionada, en lugar de ser indefinido -- una serie acotada es más fácil de revisar, editar o cancelar, y que una serie se agote es un buen momento natural para comprobar si el paciente sigue necesitando el mismo horario antes de reservar el siguiente lote.

Cada repetición es una cita independiente después de crearse -- editar o cancelar una no afecta a las demás de la serie.

## Bloquear horario

Selecciona **Block time** en el Calendario para marcar un periodo de tiempo como no disponible -- las vacaciones de un profesional, una sala en mantenimiento, o toda la clínica cerrada un día.

![Modal Block Time con Practitioner, Room (Whole clinic), rango de fechas y un campo Note](/screenshots/block-time-modal.png)

- **Practitioner** y **Room** -- bloquea un profesional concreto, una sala concreta, o elige **Whole clinic** para bloquear todo a la vez.
- **Start date** / **End date** -- el rango que se bloquea.
- **Whole day** -- marca esta casilla para un bloqueo de todo el día (vacaciones, cierres); déjala sin marcar para establecer un **Start time** / **End time** concretos en su lugar (una pausa para comer, medio día).
- **Note** -- texto libre para tu propia referencia (por ejemplo, "mantenimiento", "vacaciones").

Un bloqueo impide que se reserven citas nuevas en ese horario -- tanto por el personal como a través de las reservas online -- pero no afecta a las citas que ya estuvieran reservadas ahí, así que revisa el calendario antes de bloquear sobre un periodo que ya tenga actividad.
