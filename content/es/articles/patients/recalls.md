---
title: Recordatorios (Recalls) -- recuperar pacientes
description: La lista de pacientes sin cita futura, y cómo trabajarla.
collection: patients
order: 5
---

**Recalls** es una lista en vivo, mantenida automáticamente, de pacientes que no tienen ninguna cita futura reservada -- no requiere ninguna configuración previa para empezar a usarla, ya que se construye directamente a partir de tus datos de citas y no de una lista aparte que mantengas a mano.

::image-carousel
---
images:
  - src: /screenshots/recalls-list.png
    alt: Lista de Recalls mostrando pacientes atrasados con fecha de última visita, semanas de retraso, profesional, saldo y última acción realizada
    caption: "La lista, ordenada de más a menos atrasado"
---
::

## Leer la lista

Cada fila muestra:

- **Last visit** -- su última cita completada.
- **Overdue** -- cuántas semanas lleva por encima del umbral de recordatorio, ordenado por defecto de más a menos atrasado.
- **Practitioner** -- quién le suele atender (o "Unassigned" si nunca se ha definido).
- **Balance** -- cualquier saldo pendiente en su cuenta, para detectar de un vistazo un recordatorio que también es un seguimiento de cobro.
- **Last action** -- lo último que el equipo hizo respecto a este paciente (un WhatsApp enviado, una llamada registrada), y cuántas acciones en total. Un paciente con varias acciones registradas y que sigue sin reservar merece un enfoque distinto al de uno al que todavía nadie ha contactado.

## Filtrar la lista

- **Search by name** -- busca a un paciente concreto.
- **Weeks overdue** -- el propio umbral es ajustable (de 1+ a 12+ semanas), para poder trabajar por separado una lista de "acaba de pasar el límite" y otra de pacientes desatendidos desde hace mucho.
- **Last visit since** -- limita a pacientes cuya última visita sea posterior a una fecha determinada, útil para excluir de una campaña de contacto a pacientes que dejaron la clínica hace mucho tiempo.
- **Any practitioner** -- filtra a los pacientes de un profesional concreto, útil si cada profesional trabaja sus propios recordatorios.
- **Any balance** -- filtra a pacientes que además deben dinero, si quieres combinar una llamada de recordatorio con un seguimiento de facturación.
- **Filter by tag** -- si usas etiquetas de paciente, acota la lista a un segmento concreto.
- **Not contacted yet** -- oculta a cualquiera que ya tenga una acción registrada, para ver solo a los pacientes a los que aún nadie ha contactado.

## Actuar sobre un paciente

Cada fila tiene un desplegable **Action…**:

- **Send WhatsApp** -- envíale un mensaje directamente, registrado como una acción sobre este recordatorio.
- **Called -- no answer** / **Called -- left message** -- registra un intento de llamada cuando WhatsApp no es el canal adecuado o no obtuvo respuesta.
- **Booked** -- márcalo como resuelto una vez haya vuelto a reservar (también saldrá de la lista de forma natural en cuanto exista una cita futura).
- **Mark as high priority** -- marca uno que necesita atención antes, sin esperar a que las semanas de retraso por sí solas lo hagan destacar.
- **Dismiss from recalls** -- retira a un paciente de la lista sin reservarle cita (se ha mudado, ha pedido explícitamente que no se le contacte, etc.). Esto es distinto de [Do not contact](/es/articles/patients/patient-records), que bloquea todas las comunicaciones futuras -- descartarlo aquí solo lo quita de esta lista concreta.

Selecciona varios pacientes con las casillas y usa **Message selected** para enviar el mismo mensaje de WhatsApp a un grupo a la vez, o **Export** para extraer la lista filtrada actual como archivo.

## Por qué un paciente desaparece de la lista

Un paciente sale de Recalls en el momento en que tiene una cita futura reservada -- no hay que quitarlo manualmente. Por eso **Booked** como acción y simplemente reservarle cita desde el Calendario tienen el mismo resultado final; la opción de acción solo permite registrarlo con el mismo clic si le reservaste por teléfono en lugar de hacerlo directamente en QuiroFlow.
