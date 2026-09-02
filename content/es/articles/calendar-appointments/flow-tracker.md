---
title: Seguir a los pacientes durante su visita (Flow Tracker)
description: Mueve a un paciente por Arrived, In Session y Awaiting Checkout a medida que avanza por la clínica.
collection: calendar-appointments
order: 4
---

El Flow Tracker es un flujo independiente y limitado al día de hoy, distinto del estado de confirmación de una cita -- trata de en qué punto físico de su visita está un paciente *hoy*, no de si respondió a un mensaje de WhatsApp. Aparece como un panel en el Calendario, junto a la agenda del día.

![Calendario con el panel Flow Tracker mostrando un paciente en cada etapa: Arrived, In Session y Awaiting Checkout](/screenshots/calendar-flow-tracker.png)

## Las tres etapas

1. **Arrived** -- el paciente ha registrado su llegada (checked in). Esto ocurre en el momento en que el personal marca una cita como registrada (el mismo check-in que se usa en el resto de la app); es el punto de entrada al Flow Tracker.
2. **In Session** -- el paciente está con el profesional. Selecciona la flecha **&rarr;** junto a su nombre en Arrived para moverlo aquí.
3. **Awaiting Checkout** -- la visita en sí ha terminado y el paciente está terminando en recepción (pago, reservar su próxima visita). Selecciona **&rarr;** desde In Session para moverlo aquí.

Desde Awaiting Checkout, selecciona **Complete** para marcar la cita como completada -- el mismo estado que se usa en el resto de QuiroFlow (informes, historial de visitas del paciente, planes de tratamiento).

## Por qué es útil

De un vistazo, recepción y los profesionales pueden ver exactamente quién está esperando, a quién se está atendiendo ahora mismo, y quién todavía necesita hacer el checkout -- sin tener que acercarse a preguntar ni abrir cada cita individualmente. Está limitado solo a hoy; no hay forma (ni necesidad) de hacer seguimiento de flujo en una fecha pasada o futura.

## Desactivarlo

Si tu clínica no usa este nivel de seguimiento, desactiva **Flow tracker** en el panel de configuración **Display** del Calendario -- el panel desaparece y las citas se comportan exactamente igual que sin él (el check-in sigue funcionando de la misma forma).
