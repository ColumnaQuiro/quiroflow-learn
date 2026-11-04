---
title: Configurar la reserva online
description: Publica tu página de reservas, ponla en tu web y decide qué se puede reservar y a quién se avisa.
collection: online-booking
order: 1
---

Con la reserva online, los pacientes reservan su cita desde tu web o desde un enlace, sin llamar ni escribir. La página usa la misma disponibilidad que ves en el calendario, así que nunca ofrece una hora que ya está ocupada. Cada reserva entra en la agenda al momento y el paciente recibe su confirmación.

Se configura en **Ajustes › Clínica › Reserva online**. Necesitas los permisos **Entrar en Ajustes** y **Clínica y agenda**.

## Publicar tu página

Arriba de la página verás si está lista: «Tu página de reservas está activa» o «Aún no se puede reservar nada», y en cuántas clínicas y para cuántos tipos de cita se puede reservar.

1. En **Dónde y qué se puede reservar**, activa **Reserva online en** cada clínica que quieras ofrecer. El horario es el de cada clínica (**Editar horario**).
2. Revisa la lista de **Tipos de cita**: cada uno aparece como **online** o **no online**. Es cada tipo de cita el que decide si se reserva online, con cuánta antelación y si se paga al reservar; se cambia en **Ajustes › Tipos de cita** (consulta [Tipos de cita y servicios](/es/articles/settings/appointment-types-and-services)).
3. Pulsa **Guardar cambios**.

## Compartir el enlace y verla

::help-video{clip="booking--copy-link-open" caption="Copiar el enlace de reservas y abrir la página"}
::

1. En la tarjeta de arriba, en **Enlace**, pulsa **Copiar**. Ese enlace se puede poner en Instagram, en Google o en un WhatsApp.
2. Pulsa **Abrir página** para verla como la ve un paciente.

## Ponerla en tu web

En **Insertar en tu web** tienes el **Código para insertar en tu web**. Pulsa **Copiar** y pégalo en la página de tu web donde quieras que aparezca la reserva. Quien lleve tu web lo hace en un minuto.

> **Ten en cuenta:** el código incluye un script que distingue las reservas que vienen de anuncios de pago (Google, Meta) del resto, para que Crecimiento sepa de dónde vino cada paciente. Si ya insertaste la reserva a mano, basta con añadir la etiqueta script.

## Lo que hace el paciente

::help-video{clip="booking--book-as-patient" caption="Reservar una primera visita desde la página pública, en el móvil"}
::

1. Elige la **Clínica** (si hay varias) y el **Servicio**.
2. En **Elija un profesional**, elige uno o **Cualquier profesional**.
3. En **Elija su fecha y hora**, elige el día en el calendario y una hora de la mañana o de la tarde.
4. En **Introduzca sus datos**, escribe **Nombre**, **Apellidos**, **Correo electrónico** y **Número de móvil** (y, si quiere, **Notas**, un **Código de descuento** o **Tengo un bono regalo**).
5. Pulsa **Reservar cita**. Verá «¡Cita reservada!» y la invitación a descargar la app.

Si el tipo de cita se paga al reservar, verá el paso **Pago**. Si la clínica pide una tarjeta para garantizar la cita, verá «Tu cita está reservada · Para garantizarla, añade una tarjeta. No se cobra nada ahora.». Las clases muestran las plazas que quedan y, si están completas, **Apuntarme a la lista de espera**.

> **Ten en cuenta:** la página pública trata al paciente de usted y está en español, inglés o francés según su navegador (o el selector de idioma, si lo muestras).

## Que la clínica se entere: avisos

En **Avisar a la clínica de las reservas**, escribe un correo (**Por correo**) y/o un número (**Por WhatsApp**, en formato +34…). El aviso se envía en cuanto un paciente reserva. Si ese número no ha escrito a la clínica en 24 horas, WhatsApp solo entrega la plantilla **Aviso de reserva (al personal)** que elijas en **Ajustes › Comunicación › WhatsApp**.

## Medir anuncios: seguimiento

En **Seguimiento**:

- **Google Tag Manager**: el identificador de tu contenedor (GTM-…). Se carga en la página de reservas. Déjalo vacío si no tienes anuncios.
- **Página de agradecimiento**: si quieres que, al reservar, el paciente vaya a una página de tu web (para registrar allí la conversión) en lugar de la confirmación de QuiroFlow. A la dirección se le añaden la reserva, el tipo, el importe y la moneda.

Pulsa **Guardar cambios** al terminar. Para el aspecto, los textos, la antelación y los códigos de descuento, consulta [Personalizar la página de reservas](/es/articles/online-booking/customizing-the-booking-page).
