---
title: Políticas de programación
description: Las tarifas por reprogramar, cancelar o no presentarse, y los motivos que se eligen al mover una cita.
collection: settings
order: 5
---

**Ajustes › Políticas de programación** decide qué se le puede cobrar a un paciente cuando cambia una cita y qué motivos da el equipo al moverla. Se configura una vez y casi no se vuelve a tocar. Necesitas el permiso de configuración de la clínica.

## Tarifas por cambios y cancelaciones

::help-video{clip="calendar--policies-fees" caption="Activar la tarifa de reprogramación y añadir un motivo"}
::

En **Ajustes › Políticas de programación**, la sección **Tarifas** tiene tres tarifas. Cada una tiene un interruptor y un importe; apagada pone **No se ofrece**.

- **Reprogramación**: se ofrece al mover una cita arrastrándola o con **Mover…**, en el diálogo **Cambiar fecha de la cita**.
- **Cancelación**: se ofrece al cancelar, para añadirla al saldo del paciente o cobrarla a su tarjeta guardada.
- **Cita perdida**: se ofrece al marcar una cita como **No vino**.

1. Activa la tarifa que quieras y escribe el importe en euros.
2. Pulsa **Guardar tarifas**.

Las tarifas "se ofrecen, nunca se cobran solas": cada vez, quien mueve, cancela o marca la cita decide si aplicarla. Cómo se ve al hacerlo está en [Mover y cancelar citas](/es/articles/calendar-appointments/moving-and-cancelling).

**Pedir tarjeta al reservar online** hace que, nada más reservar online, el paciente guarde una tarjeta en la página de Stripe (sin cobrarle nada), para poder cobrarle estas tarifas. La página de reservas lo avisa antes de reservar. Necesita los pagos online configurados en **Ajustes › Pagos**: consulta [Conectar Stripe](/es/articles/settings/connecting-stripe).

> **Ten en cuenta:** la tarifa de reprogramación solo se ofrece al arrastrar o al usar **Mover…**. Si cambias la hora con **Cambiar** en el panel de la cita, no se ofrece.

## Motivos de reprogramación

En la misma página, **Motivos de reprogramación** es la lista de motivos que se eligen al mover una cita (por ejemplo "Petición del paciente" o "Profesional de baja").

1. Escribe el motivo en "Añade un motivo, ej. Profesional de baja" y pulsa **Añadir**.
2. Cada motivo muestra cuántas veces se ha usado. Puedes renombrarlo o eliminarlo.

Al eliminar un motivo, las citas que ya se movieron con él conservan el cambio; simplemente quedan sin motivo.

## Otros ajustes que afectan al calendario

- Los horarios de apertura, la zona horaria, la franja del calendario y los festivos se configuran en cada clínica: consulta [Gestionar clínicas](/es/articles/settings/managing-clinics) y [Festivos y cierres](/es/articles/settings/holidays-and-closures).
- Las salas, que son las columnas del calendario: [Salas](/es/articles/settings/rooms).
- Los horarios de cada profesional: [Horario laboral de un profesional](/es/articles/team-roles/practitioner-working-hours).
- Los tipos de cita, sus duraciones, precios y clases en grupo: [Tipos de cita y servicios](/es/articles/settings/appointment-types-and-services).
- Cuándo se ofrece un hueco a la lista de espera: [La lista de espera](/es/articles/calendar-appointments/waitlist).
