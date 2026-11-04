---
title: Tipos de cita y servicios
description: Crea lo que se reserva -- duración, precio, color, etapa, reserva online, señal y precios por profesional -- y los servicios que cobras aparte.
collection: settings
order: 4
---

Un **tipo de cita** es lo que se reserva en tu agenda: "Primera visita", "Ajuste", "Revisión", "Fisioterapia"… Cada uno tiene su duración, su precio, su color en el calendario y sus propias reglas para la reserva online. Los gestionas en **Ajustes › Tipos de cita**.

Necesitas el permiso **Clínica y agenda**.

## Crear un tipo de cita

::help-video{clip="settings--new-type" caption="Crear un tipo de cita y elegir su etapa y su color"}
::

1. Pulsa **Nuevo tipo**. Se abre **Nuevo tipo de cita**.
2. Escribe el **Nombre**, la **Duración (min)** (entre 5 y 480) y el **Precio (€)**.
3. Si ya quieres ofrecerlo en tu página de reservas, activa **Reservable online desde ya**.
4. Pulsa **Crear y completar**. Se abre la página del tipo.
5. Elige el **Color en el calendario** y la **Etapa del tratamiento**, y pulsa **Guardar cambios**.

## La página de cada tipo

Cada tipo tiene secciones: **El tipo de cita**, **Reserva online**, **Por profesional**, **Dónde se usa** y **Archivar o eliminar**. Un solo **Guardar cambios** guarda todo.

### El tipo de cita

- **Nombre**, **Duración** y **Precio** (lo que se cobra al cerrar la cita; 0 si no se cobra).
- **Color en el calendario**.
- **Etapa del tratamiento**: primera visita, primera visita con oferta, informe, revisión, mantenimiento, ajuste u otra. Sirve para el informe de Estadísticas: sin etapa, estas citas no cuentan ahí, y la lista te lo recuerda con **Sin etapa: no cuenta en Estadísticas**.
- **Clase en grupo**: pon un número de plazas (entre 2 y 200) para convertir el tipo en una clase. Consulta [Agenda y citas](/es/articles/calendar-appointments).
- **Nota para el equipo**: se muestra al equipo al reservar este tipo y en cada visita (por ejemplo, "revisar pagos"). Los pacientes no la ven nunca.
- **Solo para menores de 18** y **Solo para referidos de un paciente**: son para la recepcionista IA, que solo ofrece estos tipos en esos casos. La página de reservas no pregunta ni la edad ni quién te recomienda, así que no los actives para la reserva online.

### Reserva online

::help-video{clip="settings--type-online" caption="Abrir un tipo a la reserva online solo para pacientes nuevos"}
::

1. Activa **Se puede reservar online**: el tipo aparece en tu página de reservas y en la app de pacientes.
2. En **Quién puede reservarlo**, elige **Todos**, **Solo pacientes nuevos** o **Solo pacientes actuales**. "Nuevos" son quienes nunca han tenido una cita; se comprueba por email y teléfono al reservar.
3. Activa **El paciente no elige profesional** si prefieres que se le asigne el primero libre (útil para primeras visitas).
4. En **Con cuánta antelación se puede reservar**, pon un máximo de días, o déjalo vacío para usar el de la clínica (**Ajustes › Reserva online**).
5. **Pago al reservar** cobra con tarjeta al reservar; en **Señal** pones cuánto (si lo dejas vacío, se cobra el precio completo). Necesita tener Stripe conectado: consulta [Conectar Stripe](/es/articles/settings/connecting-stripe).
6. Pulsa **Guardar cambios**.

> **Ten en cuenta:** la señal no puede ser mayor que el precio. El resto se cobra en la clínica.

### Por profesional

::help-video{clip="settings--type-per-practitioner" caption="Dar a un profesional su propia duración y precio"}
::

- **Quién lo hace**: marca quién hace este tipo. A los pacientes solo se les ofrecen horas con esas personas, en la página de reservas, por la API y con la recepcionista IA. Si no marcas a nadie, lo hacen todos.
- Si alguien tarda o cobra distinto, rellena su **Duración (min)** y su **Precio (€)** en la tabla. Vacío: usa la duración y el precio de arriba. Lo usan el calendario, la reserva online, la app de pacientes y la API.

> **Ten en cuenta:** **Quién lo hace** no te limita a ti en la agenda: desde el calendario puedes seguir reservando este tipo con cualquiera.

### Dónde se usa

Antes de cambiar o archivar un tipo, mira aquí cuántas citas lo usan (y cuántas son a partir de hoy), cuántos pacientes esperan un hueco de este tipo en la lista de espera, qué automatizaciones filtran por él y si la recepcionista IA lo ofrece.

## Ordenar los tipos

El orden de la lista es el que se ve en el calendario y en la reserva online, y el primero es el que se propone al crear una cita. Arrastra cada tipo por su asa o usa las flechas para subirlo o bajarlo.

## Archivar o eliminar un tipo

- **Archivar…**: deja de ofrecerse en el calendario, la reserva online y los selectores, pero sigue en sus citas, en los informes y en los cobros. Lo reactivas desde **Archivados** en la lista.
- **Eliminar…**: solo para un tipo que ninguna cita haya usado. Se elimina del todo con sus precios por profesional.

> **Ten en cuenta:** dos tipos activos no pueden llamarse igual. Si quieres reactivar uno archivado y ya hay otro activo con su nombre, cambia antes el nombre de uno de los dos.

## Servicios

Los **servicios** son lo que cobras además de las citas: un informe clínico, una plantilla, un vendaje… Se ofrecen en los recibos rápidos y al cobrar una cita. Están en **Ajustes › Servicios y productos** y necesitan el permiso **Facturación**.

1. Escribe el nombre en **Añade un servicio, ej. Informe clínico** y su **Precio (€)**.
2. Pulsa **Añadir**.

Con el lápiz cambias el nombre o el precio; un precio nuevo se aplica a partir de ahora y los recibos ya hechos conservan el suyo. Un servicio que ya se ha cobrado se puede renombrar, pero no eliminar, para que el informe de ingresos lo siga contando. La página también te recuerda con qué IVA se emiten tus facturas. Para los productos con stock, los bonos y el resto del catálogo, consulta [Cobros y pagos](/es/articles/billing-payments).
