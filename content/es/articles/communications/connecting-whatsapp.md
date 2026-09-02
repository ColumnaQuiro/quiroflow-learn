---
title: Conectar WhatsApp
description: Conecta tu cuenta de Meta WhatsApp Business para que QuiroFlow pueda enviar y recibir mensajes.
collection: communications
order: 1
---

Ve a **Settings &rarr; WhatsApp**. Necesitarás tener ya configurada una cuenta de Meta WhatsApp Business -- QuiroFlow se conecta a ella en lugar de ofrecer su propio número, lo que significa que conservas el mismo número de WhatsApp y la misma estructura de historial de mensajes que gestiona Meta, y QuiroFlow se convierte en un cliente más que envía a través de ella.

![Página de configuración de WhatsApp con Phone Number ID, Business Account ID y los campos de plantilla por defecto](/screenshots/settings-whatsapp.png)

## Conectar

Introduce:

- **Phone Number ID** y **WhatsApp Business Account ID** -- ambos desde tu cuenta de Meta Business, en Meta Business Manager, dentro de la configuración de la API de tu app de WhatsApp.
- **Access token** -- también desde Meta. Una vez guardado, se almacena de forma segura y el campo solo muestra que hay un token registrado; solo necesitas volver a introducirlo si lo estás rotando. Si los mensajes dejan de enviarse de repente, un token caducado o revocado es de lo primero que conviene comprobar aquí.

Si los datos de conexión son incorrectos o el token ha caducado, los envíos de campañas y confirmaciones fallarán con un error de "Could not reach WhatsApp" en lugar de fallar en silencio -- así que una conexión rota suele notarse rápido en lugar de descubrirse semanas después con mensajes que nunca llegaron.

## Plantillas por defecto

Meta exige plantillas de mensaje preaprobadas para cualquier envío fuera de la ventana de respuesta de 24 horas (que cubre la mayoría de los mensajes automáticos -- una confirmación enviada en el momento en que alguien reserva, por ejemplo, no es una respuesta a nada). Configura tu plantilla e idioma por defecto para cada propósito:

- **Confirmation template** -- usada por las [confirmaciones automáticas de cita](/es/articles/calendar-appointments/setting-up-confirmations-and-reminders).
- **Reminder template** -- lo mismo, para los recordatorios.
- **Recall template** -- usada al enviar mensajes a pacientes desde la cola de Recalls. El selector se mantiene visible al enviar un recall, para que el personal pueda cambiarla por paciente si hace falta.
- **Staff notification template** -- usada para avisar a tu equipo de una nueva reserva online, específicamente cuando cae fuera de la ventana de 24 horas de mensajes libres de WhatsApp (es decir, tu número de notificación no ha escrito a la clínica recientemente). Déjala en blanco para enviar mensaje libre en su lugar cuando esa ventana esté abierta.

Las plantillas en sí se crean y se aprueban en tu cuenta de Meta Business, no en QuiroFlow -- aquí solo indicas a QuiroFlow qué plantilla aprobada (y qué variante de idioma) usar para cada propósito. La aprobación por parte de Meta puede tardar desde unos minutos hasta un día o dos, así que configura las plantillas nuevas con antelación en lugar de el mismo día que las necesitas.

## Variantes de idioma

Cada campo de plantilla va emparejado con un código de idioma (por ejemplo, `es`). Si el idioma preferido de un paciente tiene su propia variante aprobada de esa plantilla, QuiroFlow la usa automáticamente en lugar de la plantilla por defecto -- no hay nada más que configurar por paciente aparte de establecer su **Preferred language** en su ficha.

## Una vez conectado

Todas las conversaciones de WhatsApp aparecen en el **Inbox**, y los pacientes pueden responder directamente para confirmar, reprogramar o cancelar citas -- consulta [Estados de las citas explicados](/es/articles/calendar-appointments/appointment-statuses-explained) y [La bandeja de entrada compartida](/es/articles/communications/the-shared-inbox) para ver qué ocurre después.
