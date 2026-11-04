---
title: Recordatorios programados
description: Si los WhatsApp de la clínica llegaron, cuáles fallaron y por qué, y qué pacientes con cita han confirmado, siguen pendientes o quieren cambiarla.
collection: reports
order: 12
---

**Recordatorios programados** responde a dos preguntas del día a día: ¿salieron de verdad los WhatsApp?, y ¿quién ha confirmado su próxima cita? Es la forma rápida de saber a quién llamar antes de su visita, sin recorrer el calendario. Lo encuentras en **Informes › Operaciones**.

::help-video{clip="reports--scheduled-reminders" caption="Estado de entrega de WhatsApp y confirmaciones de las próximas citas"}
::

## Revisar las entregas y las confirmaciones

1. Abre **Informes › Recordatorios programados**.
2. Elige el periodo para las entregas (por defecto **Este mes**).
3. En **Estado de entrega de WhatsApp**, mira las cuatro cifras y, si hay, la lista de envíos fallidos.
4. En **Confirmaciones de citas**, repasa las tres columnas y pulsa un nombre para abrir la ficha y llamar o escribir al paciente.

## Estado de entrega de WhatsApp

Cuenta todos los WhatsApp que la clínica ha enviado en el periodo (confirmaciones, recordatorios, recuperaciones y el resto), cada uno una vez, en su último estado conocido:

- **Enviados**: salieron, pero WhatsApp aún no ha confirmado que llegaran.
- **Entregados**: llegaron al teléfono, pero no se han leído.
- **Leídos**: el paciente los abrió.
- **Fallidos**: no llegaron. La tarjeta se pone en rojo.

Como cada mensaje cuenta solo en su último estado, un mensaje leído no aparece también en entregados ni en enviados.

Si hay fallidos, debajo aparece **Envíos fallidos — número incorrecto o sin cuenta de WhatsApp**, con el paciente y el motivo (o «Código de error N»). Lo habitual es un número mal escrito o un teléfono fijo: corrígelo en la ficha del paciente. Si fallan muchos de golpe, revisa la conexión de WhatsApp (ver [Conectar WhatsApp](/es/articles/communications/connecting-whatsapp)).

## Confirmaciones de citas

Lista las **próximas citas** (de ahora en adelante, todavía reservadas) a las que se envió un mensaje de confirmación, en tres columnas:

- **Confirmadas**: el paciente respondió que viene.
- **Pendientes**: se envió y todavía no hay respuesta clara.
- **Quiere reprogramar**: el paciente pidió cambiar la cita en vez de confirmarla.

Cada nombre lleva la fecha y hora de la cita y abre la ficha del paciente.

> **Ten en cuenta:** el periodo solo cambia las cifras de entrega. Las confirmaciones son siempre las de las citas que están por venir, sea cual sea el periodo elegido.

> **Ten en cuenta:** las respuestas solo se registran si las respuestas de WhatsApp llegan a QuiroFlow (Ajustes → WhatsApp). Si no, las citas se quedan en **Pendientes** aunque el paciente haya contestado. Para configurar los mensajes, ver [Confirmaciones y recordatorios](/es/articles/communications/confirmations-and-reminders).

## Quién puede verlo

Necesitas **Ver informes** y, además, **Bandeja de entrada**. Sin ella, el informe dice: «Este informe requiere acceso a la Bandeja de entrada — pide a un propietario que lo active para tu rol.». No aparece para los roles con **Solo sus propios datos**.

Es un buen hábito revisarlo cada mañana: quien siga en **Pendientes** para hoy o mañana merece una llamada rápida. Para ver qué significan los colores de confirmación en el propio calendario, ver [Estados de las citas](/es/articles/calendar-appointments/appointment-statuses-explained).
