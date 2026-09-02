---
title: Seguimiento de pacientes durante su visita (Flow Tracker)
description: Mueve a un paciente por Arrived, In Session y Awaiting Checkout mientras avanza por la clínica.
collection: calendar-appointments
order: 4
---

El Flow Tracker es un flujo independiente del mismo día, distinto del estado de confirmación de una cita -- trata de dónde está físicamente un paciente en su visita *hoy*, no de si respondió a un mensaje de WhatsApp. Aparece como un panel en el Calendario, junto a la agenda del día, y es más útil en clínicas con más de un profesional o con una recepción muy activa, donde "quién está esperando" no es obvio a simple vista.

![Calendario con el panel Flow Tracker mostrando un paciente en cada etapa: Arrived, In Session y Awaiting Checkout](/screenshots/calendar-flow-tracker.png)

## Las tres etapas

1. **Arrived** -- el paciente ha registrado su entrada. Esto ocurre en el momento en que el personal marca una cita como registrada (el mismo check-in que se usa en el resto de la aplicación); es el punto de entrada al Flow Tracker. Un paciente que aún no ha registrado su entrada no aparece aquí en absoluto, aunque ya haya pasado la hora de su cita.
2. **In Session** -- el paciente está con el profesional. Selecciona la flecha **&rarr;** junto a su nombre en Arrived para moverlo aquí. Este paso es puramente informativo -- mover a alguien a In Session no inicia ningún temporizador ni afecta a la facturación.
3. **Awaiting Checkout** -- la visita en sí ha terminado y el paciente está terminando en recepción (pago, reservar su próxima visita). Selecciona **&rarr;** desde In Session para moverlo aquí.

Desde Awaiting Checkout, selecciona **Complete** para marcar la cita como completada -- el mismo estado que se usa en el resto de QuiroFlow (informes, historial de visitas del paciente, planes de tratamiento). También es posible mover a un paciente hacia atrás (de In Session de vuelta a Arrived, por ejemplo) si alguien lo avanzó por error.

## Por qué es útil

De un vistazo, recepción y los profesionales pueden ver exactamente quién está esperando, a quién están atendiendo ahora mismo y quién todavía tiene que pasar por recepción al terminar -- sin tener que ir a preguntar o abrir cada cita una por una. En una clínica con varios profesionales, esto sustituye muchísimas idas y venidas del tipo "¿Michael sigue con el quiropráctico?".

Está limitado al día de hoy; no hay necesidad (ni forma) de hacer seguimiento de una fecha pasada o futura. Si la visita de un paciente cruza la medianoche en algún caso poco habitual, o sigue en Awaiting Checkout cuando cambia el día, márcalo como completado antes de que cambie la fecha para que el tracker se mantenga preciso.

## Modo privacidad

El panel **Display** del Calendario también tiene un interruptor de **Privacy mode**, independiente del Flow Tracker -- al activarlo se ocultan los nombres de los pacientes en toda la vista del calendario (útil si tu pantalla es visible para otros pacientes en una sala de espera), mientras que el propio panel del Flow Tracker sigue mostrando quién está en cada etapa para el personal que necesita esa visibilidad. Los dos interruptores son independientes, así que puedes usar el Flow Tracker con o sin el modo privacidad según cómo esté organizada tu recepción.

## Desactivarlo

Si tu clínica no necesita este nivel de seguimiento -- una clínica de un solo profesional a menudo no lo necesita -- desactiva **Flow tracker** en el panel de configuración **Display** del Calendario. El panel desaparece y las citas se comportan exactamente igual que sin él; el check-in sigue funcionando de la misma forma, simplemente no aparecerá en una vista de seguimiento separada.
