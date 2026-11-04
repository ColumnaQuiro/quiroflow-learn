---
title: Ingresos y pagos, y Rendimiento de ingresos
description: Qué cuenta cada cifra de Ingresos y pagos (facturado, pagado, pendiente) y cómo comparar a los profesionales mes a mes.
collection: reports
order: 2
---

**Ingresos y pagos** responde a tres preguntas: cuánto se ha facturado, cuánto ha entrado de verdad y cuánto falta por cobrar. Lo encuentras en **Informes › Financiero**. Su compañero, **Rendimiento de ingresos** (en Crecimiento y rendimiento), pone los ingresos de cada profesional mes a mes para compararlos.

::help-video{clip="reports--income" caption="Ingresos y pagos del mes pasado, filtrado por un profesional"}
::

## Ver los ingresos de un periodo

1. Ve a **Informes** y abre **Ingresos y pagos**.
2. Elige el periodo (por defecto **Este mes**) y, si quieres, un profesional o una clínica.
3. Lee las tres cifras de arriba y baja a los desgloses.
4. Pulsa **Descargar PDF** para guardarlo.

## Qué cuenta cada cifra

**Total facturado** es la suma de los recibos creados en el periodo: las visitas cobradas o por cobrar, los recibos rápidos, las ventas de productos, las membresías… También cuentan los recibos de las sesiones de bono, a su precio por sesión. **No cuenta** los recibos anulados. Recuerda que un recibo no es una factura: ver [Recibos y facturas](/es/articles/invoices-verifactu/receipts-and-invoices).

**Total pagado** es el dinero que ha entrado en el periodo, por la fecha en que se cobró, sea cual sea el recibo que paga (también si es de un mes anterior). Incluye:

- los pagos de visitas, recibos y productos;
- lo cobrado por bonos y membresías;
- el dinero que un paciente deja a cuenta (**Añadir crédito**);
- un bono regalo, el día en que se canjea en la ficha de un paciente (no el día en que se compró online).

Los **reembolsos** se restan. **No cuenta**:

- lo que se paga con **Crédito en cuenta**: ese dinero ya se contó el día en que el paciente lo dejó a cuenta. Debajo de las cifras verás una nota del tipo «Además X € se liquidó con crédito en cuenta…» para que no desaparezca sin explicación;
- lo condonado (**Condonar**, que en otras pantallas se llama **Baja contable**): saldar una deuda sin cobrarla no es dinero que entra;
- los pagos de un recibo que luego se anuló.

**Pendiente** es lo que falta por cobrar de los recibos creados en el periodo que aún no están pagados. Es decir: de lo que se facturó en estas fechas, cuánto no ha entrado todavía. No incluye deudas de meses anteriores ni lo que se debe de bonos (eso está en [Deudores](/es/articles/reports/debtors-and-memberships)). Por eso **Total facturado** menos **Total pagado** no tiene por qué dar el **Pendiente**: el pagado incluye cobros de recibos antiguos y de bonos, que no tienen recibo en este periodo.

## Los desgloses

- **Ingresos por mes**: el **Total pagado**, mes a mes, en una línea.
- **Por método de pago**: lo pagado según cómo se cobró (Efectivo, Tarjeta, Bizum…), con los nombres que tienes en Ajustes › Pagos.
- **Por profesional**: lo pagado según de quién es el dinero. Si el cobro es de una visita, cuenta para el profesional de esa visita. Si no hay visita detrás (un bono, dinero a cuenta, un recibo rápido), cuenta para el profesional asignado al paciente en su ficha. Si el paciente no tiene profesional, sale como **Sin asignar**.
- **Por servicio**: qué se ha cobrado. Reparte los recibos que se han pagado en el periodo según su contenido: el servicio o producto, el bono del que salió la sesión, o el tipo de cita de la visita. Cuenta el importe completo de cada línea, también si se pagó con crédito, porque una sesión pagada con el saldo sigue siendo una sesión hecha. Lo que no se puede identificar sale como **Sin identificar**. Las ventas de bonos en sí no aparecen aquí, porque no tienen recibo.

> **Ten en cuenta:** al filtrar por un profesional, el dinero que no se puede atribuir a nadie (sin visita y sin profesional en el paciente) no entra en las cifras, y una nota lo dice: «Más X € en este periodo que ningún filtro puede atribuir…». Así el total filtrado sigue cuadrando con el de toda la clínica.

> **Ten en cuenta:** un bono vendido por un profesional a un paciente de otro cuenta para el profesional del paciente. Es una atribución, no un registro de quién hizo la venta. Para lo que vende cada persona, mira [Comisiones](/es/articles/reports/commissions).

## Comparar profesionales con Rendimiento de ingresos

**Rendimiento de ingresos** dibuja una línea por profesional con lo cobrado cada mes (**Ingresos por profesional, por mes**) y, debajo, el **Total del periodo** de cada uno. Usa exactamente las mismas reglas que el **Total pagado**: cuenta el dinero que ha entrado, resta los reembolsos y deja fuera el crédito y lo condonado.

::help-video{clip="reports--income-performance" caption="Comparar a los profesionales mes a mes"}
::

1. Abre **Informes › Rendimiento de ingresos**.
2. Elige un periodo de varios meses con **Rango personalizado**, para que se vean varios puntos por línea.
3. Pasa el ratón por la gráfica para ver la cifra de cada profesional en cada mes.

> **Ten en cuenta:** los meses salen por la fecha del cobro, no por la de la visita. Una visita de finales de mes pagada el día 2 cuenta en el mes siguiente.
