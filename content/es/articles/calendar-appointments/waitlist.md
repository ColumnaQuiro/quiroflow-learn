---
title: La lista de espera
description: Apunta a los pacientes que quieren una cita antes, y deja que QuiroFlow les ofrezca por WhatsApp los huecos que se liberan.
collection: calendar-appointments
order: 10
---

La **Lista de espera** es para los pacientes que quieren una cita antes de la que hay disponible. Cuando se cancela o se mueve una cita que encaja con lo que piden, QuiroFlow les ofrece ese hueco por WhatsApp, con un enlace para quedárselo sin tener que llamar. La encuentras en el menú lateral, en **Pacientes** › **Lista de espera**.

## Apuntar a un paciente

::help-video{clip="calendar--waitlist-add" caption="Apuntar a un paciente a la lista de espera para un tipo de cita y un profesional"}
::

1. Pulsa **+ Añadir a la lista**.
2. En **Paciente**, busca por nombre y elígelo.
3. Elige el **Tipo de cita** que quiere, o deja **Cualquier tipo**.
4. Elige el **Profesional**, o deja **Cualquier profesional**.
5. Pulsa **Añadir**.

Los pacientes también pueden entrar en la lista solos ("Se apuntó el paciente") o a través de la recepcionista IA ("Apuntado por la recepcionista IA"). En el panel de reserva, un paciente que está en la lista lleva la etiqueta **En espera**.

## Leer la lista

Cada fila muestra el **Paciente**, lo que **Quiere** (tipo y profesional), el **Estado**, la **Cita ofrecida** (con cuándo caduca la oferta) y desde cuándo espera (**Esperando desde**). Los estados son:

- **Esperando**: aún no se le ha ofrecido nada.
- **Oferta enviada**: tiene un hueco ofrecido y está a tiempo de aceptarlo.
- **Reservada**: aceptó y ya tiene la cita.
- **Oferta caducada**: no contestó a tiempo.
- **Cancelada**.

Por defecto solo ves a quien está esperando o tiene una oferta; desmarca **Mostrar solo esperando / con oferta** para verlos todos.

Para quitar a alguien, pulsa el icono de la papelera (**Quitar de la lista de espera**) y confirma. Solo se puede mientras está **Esperando**: si se le acaba de ofrecer un hueco, verás "No se ha quitado: se le acaba de ofrecer un hueco."

## Elegir cómo se ofrecen los huecos

::help-video{clip="calendar--waitlist-settings" caption="Activar la oferta automática y elegir a quién se ofrece"}
::

Arriba de la página, la tarjeta **Cuando se libera un hueco**:

1. Activa **Ofrecerlo a la lista de espera automáticamente** para que, siempre que se cancele o se mueva una cita (desde recepción, por el paciente en WhatsApp o desde una integración), se ofrezca sin que nadie tenga que acordarse.
2. En **A quién se ofrece**, elige:
   - **Uno a uno, por orden**: "El primero de la lista, con un plazo; si no acepta, el siguiente."
   - **A todos a la vez**: "Se avisa a todos los que encajan y el primero que acepta se lo queda; los demás siguen en la lista."
3. Pulsa **Guardar**.

Necesitas el permiso de configuración de la clínica para cambiar esta tarjeta.

> **Ten en cuenta:** la oferta la envía una automatización. Si no tienes ninguna activa para «Hueco ofrecido de la lista de espera», la tarjeta te avisa: "Nadie recibirá el aviso". Actívala en [Automatizaciones](/es/articles/communications/automations).

> **Ten en cuenta:** con la oferta automática apagada, al cancelar una cita desde recepción QuiroFlow te pregunta en el propio paso de cancelar si quieres ofrecer el hueco (consulta [Mover y cancelar citas](/es/articles/calendar-appointments/moving-and-cancelling)), y al mover una cita no se ofrece nada. Cuando un paciente cancela desde su app o su portal, el hueco se ofrece siempre.

## Qué recibe el paciente

El paciente recibe un WhatsApp con un enlace. Al abrirlo ve **¡Se ha liberado una cita!**, con la clínica, el día, la hora, el tipo y el profesional, y el botón **Reservar esta cita**. Al pulsarlo ve **¡Cita reservada!** y la cita aparece en tu calendario. No necesita iniciar sesión.

Mientras la oferta está abierta, el hueco se ve en el calendario como "Hueco ofrecido a" el paciente "· responde antes de las" la hora límite, y no se puede reservar.

## Cómo se decide a quién

- El tipo y el profesional de cada entrada encajan si coinciden o si son "cualquiera". Va primero quien lleva más tiempo esperando.
- Una oferta dura **2 horas**, pero nunca más allá de **20 minutos antes de la cita**. Un hueco que empieza antes de ese margen no se ofrece.
- Si nadie acepta a tiempo, se ofrece al siguiente automáticamente.
- En el modo **A todos a la vez**, quien acepta primero se lo queda y los demás vuelven a esperar.

Las clases en grupo tienen su propia lista de espera dentro del panel de cada clase: consulta [Clases en grupo](/es/articles/calendar-appointments/group-classes).

> **Ten en cuenta:** la lista de espera aparece a quien tiene el permiso **Recordatorios, lista de espera y alertas de plan**.
