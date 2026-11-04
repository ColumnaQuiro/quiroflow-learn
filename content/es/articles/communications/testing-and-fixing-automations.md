---
title: Probar y revisar una automatización
description: Envíate una prueba, ejecútala sin enviar nada en modo prueba, mira el recorrido de cada paciente y reintenta un paso que falló.
collection: communications
order: 8
---

Antes de activar una automatización conviene ver qué va a enviar, y después, comprobar que hace lo que esperabas. QuiroFlow tiene tres formas de probar sin riesgo y dos pestañas para revisar: **Personas** (dónde está cada paciente) e **Historial** (todo lo que ha hecho).

Necesitas el permiso **Comunicación y Growth**. Para ver las cifras de WhatsApp necesitas además **Bandeja de entrada**.

## Enviarte una prueba

::help-video{clip="automations--send-test" caption="Enviarse una prueba al propio WhatsApp"}
::

1. En el editor de la automatización, pulsa **Enviar prueba**.
2. Escribe **Tu número de WhatsApp**. Los pasos de email llegan al correo con el que entras en QuiroFlow.
3. Pulsa **Enviar**.

Te llegan, a ti, todos los pasos de mensaje que ves en pantalla, estén guardados o no. Las esperas y las condiciones se saltan.

> **Ten en cuenta:** una prueba no es un paciente real, así que los enlaces a documentos no funcionan. Para comprobarlos, lánzala para un paciente real.

## Modo prueba: ejecutarla sin enviar nada

En **Ajustes › Modo prueba**, activa **Registrar sin enviar**. La automatización se ejecuta de verdad (elige a las personas, rellena la plantilla, sigue cada paso) pero registra lo que habría enviado en lugar de enviarlo. Los mensajes aparecen en **Historial** y en la Bandeja marcados como no enviados, y los webhooks no se llaman. Arriba verás la etiqueta **Modo prueba** hasta que lo desactives.

Al activar un segmento, **Probar primero (modo prueba)** hace lo mismo para ese grupo.

## Lanzarla para un paciente

En **Ajustes**, pulsa **Lanzar para un paciente…**, busca por nombre y pulsa **Lanzar**. El paciente entra ahora mismo al primer paso, como si hubiera pasado el disparador. Respeta su consentimiento de marketing y el «no contactar». La automatización tiene que estar activada.

## Personas: dónde está cada uno

::help-video{clip="automations--person-journey" caption="Ver el recorrido de un paciente dentro de una automatización"}
::

La pestaña **Personas** lista quién ha pasado por la automatización: **En curso**, **Terminaron**, **Salieron** y **Con fallos**. Para cada uno ves **Dónde está**, **Desde** cuándo y qué toca **Siguiente**. Pulsa una fila para ver **Su recorrido**: cada paso, cuándo pasó y el estado de cada mensaje (**Enviado**, **Entregado**, **Leído**, **Abierto**, **Registrado (modo prueba)**…).

«Salieron» son quienes dejaron de cumplir la automatización: pidieron no ser contactados, se borró su ficha, o reservaron y la automatización termina al reservar.

Desde el recorrido también puedes **Saltar al siguiente** paso, **Sacar** a la persona de la automatización o abrir la conversación con **Ver en la Bandeja**.

## Corregir un fallo

Si un paso no se pudo hacer (por ejemplo, un número sin WhatsApp o una plantilla que Meta pausó), la automatización aparece en la lista con «N con fallo» y en el filtro **Con fallos**.

1. Abre la automatización y ve a **Personas › Con fallos**.
2. Pulsa la persona: verás «No se pudo hacer este paso:» y el motivo.
3. Corrige la causa (elige otra plantilla, arregla el número en la ficha).
4. Pulsa **Reintentar este paso**. Lo que ya se envió no se vuelve a enviar.

## Historial

**Historial** cuenta todo lo que ha hecho la automatización y las cifras de sus mensajes en los últimos 30 días: enviados, entregados, leídos y fallidos, y para el email, abiertos, clics y rebotados.
