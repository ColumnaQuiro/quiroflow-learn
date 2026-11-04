---
title: Comunicaciones
description: El registro de todos los mensajes enviados a pacientes y leads, por WhatsApp, correo, la app o notificación, con su estado.
collection: reports
order: 11
---

**Comunicaciones** es el registro de todo lo que la clínica ha enviado a pacientes y leads, en una sola lista: WhatsApp, correos, mensajes en la app, notificaciones push y chats de Instagram, Messenger o la web. Sirve para responder a «¿le llegó el recordatorio?» o «¿qué le mandamos la semana pasada?». Lo encuentras en **Informes › Operaciones**.

::help-video{clip="reports--communications" caption="Buscar los mensajes de un paciente y filtrar por canal y estado"}
::

## Buscar un mensaje

1. Abre **Informes › Comunicaciones**. Muestra **Este mes**, del más reciente al más antiguo.
2. Escribe en **Buscar por nombre, destinatario o mensaje**: un nombre, un teléfono, un correo o una palabra del texto.
3. Afina con los desplegables:
   - **Todos los canales**: WhatsApp, Instagram, Messenger, **Chat de la web**, **Correo**, **Mensaje en la app** o **Notificación push**.
   - **Todos los tipos**: **Confirmación**, **Recordatorio**, **Recuperación**, **Automatización**, **Aviso**, **Mensaje**, **Ejercicios**, **Cita** o **General**.
   - **Cualquier estado**: **Enviado**, **Entregado**, **Leído**, **Fallido**, **Rebotado**, **Marcado como spam** o **Sin dispositivo**.
4. Cambia el periodo si buscas algo más antiguo.
5. Pasa de página con **Anterior** y **Siguiente**; arriba pone «Mostrando 1–50 de N».

## Qué significa cada estado

- **Enviado**: salió de QuiroFlow, pero aún no hay confirmación de que llegara.
- **Entregado**: llegó al teléfono o al buzón.
- **Leído**: el paciente lo abrió (WhatsApp lo indica; el correo no siempre).
- **Fallido**: no se pudo enviar. En WhatsApp suele ser un número mal escrito o sin cuenta de WhatsApp.
- **Rebotado**: el correo no existe o rechazó el mensaje.
- **Marcado como spam**: el paciente marcó el correo como spam.
- **Sin dispositivo**: una notificación push a alguien que no tiene la app instalada en ningún dispositivo.

Un aviso enviado a todos los pacientes con la app aparece una sola vez, con «Todos con la app» o «N pacientes» como destinatario.

> **Ten en cuenta:** cada canal sigue su propio permiso. Si tu rol no tiene **Bandeja de entrada**, los WhatsApp no te aparecen en la lista; los correos y las notificaciones siguen el alcance de pacientes de tu rol. Comunicaciones no aparece para los roles con **Solo sus propios datos**.

> **Ten en cuenta:** los envíos de prueba de las automatizaciones (en modo prueba) no salen aquí, porque nunca se enviaron.

Para ver solo si los recordatorios de WhatsApp de las citas llegaron y quién confirmó, usa [Recordatorios programados](/es/articles/reports/the-scheduled-reminders-report).
