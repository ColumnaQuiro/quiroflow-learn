---
title: Archivar, eliminar y anular citas futuras
description: Qué hacer cuando un paciente deja de venir, cuándo se puede eliminar una ficha y cómo anular de una vez todas sus citas pendientes.
collection: patients
order: 7
---

Cuando un paciente deja de venir, lo normal es **archivarlo**, no eliminarlo: desaparece de la lista de activos y deja de entrar en **Recordatorios** y en los envíos a segmentos, pero conservas su historia clínica y sus cobros, que la ley te obliga a guardar. Eliminar una ficha es para errores (una ficha de prueba, alguien dado de alta por equivocación) y QuiroFlow no deja eliminar la de un paciente con facturas emitidas.

Todo se hace desde el menú **Más acciones** (⋯) de la ficha.

## Archivar a un paciente

1. Abre la ficha y pulsa **Más acciones** (⋯) › **Archivar paciente**.
2. Verás el aviso **Paciente archivado** y la etiqueta **Archivado** en la cabecera.

El paciente pasa a **Inactivo**: ya no sale en la lista de pacientes (salvo que filtres por **Inactivo** o **Cualquier estado**), no entra en la lista de **Recordatorios** para recuperar pacientes ni en las automatizaciones y campañas que van a un segmento. Su ficha sigue intacta. Para deshacerlo, pulsa **Más acciones** › **Desarchivar paciente**.

> **Ten en cuenta:** archivar no anula las citas que ya tenga reservadas, y esas citas siguen enviando sus avisos. Si deja el tratamiento, anúlalas también (más abajo).

> **Ten en cuenta:** archivar es lo mismo que cambiar el **Estado** a **Inactivo** en **Editar todos los datos**; solo es más rápido.

## Eliminar una ficha

::help-video{clip="patients--delete" caption="Eliminar una ficha creada por error"}
::

1. Abre la ficha y pulsa **Más acciones** (⋯) › **Eliminar paciente**.
2. El cuadro te dice todo lo que se borrará con ella: cuántas citas, recibos y archivos. Las notas clínicas y los mensajes se eliminan junto con las citas a las que pertenecen.
3. Para confirmar, escribe el nombre completo del paciente tal como aparece (**Escribe … para confirmar**).
4. Pulsa **Eliminar permanentemente**.

No se puede deshacer.

### Cuándo no se puede eliminar

::help-video{clip="patients--delete-refused" caption="Una ficha con facturas no se puede eliminar: se archiva"}
::

Si el paciente tiene **facturas emitidas**, verás **Esta ficha no se puede eliminar**. Las facturas son registros fiscales firmados en cadena conforme a VeriFactu: borrar una rompería la cadena de todas las posteriores. Lo mismo ocurre si tiene visitas facturadas a una aseguradora o empresa, porque lo que debe un tercero a la clínica se conserva.

En ese caso, pulsa **Archivar en su lugar**: la ficha se archiva y deja de molestar en la lista.

> **Ten en cuenta:** si lo que tienes es una ficha duplicada, no la elimines: fusiónala con la buena para no perder nada. Consulta [Fusionar fichas duplicadas](/es/articles/patients/merging-patients).

## Anular todas sus citas futuras

Cuando un paciente deja el tratamiento, puedes anular todas sus citas pendientes de una vez en lugar de ir una por una en el calendario.

::help-video{clip="patients--cancel-future" caption="Anular todas las citas futuras de un paciente"}
::

1. Abre la ficha y pulsa **Más acciones** (⋯) › **Anular citas futuras**.
2. Verás la lista de sus citas desde hoy. Quedan en su historial como canceladas, no se cobra tarifa de cancelación y los huecos quedan libres en la agenda.
3. Si quieres que el paciente se entere, marca **Avisar al paciente**: tu automatización de «cita cancelada» se ejecuta **una sola vez**, sobre la cita más próxima (un mensaje, no uno por cita).
4. Pulsa **Anular N citas** (o **No anular** para salir sin cambios).

## Exportar sus datos (RGPD)

Si un paciente ejerce su derecho de acceso, el propietario de la clínica puede descargar todo lo que hay sobre él desde **Más acciones** › **Exportar sus datos (RGPD)**. QuiroFlow prepara un ZIP (datos personales, citas, historia clínica, facturación, documentos firmados, comunicaciones y registro de accesos) y lo descarga; el enlace de descarga vale una hora. La exportación queda anotada en el **Registro de actividad**. Más detalles en [Conservación de datos y privacidad](/es/articles/security-privacy/data-retention).

## Quién puede hacer qué

- **Archivar paciente** y **Anular citas futuras**: permiso **Editar datos de pacientes**.
- **Eliminar paciente**: permiso **Eliminar y fusionar pacientes**.
- **Exportar sus datos (RGPD)**: solo los propietarios de la clínica.
