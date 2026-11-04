---
title: Estados de una cita y el panel de la cita
description: Qué significa cada estado de una cita, cómo pasa de uno a otro y qué puedes hacer desde el panel que se abre al hacer clic en ella.
collection: calendar-appointments
order: 3
---

Cada cita tiene un solo estado que dice dónde está el paciente: si ha confirmado, si ha llegado, si está en consulta, si falta cobrarle o si ya está hecha. Ese mismo estado lo ves en el bloque del calendario, en la tarjeta que aparece al pasar el ratón, en la fila de recuentos, en el panel de la cita y en el [seguimiento de flujo](/es/articles/calendar-appointments/flow-tracker), así que nunca se contradicen.

## Los estados

| Estado | Borde del bloque | Cuándo |
|---|---|---|
| **Sin confirmar** | Discontinuo | Se le envió una confirmación o un recordatorio y el paciente no ha respondido. |
| **Online · sin confirmar** | Discontinuo | El paciente reservó online y aún no está confirmada. |
| **Quiere cambiar** | Discontinuo, ámbar | El paciente respondió pidiendo cambiar la cita. |
| **Confirmada** | Continuo | El paciente respondió que sí, alguien pulsó **Marcar como confirmada**, o nunca se le pidió confirmación. |
| **Llegó** (con la hora) | Continuo | Recepción registró la llegada, o el paciente la registró él mismo en la tablet o con «Ya estoy aquí». |
| **En consulta** | Continuo | Se pulsó **Pasa a consulta**, o el profesional abrió la visita en Mi día. |
| **Por cobrar** | Continuo | Se pulsó **Pasar a cobro**. |
| **Hecha** | Apagado | Se cobró la visita, se marcó **Hecha, sin cobro**, se firmó en Mi día o se marcó **Vino** en una clase. |
| **No vino** | Gris | Se pulsó **No vino**. |
| **Cancelada** | Sale del calendario | Se canceló desde recepción, el paciente respondió para cancelar o canceló desde su app o portal, o por una ausencia imprevista. |

La regla para leer el calendario de un vistazo: **un borde discontinuo es una cita que aún no está firme**, y **el rojo solo significa dinero pendiente**. La **Leyenda de estados**, abajo en el panel izquierdo del calendario, te lo recuerda.

> **Ten en cuenta:** una cita reservada en recepción sin pedir confirmación aparece directamente como **Confirmada**. Solo pasa a **Sin confirmar** si se le envía un mensaje que pide respuesta.

## Cómo responde el paciente por WhatsApp

Cuando el paciente contesta a la confirmación o al recordatorio, QuiroFlow lee su respuesta:

- Si empieza por "confirmo", "sí", "vale", "ok" (o su equivalente en inglés o francés), la cita pasa a **Confirmada**.
- Si empieza por "cancelar", "cancelo" o "anular", **la cita se cancela**, sin cargo, y se avisa a la lista de espera si corresponde.
- Si habla de "cambiar", "reprogramar", "aplazar" o "mover" la cita, pasa a **Quiere cambiar**. No cuenta si lo que quiere cambiar es otra cosa, como su email o su teléfono.
- Cualquier otra cosa no cambia nada: tu equipo la lee en la [bandeja de entrada](/es/articles/communications/the-shared-inbox).

Una respuesta que ya está registrada no se pierde por un mensaje posterior. Y en cuanto el paciente llega a la clínica, lo que dijo antes deja de contar: alguien que pidió cambiar y luego vino aparece como **Llegó**.

## Abrir una cita

Haz clic en un bloque (o pulsa **Intro** sobre él) y se abre el panel de la cita a la derecha (a pantalla completa en el móvil). Arriba ves el nombre, el tipo, la hora, el profesional, la sala, cuántas visitas lleva y si tiene una próxima cita, y el botón **Ficha** para abrir su ficha. Tiene tres pestañas:

