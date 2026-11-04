---
title: Planes de cuidados
description: Crea el plan de visitas de un paciente con su ritmo, sus revisiones y cómo se paga, sigue su progreso, renuévalo al terminar y vigila los planes que se retrasan en Alertas de plan.
collection: clinical
order: 3
---

Un plan de cuidados es el tratamiento que le propones al paciente: cuántas visitas, con qué ritmo (por ejemplo, "2 veces por semana durante 6 semanas"), en qué visitas toca revisión y cómo se paga. QuiroFlow cuenta las visitas que va haciendo, te avisa si se retrasa y te ayuda a reservar las que faltan. El paciente también lo ve en su app y en su portal.

Un plan es informativo: nunca impide reservar ni cobrar una visita fuera de su ritmo.

## Crear un plan

::help-video{clip="clinical--care-plan-create" caption="Crear un plan de cuidados con una revisión"}
::

1. En la ficha, abre la pestaña **Clínico** y, en la caja del plan, pulsa **+ Añadir plan**.
2. Ponle un **Nombre** (por ejemplo, "Fase correctiva").
3. Define el ritmo: **Visitas** [número] **cada** [número] **semana(s)** o **mes(es)**. Debajo verás cómo se lee: "2 veces por semana", "cada 2 semanas", "mensual"…
4. Pon las **Visitas totales en el plan** y la **Fecha de inicio**.
5. Si quieres marcar revisiones, en **Revisiones** pulsa **+ Añadir visita de revisión**: elige la **Visita** (por ejemplo, la 6), si se repite (**y luego cada** 6 visitas), con qué tipo de cita se reserva (**Como Revisión**, o **Cualquier tipo (solo destacar)**) y una etiqueta. Las visitas se cuentan desde el inicio del plan, incluidas las reservadas.
6. En **Cómo se paga**, elige **Por visita** (cada visita a su precio habitual), **Bono** o **Membresía**, y cuál. Si no tiene ninguno abierto, véndeselo primero en **Dinero**.
7. Pulsa **Guardar**.

La caja del plan te propone al momento **Plan guardado. ¿Reservas ya sus visitas?** con el botón **Reservar las N visitas que faltan →**, que abre el calendario preparado para repetir el ritmo del plan.

> **Ten en cuenta:** al reservar, el calendario te avisa si una visita es de revisión ("Visita N del plan · Revisión") y te ofrece usar el tipo de cita que pide el plan. Si se reserva con otro tipo, la cita lo indica y te deja cambiarla.

## Seguir el progreso

En **Clínico** y en **Resumen** ves "X de Y visitas", el ritmo, una barra de progreso, cuántas van **completadas** y cuántas **restantes**, en qué visitas tocan las revisiones y cómo se paga (por ejemplo, "Pago: bono, quedan 4").

Solo cuentan las visitas desde la fecha de inicio del plan: las completadas como hechas y las reservadas como pendientes de hacer.

En **Resumen**, **Periodos del plan** divide el plan en periodos (por ejemplo, semana a semana) y marca cada uno como **Hecho**, **Reservado**, **Retrasado** o **Sin reservar**, con un resumen del periodo actual ("Este periodo: 1 de 2") y si va **Al día** o **Con retraso**. Solo lo ven quienes pueden ver todas las citas.

::help-video{clip="clinical--care-plan-progress" caption="El progreso del plan y sus periodos, en la pestaña Resumen"}
::

## Cambiar un plan

Pulsa **Editar** en la caja del plan, cambia lo que necesites y pulsa **Guardar**. Cada vez que guardas se crea una versión nueva del plan, y la más reciente es la que cuenta: no se sobrescribe la anterior. Un paciente tiene un solo plan activo: siempre el último que se guardó.

## Cuando el plan termina: la revisión en Mi día

Cuando al plan le quedan **dos visitas o menos**, **Mi día** lo avisa en la visita del paciente: "<plan> termina en N visitas: ¿qué sigue?" (o "…ha terminado"). Verás su evolución del dolor, las visitas hechas y las perdidas, y un enlace al **Informe de revisión**, para hablarlo con el paciente. Elige una opción:

- **Mantenimiento**: un plan nuevo de 1 visita cada 3 semanas, 8 visitas.
- **Seguir igual**: el mismo plan otra vez.
- **Alta**: cierra el plan y el paciente vuelve a la lista de **Recordatorios** a los 3 meses.

Ajusta el **Nombre del plan**, cuándo **Empieza** y, si quieres, un **Bono**, y pulsa **Solo crear el plan** o **Crear plan y añadir bono** (el bono queda pendiente de pago y recepción lo cobra en **Dinero**, con su factura). Para el alta, pulsa **Dar el alta**.

## Alertas de plan

No hace falta revisar uno a uno los planes de todos tus pacientes. **Pacientes › Alertas de plan** reúne lo que necesita una llamada:

::help-video{clip="clinical--care-plan-alerts" caption="Corregir una revisión reservada con otro tipo desde Alertas de plan"}
::

1. **Planes retrasados**: pacientes con un plan activo cuya próxima visita ya debería haber ocurrido según el ritmo de su propio plan, y que no tienen nada reservado. Ves el plan, el progreso, la última visita, cuándo vencía y cuántos días de retraso lleva, con un botón **Mensaje** para escribirle sin abrir la ficha.
2. **Revisiones reservadas con otro tipo**: visitas de revisión que están reservadas con un tipo de cita distinto al que pide el plan (suele pasar al mover citas). Pulsa **Cambiar a …** para corregirla.
3. **Ejercicios en casa sin hacer**: pacientes con la app y ejercicios asignados que llevan 5 días o más sin marcar ninguno.

Necesitas el permiso **Recordatorios, lista de espera y alertas de plan**.

## Lo que ve el paciente

En su app y en su portal, el paciente ve **Tu plan de cuidados** con las visitas que le quedan y un botón **Reservar** (o **Pedir a la clínica**, cuando no puede reservar él mismo). Al terminarlo, ve "¡Plan completado! Buen trabajo." Consulta [El portal del paciente](/es/articles/patient-app/patient-portal).
