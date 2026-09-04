---
title: Vender y gestionar membresías
description: Planes recurrentes, facturados cada período, con cobro automático en cuanto hay una tarjeta guardada.
collection: billing-payments
order: 5
---

Una membresía es un plan recurrente que un paciente paga según un calendario -- un plan mensual de mantenimiento, por ejemplo -- en lugar de un número fijo de sesiones prepagadas como un [bono](/es/articles/billing-payments/selling-a-package-bono). Configura primero tus plantillas de membresía en **Settings &rarr; Memberships**, dando a cada una un nombre y un precio por período.

::image-carousel
---
images:
  - src: /screenshots/patient-membership-activate.png
    alt: Panel de Memberships con un plan seleccionado, la cantidad Paid now, y Method en Cash
    caption: "Activar una membresía -- el mismo patrón que vender un bono"
  - src: /screenshots/patient-membership-active.png
    alt: Tarjeta de membresía activa mostrando el plan, precio por período, fecha de inicio, estado, y los controles Log payment / Log failed
    caption: "Una vez activa -- estado, y cómo se paga cada período"
---
::

## Activar una

En la pestaña **Billing** de un paciente, busca la tarjeta **Memberships**:

1. Elige el plan en el desplegable.
2. Ajusta **Paid now (€)** si el cobro de este período es distinto del precio de la plantilla.
3. Elige el **Method**: Cash, Card, o Credit on account.
4. Selecciona **Activate**.

La tarjeta de la membresía muestra entonces el nombre del plan, el precio por período, la fecha en que empezó, y una etiqueta de estado.

## Mantenerla pagada cada período

Activar una membresía no configura por sí sola el cobro recurrente automático -- fíjate en el aviso **No card on file -- add one to enable autopay for this membership** que aparece nada más activarla. Sin una tarjeta guardada, tú (o el paciente) tenéis que pagar cada período manualmente, y **Log payment** registra que ha ocurrido. **Log failed** registra lo contrario -- útil para mantener un historial preciso si un período se pasa por alto o se paga tarde, en lugar de que el registro simplemente tenga un hueco en silencio.

Añade una tarjeta (consulta [Añadir la tarjeta de un paciente](/es/articles/billing-payments/adding-a-patients-card)) para pasar a cobro automático -- QuiroFlow entonces la cobra automáticamente cada período, el mismo mecanismo que usan los bonos para el cobro automático de su saldo pendiente.

## Cambiar el estado

El desplegable de estado junto al nombre del plan no se limita a **active** -- úsalo para pausar o cancelar una membresía sin eliminar su registro, de modo que el historial de en qué estuvo el paciente (y durante cuánto tiempo) se conserve incluso después de que termine.

## Dónde aparecen las membresías en los informes

**Reports &rarr; Memberships** lo resume a nivel de cuenta: número de membresías activas, ingresos recurrentes mensuales, y cualquier pago fallido -- revísalo periódicamente aunque no estés gestionando membresías individuales cada día, ya que un pago fallido ahí normalmente solo significa que la tarjeta de un paciente ha caducado y necesita actualizarse.
