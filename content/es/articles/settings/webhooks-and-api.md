---
title: API y webhooks
description: Conecta QuiroFlow con otros programas -- tokens de API con permisos limitados, y webhooks que avisan a otro sistema cuando algo cambia.
collection: settings
order: 9
---

Si usas otras herramientas (un widget de reservas en tu web, un formulario de anuncios, n8n o Zapier, tus propios scripts), puedes conectarlas con QuiroFlow de dos formas:

- **API y tokens**: otro programa **pregunta** a QuiroFlow (lee pacientes, reserva citas…) con un token que solo puede hacer lo que tú le permites.
- **Webhooks**: QuiroFlow **avisa** a otro programa en cuanto pasa algo (un paciente nuevo, una cita creada, un recibo pagado).

Las dos páginas están en **Ajustes › Desarrolladores** y necesitan el permiso **API para desarrolladores**. La documentación técnica completa (en inglés) se abre con el botón **Documentación** de la página **API y tokens**.

## Crear un token de API

::help-video{clip="settings--api-token" caption="Crear un token de API con permisos limitados"}
::

1. Ve a **Ajustes › API y tokens** y pulsa **Nuevo token**.
2. Ponle un **Nombre** que diga para qué es (por ejemplo, "Widget de reservas").
3. Elige cuándo **Caduca**: **Nunca**, **En 30 días**, **En 90 días** o **En un año**.
4. En **Qué puede hacer**, marca solo lo que necesite la integración:
   - **Leer pacientes y sus datos de contacto**
   - **Crear y actualizar pacientes**
   - **Leer citas y disponibilidad**
   - **Reservar, reprogramar y cancelar citas**
   - **Leer clínicas, profesionales, tipos de cita y servicios**
   - **Leer facturas y pagos**
   - **Crear leads desde un formulario o plataforma de anuncios externa**
   - **Enviar mensajes de WhatsApp en nombre de la clínica**
   - **Reenviar webhooks entrantes de WhatsApp a esta clínica**
5. Si quieres, rellena **Quién lo ha hecho (opcional)**: el nombre de la integración y el contacto del desarrollador.
6. Pulsa **Crear token**.
7. Aparece **Copia el token ahora; no se vuelve a mostrar.** Pulsa **Copiar**, pégalo en la otra herramienta y pulsa **Hecho**.

> **Ten en cuenta:** trata el token como una contraseña: quien lo tenga puede leer y escribir los datos que le hayas permitido, sin iniciar sesión. Crea uno por integración, para poder revocar cada uno por separado.

En la tabla **Tokens** ves qué **Puede** hacer cada uno, su **Último uso** y cuándo **Caduca** (o **Caducado**). **Inicio rápido** enseña un ejemplo de llamada para quien vaya a programar la integración.

## Revocar un token

Pulsa **Revocar** y confirma con **Revocar token**. Todo lo que lo use deja de funcionar al momento, y no se puede reactivar: habría que crear uno nuevo.

## Ver la actividad de la API

**Solicitudes recientes** muestra las últimas 30 llamadas hechas con los tokens de tu clínica: **Cuándo**, **Solicitud**, **Resultado** y **Token**. Pulsa **Actualizar** para ver las últimas. Es lo primero que hay que mirar cuando una integración "no funciona".

## Añadir un webhook

::help-video{clip="settings--webhook" caption="Añadir un webhook que avisa cuando se crea una cita"}
::

1. Ve a **Ajustes › Webhooks** y pulsa **Añadir endpoint**.
2. En **Dirección**, pega la dirección completa que te dio la otra herramienta (tiene que empezar por https://).
3. En **Enviar cuando**, marca los eventos que le interesan:
   - **Pacientes**: **Creado**, **Actualizado**, **Eliminado**
   - **Citas**: **Creada**, **Actualizada**, **Eliminada**, **Check-in**
   - **Recibos**: **Pagado**
4. Pulsa **Añadir endpoint**.

Desde ese momento, QuiroFlow envía un aviso (un POST) a esa dirección cada vez que pasa uno de esos eventos.

## Gestionar un webhook

En la tarjeta de cada endpoint:

- El interruptor **Enviando** pausa o reanuda los avisos sin borrar nada.
- **Secreto de firma**: **Mostrar**, **Ocultar** o **Copiar**. Quien programe la integración lo necesita para comprobar que los avisos vienen de verdad de QuiroFlow (la explicación técnica está en **Comprobar que una solicitud viene de QuiroFlow**).
- **Lo enviado**: el registro de lo que se ha enviado y qué respondió la otra herramienta. Pulsa una fila para ver el contenido.
- **Cambiar** la dirección o los eventos, o **Eliminar** el endpoint (su registro se elimina con él).
