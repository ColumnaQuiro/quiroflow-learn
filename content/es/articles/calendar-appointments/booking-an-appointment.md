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

Cada bloque de cita muestra un pequeño punto de estado -- consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained) para saber qué significa cada color.

## La vista rápida

Al hacer clic en un bloque de cita se abre primero un pequeño panel emergente, antes que el editor completo -- pensado para el caso habitual de "qué es esto y cómo lo hago avanzar" sin necesidad de una pantalla de edición completa:

- Nombre del paciente, estado, hora, tipo y profesional de un vistazo.
- Un aviso de saldo si debe dinero de una visita anterior (por ejemplo, "Patient owes €55.00 -- will need to pay").
- Un campo de nota rápida para esta visita en concreto, y la **Patient note** persistente del paciente (consulta [La ficha de un paciente](/es/articles/patients/patient-records)), mostrada ahí mismo y editable directamente.
- Un registro de actividad reciente (quién la creó, qué ha cambiado).
- **Check in**, **Open chart** (te lleva directo a la ficha del paciente), y **Reschedule…**.

## El editor completo

Selecciona el pequeño icono de edición en la esquina de un bloque de cita para abrir la ventana **Edit Appointment** completa, dividida en cuatro pestañas:

::image-carousel
---
images:
  - src: /screenshots/appointment-edit-details.png
    alt: Pestaña Details de Edit Appointment con fecha, hora, duración, sala, profesional, estado y confirmación
    caption: "Details -- los mismos campos que al reservar, más Status y Confirmation"
  - src: /screenshots/appointment-edit-billing.png
    alt: Pestaña Billing de Edit Appointment con una factura, Add Service/Product y un formulario para procesar el pago
    caption: "Billing -- factura y cobra sin salir de la cita"
  - src: /screenshots/appointment-edit-history.png
    alt: Pestaña History de Edit Appointment con las visitas completadas anteriores de este paciente
    caption: "History -- las visitas anteriores de este paciente, como contexto"
  - src: /screenshots/appointment-edit-notes.png
    alt: Pestaña Notes de Edit Appointment con un campo para añadir una nota adhesiva
    caption: "Notes -- una nota adhesiva en esta cita en concreto"
---
::

- **Details** -- todo lo del panel de reserva, más **Status** (Booked, Completed, No-show, Cancelled -- consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained)) y **Confirmation**, que también puedes cambiar aquí a mano si un paciente confirma por teléfono en lugar de responder por WhatsApp.
- **Billing** -- la factura ligada a esta cita, ahí mismo: añádele un servicio o producto, consulta el total y el saldo pendiente, y cobra (importe + método) sin salir de la cita ni ir a la pestaña Billing del propio paciente. Un aviso te recuerda cuando no hay ninguna cita futura reservada, que es justo lo que hace que un paciente entre en [Recalls](/es/articles/patients/recalls).
- **History** -- una lista rápida de las citas anteriores de este paciente (fecha, tipo, profesional, estado), para ver el patrón de sus visitas sin abrir su ficha completa.
- **Notes** -- una nota adhesiva en esta cita en concreto. Es distinta de la **Patient note** general del paciente (persistente, sobre el paciente) y de las [Notas de visita](/es/articles/patients/visit-notes) (notas clínicas ligadas a una visita concreta) -- piénsalo como un recordatorio de corta duración para quien gestione esta cita en particular.

Tanto desde la vista rápida como desde la pestaña Details puedes cambiar la hora, la sala o el profesional, marcarla como registrada (checked in), completada o como no presentado (no-show), o cancelarla por completo. Si forma parte de una serie recurrente, editarla o cancelarla solo afecta a esa ocurrencia concreta -- el resto de la serie queda intacto.
