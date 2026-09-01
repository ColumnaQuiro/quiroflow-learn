---
title: Vender un bono a un paciente
description: Vende un paquete de sesiones prepagado y registra cómo se ha pagado.
collection: billing-payments
order: 1
---

Los paquetes -- también llamados *bonos* -- permiten a un paciente pagar por adelantado un número determinado de sesiones a un precio fijo. Configura primero tus plantillas de bono en **Settings &rarr; Packages**.

## Vender uno

En la pestaña **Billing** de un paciente, busca la sección **Packages / bonos**:

1. Elige el bono en el desplegable **Sell a package…** -- muestra el número de sesiones y el precio.
2. Introduce **Paid now (€)** -- la cantidad realmente cobrada hoy. Puede ser menor que el precio total si el paciente paga a plazos.
3. Si paga en el momento, elige el **Method**: Cash, Card, o Credit on account (solo aparece si el paciente tiene saldo a favor disponible).
4. Selecciona **Sell**.

![Pestaña Billing mostrando la sección Packages / bonos con un bono "10-Session Wellness Package" comprado y el desplegable "Sell a package…"](/screenshots/patient-billing.png)

El bono aparece en la lista del paciente mostrando las sesiones usadas y restantes, y se puede registrar contra futuras visitas.

## Pagos parciales y autopay

Si la cantidad pagada es menor que el precio total, el resto queda pendiente. Añadir una tarjeta al paciente (consulta [Añadir la tarjeta de un paciente](/es/articles/billing-payments/adding-a-patients-card)) permite activar el cobro automático (autopay) para lo que queda pendiente, de modo que QuiroFlow lo cobra automáticamente según un calendario en lugar de tener que reclamarlo manualmente.
