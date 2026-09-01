---
title: Conectar WhatsApp
description: Conecta tu cuenta de Meta WhatsApp Business para que QuiroFlow pueda enviar y recibir mensajes.
collection: communications
order: 1
---

Ve a **Settings &rarr; WhatsApp**. Necesitarás tener ya configurada una cuenta de Meta WhatsApp Business -- QuiroFlow se conecta a ella en lugar de ofrecer su propio número.

## Conectar

Introduce:

- **Phone Number ID** y **WhatsApp Business Account ID** -- ambos de tu cuenta de Meta Business.
- **Access token** -- también de Meta. Una vez guardado, se almacena de forma segura y el campo solo indica que hay un token registrado; solo necesitas volver a introducirlo si lo estás rotando.

![Página de configuración de WhatsApp con los campos Phone Number ID, Business Account ID y las plantillas por defecto](/screenshots/settings-whatsapp.png)

## Plantillas por defecto

Meta exige plantillas de mensaje pre-aprobadas para todo lo que se envíe fuera de una ventana de respuesta de 24 horas (lo que cubre la mayoría de los mensajes automáticos). Configura tu plantilla e idioma por defecto para cada finalidad:

- **Confirmation template** -- usada por las [confirmaciones automáticas de citas](/es/articles/calendar-appointments/setting-up-confirmations-and-reminders).
- **Reminder template** -- lo mismo, para recordatorios.
- **Recall template** -- usada al enviar mensajes a pacientes desde la cola de Recalls.
- **Staff notification template** -- usada para avisar a tu equipo de una nueva reserva online.

Las plantillas en sí se crean y aprueban en tu cuenta de Meta Business, no en QuiroFlow -- aquí solo indicas a QuiroFlow qué plantilla aprobada (y en qué variante de idioma) usar para cada finalidad.

## Una vez conectado

Todas las conversaciones de WhatsApp aparecen en la **Inbox**, y los pacientes pueden responder directamente para confirmar, cambiar o cancelar citas -- consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained).
