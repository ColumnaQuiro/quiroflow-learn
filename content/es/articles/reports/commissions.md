---
title: Comisiones y retribución
description: Configura cómo cobra cada persona (fijo, porcentaje, por visita con tramos, pluses) y mira lo que ha generado cada mes.
collection: reports
order: 5
---

**Comisiones** calcula lo que ha generado cada persona del equipo en un mes según su retribución: un fijo, un porcentaje de lo cobrado, un importe por visita con tramos, un plus por paciente nuevo y un porcentaje de lo que vende. Tú defines la retribución de cada uno una vez y el informe hace las cuentas cada mes. Lo encuentras en **Informes › Financiero**.

> **Ten en cuenta:** **Comisiones** solo lo ven los propietarios de la clínica, sea cual sea el rol de los demás.

## Configurar la retribución de una persona

::help-video{clip="reports--commissions-setup" caption="Configurar la retribución de un profesional y ver lo que ha generado"}
::

1. Abre **Informes › Comisiones**.
2. En la fila de la persona, pulsa **Configurar** (o **Editar** si ya tiene retribución).
3. En **Retribución de …**, rellena solo las partes que uséis. Como dice la ventana: «Rellena las partes que uses; lo que dejes vacío no cuenta.»
   - **Fijo al mes (€)**: una cantidad fija cada mes.
   - **% de los cobros de sus visitas y pacientes**: un porcentaje del dinero cobrado ese mes que se le atribuye.
   - **Por visita realizada (€)**: un importe por cada visita atendida.
   - **Tramos por visitas del mes**: importes distintos según cuántas visitas haga en el mes. Pulsa **+ Añadir tramo**, escribe desde cuántas visitas empieza y su importe, y elige cómo se aplican (ver abajo).
   - **Plus por paciente nuevo (€)**: un importe por cada paciente que tiene con él su primera visita.
   - **% de bonos y membresías que vende**: un porcentaje del precio de lo que vende.
4. Pulsa **Guardar**. La fila se recalcula al momento.

### Cómo se aplican los tramos

- **Todas las visitas al tramo alcanzado**: si llega al tramo, todas las visitas del mes se pagan a ese importe. Con un tramo desde 30 visitas y 35 visitas hechas, las 35 van al importe del tramo.
- **Cada tramo a su importe**: como el IRPF. De la 1 a la 29 al importe por visita, y desde la 30 al importe del tramo.
- **Un plus por cada tramo alcanzado**: todas las visitas al importe por visita, más el importe del tramo una sola vez por llegar a él.

## Ver lo que ha generado cada persona

1. Elige el **Mes** arriba. Se abre en el mes pasado, porque la retribución se calcula con el mes ya cerrado.
2. La tabla enseña, por persona, las **Visitas**, los pacientes **Nuevos**, los **Cobros** que se le atribuyen, las **Ventas** y lo **Generado**. Arriba a la derecha está el **Total** de todo el equipo.
3. Pulsa una fila para ver el detalle: cada parte de la retribución con su cálculo (por ejemplo «10 % × 4.200,00 €» o «25 × 12,00 €»).
4. Pulsa **Exportar CSV** para llevártelo a la nómina o a la gestoría.

Los profesionales sin retribución salen con **Sin retribución** y el botón **Configurar**. Las personas que no son profesionales solo aparecen si les has puesto una retribución.

## Qué cuenta cada columna

- **Visitas**: citas de ese profesional en el mes marcadas como completadas. No cuentan las canceladas, las no presentadas ni las que siguen como reservadas.
- **Nuevos**: pacientes cuya primera visita completada de siempre fue ese mes con ese profesional.
- **Cobros**: el dinero cobrado ese mes que se le atribuye, con la misma regla que [Ingresos y pagos](/es/articles/reports/income-and-payments): el profesional de la visita o, si no hay visita, el profesional asignado al paciente. Los reembolsos se restan; el crédito aplicado y lo condonado no cuentan.
- **Ventas**: el precio de los bonos y membresías que esa persona registró en el mes, se hayan pagado ya o no.
- **Generado**: la suma de todas las partes de su retribución.

> **Ten en cuenta:** si hay cobros que no se pueden atribuir a nadie (sin visita y sin profesional en el paciente), una nota bajo la tabla dice cuánto es, y ningún porcentaje los cuenta. Asignar un profesional a cada paciente en su ficha evita que pase.

> **Ten en cuenta:** el informe calcula lo generado según la retribución que tú has puesto. No es una nómina ni tiene en cuenta impuestos ni seguridad social.
