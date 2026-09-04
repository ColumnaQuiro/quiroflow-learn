---
title: Tipos de cita, servicios y productos
description: Qué ofreces, qué vendes, y para qué se usa cada lista.
collection: settings
order: 4
---

Bajo **Settings** hay tres catálogos relacionados pero distintos, y es fácil confundirlos porque todos incluyen un nombre y un precio. Cada uno alimenta una parte diferente de QuiroFlow.

::image-carousel
---
images:
  - src: /screenshots/settings-appointment-types.png
    alt: Tabla de Appointment Types con columnas de color, duración, precio por defecto, stage, reserva online y pago online
    caption: "Appointment Types -- lo que se puede reservar en el calendario"
  - src: /screenshots/settings-services.png
    alt: Tabla de Services & Products usada por las facturas rápidas y la facturación de citas
    caption: "Services & Products -- lo que se puede facturar"
---
::

## Appointment Types

**Settings &rarr; Appointment Types** define lo que aparece al reservar en el Calendario. Cada uno tiene:

- **Color** -- cómo se muestra en el calendario, para que los distintos tipos de visita se distingan de un vistazo.
- **Duration** -- la duración por defecto del hueco que reserva.
- **Default price** -- se muestra en el bloque del calendario y se usa como precio de partida al facturar esa visita.
- **Stage** -- clasifica el tipo (Adjustment, Revision / check-up, Report / exam findings, First visit, First visit (offer), Maintenance package, o Not classified). Esto es lo que alimenta las cifras de primeras visitas, revisiones y conversión del informe **Statistics** -- un tipo de cita que se deja como **Not classified** no se contará correctamente ahí, así que merece la pena definirlo a propósito en lugar de dejar el valor por defecto.
- **Online Booking** -- si los pacientes pueden reservar este tipo por sí mismos; consulta [Configurar la reserva online](/es/articles/online-booking/setting-up-online-booking).
- **Online Payment** -- si se requiere pago (o una señal) en el momento de reservar online.
- **Overrides** -- define una duración o precio distinto para un profesional concreto en este mismo tipo de cita, cuando las sesiones de un profesional realmente duran más (o tienen otro precio) que el valor por defecto del tipo.

Esta lista es también la base sobre la que se construye **Bookable Entities** en la configuración de Online Booking -- ahí es donde defines reglas específicas de reserva (quién puede reservarlo, con cuánta antelación, importe de la señal) para un tipo que ya se ha creado y activado aquí. Consulta [Personalizar tu página de reservas](/es/articles/online-booking/customizing-the-booking-page).

## Services & Products

**Settings &rarr; Services & Products** es un catálogo aparte que usan las facturas rápidas y la facturación de citas -- no el calendario. Cada entrada tiene un nombre, un precio y un tipo de IVA. Recurre a esto cuando factures algo que no está ligado a un hueco reservable en el calendario (un producto vendido en recepción, un cargo puntual añadido a una factura junto a una visita).

## Bonos y Memberships

Los otros dos catálogos de "qué vendes" -- **Packages / Bonos** y **Memberships** -- tienen su propio artículo dedicado, ya que vender uno es un proceso que merece explicarse por separado: consulta [Vender un bono a un paciente](/es/articles/billing-payments/selling-a-package-bono) y [Vender y gestionar membresías](/es/articles/billing-payments/memberships).

## Cuál usar

Como regla general: si necesita un hueco en el calendario, es un **Appointment Type**. Si se factura sin reservar tiempo (un producto, un cargo puntual), es un **Service o Product**. Si un paciente paga por adelantado varias visitas futuras de una vez, es un **Package**. Si paga según un calendario recurrente independientemente del número de visitas, es una **Membership**.
