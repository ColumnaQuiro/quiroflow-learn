---
title: Vender un bono a un paciente
description: Vende un paquete de sesiones prepagado y registra cómo se ha pagado.
collection: billing-payments
order: 1
---

Los paquetes -- también llamados *bonos* -- permiten a un paciente pagar por adelantado un número determinado de sesiones a un precio fijo. Configura primero tus plantillas de bono en **Settings &rarr; Packages**, con el número de sesiones y el precio de cada una.

::image-carousel
---
images:
  - src: /screenshots/sell-package-filled.png
    alt: Sección Packages / bonos con un bono elegido en el desplegable, la cantidad de Paid now y el Method establecido en Cash
    caption: "Elige el bono, indica cuánto se está pagando ahora"
  - src: /screenshots/patient-billing.png
    alt: Pestaña Billing mostrando la sección Packages / bonos con un bono "10-Session Wellness Package" comprado y el desplegable "Sell a package…"
    caption: "Una vez vendido, muestra las sesiones usadas y restantes"
---
::

## Vender uno

En la pestaña **Billing** de un paciente, busca la sección **Packages / bonos**:

1. Elige el bono en el desplegable **Sell a package…** -- muestra el número de sesiones y el precio.
2. Introduce **Paid now (€)** -- la cantidad realmente cobrada hoy. Por defecto aparece el precio completo, pero puedes reducirlo si el paciente paga a plazos o deja una señal.
3. Elige el **Method**: Cash, Card, o Credit on account (solo aparece si el paciente tiene saldo a favor disponible).
4. Selecciona **Sell**.

El bono aparece de inmediato en la lista **Packages / bonos** del paciente, mostrando el número completo de sesiones como disponible para usar -- todas las sesiones quedan desbloqueadas en cuanto se vende el bono, sin importar cuánto del precio se haya pagado realmente. Se crea una factura por la cantidad que se introdujo en **Paid now**, y se marca como pagada de inmediato por ese importe.

## Pagos parciales y autopay

Si **Paid now** es menor que el precio completo del bono, la diferencia no se registra automáticamente como una factura pendiente aparte que haya que reclamar -- QuiroFlow no avisa al paciente ni lo marca como pendiente por sí solo. La forma práctica de cobrar el resto es:

1. Añade una tarjeta al paciente (consulta [Añadir la tarjeta de un paciente](/es/articles/billing-payments/adding-a-patients-card)).
2. Una vez que hay una tarjeta registrada, la línea del bono en **Packages / bonos** ofrece programar el saldo restante mediante Stripe autopay -- QuiroFlow cobra entonces la tarjeta automáticamente según el calendario que definas, en lugar de tener que reclamar el saldo manualmente.

Si prefieres no usar autopay, también puedes volver más adelante y registrar otro pago del paciente de la misma forma (mediante **Add credit** o un nuevo cobro), simplemente sin que quede vinculado a una cifra concreta de "cuánto se debe de este bono" -- lleva tu propia nota de lo pendiente si no vas a usar tarjeta y autopay para ello.

## Registrar una sesión

Cada vez que el paciente viene y usa una sesión de su bono, selecciona **Log session** junto al bono para descontar una del total restante. Esto es independiente de marcar la cita como Completed -- haz ambas cosas para que el saldo del bono y el historial de visitas se mantengan sincronizados.
