---
title: Configurar la reserva online
description: Deja que los pacientes reserven sus propias citas, y consigue tu enlace público de reserva.
collection: online-booking
order: 1
---

La reserva online permite a los pacientes reservar directamente, sin llamar ni escribir a tu clínica -- funciona contra la misma disponibilidad en tiempo real que ve tu equipo en el Calendario, así que no hay riesgo de que ofrezca un hueco que en realidad ya está ocupado.

## Activarla

Hay dos interruptores, y ambos tienen que estar activados antes de que un tipo de cita concreto sea reservable online:

1. **Per clinic** -- el horario y la disponibilidad se gestionan en **Settings &rarr; Online Booking &rarr; Clinics & Hours**, que es lo que consulta la reserva online.
2. **Per appointment type** -- en **Settings &rarr; Appointment Types**, cada tipo tiene su propio interruptor **online booking enabled**, más un interruptor separado de **online payment required** si quieres cobrar (o pedir una señal) en el momento de la reserva.

Incluso con ambos activados, un tipo se puede acotar aún más en **Bookable Entities** -- restringido solo a pacientes nuevos o solo a existentes, por ejemplo -- consulta [Personalizar tu página de reservas](/es/articles/online-booking/customizing-the-booking-page).

## Configuración General

![Pestaña General de la configuración de reserva online con la ventana máxima de reserva y el enlace público de reserva](/screenshots/settings-online-booking-general.png)

- **Maximum future booking time** -- cuántos días de antelación pueden reservar los pacientes online (90 por defecto). Se puede sobrescribir por tipo de cita en Bookable Entities si algunas visitas deberían abrirse con más o menos antelación que otras.
- **Google Tag Manager** -- un ID de contenedor GTM opcional, que se inyecta en la página pública de reservas si quieres seguimiento de conversiones en las reservas completadas sin que QuiroFlow necesite conocer los detalles de tu analítica.
- **Patient referral URL** -- a dónde redirige un enlace de paciente referido, si haces seguimiento de referidos por separado de las [fuentes de referencia](/es/articles/settings/settings-overview) propias de QuiroFlow.
- **Public booking link** -- la URL independiente de tu página de reservas. Cópiala para compartirla directamente, o insértala en tu propia web.
- **Booking notifications** -- recibe un aviso en cuanto un paciente reserva online, por correo, WhatsApp, o ambos. La notificación de WhatsApp solo se entrega como mensaje libre dentro de las 24 horas desde que ese número escribió por última vez al WhatsApp de tu clínica -- escríbele de vez en cuando para mantener las notificaciones activas, o configura una plantilla de notificación al personal en **Settings &rarr; WhatsApp** para enviar también fuera de esa ventana.

## Lo que ven los pacientes

Eligen un tipo de cita, eligen un profesional (a menos que hayas configurado ese tipo para saltarse la selección de profesional), y luego una fecha y hora de disponibilidad real -- consulta [Personalizar tu página de reservas](/es/articles/online-booking/customizing-the-booking-page) para ver las opciones que dan forma a esta experiencia.

## Probarlo tú mismo

Antes de compartir tu enlace de reserva ampliamente, ábrelo tú mismo (en una ventana privada/incógnito, para no estar conectado como personal) y completa una reserva entera como lo haría un paciente. Es la forma más rápida de detectar un tipo de cita mal configurado o un texto confuso antes de que le pase a un paciente real.
