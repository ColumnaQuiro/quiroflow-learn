---
title: Transacciones del día
description: Todos los cobros y reembolsos de un día, por método, para cuadrar la caja al cerrar.
collection: reports
order: 3
---

**Transacciones del día** lista todo lo que se ha cobrado y devuelto en un día concreto, con la hora, el paciente y el método. Está pensado para el cierre: comparas el **Neto cobrado** y lo de cada método con lo que hay en el cajón y con lo que dice el datáfono. Lo encuentras en **Informes › Financiero**.

::help-video{clip="reports--daily-transactions" caption="Repasar los cobros de ayer y de hoy"}
::

## Cuadrar la caja de un día

1. Abre **Informes › Transacciones del día**. Se abre en el día de hoy.
2. Para ver otro día, usa las flechas **Día anterior** y **Día siguiente**, o escribe la fecha. **Hoy** te devuelve al día actual.
3. Si quieres, filtra por un profesional o una clínica.
4. Compara las tarjetas de arriba con la caja: **Neto cobrado** es el total, y al lado tienes una tarjeta por método (Efectivo, Tarjeta, Bizum…).
5. Pulsa **Descargar PDF** si quieres guardar el cierre.

## Qué cuenta y qué no

**Neto cobrado** es el dinero que ha entrado ese día: pagos de visitas, de bonos, de membresías, de productos y dinero dejado a cuenta. Los **reembolsos** salen en rojo, con la etiqueta **reembolso**, y se restan.

Lo que **no es dinero que entra** se lista en la tabla pero no se suma:

- Lo pagado con **Crédito en cuenta** aparece en su propia tarjeta, **Crédito aplicado**, con la nota «No es dinero que entra hoy». Ese dinero ya se contó el día en que el paciente lo dejó a cuenta.
- Lo condonado sale en la tabla con el método **Baja contable**, pero no entra en el **Neto cobrado**.
- Los pagos de un recibo anulado no aparecen.

## Las columnas de la tabla

- **Hora**, **Paciente** (pulsa el nombre para abrir su ficha) e **Importe**.
- **Recibo**: el número del recibo que paga. Un guion (—) significa que el cobro no paga ningún recibo concreto, como la venta de un bono o dinero a cuenta.
- **Concepto**: para qué era el dinero: **Visita**, **Bono**, **Membresía** o **A cuenta**. Ayuda a distinguir dos cobros iguales del mismo paciente: ¿es un cobro doble o una visita más un pago adelantado?
- **Profesional**: el de la visita; si no hay visita, el profesional asignado al paciente; si no tiene, **Sin asignar**. Es la misma regla que [Ingresos y pagos](/es/articles/reports/income-and-payments).
- **Método**: cómo se cobró, con los nombres de Ajustes › Pagos.

> **Ten en cuenta:** el día va de las 00:00 a las 23:59 del día elegido, según la hora a la que se registró el cobro. Un pago registrado al día siguiente sale en el día siguiente, aunque la visita fuera la víspera.

> **Ten en cuenta:** para abrir y cerrar la caja con un recuento de efectivo, usa el **Turno de caja** del calendario: ver [Turno de caja](/es/articles/billing-payments/cash-shift).
