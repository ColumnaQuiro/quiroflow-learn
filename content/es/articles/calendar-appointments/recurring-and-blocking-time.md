---
title: Citas recurrentes y bloqueo de horario
description: Reserva una serie de citas de golpe, o bloquea un tramo horario en el que un profesional, sala o toda la clínica no está disponible.
collection: calendar-appointments
order: 5
---

Dos herramientas relacionadas pero distintas: **Repeat** crea varias citas a la vez para un paciente que viene de forma regular; **Block time** hace lo contrario, marcando un tramo de tiempo como no disponible para que no se pueda reservar nada ahí.

::image-carousel
---
images:
  - src: /screenshots/new-appointment-repeat.png
    alt: Panel de nueva cita con Repeat configurado como "Weekly (8 occurrences)"
    caption: "Reservar una serie recurrente"
  - src: /screenshots/block-time-modal.png
    alt: Modal Block Time con Practitioner, Room (Whole clinic), rango de fechas y un campo Note
    caption: "O bloquear tiempo en su lugar"
---
::

## Citas recurrentes

Al reservar una cita, el campo **Repeat** crea una serie en lugar de una única visita: Daily, Weekly o Monthly, generando cada una 8 ocurrencias de golpe.

Está limitado a 8 de forma deliberada, en lugar de ser indefinido -- una serie acotada es predecible de revisar, editar o cancelar, y que una serie se acabe es un momento natural para comprobar si el paciente sigue necesitando el mismo horario antes de reservar el siguiente lote. También evita que el calendario se vaya llenando en silencio con meses de antelación con visitas que quizá no lleguen a ocurrir.

Cada ocurrencia es luego una cita independiente -- editar o cancelar una no afecta a las demás de la serie. Si un paciente necesita saltarse solo una semana, abre esa ocurrencia concreta y cancélala; el resto de la serie queda intacto.

## Bloquear horario

Selecciona **Block time** en el Calendario para marcar un tramo de tiempo como no disponible -- las vacaciones de un profesional, una sala en mantenimiento, o toda la clínica cerrada un día.

- **Practitioner** y **Room** -- bloquea un profesional concreto, una sala concreta, o elige **Whole clinic** para bloquear todo a la vez. Bloquear un profesional sin sala (o al revés) solo elimina la disponibilidad de ese recurso -- las demás salas o profesionales siguen siendo reservables.
- **Start date** / **End date** -- el rango que se bloquea. Un bloqueo puede abarcar varios días de una vez, útil para vacaciones o bajas prolongadas.
- **Whole day** -- marca esta casilla para un bloqueo de día completo (vacaciones, cierres); déjala sin marcar para establecer en su lugar una **Start time** / **End time** concretas (una pausa para comer, medio día, una formación).
- **Note** -- texto libre para tu propia referencia (por ejemplo, "mantenimiento", "vacaciones", "congreso"). Esto aparece cuando alguien pasa el cursor sobre el bloqueo o lo abre más adelante, así que merece la pena ser específico.

Un bloqueo impide que se reserven nuevas citas en ese tramo -- tanto por el personal como a través de la reserva online -- pero no afecta a las citas ya reservadas ahí, así que revisa bien el calendario antes de bloquear sobre un periodo ya ocupado. Si bloqueas por error sobre citas existentes, se quedan en el calendario con normalidad; tendrás que reprogramarlas o cancelarlas por separado.

Para eliminar un bloqueo, ábrelo igual que abrirías una cita y elimínalo -- el horario vuelve a estar disponible de inmediato.
