---
title: Webhooks y la API
description: Suscríbete a eventos de la clínica, o lee y escribe datos con un token de API con permisos acotados.
collection: settings
order: 9
---

Para conectar QuiroFlow con algo que hayas construido tú mismo -- distinto de las conexiones ya hechas con Stripe y WhatsApp que se cubren en otras partes de Settings.

## Webhooks

**Settings &rarr; Webhooks** suscribe un endpoint que controlas tú para recibir un HTTP POST cada vez que ocurre un evento suscrito: cita creada, actualizada, eliminada o registrada; paciente creado, actualizado o eliminado; factura pagada. Cada solicitud lleva una cabecera `X-QuiroFlow-Event` y un cuerpo JSON con `{ event, created_at, data }`.

Para verificar que una solicitud viene realmente de QuiroFlow (y no de alguien que ha adivinado la URL de tu endpoint), recalcula un HMAC-SHA256 del cuerpo bruto de la solicitud usando el secreto propio de tu webhook, y compáralo con la cabecera `X-QuiroFlow-Signature` (codificada en hexadecimal) -- si no coinciden, descarta la solicitud.

Esto es de toda la cuenta, distinto de la acción de webhook por campaña que se explica en [Enviar campañas](/es/articles/communications/sending-campaigns), que se dispara desde una regla de campaña concreta en lugar de cada evento de un tipo dado.

## API & Tokens

**Settings &rarr; API & Tokens** es para que software externo -- una herramienta de automatización como n8n, un widget de reservas personalizado, una recepcionista de IA, o tus propios scripts -- lea y escriba los datos de esta clínica sin un inicio de sesión de QuiroFlow. La documentación completa de referencia, con ejemplos, filtrado, paginación y códigos de error, está en `developers.quiroflow.com`.

Crear un token:

1. Dale un **nombre** para que recuerdes para qué es más adelante.
2. Opcionalmente define una **caducidad** (Never, 30 days, 90 days, 1 year) y anota el **nombre de la integración** / **contacto del desarrollador** para tu propio registro.
3. Elige los **scopes** (permisos) -- concede solo lo que la integración realmente necesita, agrupados por área: Patients (lectura/escritura), Appointments (lectura/escritura), Catalog (solo lectura: clínicas, profesionales, tipos de cita, servicios), Billing (solo lectura: facturas y pagos), y Messaging (enviar WhatsApp en nombre de la clínica).

Trata un token como una contraseña: quien lo tenga puede actuar como tu clínica dentro de los permisos que se le hayan concedido. Un token al que nunca se le dio `billing:read`, por ejemplo, simplemente no puede filtrar datos de facturación aunque el propio token se filtre -- que es justo el sentido de acotar los permisos en lugar de conceder todo por defecto.

Envíalo como token de portador:

```
curl "https://app.quiroflow.com/api/public/v1/appointments?starts_at=gte:2026-03-01T00:00:00Z" \
  -H "Authorization: Bearer qf_live_..."
```

La URL base es la misma para todas las clínicas de QuiroFlow -- para qué clínica actúa una solicitud lo determina por completo qué token de clínica envías, no ningún otro dato de la solicitud. **Recent API activity**, en la misma página, muestra las últimas 30 solicitudes hechas con tus tokens, útil para confirmar que una integración realmente se está conectando y no fallando en silencio.
