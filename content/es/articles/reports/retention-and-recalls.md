---
title: Retención y Recuperaciones
description: Quién vuelve tras su primera visita, quién sale con la siguiente reservada, quién deja su plan a medias y por qué, y qué recuperan las automatizaciones.
collection: reports
order: 8
---

Dos informes de **Informes › Crecimiento y rendimiento** sobre los pacientes que vuelven. **Retención** responde a «¿vuelven los pacientes y terminan lo que empiezan?». **Recuperaciones** responde a «de los pacientes a los que escribimos para que vuelvan, ¿cuántos vuelven?».

## Retención

::help-video{clip="reports--retention" caption="El informe de Retención: cifras de arriba, primeras visitas por mes y por profesional"}
::

1. Abre **Informes › Retención**. Se abre con los últimos 12 meses.
2. Cambia el periodo o filtra por profesional o clínica si quieres.
3. Repasa las tarjetas de arriba y baja por las secciones.

### Las cifras de arriba

- **Pacientes nuevos**: pacientes cuya primera visita de siempre cayó en el periodo. Un paciente que vuelve tras un año no cuenta como nuevo.
- **Volvieron**: de esos pacientes nuevos, el porcentaje que tuvo una segunda visita.
- **Siguen a los 3 meses**: de los nuevos cuya primera visita fue hace al menos 90 días, el porcentaje que tuvo alguna visita 90 días o más después de la primera.
- **Salieron con la siguiente reservada**: de las visitas del periodo, el porcentaje en que el paciente tenía otra cita reservada antes de acabar el día de la visita.

### Las secciones

- **Recuperación**: los pacientes a los que alguien llamó o escribió en el periodo (desde Recordatorios, o con el WhatsApp de esta misma página) y cuántos reservaron en los 30 días siguientes. Los contactados hace menos de 30 días que aún no han reservado salen como «aún por ver». Solo aparece si tu rol tiene el permiso **Recordatorios, lista de espera y alertas de plan** y hay contactos registrados.
- **Por qué dejaron de venir**: los motivos de baja registrados en el periodo (por ejemplo **Mejoró**, **Precio**, **Sin tiempo**), con su **Peso** y, por profesional, cuántas **Bajas** y qué **Motivos**. Cada baja cuenta para el profesional y la clínica de la última visita del paciente. Los motivos se configuran en Ajustes › Recordatorios.
- **Planes sin terminar**: los planes de cuidado con visitas pendientes, nada reservado y pasada la fecha que marcaba su frecuencia. No depende del periodo de arriba: es lo que está atrasado hoy. Ver [Planes de cuidado](/es/articles/clinical/care-plans).
- **Por mes de la primera visita**: una fila por mes con los **Nuevos**, cuántos **Volvieron** y qué porcentaje seguía viniendo a los **3 meses** y a los **6 meses**. Un mes demasiado reciente para saberlo muestra un guion.
- **Por profesional**: por cada profesional, sus **Visitas** del periodo, el porcentaje que **Reservaron** de nuevo antes de acabar el día y el porcentaje que **Volvieron en 30 días** (solo para visitas de hace al menos 30 días).

### Escribir por WhatsApp a quien dejó su plan

1. En **Planes sin terminar**, marca los pacientes con la casilla, o pulsa **Seleccionar todos**.
2. Pulsa **WhatsApp a N**. Si alguno no tiene teléfono, la barra lo dice («N sin teléfono, se salta»).
3. En **Enviar WhatsApp a…**, elige la plantilla de WhatsApp, rellena lo que pida y pulsa **Enviar a…**. Es el mismo envío masivo que en Recordatorios (ver [Recordatorios](/es/articles/calendar-appointments/recalls)).

> **Ten en cuenta:** con un profesional elegido, «quién volvió» se sigue mirando en todas sus visitas, sea con quien sea. Un paciente nuevo de Álex que vuelve con Inés cuenta como que volvió.

## Recuperaciones

::help-video{clip="reports--recalls" caption="Lo que ha recuperado una automatización: contactados, respuestas y reservas"}
::

**Recuperaciones** mide las automatizaciones que escriben a pacientes para que vuelvan (ver [Automatizaciones](/es/articles/communications/automations)).

1. Abre **Informes › Recuperaciones** y elige el periodo.
2. En **Reglas**, deja marcadas las automatizaciones que quieras medir. Vienen marcadas las de recuperación; puedes añadir otras.
3. Lee las cifras y la tabla **Por regla**.
4. Abajo, en **Pacientes**, filtra por estado y llama a quien respondió y no reservó.

**Qué cuenta.** El informe toma los mensajes enviados por esas reglas en el periodo (por WhatsApp o correo, sin contar los fallidos) y mira qué pasó en los **30 días** siguientes a cada uno:

- **Contactados**: pacientes a los que llegó el mensaje, cada uno contado una vez.
- **Respondieron**: los que contestaron por WhatsApp.
- **Reservaron**: los que tienen una cita nueva, no cancelada, creada en esos 30 días. Debajo, cuántos **vinieron** y cuántas reservas hizo la recepcionista IA.
- **Valor estimado**: el precio de las visitas reservadas, según el precio de su tipo de cita. Es una estimación, no dinero cobrado.

En la tabla **Por regla** también ves cuántos pidieron **No contactar**. En la lista de **Pacientes**, cada uno tiene su estado: **Reservó**, **Respondió, sin reservar**, **No contactar**, **Aún sin respuesta** (todavía dentro de sus 30 días) o **Sin respuesta**. Desde **Conversación** abres el chat.

> **Ten en cuenta:** Recuperaciones es de toda la clínica: no se filtra por profesional y no aparece para los roles con **Solo sus propios datos**.
