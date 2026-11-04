---
title: Recibos, facturas y rectificativas
description: Qué es cada documento, cuándo se crea cada uno y qué se puede corregir.
collection: invoices-verifactu
order: 1
---

En QuiroFlow conviven dos documentos distintos, y entender la diferencia evita casi todas las dudas de facturación. El **recibo** es el cargo: lo que el paciente debe por una visita o por algo que le vendes. La **factura** es el documento fiscal: se emite sola cada vez que entra dinero, se registra para VeriFactu y no se puede cambiar. Si te equivocas, no se borra: se corrige con una **factura rectificativa** o, si el cobro nunca debió existir, se anula.

## El recibo: lo que se debe

Un recibo se crea al cobrar una visita desde el calendario o con un [recibo rápido](/es/articles/billing-payments/the-billing-page). Mueve el saldo del paciente (lo que ves en **Debe ahora**, en su pestaña **Dinero**) y pasa a **pagado** cuando los pagos cubren su importe.

- Lleva su propio número, de una única serie (la configuras en **Ajustes › Facturación › Numeración**).
- No es un documento fiscal: los impuestos los recoge la factura de cada pago.
- Se puede anular o eliminar **solo mientras no tenga ningún pago registrado**. Si ya tiene un pago, primero hay que reembolsarlo o quitarlo.

## La factura: una por cada pago

Cada vez que registras dinero que entra, QuiroFlow emite una factura automáticamente, sin que tengas que hacer nada. Da igual desde dónde se cobre: el calendario, la pestaña **Dinero**, la página del recibo, la app del personal o un pago online del paciente.

Emiten factura:

- Registrar un pago contra un recibo.
- **Añadir crédito** (dinero a cuenta): la factura dice «Saldo a cuenta para servicios en la clínica».
- Cualquier pago de un bono, también los parciales: la factura describe la parte del bono que se ha pagado.
- El pago de una membresía.
- La venta de un producto, con el IVA del propio producto.
- Un bono regalo, **cuando se canjea** (no cuando se compra).

No emiten factura:

- Pagar con **Crédito en cuenta**: ese dinero ya se facturó cuando entró.
- **Condonar** un importe: no entra dinero.
- Lo que cobras a una mutua o aseguradora: su liquidación no es una factura.

Las facturas se numeran PREFIJO-AÑO-NÚMERO (por ejemplo **F-2026-0001**) y la numeración vuelve a 1 cada año.

### Simplificada o completa

- **Simplificada**: una visita o un pago a cuenta de hasta 400 €. No necesita el NIF del paciente.
- **Completa**: cualquier importe de más de 400 €, y **siempre** el pago de un bono o de una membresía. Necesita el NIF del destinatario (un DNI, NIE o NIF español válido).

Si a una factura completa le falta el NIF, la pestaña avisa: «N de estas necesitan el NIF del paciente…». Añádelo en los datos del paciente y las facturas ya emitidas lo muestran solas.

## Ver las facturas de un paciente

::help-video{clip="invoices--facturas-tab" caption="Las facturas de un paciente, en la pestaña Dinero"}
::

1. Abre la ficha del paciente y ve a la pestaña **Dinero**.
2. Debajo de los bonos y membresías, pulsa **Facturas y recibos**.
3. En **Facturas** tienes una línea por cada pago, con su número, su etiqueta (**simplificada**, **rectificativa**, **anulada**…), el concepto y el importe.
4. Pulsa **PDF** para abrirla o **Enviar** para mandarla por correo al paciente.

Todas las facturas de la clínica, con su IVA, están en **Informes › Facturas emitidas**, y la descarga trimestral para tu gestoría en **Informes › Gestoría**. Lo explica [Entender tus informes](/es/articles/reports/understanding-your-reports).

## Facturas a nombre del tutor

Para un paciente menor de edad, en sus datos puedes marcar **Facturas a nombre del tutor**. Desde ese momento, sus facturas llevan el nombre, la dirección y el NIF del tutor, y en la lista verás «A nombre de …». Las facturas ya emitidas siguen a nombre del paciente.

## La rectificativa y la anulación

Una factura nunca se edita ni se borra. Para corregirla:

- Si devuelves dinero al paciente, registra un **reembolso**: QuiroFlow emite sola una **factura rectificativa**, con importe negativo, en su propia serie (por ejemplo **R-2026-0001**).
- Si el pago se registró por error y no se cobró nada, quita el pago y **anula** la factura.

Los pasos están en [Reembolsos, rectificativas y anulaciones](/es/articles/invoices-verifactu/refunds-and-corrections).

> **Ten en cuenta:** el IVA de las facturas sigue una única regla para toda la cuenta (**Exento**, por defecto, o **Con IVA**), salvo los productos, que llevan siempre su propio IVA. Los precios siempre incluyen el IVA. Se configura en [Ajustes › Facturación](/es/articles/settings/billing-configuration). Si dudas de qué opción te corresponde, consúltalo con tu gestoría.

> **Ten en cuenta:** si una factura no se puede emitir (por ejemplo, por un problema de conexión), el pago queda registrado igualmente y verás el aviso «El pago se ha registrado, pero no se ha podido emitir su factura: …».
