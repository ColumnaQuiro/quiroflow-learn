---
title: La ficha de un paciente
description: Qué contiene la página de un paciente, y cómo añadir uno nuevo.
collection: patients
order: 1
---

## Añadir un paciente

La forma más rápida es directamente desde el Calendario al reservar una cita -- búscalo, y si no aparece, añádelo sin salir del panel de reserva (nombre, apellidos, correo, teléfono). Es el camino que más usa el personal en el día a día, ya que convierte "un paciente nuevo llama para reservar" en un único flujo en lugar de dos pasos separados.

También puedes ir a **Patients** y añadir uno directamente, con más campos disponibles (fecha de nacimiento, documento de identidad, dirección, fuente de referencia, idioma preferido, y más) -- útil cuando das de alta a un paciente antes de su primera visita y ya tienes todos sus datos a mano, en lugar de justo lo necesario para meterlo en el calendario.

## La página del paciente

Abre cualquier paciente para ver su ficha completa, organizada en pestañas:

- **Overview** -- datos de contacto, flags, plan de tratamiento y resumen de cuenta de un vistazo.
- **Appointments** -- su historial completo de visitas y las próximas reservas.
- **Visit notes** -- notas clínicas registradas por los profesionales, una por visita. Consulta [Notas de visita](/es/articles/patients/visit-notes).
- **Billing** -- facturas, pagos, bonos, membresías y tarjetas guardadas. Consulta la colección **Facturación y pagos**.
- **Communications** -- todos los mensajes enviados a este paciente o recibidos de él.
- **Docs** -- formularios y documentos enviados para que los rellene o firme; consulta [Enviar formularios y documentos a un paciente](/es/articles/patients/patient-documents).
- **Files** -- archivos subidos (fotos, informes, etc).

![Pestaña Overview de un paciente mostrando estadísticas de visitas, plan de tratamiento, datos de contacto y actividad reciente](/screenshots/patient-overview.png)

La fila de estadísticas de la pestaña Overview -- **Visits (12mo)**, **Attendance**, **Last visit**, **Lifetime value** -- es la forma más rápida de hacerte una idea de un paciente de un vistazo antes de abrir cualquier otra pestaña: un porcentaje de asistencia bajo o un valor de vida que ha caído puede merecer un Recall, por ejemplo.

## Patient note

Distinta de Flags, la tarjeta **Patient note** de Overview es un único campo de texto libre para cualquier cosa que sea cierta sobre el paciente en general -- historial de admisión, precauciones continuas, contexto que merece la pena leer antes de su primera sesión con un profesional nuevo. Selecciona **Edit** para escribirla o actualizarla. A diferencia de las [Notas de visita](/es/articles/patients/visit-notes), no está ligada a una fecha o cita concreta -- solo existe una, y editarla sobrescribe lo que había antes, así que es para contexto permanente y no para un registro continuo.

## Flags

La tarjeta **Flags** de Overview muestra de un vistazo cualquier cosa que el personal deba saber -- cosas como "no contactar", condición de menor de edad, u otros marcadores de la cuenta. Selecciona **Edit** para cambiarlos. Como es lo primero visible en la página, es el lugar adecuado para cualquier cosa que deba cambiar cómo el personal trata al paciente antes incluso de abrir otra pestaña -- no detalle clínico, que pertenece a Visit notes, ni contexto general, que pertenece a la Patient note de arriba.

## Pacientes duplicados

Si la misma persona acaba con dos fichas -- un paciente sin cita previa creado antes de darse cuenta de que ya había llamado antes, una importación CSV que no coincidió con una ficha existente -- evita simplemente eliminar una, ya que se lleva consigo su historial de citas, facturación y documentos. Fusionar y eliminar pacientes son ambas acciones sujetas a permisos (consulta **Roles & Permissions** en [Roles y permisos](/es/articles/team-roles/roles-and-permissions)); si te encuentras duplicados con frecuencia, consulta con quien tenga acceso de Owner o Front Desk cuál es la forma correcta de consolidarlos en tu cuenta.

## Desactivar vs. eliminar

Si un paciente deja de venir a tu clínica, selecciona **Edit** en **Patient details** y cambia **Status** a **Inactive** en lugar de eliminar la ficha -- esto mantiene intacto todo su historial de facturación y visitas, algo importante tanto para la contabilidad como para el caso poco frecuente de que vuelva más adelante. El mismo panel de edición tiene dos casillas relacionadas que conviene conocer: **This patient is under age** (para gestionar el consentimiento parental) y **Do not contact**, que bloquea directamente todas las comunicaciones y recalls hacia ese paciente -- úsala con cualquiera que haya pedido no recibir mensajes, en lugar de confiar en que el personal se acuerde de no escribirle.
