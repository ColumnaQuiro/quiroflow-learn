---
title: Deudores y Membresías
description: Quién debe dinero de un bono, cuánto exactamente, y cómo van las membresías activas y sus pagos.
collection: reports
order: 4
---

Dos informes de **Informes › Financiero** para el dinero que se cobra por adelantado o cada mes. **Deudores** te dice quién tiene un bono sin pagar del todo y cuánto le falta. **Membresías** cuenta las membresías activas, lo cobrado este mes y los pagos que han fallado. Los dos son de toda la clínica: no se filtran por profesional y no los ven los roles con **Solo sus propios datos**.

## Deudores: quién debe un bono

::help-video{clip="reports--debtors" caption="Ver lo que falta por cobrar de los bonos y abrir la ficha de un deudor"}
::

1. Abre **Informes › Deudores**.
2. Arriba ves el **Total pendiente** y en cuántas compras se reparte.
3. En la tabla, cada fila es un bono: **Paciente**, **Paquete**, **Comprado** (la fecha de la venta), **Importe adeudado** y **Estado**.
4. Pulsa el nombre del paciente para ir a su ficha y cobrar lo que falta desde la pestaña **Dinero** (ver [Vender un bono](/es/articles/billing-payments/selling-a-package-bono)).

**Qué cuenta.** El **Importe adeudado** es lo que falta de verdad: el precio del bono menos lo que ya se ha pagado por él. Un bono de 400 € del que se pagaron 150 € aparece con 250 €, no con 400 €. El **Total pendiente** suma esos importes.

**El estado.** **sin recibo** es un bono vendido sin pagar del todo. **cobro de stripe fallido** es un bono con pago automático cuyo último cargo ha fallado. Un bono que tiene su propio recibo de venta muestra el estado de ese recibo, en inglés (*unpaid* quiere decir sin pagar).

**Qué no cuenta.**
- Los bonos que se están cobrando solos con pago automático y van al día: no son una deuda mientras los cargos funcionen.
- Las visitas sin pagar. Esas deudas están en **Facturación**, con el filtro **Impagadas**, y en la ficha de cada paciente.
- No tiene periodo: enseña lo que se debe hoy, sin importar cuándo se vendió el bono.

> **Ten en cuenta:** si un bono se vendió por error y no se va a cobrar, corrígelo en la ficha del paciente; mientras siga con importe pendiente, saldrá aquí.

## Membresías: activas, cobradas y fallidas

::help-video{clip="reports--memberships" caption="El informe de Membresías"}
::

1. Abre **Informes › Membresías**.
2. Lee las tres cifras de arriba y repasa la tabla.
3. Pulsa un paciente para abrir su ficha.

**Membresías activas** es cuántas membresías están ahora mismo en estado activo. No cuenta las pausadas ni las canceladas.

**Ingresos este mes (pagado)** suma los pagos de membresía del mes en curso marcados como pagados. El informe junta los pagos que se registran a mano en la tarjeta de la membresía (**Registrar pago**) y los cobros automáticos con tarjeta de Stripe, como indica su nota: «Combina pagos manuales y cobro automático de Stripe.».

**Pagos fallidos (histórico)** cuenta todos los pagos fallidos desde el principio, tanto los marcados con **Registrar fallo** como los cargos automáticos rechazados. Un número en rojo suele ser una tarjeta caducada: avisa al paciente y guarda la nueva.

La tabla lista cada membresía con su **Plan**, su **Estado**, la fecha de **Inicio** y el **Último pago** (la fecha del periodo y si se pagó o falló).

> **Ten en cuenta:** el cobro que se hace al dar de alta la membresía en la ficha cuenta en [Ingresos y pagos](/es/articles/reports/income-and-payments), pero no en **Ingresos este mes (pagado)** de este informe, que solo suma los pagos mensuales. Para saber cuánto dinero ha entrado en total, usa Ingresos y pagos.

> **Ten en cuenta:** el estado y el último pago aparecen con palabras en inglés (*active*, *paused*, *cancelled*, *paid*, *failed*). Significan activa, pausada, cancelada, pagado y fallido.

Para dar de alta, pausar o cobrar una membresía, ver [Membresías](/es/articles/billing-payments/memberships).
