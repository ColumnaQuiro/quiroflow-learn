---
title: Gestionar tus clínicas
description: Añade sedes y completa cada una -- dirección y contacto, horario de apertura, zona horaria, datos fiscales, logotipo -- y archívalas cuando cierran.
collection: settings
order: 2
---

En QuiroFlow, cada centro desde el que trabajas es una **sede** (una clínica). Tu cuenta empieza con la que creaste al registrarte y puedes añadir más. Cada sede tiene su propio horario, sus cierres y festivos, su contacto, su zona horaria, sus salas y su portal de llegada. Todo se gestiona en **Ajustes › Clínicas**.

Necesitas el permiso **Clínica y agenda**.

## La lista de clínicas

Cada tarjeta enseña lo esencial: si tiene **Reserva online**, si es la que **Emite las facturas**, si **Falta el NIF**, el horario de hoy (**Hoy cerrada**, **Sin horario**…), el teléfono y la dirección. Pulsa una para abrir su página.

Si tu plan tiene un límite de sedes, arriba ves cuántas usas. Durante la prueba gratuita no hay límite.

Quién trabaja en cada sede no se decide aquí, sino en la ficha de cada persona, en **Ajustes › Equipo** (**Sedes**).

## Añadir una sede

::help-video{clip="settings--add-clinic" caption="Añadir una segunda sede y completar su dirección"}
::

1. Pulsa **Añadir sede**.
2. Escribe el **Nombre** (lo ve tu equipo en el selector de clínica y los pacientes en la reserva online) y elige la **Zona horaria**.
3. Pulsa **Añadir sede**. Se abre su página.
4. Completa la **Dirección**, el **Teléfono** y el **Email**, y pulsa **Guardar cambios**.
5. No olvides el **Horario** (más abajo): una sede sin horario no ofrece huecos a la reserva online.

Si tu plan ya no incluye más sedes, verás **Tu plan no incluye más sedes** con **Ver planes**. Consulta [Tu suscripción](/es/articles/settings/subscription).

## La página de cada sede

La página está dividida en secciones: **La sede**, **Contacto**, **Horario**, **Cierres**, **Zona horaria**, **Datos fiscales**, **Logotipo**, **Portal de llegada** y **Cerrar la sede**. Un único **Guardar cambios** guarda los campos; los cierres, el logotipo y el portal de llegada se guardan solos en cuanto los cambias.

### La sede y el contacto

- **Dirección**: aparece en tus facturas y recibos, y en la reserva online.
- **Teléfono** y **Email**: se muestran al paciente cuando reserva online y al pie de los emails de confirmación y recordatorio. Tus plantillas de WhatsApp y de emails automáticos pueden usarlos como **Teléfono de la clínica** y **Dirección de la clínica**. Déjalos vacíos si no quieres mostrarlos.

### Horario de apertura

::help-video{clip="settings--clinic-hours" caption="Poner el horario de apertura de la clínica"}
::

1. En **Horario**, activa cada día que abrís y pon la hora de apertura y de cierre.
2. Para cerrar a mediodía, pulsa **+ Tramo** y añade el tramo de la tarde.
3. **Copiar el lunes a martes–viernes** repite el lunes en el resto de la semana.
4. Pulsa **Guardar cambios**.

Es el horario por defecto: lo usan el calendario, la reserva online cuando el paciente elige "cualquier profesional", la API y todos los profesionales que no tengan horario propio. Debajo, QuiroFlow te dice cuántos profesionales de esa sede tienen horario propio; para ellos manda el suyo, no este. Consulta [Horario de un profesional](/es/articles/team-roles/practitioner-working-hours).

### Cierres y festivos

Los días enteros en que la sede cierra (festivos, vacaciones de la clínica) se explican en [Festivos y cierres](/es/articles/settings/holidays-and-closures).

### Zona horaria y franja del calendario

- **Zona horaria**: decide las horas que ofrece la reserva online y la hora que aparece en los emails de confirmación y recordatorio. Cambiarla no mueve ninguna cita: cada una conserva su momento exacto.
- **Franja del calendario**: cada cuánto se divide la cuadrícula del calendario (10, 15, 20, 30 o 60 minutos). Con 15 min verás 9:00, 9:15, 9:30… No cambia lo que dura una cita: eso lo deciden los tipos de cita.

### Datos fiscales

**Razón social**, **NIF / CIF** y **Pie de factura**. Toda la cuenta es un solo contribuyente: todas las facturas llevan la razón social y el NIF de la primera sede que creaste, sea cual sea la sede que las emite. En las demás sedes verás que sus facturas se emiten con los datos de esa primera sede; lo que cambia por sede es la dirección, el pie y el logotipo. Sin NIF no se pueden emitir facturas. Consulta [Recibos y facturas](/es/articles/invoices-verifactu/receipts-and-invoices).

### Logotipo

Pulsa **Subir** (o **Sustituir**). Se guarda al momento y se muestra en las facturas y en la página de reserva online.

### Portal de llegada

Una tablet en recepción donde los pacientes avisan de que han llegado. Se activa y se configura aquí, por sede; cómo funciona se explica en [Registrar la llegada](/es/articles/calendar-appointments/check-in).

## Cerrar una sede

En **Cerrar la sede** tienes dos opciones:

- **Archivar…**: para una sede que ya no usáis. Desaparece del selector de clínica, del calendario y de la reserva online, pero sus citas, pacientes y facturas se conservan, y puedes reactivarla cuando quieras desde **Archivadas** en la lista.
- **Eliminar…**: solo para una sede sin ninguna cita, como una creada por error. Se elimina del todo con sus salas y cierres; sus pacientes se quedan, sin sede asignada.

> **Ten en cuenta:** si la sede tiene citas a partir de hoy, muévelas a otra sede o cancélalas antes de archivar, para que ningún paciente se quede con una cita en una sede cerrada. No puedes archivar tu única sede activa, ni eliminar la sede cuyos datos fiscales van en las facturas.
