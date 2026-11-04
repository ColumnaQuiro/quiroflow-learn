---
title: Confirmaciones y recordatorios de cita
description: Los dos mensajes que QuiroFlow envía solo en torno a cada cita, por qué canal salen y con cuánta antelación.
collection: communications
order: 3
---

Cada vez que se reserva una cita, QuiroFlow puede mandar al paciente una **confirmación**, y antes de la visita, un **recordatorio**. Los dos se configuran en **Ajustes › Comunicación › Mensajes** y salen solos: no hay que acordarse de enviar nada. Así el paciente tiene la cita por escrito y menos pacientes se olvidan de venir.

Necesitas los permisos **Entrar en Ajustes** y **Comunicación y Growth**.

## Qué se envía y cuándo

- **Confirmación de cita**: se envía justo después de reservar una cita, se haya reservado en recepción, online, en la app o por la API.
- **Recordatorio de cita**: se envía automáticamente antes de la visita, con la antelación que pongas en **Cuándo** (entre 1 y 168 horas, es decir, hasta una semana).

Cada uno tiene su interruptor. Si lo apagas, ese mensaje deja de salir para toda la clínica.

## Cambiar la antelación y los canales

::help-video{clip="comms--reminder-settings" caption="Recordatorio 48 horas antes, por WhatsApp y por correo"}
::

1. Ve a **Ajustes › Comunicación › Mensajes**.
2. En **Recordatorio de cita**, escribe en **Cuándo** cuántas **horas antes** debe salir (por ejemplo, 48).
3. En **Enviar por**, marca los canales: **WhatsApp**, **Correo** y/o **App del paciente**.
4. Si marcas **Correo**, rellena **Asunto del correo** y **Mensaje del correo**. Puedes insertar datos como el nombre, la fecha de la cita, el tipo de cita, el profesional o la dirección de la clínica, y ver a la derecha cómo queda («Lo que recibe Lucía»).
5. Pulsa **Guardar cambios**.

La confirmación se configura igual, en su propia tarjeta.

> **Ten en cuenta:** la **App del paciente** solo llega a quien la tiene instalada, así que se suma a WhatsApp y al correo en lugar de sustituirlos.

> **Ten en cuenta:** para que salga por WhatsApp, tu número tiene que estar conectado y cada mensaje necesita su plantilla elegida en **Ajustes › Comunicación › WhatsApp**. Un mensaje sin plantilla no se envía. Consulta [Conectar WhatsApp y elegir las plantillas](/es/articles/communications/connecting-whatsapp).

> **Ten en cuenta:** si marcas **Correo**, el asunto y el mensaje son obligatorios. Si los dejas vacíos, QuiroFlow no guarda y te lo avisa.

## Excepciones por paciente

En la ficha de un paciente puedes cambiar sus propios mensajes: el **Tipo de confirmación**, el **Tipo de recordatorio** y la **Antelación del recordatorio** (por ejemplo, alguien que prefiere el aviso el día antes por la mañana). Si un paciente tiene marcado **No contactar**, no recibe ninguno.

## Cuando el paciente contesta

Si el paciente responde al recordatorio por WhatsApp (por ejemplo, «SÍ» para confirmar, o pidiendo cambiar la hora), la respuesta llega a la [Bandeja de entrada](/es/articles/communications/the-shared-inbox) y QuiroFlow marca la cita según lo que haya contestado. Lo que significa cada estado está en [Estados de las citas](/es/articles/calendar-appointments/appointment-statuses-explained).

## Más avisos antes de la cita

Esta página envía un único recordatorio. Si quieres un segundo aviso (por ejemplo, uno a 3 días y otro a 24 horas), crea una automatización con el disparador **Horas antes de la cita**. Consulta [Automatizaciones](/es/articles/communications/automations).

## Datos que usan los mensajes

Al final de la página, en **Datos que usan los mensajes**:

- **País de teléfono por defecto**: el prefijo que se pone a un número escrito sin él (en recepción, en la página de reservas o en una importación).
- **Enlace de reseñas de Google**: adónde envía a los pacientes la solicitud de reseña de las automatizaciones. Consulta [Reputación y reseñas de Google](/es/articles/growth/reputation).
