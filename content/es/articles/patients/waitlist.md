---
title: La lista de espera (Waitlist)
description: Guarda el hueco de un paciente para un tipo de cita o profesional concreto, y ofréceselo automáticamente en cuanto quede libre.
collection: patients
order: 6
---

**Waitlist** es la situación opuesta a [Recalls](/es/articles/patients/recalls) -- no un paciente atrasado al que hay que localizar, sino uno que quiere activamente una cita ya mismo y sencillamente no hay ningún hueco disponible todavía.

::image-carousel
---
images:
  - src: /screenshots/waitlist-add-modal.png
    alt: Panel de Add to waitlist con los campos Patient search, Appointment type y Practitioner
    caption: "Añade un paciente indicando qué está esperando"
---
::

## Añadir a alguien a la lista de espera

Selecciona **+ Add to waitlist** y rellena:

- **Patient** -- busca por nombre, igual que en cualquier otra parte de QuiroFlow.
- **Appointment type** -- la visita que está esperando, o **Any type** si es flexible.
- **Practitioner** -- una persona concreta, o **Any practitioner** si solo quiere el hueco más próximo, sea quien sea quien le atienda.

Cuanto más concretos sean los criterios, más probable es que espere más tiempo -- un paciente esperando la cancelación de un profesional en concreto normalmente esperará más que uno abierto a cualquiera.

## Cómo se ofrece un hueco

Cuando se cancela una cita que coincide, QuiroFlow ofrece automáticamente el hueco a la entrada que lleva más tiempo esperando que cumpla esos criterios, con un enlace que puede usar para reclamarlo. No hace falta revisar la lista de espera manualmente cada vez que se libera algo -- ocurre solo, en el momento en que una cancelación coincide con los criterios de una entrada.

## Leer la lista

- **Wants** -- los criterios de tipo de cita y profesional de esa entrada.
- **Status** -- en qué punto está: esperando, con un hueco ofrecido, o (una vez reclamado) prácticamente resuelto.
- **Offered slot** -- si se ha ofrecido un hueco, cuál y cuándo.
- **Waiting since** -- cuánto tiempo lleva en la lista, que es también lo que determina el orden en que se ofrecen los huecos.

Desmarca **Show only waiting / offered** si quieres ver el historial completo, incluidas las entradas que ya se reclamaron o caducaron, en lugar de solo las que están activas ahora mismo.

## Waitlist frente a Recalls

Es fácil confundir ambas cosas porque las dos tratan de pacientes sin cita reservada, pero atienden a momentos distintos:

- **Recalls** es para pacientes que, según su propio patrón de visitas, *deberían* volver pero no lo han hecho -- QuiroFlow te los señala para que tu equipo los contacte.
- **Waitlist** es para pacientes que *ya te han dicho* que quieren entrar en cuanto sea posible -- QuiroFlow hace el contacto automáticamente, en el momento en que existe un hueco.

Un paciente puede estar razonablemente en ambas listas a la vez -- atrasado para un recordatorio, y a la vez esperando la próxima disponibilidad de un profesional concreto.
