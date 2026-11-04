---
title: Reembolsos, rectificativas y anulaciones
description: Cómo devolver dinero, corregir un pago mal registrado y anular una factura emitida por error.
collection: invoices-verifactu
order: 2
---

Una factura emitida no se puede editar ni borrar: es un registro fiscal encadenado para VeriFactu. Lo que sí puedes hacer es corregirla de la forma correcta según lo que haya pasado. Si **devolviste dinero** al paciente, registras un reembolso y QuiroFlow emite sola la factura rectificativa. Si el pago **nunca existió** (lo apuntaste por error), quitas el pago y anulas su factura. Y si solo te equivocaste de **método de pago**, lo cambias sin tocar nada más.

Todo se hace desde la pestaña **Dinero** del paciente, en **Libro de cuenta** y **Facturas y recibos**.

Necesitas el permiso **Corregir cobros ya hechos** en la opción **Siempre**. Para quitar un pago, cambiar su método o anular una factura necesitas además **Registrar pagos y llevar la caja**.

## Reembolsar un pago

::help-video{clip="invoices--refund" caption="Reembolsar un pago y ver su rectificativa"}
::

1. En la pestaña **Dinero**, abre **Libro de cuenta**.
2. En la fila del recibo, abre su menú y pulsa **Reembolsar…** (devuelve el recibo entero). En la fila de un pago, **Reembolsar…** devuelve solo ese pago. También puedes empezar desde la página del recibo, con **Reembolsar…**.
3. Escribe el **Importe (€)**. No puede pasar de lo pagado.
4. Elige en **Reembolsado vía** cómo devolviste el dinero.
5. Si el recibo incluía productos, indica en **Vuelve al stock (unidades)** cuántos vuelven a la estantería (0 si están abiertos o rotos).
6. Opcionalmente, añade un **Motivo**.
7. Pulsa **Reembolso**.

QuiroFlow apunta el reembolso en el libro de cuenta y reduce el saldo del paciente, y emite automáticamente una **factura rectificativa**: un documento con importe negativo, en su propia serie (por ejemplo **R-2026-0001**), con el mismo IVA que la factura original. La verás en **Facturas y recibos** con la etiqueta **rectificativa**.

> **Ten en cuenta:** QuiroFlow **no devuelve el dinero** por ti. Registrar un reembolso no llama a Stripe ni al banco: haz la devolución real (en efectivo, por transferencia, desde Stripe…) por tu cuenta.

## Quitar un pago apuntado por error

Si registraste un pago que no se cobró (le diste dos veces, era otro paciente…), quítalo en lugar de reembolsarlo.

1. En **Libro de cuenta**, en la fila del pago, pulsa **Eliminar pago**.
2. Lee el aviso: el recibo vuelve a quedar pendiente y no se devuelve ningún dinero. Si ese pago ya tenía factura, el aviso te dice su número: la factura sigue en la serie fiscal, marcada como sin pago asociado.
3. Confirma.

Después, anula esa factura como se explica a continuación.

## Anular una factura emitida por error

::help-video{clip="invoices--annul" caption="Quitar un pago apuntado por error y anular su factura"}
::

Solo se puede anular una factura cuyo pago ya has quitado. En la lista aparece con la etiqueta **pago eliminado**.

1. En la pestaña **Dinero**, abre **Facturas y recibos**.
2. En la factura marcada **pago eliminado**, pulsa **Anular**.
3. Elige cómo anularla:
   - **Anularla (recomendado)**: la factura no debió emitirse. Se envía a la AEAT un registro de anulación y el número queda en la serie, marcado como anulado.
   - **Emitir una rectificativa**: se emite una factura rectificativa que la anula, como documento propio en la serie R.
4. Escribe el motivo. Con la anulación se guarda con la factura; con la rectificativa aparece impreso en ella.
5. Pulsa **Anular factura** o **Emitir rectificativa**.

La factura queda marcada como **anulada**.

> **Ten en cuenta:** anula solo cuando no se cobró nada. Si llegaste a cobrar y luego devolviste el dinero, registra un reembolso: así queda constancia de que el dinero entró y salió.

## Cambiar el método de un pago

Si apuntaste un pago en efectivo que era con tarjeta, no hace falta quitarlo:

1. En **Libro de cuenta**, en la fila del pago, pulsa **Cambiar método…**.
2. Elige el método correcto en **Pagado con**.
3. Pulsa **Guardar**.

El importe, la fecha y el recibo no cambian, y el cambio queda registrado con tu nombre.

## Anular o eliminar un recibo

Un recibo (no la factura) se puede anular o eliminar **solo si no tiene pagos**. En la página del recibo, **Anular recibo** queda desactivado mientras haya un pago; en el libro de cuenta, **Eliminar** te avisa de que el recibo tiene pagos registrados. Reembolsa o quita esos pagos primero.

Para saldar un recibo sin cobrarlo (por ejemplo, una deuda pequeña que perdonas), usa **Condonar**, que se explica en [Saldo a favor, condonar y extracto](/es/articles/billing-payments/credit-and-statements).

> **Ten en cuenta:** QuiroFlow aplica estas reglas tal y como las espera VeriFactu, pero no sustituye a tu asesor. Si tienes dudas sobre cómo corregir una operación concreta, consúltalo con tu gestoría.
