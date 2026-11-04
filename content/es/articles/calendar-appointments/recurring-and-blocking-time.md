---
title: Citas recurrentes, bloqueos y ausencias
description: Reserva una serie de citas de una vez, bloquea un horario en el que no se puede reservar, o reparte las citas de un profesional que falta de repente.
collection: calendar-appointments
order: 5
---

Tres herramientas para cuando una cita suelta no basta. **Repetir** reserva varias citas de golpe para un paciente que viene con regularidad. **Bloquear horario** marca un tramo en el que no se puede reservar. Y **Ausencia imprevista** bloquea la agenda de un profesional que falta y, a la vez, pasa sus citas a un compañero o las cancela.

## Reservar una serie de citas

::help-video{clip="calendar--book-series" caption="Reservar las visitas que quedan de un plan de cuidados en una sola reserva"}
::

1. Empieza una reserva como siempre (consulta [Reservar una cita](/es/articles/calendar-appointments/booking-an-appointment)) con la fecha y la hora de la primera cita.
2. Abre **Más opciones** y elige en **Repetir**:
   - **Diariamente (8 repeticiones)**, **Semanalmente (8 repeticiones)** o **Mensualmente (8 repeticiones)**;
   - o **Seguir plan de cuidados**, si el paciente tiene un plan activo. Indica cuántas sesiones quedan y su frecuencia, y reserva hasta 26 citas siguiendo el ritmo del plan.
3. Pulsa **Reservar**.

Antes de guardar nada, QuiroFlow comprueba todas las fechas. Si alguna no cabe, verás "N de M fechas no caben", con el motivo de cada una (con quién choca, o **Fuera de horario**), y tres opciones:

- **Saltarlas y reservar las otras**, que reserva solo las que caben;
- **Reservar todas igualmente**, solapando las que chocan;
- **Volver**, para cambiar la hora o el profesional.

No se guarda nada (ni siquiera un paciente nuevo) hasta que eliges.

> **Ten en cuenta:** **Diariamente** se salta los días en que el profesional no trabaja y aun así reserva 8 citas.

> **Ten en cuenta:** el paciente recibe un solo mensaje de confirmación con todas las fechas, no uno por cita.

> **Ten en cuenta:** si la serie sigue un plan de cuidados, las visitas de revisión del plan se reservan con el tipo de cita que pide el plan.

## Bloquear un horario

::help-video{clip="calendar--block-time" caption="Bloquear la hora de comer de un profesional"}
::

1. Pulsa **Bloquear horario** en la barra del calendario. (Desde una reserva, **Bloquear este horario en su lugar…** hace lo mismo.)
2. Elige el **Profesional** (**Todos los profesionales** si no es para nadie en concreto) y la **Sala** (**Toda la clínica** si no es para una sala).
3. Pon la **Fecha de inicio** y la **Fecha de fin**. Marca **Todo el día**, o desmárcalo y pon **Hora de inicio** y **Hora de fin**.
4. Añade una **Nota** si quieres (por ejemplo "Comida" o "Formación").
5. Pulsa **Guardar**.

El tramo aparece en gris en el calendario: **Bloqueado para** el profesional, **Bloqueado (toda la clínica)** o **Bloqueado**. Ese tiempo ya no se ofrece en la reserva online, ni a la lista de espera, ni por la recepcionista IA.

Para cambiar o quitar un bloqueo, haz clic en él: se abre **Editar bloqueo**, con **Eliminar bloqueo**.

> **Ten en cuenta:** bloquear no mueve ni cancela las citas que ya hay. Si el tramo tiene citas, QuiroFlow te las enseña ("Ya hay N citas reservadas en este horario") y el botón pasa a **Bloquear igualmente**. Si lo que pasa es que un profesional falta, usa **Ausencia imprevista**.

> **Ten en cuenta:** un bloqueo sin profesional ni sala cierra toda la clínica. El bloqueo de un profesional le sigue a todas las sedes en las que trabaja, y se ve en su pestaña y en **Toda la clínica**, no en las de sus compañeros.

Para cerrar días completos (festivos, vacaciones de la clínica) es más cómodo usar los cierres de la sede: consulta [Festivos y cierres](/es/articles/settings/holidays-and-closures).

## Cuando un profesional falta de repente

::help-video{clip="calendar--unplanned-absence" caption="Ausencia imprevista: bloquear la agenda y pasar las citas a un compañero"}
::

1. Pulsa **Ausencia imprevista** en la barra del calendario.
2. En **Quién falta** elige al profesional, y pon **Desde** y **Hasta**.
3. Verás sus citas de esos días, todas marcadas. Desmarca las que quieras dejar como están.
4. En **Qué hacer con ellas**, elige:
   - **Pasarlas a un compañero, donde esté libre**, y el compañero en **Elige compañero…**;
   - o **Cancelarlas y avisar a los pacientes**. Debajo verás si tus automatizaciones de "cita cancelada" les avisan o, si no hay ninguna, que tendrás sus teléfonos para llamarles.
5. Pulsa **Bloquear y mover** o **Bloquear y cancelar**.

El resultado dice "Agenda bloqueada.", cuántas se movieron y cuántas se cancelaron. Las que no se pudieron tocar aparecen en "Se quedaron como estaban — resuélvelas a mano:" con el motivo (por ejemplo, "el compañero está ocupado a esa hora"). Si cancelaste, se listan con su teléfono. Pulsa **Hecho** para cerrar.

> **Ten en cuenta:** la agenda del profesional se bloquea primero, en todas las sedes donde tenía citas, con la nota "Ausencia imprevista". Una cita solo pasa al compañero si este está libre a esa hora. No se ofrece nada a la lista de espera ni se cobra ninguna tarifa.

> **Ten en cuenta:** las plazas en clases en grupo no se tocan: gestiona la clase desde su propio panel.

Si la ausencia se conoce con antelación (una baja, unas vacaciones), regístrala en la ficha del profesional: consulta [Ausencias del equipo](/es/articles/team-roles/absences). Desde ahí, y desde las vacaciones aprobadas en el [Registro de jornada](/es/articles/team-roles/working-time-log), se abre este mismo diálogo ya rellenado para mover o cancelar sus citas.
