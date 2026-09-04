---
title: Turnos de caja (Cash Shift)
description: Concilia el efectivo físico de tu caja con lo que ha registrado QuiroFlow.
collection: billing-payments
order: 4
---

Si tu recepción cobra en efectivo, **Cash Shift** (en la barra de herramientas del Calendario) es cómo conciliar lo que hay físicamente en la caja con lo que QuiroFlow ha registrado -- sin esto, el efectivo es el único método de pago sin un registro independiente con el que contrastarlo.

::image-carousel
---
images:
  - src: /screenshots/cash-shift-modal.png
    alt: Panel de Cash Shift mostrando totales facturados y cobrados, un desglose de caja, y un formulario para registrar entradas o salidas de efectivo
    caption: "El turno de hoy -- totales cobrados y el desglose de caja"
---
::

## Cómo funciona un turno

Un turno corre automáticamente desde las 00:00 y pasa al día siguiente por sí solo -- no hay ningún paso de "iniciar turno" que recordar. Selecciona **Cash Shift** en cualquier momento del día para ver cómo va todo hasta ahora:

- **Invoiced this shift** -- el valor total de las facturas creadas hoy, en todos los métodos de pago.
- **Total collected** -- lo que realmente se ha cobrado hoy, que puede ser menos que lo facturado si algunas facturas de hoy siguen pendientes.
- **Cash** -- solo la parte en efectivo de lo cobrado.

## El desglose de la caja

- **Cash payments** -- efectivo cobrado específicamente de pagos de pacientes.
- **Cash in** -- cualquier otro efectivo añadido a la caja (por ejemplo, un fondo inicial).
- **Cash out** -- efectivo retirado (un ingreso al banco, caja chica, cambio entregado por un motivo que no es un pago).
- **Expected in drawer** -- el total acumulado que QuiroFlow espera que haya físicamente, combinando los tres anteriores.

Usa el formulario **Type / Amount / Note** para registrar una entrada o salida de efectivo en el momento en que ocurre -- un ingreso al banco a mediodía, por ejemplo -- para que el total esperado siga siendo correcto durante el resto del turno, en lugar de solo cuadrar al abrir y al cerrar.

## Cerrar un turno

No hace falta cerrar un turno para que pase al día siguiente -- lo hace solo, automáticamente. Usa **Close Shift** únicamente si quieres dejar una nota de cierre de día (una explicación de una descuadre, una nota de traspaso para quien abra la caja al día siguiente) asociada al registro de ese día en concreto.

## Cuando los números no cuadran

Si el efectivo físico de la caja no coincide con **Expected in drawer**, registra la diferencia como un **Cash out** (si falta dinero) o un **Cash in** (si sobra) con una nota explicando el motivo, en lugar de dejarlo sin conciliar -- así el descuadre queda visible y fechado, en vez de simplemente no cuadrar en silencio la próxima vez que alguien lo revise.