- **Resumen**: dónde está, avisos, dinero, notas, mensajes enviados y documentos.
- **Cobro**: cobrar la visita, usar un bono o enviar el recibo (lo explica [Cobrar una visita](/es/articles/billing-payments/taking-a-payment)). Un punto rojo avisa de que falta cobrar.
- **Historial**: todo lo que ha pasado con la cita, con quién lo hizo: reservada (en recepción, online o por la recepcionista IA), mensajes enviados, movida, llegó, pasó a consulta, pasó a cobro, cancelada, no vino, hecha o deshecha, y cambios de hora, profesional, sala o tipo.

## Llevar al paciente de la llegada al cobro

::help-video{clip="calendar--check-in-to-checkout" caption="Registrar la llegada, pasar a consulta, pasar a cobro y cobrar"}
::

En **Resumen**, el apartado **Dónde está** muestra una línea de cinco pasos: **Sin confirmar** o **Confirmada** → **Llegó** → **En consulta** → **Por cobrar** → **Hecha**. El botón principal siempre es el siguiente paso:

1. Cuando llega el paciente, pulsa **Registrar llegada**.
2. Cuando entra con el profesional, pulsa **Pasa a consulta**.
3. Al salir, pulsa **Pasar a cobro**.
4. Pulsa **Cobrar**: se abre la pestaña **Cobro**. Al cobrar, la cita queda **Hecha**.

Si no hay nada que cobrar (por ejemplo, una visita de cortesía), en **Por cobrar** tienes **Hecha, sin cobro**. Puedes saltarte pasos: la cita queda en el último que marques. Con una cita abierta, la tecla `a` da el siguiente paso y `p` abre **Cobro**.

> **Ten en cuenta:** **Registrar llegada** pone en marcha las automatizaciones de "llegada" que tenga tu clínica.

## Confirmar a mano

::help-video{clip="calendar--mark-confirmed" caption="Marcar como confirmada una cita que el paciente confirmó por teléfono"}
::

Si el paciente te confirma por teléfono o en recepción:

1. Abre la cita (con borde discontinuo).
2. Pulsa **Marcar como confirmada**.

El borde del bloque pasa a ser continuo.

## Deshacer un paso

::help-video{clip="calendar--undo-step" caption="Deshacer una llegada registrada por error"}
::

Junto al botón principal tienes el que deshace el último paso: **Deshacer llegada**, **Deshacer consulta** o **Deshacer paso a cobro**. La cita vuelve al paso anterior.

Una visita ya **Hecha** se puede reabrir con **Deshacer visita**. Te pregunta "¿Deshacer esta visita?": deja de estar hecha y vuelve al paso en el que estaba. Si se pagó con un bono, la sesión vuelve al bono y se anula su cargo.

> **Ten en cuenta:** una visita cobrada con dinero no se puede deshacer aquí: "Esta visita tiene un pago registrado y no se puede deshacer aquí. Devuelve antes el pago desde la pestaña Dinero de la ficha."

## Lo que más ves en Resumen

- **Señales rojas**, **Para el equipo** (la nota del tipo de cita), etiquetas y formularios pendientes, con **Ver formularios**. Sin permiso de notas clínicas, las señales rojas solo dicen "En la ficha clínica. Avisa al profesional."
- **Dinero**: **Esta visita** (cobrada, sin cobrar, el bono que descuenta…) y **Saldo del paciente** (**Debe**, con un botón para cobrarlo; saldo disponible; o **Sin saldo pendiente**).
- **Notas**: la "Nota del paciente · se ve en todas sus citas" y la "Nota de esta visita". Las dos se guardan solas.
- **Avisos enviados**: cuándo se envió la **Confirmación**, el **Recordatorio** y la **Info del día**.
- **Documentos**: cuando el paciente ya ha llegado, **Justificante de asistencia** abre un justificante para imprimir.

Si la visita forma parte de un plan de cuidados verás "Visita N del plan". Si se reservó con un tipo distinto al que pide el plan, aparece el aviso y un botón **Cambiar a** con el tipo correcto.

Abajo del panel están **Cancelar cita…**, **No vino** y **Mover…**: se explican en [Mover y cancelar citas](/es/articles/calendar-appointments/moving-and-cancelling).
