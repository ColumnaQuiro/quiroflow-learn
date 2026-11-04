---
title: Formularios, consentimientos y cartas
description: Envía formularios para que el paciente los rellene y firme desde su móvil, crea tus plantillas y escribe cartas como informes para su médico.
collection: patients
order: 8
---

En la pestaña **Adjuntos** de la ficha hay tres apartados, uno debajo de otro: **Documentos** (los formularios que el paciente rellena y firma: consentimiento informado, protección de datos, anamnesis…), **Cartas** (lo que escribe la clínica: un informe para su médico, un justificante de tratamiento) y **Archivos** (lo que subís vosotros; consulta [Archivos y fotos del paciente](/es/articles/patients/patient-files)).

Los formularios se preparan una vez como plantilla y luego se envían a cada paciente con un enlace. El paciente los rellena y firma en su propio móvil, sin cuenta ni contraseña.

## Enviar un formulario a un paciente

::help-video{clip="patients--send-form" caption="Enviar un consentimiento desde la ficha"}
::

1. En la ficha, abre la pestaña **Adjuntos**. Arriba están los formularios (**Formularios enviados al paciente**).
2. Pulsa **Enviar un formulario** y elige **Desde plantilla** › la plantilla (por ejemplo, "Consentimiento informado"), o **Documento en blanco**.
3. El formulario se crea con los datos del paciente ya rellenados (nombre, fecha de nacimiento, correo, dirección, DNI, profesión, contacto de emergencia, nombre de la clínica, la fecha de hoy y los campos propios que use la plantilla).
4. Vuelve a la lista con **← Documentos**. Cada formulario muestra el enlace del paciente completo.
5. Compártelo:
   - **Reenviar** abre WhatsApp Web con el mensaje "¡Hola! Por favor completa este documento:" y el enlace (solo si el paciente tiene teléfono).
   - **Copiar enlace** lo copia para pegarlo donde quieras (correo, SMS, chat).
   - **Abrir** lo abre en una pestaña nueva, por ejemplo para que lo rellene en una tablet de la sala de espera.

Cada formulario muestra **Pendiente del paciente** hasta que lo envía, y luego **Completado**, con la fecha de la firma.

> **Ten en cuenta:** no hay recordatorios automáticos para los formularios. Los que siguen sin devolver aparecen en **Resumen** › **Requiere atención**, con un botón **Reenviar**.

> **Ten en cuenta:** los formularios no aparecen en el portal ni en la app del paciente; le llegan solo por el enlace (o en recepción, con el modo **Firmar en recepción** de la app del equipo; consulta [Firmar en recepción](/es/articles/patient-app/reception-signing)).

## Qué ve el paciente

::help-video{clip="patients--form-patient-side" caption="El paciente rellena y firma el formulario"}
::

El enlace abre una página con el nombre de la clínica y el formulario en el idioma del paciente. Rellena las preguntas, firma con el dedo en el recuadro de **Firma** (con **Borrar firma** si se equivoca) y pulsa **Enviar**. Verás **Gracias / Este documento se ha completado.**

Por privacidad, una vez completado el enlace ya no muestra las respuestas, aunque alguien lo vuelva a abrir.

## Leer las respuestas

En **Adjuntos** › **Documentos**, pulsa el **título** del formulario: se abre dentro de QuiroFlow con todas las respuestas y la firma.

> **Ten en cuenta:** el botón **Ver respuestas** de un formulario completado abre el enlace del paciente, que solo muestra "Gracias". Para leer las respuestas, pulsa el título.

Desde esa vista también puedes rellenar el formulario por el paciente y pulsar **Marcar como completado**. Si pulsas **✓ Completado** en uno ya completado, se reabre y el enlace vuelve a funcionar.

Si una pregunta de la plantilla está **vinculada** a un dato de la ficha (por ejemplo, el DNI o la dirección), la respuesta del paciente actualiza su ficha al enviarlo. El correo solo se rellena si la ficha no tenía; nunca sustituye uno que ya existe.

Para eliminar un formulario necesitas el permiso **Eliminar documentos**.

## Crear las plantillas

Las plantillas están en **Ajustes › Documentos** (necesitas el permiso **Comunicación y Growth**).

::help-video{clip="patients--doc-template" caption="Crear una plantilla de consentimiento"}
::

1. Pulsa **Nueva plantilla** y ponle un **Nombre**.
2. Elige una **Categoría**: **Ninguna**, **Protección de datos** o **Consentimiento**. Con categoría, **Informes** puede listar a los pacientes a los que aún les falta ese formulario.
3. Si el consentimiento caduca, pon **Válido durante (meses)**. Las copias firmadas a punto de caducar salen en **Ajustes › Privacidad**.
4. Añade el contenido con **Añadir bloque**: **Título**, **Texto**, **Respuesta corta**, **Respuesta larga**, **Casilla de verificación**, **Opciones**, **Escala numérica**, **Valoración**, **Fecha**, **Firma** e **Imagen para dibujar** (sube un diagrama, como un esquema corporal, para que el paciente marque dónde le duele).
5. En cada pregunta puedes marcar **Obligatorio** y, con **Vincular a**, enlazarla a un dato de la ficha. Con **Insertar campo** metes datos del paciente en el texto (su nombre, la fecha…).
6. Pulsa **Guardar**.

En **Otros idiomas** puedes añadir una versión en otro idioma: cada paciente recibe la versión de su idioma preferido. Traduce los textos, pero mantén las mismas preguntas.

> **Ten en cuenta:** editar una plantilla solo cambia lo que se envíe a partir de ahora; los formularios ya enviados conservan sus preguntas. Eliminar una plantilla no borra los ya enviados, pero **Informes** deja de contarlos en su categoría.

## Cartas: informes y justificantes

Las cartas son documentos que escribe la clínica para el paciente o para otro profesional: un informe para su médico, un certificado de tratamiento.

::help-video{clip="patients--letter" caption="Escribir una carta desde una plantilla"}
::

1. En la ficha, abre **Adjuntos** y, en el apartado **Cartas**, pulsa **Nueva carta**.
2. Elige **Desde plantilla** › la plantilla, o **Carta en blanco**.
3. Revisa el **Título** y el texto, que ya viene con los datos del paciente. Deja marcado **Imprimir el logotipo de la clínica** si quieres el logo.
4. Pulsa **Guardar carta**.
5. Usa **Descargar** (PDF) o **Imprimir**.

El nombre, el NIF y la dirección de la clínica encabezan cada carta, tomados de **Ajustes › Clínicas**. Las plantillas de cartas se crean en **Ajustes › Cartas** con **Nueva plantilla**: **Nombre**, **Membrete** y **Texto de la plantilla**, donde puedes insertar datos del paciente.

> **Ten en cuenta:** si la plantilla incluye el motivo de consulta o el diagnóstico y quien escribe la carta no puede ver notas clínicas, esos datos se dejan en blanco y QuiroFlow lo avisa.

Eliminar una carta la quita de la ficha; las copias ya impresas o enviadas no cambian.
