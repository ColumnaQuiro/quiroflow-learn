---
title: Exportaciones de datos
description: Descarga la lista de pacientes en CSV, o encuentra fichas a las que les falta un teléfono, un correo, un consentimiento o una próxima cita.
collection: reports
order: 14
---

**Exportaciones de datos** sirve para dos cosas: sacar la lista de pacientes a un CSV que se abre en Excel, y encontrar fichas con huecos que merece la pena completar (pacientes sin teléfono, sin consentimiento firmado, sin próxima cita…). Lo encuentras en **Informes › Datos**.

::help-video{clip="reports--data-exports" caption="Exportar los pacientes sin próxima cita a un CSV"}
::

## Generar una exportación

1. Abre **Informes › Exportaciones de datos**.
2. En **Generar nueva exportación**, deja **Tipo de datos** en **Pacientes**.
3. Si quieres, elige un **Periodo de creación**: filtra por la fecha en que se creó la ficha de cada paciente. **Borrar (todo el tiempo)** lo quita.
4. Marca los **Filtros** que necesites:
   - **Sin correo**
   - **Sin número de teléfono**
   - **Sin formulario de consentimiento**
   - **Sin formulario de protección de datos**
   - **Sin próxima cita**
   - **El paciente tiene un pago pendiente**
   - **Edad**, con **Mín.** y **Máx.**

   Mientras eliges, la página dice cuántos pacientes coinciden «ahora mismo».
5. Pulsa **Generar exportación**. El CSV se descarga al momento y queda en **Generado en esta sesión**, con sus filtros y el número de filas, por si lo quieres descargar otra vez con **Descargar CSV**.

## Qué lleva el CSV

Una fila por paciente con: **Nombre**, **Apellidos**, **Correo electrónico**, **Teléfono**, **Fecha de nacimiento**, **Edad**, **Profesional** (o **Sin asignar**), **Saldo (€)**, **Tiene próxima cita**, **Formulario de protección de datos firmado**, **Formulario de consentimiento firmado**, **Estado**, **Etiquetas** e **ID**.

**Cómo se decide cada filtro.**
- **Sin formulario de consentimiento** / **de protección de datos**: el paciente no tiene completado ningún documento de una plantilla de esa categoría. Si tus plantillas no tienen categoría, todos los pacientes salen como que les falta (ver [Documentos del paciente](/es/articles/patients/patient-documents)).
- **Sin próxima cita**: no tiene ninguna cita futura que no esté cancelada.
- **El paciente tiene un pago pendiente**: su saldo es negativo, es decir, debe dinero.

Debajo, **Pacientes por profesional** cuenta cuántos pacientes tiene asignados cada profesional, y cuántos están **Sin asignar**.

> **Ten en cuenta:** por ahora solo se puede exportar **Pacientes**. Los demás tipos del desplegable (citas, planes de cuidados, notas de tratamiento, formularios, archivos) aparecen, pero el botón no se activa con ellos.

> **Ten en cuenta:** **Generado en esta sesión** se vacía al salir de la página; los archivos ya descargados siguen en tu ordenador. Cada exportación queda anotada en el registro de actividad de la clínica, que ven los propietarios (ver [Registro de actividad](/es/articles/security-privacy/activity-log)).

> **Ten en cuenta:** un CSV con datos de pacientes es información personal. Guárdalo en un sitio seguro y bórralo cuando ya no lo necesites. Exportaciones de datos no aparece para los roles con **Solo sus propios datos**.
