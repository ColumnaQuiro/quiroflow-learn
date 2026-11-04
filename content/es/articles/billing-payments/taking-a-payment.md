---
title: Cobrar una visita y registrar pagos
description: Cobra una visita desde el calendario o registra un pago desde la ficha del paciente, también dividido entre dos métodos.
collection: billing-payments
order: 2
---

Cobrar en QuiroFlow tiene dos pasos que casi siempre van juntos: se crea el **recibo** (lo que se debe) y se registra el **pago** (el dinero que entra). Lo normal es hacer las dos cosas a la vez desde la cita, en el calendario. Si el paciente paga más tarde, o paga algo pendiente de otro día, registras el pago desde su pestaña **Dinero**. Cada pago emite su factura automáticamente; lo explica [Recibos, facturas y rectificativas](/es/articles/invoices-verifactu/receipts-and-invoices).

Necesitas el permiso **Cobrar y hacer recibos** para cobrar citas, y **Registrar pagos y llevar la caja** para registrar pagos.

## Cobrar una visita desde el calendario

::help-video{clip="billing--charge-visit" caption="Cobrar una visita desde su cita en el calendario"}
::

1. En el calendario, abre la cita y ve a la pestaña **Cobro**. (Desde el seguimiento de pacientes, **Cobrar** te lleva directamente a ella.)
2. Mientras no se ha cobrado, verás **Sin cobrar** con el tipo de cita y su precio. Pulsa **Cobrar** (el botón muestra el precio, por ejemplo **Cobrar 45,00 €**). Se crea el recibo.
3. Si hace falta, añade más cosas con **-- Añadir servicio/producto --**.
4. Comprueba el **Importe (€)** y elige el **Método**. Si paga con dos métodos, pulsa **Dividir en otro método**.
5. Pulsa **Procesar**. El recibo queda pagado y se emite su factura.
6. Si quieres, pulsa **Enviar recibo** para mandarlo por correo.

Si el paciente tiene un bono, en lugar de cobrar verás un botón **Usar** por cada bono, con lo que vale la sesión (por ejemplo **Usar Bono 10 sesiones — 38,00 €**), y el cobro normal pasa a decir **… en su lugar**. Lo explica [Bonos: venderlos, cobrarlos y usarlos](/es/articles/billing-payments/selling-a-package-bono).

> **Ten en cuenta:** una cita que todavía no ha ocurrido no se puede cobrar: verás «Esta cita todavía no ha ocurrido: no habrá recibo hasta entonces».

## La pestaña Dinero del paciente

En la ficha de cada paciente, la pestaña **Dinero** reúne todo lo que tiene que ver con su dinero. Arriba hay tres tarjetas:

- **Debe ahora**: lo que tiene pendiente, con sus recibos. Desde aquí registras un pago o vendes un producto.
- **En cuenta**: su saldo a favor, separado en **Crédito** y **En bonos**. Desde aquí añades crédito o canjeas un bono regalo.
- **Cómo paga**: si tiene una tarjeta guardada para los cobros automáticos.

Debajo están sus **Bonos**, sus **Membresías** y, si trabajas con mutuas, sus coberturas en **Terceros**. Al final, **Libro de cuenta** muestra cada movimiento con su saldo, y **Facturas y recibos** sus documentos.

Necesitas el permiso **Ver el historial de cobros** para ver esta pestaña.

## Registrar un pago desde la ficha

::help-video{clip="billing--split-payment" caption="Registrar un pago dividido entre efectivo y tarjeta"}
::

1. En la pestaña **Dinero**, en **Debe ahora**, pulsa **Registrar pago**.
2. En **Recibo**, elige el recibo que paga. Viene seleccionado el más antiguo, con su importe pendiente.
3. Ajusta el **Importe (€)** si paga solo una parte, y elige el **Método**.
4. Si paga con dos métodos (una parte en efectivo y otra con tarjeta, por ejemplo), pulsa **Dividir en otro método** y rellena la segunda línea. **Total:** te muestra la suma.
5. Pulsa **Registrar pago**.

El recibo pasa a pagado cuando los pagos cubren su importe; si no, queda pendiente por la diferencia y puedes volver a registrar otro pago más tarde. Cada línea de pago emite su propia factura.

Si el paciente no debe nada, verás «No hay recibos pendientes contra los que registrar un pago».

## Pagar con el saldo a favor

Si el paciente tiene crédito, en **Método** aparece **Crédito en cuenta** con lo que tiene disponible. Solo puedes usar hasta ese importe. Pagar con crédito no emite una factura nueva, porque ese dinero ya se facturó cuando entró. Más en [Saldo a favor, condonar y extracto](/es/articles/billing-payments/credit-and-statements).

> **Ten en cuenta:** el método **Tarjeta** solo apunta que cobraste con tu propio datáfono. QuiroFlow no cobra la tarjeta en ese momento. Los cobros automáticos con una tarjeta guardada se explican en [Tarjeta guardada, pago automático y pago online](/es/articles/billing-payments/adding-a-patients-card).

> **Ten en cuenta:** los métodos que aparecen en **Método** se configuran en **Ajustes › Pagos**. Lo explica [Métodos de pago y Stripe](/es/articles/settings/connecting-stripe).
