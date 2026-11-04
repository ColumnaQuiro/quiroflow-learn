---
title: Facturas emitidas y Gestoría
description: El libro de facturas de un periodo con su IVA, y la descarga trimestral para la gestoría con el libro registro, el resumen de IVA y los cobros.
collection: reports
order: 6
---

Dos informes de **Informes › Datos** para la parte fiscal. **Facturas emitidas** lista todas las facturas de un periodo con su base, su IVA y su total, y las descarga en CSV. **Gestoría** prepara de una vez lo que tu gestoría te pide cada trimestre: el libro registro de facturas expedidas, el resumen de IVA y los cobros, y si las quieren, las facturas en PDF.

Aquí solo cuentan las **facturas**, no los recibos. QuiroFlow emite una factura por cada pago que entra (no por cada visita), y una rectificativa por cada reembolso. Si no tienes clara la diferencia, lee primero [Recibos y facturas](/es/articles/invoices-verifactu/receipts-and-invoices).

## Facturas emitidas

::help-video{clip="reports--facturas" caption="Revisar las facturas del mes pasado y descargar el CSV"}
::

1. Abre **Informes › Facturas emitidas**.
2. Elige el periodo (por defecto **Este mes**).
3. Arriba ves cuatro cifras: el número de **Facturas**, la **Base imponible**, el **IVA** y el **Total**.
4. Usa los botones de tipo para ver solo unas: **Todas**, **Simplificada**, **Completa** o **Rectificativa** (cada uno con cuántas hay). O busca en **Número, nombre, NIF…**.
5. Pulsa **PDF** en una fila para abrir esa factura, o el nombre del destinatario para ir a su ficha.
6. Pulsa **Descargar CSV** para bajarte el listado (se abre en Excel).

**Qué cuentan las cifras.**
- Suman las facturas que ves: si filtras por tipo o buscas, las cifras de arriba cambian con el filtro.
- El **Total** viene **descontadas las rectificativas**: un reembolso entra con importe negativo y resta.
- Las facturas **anuladas** siguen en la lista, tachadas y con la marca **anulada**, porque su número forma parte de la serie, pero no cuentan en ningún total.
- Si en el periodo hay facturas con más de un tipo de IVA (por ejemplo servicios exentos y un producto al 21 %), aparece la tabla **Por tipo de IVA** con una línea por tipo. Las exentas salen como **Exenta**.

En la tabla, **Tipo** dice si es simplificada, completa o rectificativa; en una rectificativa, al lado, el número de la factura que corrige.

> **Ten en cuenta:** como hay una factura por pago, una visita pagada mitad en efectivo y mitad con tarjeta tiene dos facturas. Es normal.

## Gestoría: la descarga del trimestre

::help-video{clip="reports--gestoria" caption="Elegir el trimestre y descargar el ZIP para la gestoría"}
::

1. Abre **Informes › Gestoría**.
2. Elige el **Año** y el trimestre (**T1**, **T2**, **T3** o **T4**). Si tu gestoría trabaja por meses, elige un mes en **o un mes**.
3. Revisa el resumen: cuántas facturas hay y, por tipo de IVA, la **Base imponible**, la **Cuota IVA** y el **Total**. Está «Neto de rectificativas (devoluciones), que entran con importes negativos.».
4. Debajo, **Cobros por forma de pago** dice cuánto entró por cada método en el periodo.
5. Pulsa **Descargar ZIP** en **Descargar para la gestoría**.
6. Si también quieren las facturas, pulsa **Descargar PDF** en **Las facturas en PDF**. Cuando hay muchas, se reparten en partes (**Parte 1**, **Parte 2**…): descarga cada una.

**Qué hay en el ZIP.** Tres archivos CSV que se abren en Excel, con los importes escritos a la española:
- el libro registro de facturas expedidas: número, fecha, tipo, estado (las anuladas salen como «Anulada», con importes a cero), qué factura rectifica, destinatario y NIF, base, tipo de IVA, cuota, total, exención, forma de pago y concepto;
- el resumen de IVA, una línea por tipo y el total;
- los cobros del periodo: fecha, importe, forma de pago y número de factura.

El botón **Descargar PDF** baja un ZIP con un PDF por factura.

> **Ten en cuenta:** lo pagado con **Crédito en cuenta** no está en los cobros, porque no es dinero que entra. Lo condonado sí aparece en **Cobros por forma de pago** como **Baja contable**, aunque no sea dinero cobrado: tenlo en cuenta al cuadrar con el banco.

> **Ten en cuenta:** el enlace de descarga caduca al cabo de una hora. Si lo necesitas otra vez, vuelve a pulsar el botón.

## Quién puede verlos

Necesitas **Ver informes**. **Gestoría** pide además **Cobrar y hacer recibos**. **Facturas emitidas** no aparece para los roles con **Solo sus propios datos**, porque las facturas son de toda la clínica.
