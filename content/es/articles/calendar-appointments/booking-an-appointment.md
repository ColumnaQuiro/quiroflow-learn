---
title: Reservar una cita
description: Crea una nueva cita para un paciente existente o nuevo desde el Calendario.
collection: calendar-appointments
order: 1
---

Reservar es lo que más harás tú y tu equipo en QuiroFlow, así que está pensado para ser rápido: un solo panel, sin recargar la página, y funciona igual tanto si reservas una visita habitual como la primera cita de un paciente completamente nuevo.

::image-carousel
---
images:
  - src: /screenshots/booking-panel-new.png
    alt: Panel Create Appointment con los campos Appointment Type, Date, Time, Room, Practitioner, búsqueda de Patient, Note y Repeat
    caption: "El panel de reserva -- todo en un solo sitio"
  - src: /screenshots/calendar.png
    alt: Vista de Calendario con varias citas en distintos colores y estados
    caption: "Citas reservadas, coloreadas según el tipo de cita"
---
::

## Desde el Calendario

Haz clic en cualquier hueco libre del Calendario, o usa el botón **+ New Appointment**, para abrir el panel de reserva. Al hacer clic en un hueco se rellenan automáticamente la fecha, la hora y la sala según dónde hiciste clic -- el botón abre el mismo panel en blanco, lo cual es útil cuando ya sabes qué paciente es pero aún no la hora exacta.

Rellena:

- **Appointment Type** -- determina el color, la duración por defecto y el precio que se muestra en el calendario. Configura estos tipos con antelación en **Settings &rarr; Appointment Types** para que la lista coincida con las visitas que realmente ofreces.
- **Date** y **Time**
- **Room** y **Practitioner** -- ambos asociados a la clínica que estás viendo en ese momento. "No room" está bien si tu clínica no asigna salas concretas.
- **Patient** -- busca por nombre, teléfono o correo electrónico. Si el paciente no existe aún, selecciona **+ New Patient** y añádelo ahí mismo con nombre, apellidos, correo y teléfono -- no hace falta salir del panel para crear primero la ficha del paciente.
- **Note (Optional)** -- cualquier cosa que el personal deba saber antes de la visita (por ejemplo, "trae radiografías", "primera sesión, dejar tiempo extra"). Esto aparece en la cita para cualquiera que la abra, no solo para quien la reservó.
- **Repeat** -- para una serie recurrente (Daily, Weekly o Monthly); consulta [Citas recurrentes y bloqueo de horario](/es/articles/calendar-appointments/recurring-and-blocking-time) para ver cómo funciona.
- **Collect Payment** -- actívalo para cobrar como parte de la reserva, en lugar de facturar al finalizar la visita.

Selecciona **Create** (o el botón de envío equivalente) para guardarla. La cita aparece en el calendario inmediatamente, coloreada según su tipo de cita, y -- si las confirmaciones están activadas -- el paciente recibe un mensaje de WhatsApp o correo al momento.

## Entender el bloque del calendario

Cada bloque de cita muestra un pequeño punto de estado -- consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained) para saber qué significa cada color. Pasar el cursor sobre un bloque muestra un resumen rápido sin abrirlo; al hacer clic se abre la cita completa.

## Editar o cancelar

Haz clic en una cita existente para abrirla de nuevo. Desde ahí puedes cambiar la hora, la sala o el profesional, marcarla como registrada (checked in), completada o como no presentado (no-show), o cancelarla por completo. Si forma parte de una serie recurrente, editarla o cancelarla solo afecta a esa ocurrencia concreta -- el resto de la serie queda intacto.
