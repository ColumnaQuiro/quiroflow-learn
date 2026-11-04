---
title: Campos personalizados
description: Añade tus propios campos a la ficha del paciente, clínicos o administrativos, y úsalos en tus plantillas de documentos.
collection: settings
order: 7
---

Si necesitas guardar algo de tus pacientes que QuiroFlow no trae de serie (el deporte que practica, si es diestro o zurdo, su mutua, cómo prefiere que le llamen), créalo como **campo personalizado**. Hay dos tipos:

- **Clínicos**: en la pestaña **Clínico** de la ficha. Solo los ven los roles con acceso clínico, como las notas de visita.
- **Administrativos**: en **Datos del paciente**, para todos los que ven al paciente.

Cada campo sirve también como campo de combinación en tus plantillas de documentos.

Necesitas el permiso **Clínica y agenda**.

## Crear un campo

::help-video{clip="settings--custom-field" caption="Crear un campo de selección y pedirlo al añadir un paciente"}
::

1. Ve a **Ajustes › Campos personalizados** y pulsa **Añadir campo**.
2. Escribe el **Nombre** (por ejemplo, "Deporte que practica").
3. Elige la **Sección**: clínica o administrativa.
4. Elige el **Tipo**: **Texto corto**, **Texto largo**, **Número**, **Fecha**, **Sí / no** o **Selección única**. Para una selección única, escribe las **Opciones, una por línea** (al menos dos).
5. Pulsa **Guardar**.

Si quieres que recepción lo rellene al añadir un paciente, actívalo en **Ajustes › Campos de nuevo paciente** como **Opcional** u **Obligatorio**. Consulta [Campos de paciente nuevo y fuentes de referencia](/es/articles/settings/patient-intake-fields).

## Ordenar, cambiar y archivar

- Con las flechas cambias el orden en que aparecen en la ficha.
- Con el lápiz cambias el nombre o las opciones. Cambiar una opción no modifica las respuestas ya dadas.
- Con el icono de archivar lo retiras. En **Archivados** puedes **Restaurar** un campo, o **Eliminar** si ningún paciente lo ha respondido.

> **Ten en cuenta:** cuando un campo ya tiene respuestas, su tipo no se puede cambiar y solo se puede archivar, no eliminar.

Para usarlo en un consentimiento o un informe, consulta [Documentos y consentimientos](/es/articles/patients/patient-documents).
