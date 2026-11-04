---
title: Enviar un mensaje a un grupo de pacientes
description: Usa el disparador «Un segmento de pacientes» para escribir una vez, o cada semana, a todos los que cumplen unos filtros.
collection: communications
order: 7
---

Para escribir a un grupo de pacientes (los que no vienen desde hace seis meses, los que tienen un bono a medias, todos los de una sede) se usa una automatización con el disparador **Un segmento de pacientes**. Eliges los filtros, ves cuántos coinciden hoy y decides si se envía una vez o se repite. Es lo que antes se llamaba «campaña».

Necesitas el permiso **Comunicación y Growth**.

## Enviar una vez a un grupo

::help-video{clip="automations--group-message" caption="Un email a los pacientes que no vienen desde hace seis meses, probado primero en modo prueba"}
::

1. En **Pacientes › Automatizaciones**, pulsa **Nueva automatización** y ponle nombre.
2. En **Cuándo…**, elige **Un segmento de pacientes**.
3. En **Con qué frecuencia**, elige **Una vez** (por defecto viene marcado **Se repite**). En **Cuándo**, elige **Al activarla** o **En una fecha**.
4. En **Pacientes que**, añade los filtros: por ejemplo **Última visita** hace más de 180 días y **Cita futura** no existe. Debajo verás «N pacientes coinciden hoy.»; pulsa **Ver la lista** para comprobar quiénes son.
5. Pulsa el **+** y añade el mensaje: un **Email** o un **WhatsApp** con plantilla.
6. Pulsa **Guardar cambios** y activa el interruptor.
7. QuiroFlow te enseña el resumen en **Activar un segmento**: cuántos entrarán y cuándo y, si es comercial, cuántos aceptaron cada canal. Elige **Probar primero (modo prueba)** para ver qué pasaría sin enviar nada, o **Activar**.

Con **Al activarla**, todos los que coinciden entran en la siguiente revisión, antes de 15 minutos.

## Repetirlo cada día o cada semana

En **Con qué frecuencia**, elige **Se repite** y fija **Cada** (día o semana), el **Día** y la hora (**A las**). En cada repetición entran los que coinciden ese día. En la parte de abajo decides si alguien puede repetir: **Solo entran los que aún no han pasado por aquí**, o **Pueden volver a entrar pasados** N días.

Así funcionan las plantillas de recuperación, como **Mantenimiento: 3 meses sin venir**: cada semana entran los pacientes que acaban de cumplir ese plazo.

## No saturar: «Como mucho, al día»

**Como mucho, al día** limita cuántos pacientes entran cada día; primero los vistos más recientemente, y el resto espera al día siguiente. Evita que una lista larga salga en una sola mañana (los envíos fallidos cuentan contra la calidad de tu número de WhatsApp) y que la Bandeja se llene de respuestas que nadie puede atender. Déjalo en «sin límite» si el grupo es pequeño.

> **Ten en cuenta:** los menores y los pacientes con **No contactar** nunca entran en un segmento. Si marcas la automatización como comercial, cada canal solo llega a quien lo aceptó. Consulta [Consentimiento de marketing y bajas](/es/articles/communications/marketing-consent-and-unsubscribe).

> **Ten en cuenta:** para WhatsApp hace falta una plantilla aprobada por Meta. Si el mensaje es promocional, usa una plantilla de la categoría Marketing y marca la automatización como comercial.

Para ver después quién recibió el mensaje y si hubo fallos, consulta [Probar y revisar una automatización](/es/articles/communications/testing-and-fixing-automations).
