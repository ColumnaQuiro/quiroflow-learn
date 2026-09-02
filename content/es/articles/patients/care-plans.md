---
title: Configurar un plan de tratamiento
description: Haz seguimiento del plan de visitas previsto para un paciente.
collection: patients
order: 3
---

Un plan de tratamiento (care plan) hace seguimiento del plan de cuidado previsto para un paciente -- por ejemplo, "10 visitas, cada 2 semanas" -- y muestra el progreso directamente en su pestaña Overview, para que cualquiera que abra al paciente vea en qué punto está sin tener que rebuscar en el historial de citas.

![Tarjeta Care Plan mostrando "Wellness Plan, 1 of 10 visits, every 2 weeks" con una barra de progreso](/screenshots/patient-overview.png)

## Crear uno

En la pestaña **Overview** del paciente, busca la tarjeta **Care Plan** y selecciona **Add plan** (o **Edit** si ya existe uno).

Dale un nombre, el número total de visitas previstas, y cada cuánto se esperan (por ejemplo, cada 1 o 2 semanas). QuiroFlow hace seguimiento de las visitas completadas contra el plan automáticamente conforme se marcan las citas como completadas, mostrando una barra de progreso sencilla tipo "3 of 10 visits" -- no hay nada más que registrar manualmente mientras el paciente avanza.

## Por qué es útil

Un plan de tratamiento es informativo -- no bloquea la reserva ni la facturación, y un paciente puede seguir reservando una visita fuera del ritmo previsto del plan -- pero es una forma rápida de que tanto el personal como los profesionales vean si un paciente va según lo previsto, se está retrasando, o está por terminar su tratamiento. También es un buen punto de partida para una conversación en recepción: un paciente que va "3 de 10, cada 2 semanas" pero no ha venido en un mes merece un contacto rápido antes de que formalmente entre en un Recall por retraso.

## Cuando un plan termina

No hay ninguna acción automática cuando un paciente completa todas sus visitas previstas -- QuiroFlow no reserva un seguimiento ni envía un mensaje por su cuenta. Trata un plan completado como un punto de control natural para tener esa conversación directamente con el paciente (continuar el mismo plan, empezar uno nuevo, o dar por finalizado el tratamiento), y selecciona **Edit** para configurar lo que venga después.

## Un plan a la vez

Un paciente tiene un único plan de tratamiento activo a la vez -- si su enfoque de tratamiento cambia a mitad de camino, edita el plan existente en lugar de intentar llevar dos en paralelo. Si necesitas un registro histórico de un plan completado antes de empezar uno nuevo, anótalo primero en Visit notes, ya que editar sobrescribe los detalles del plan actual en lugar de archivarlos.
