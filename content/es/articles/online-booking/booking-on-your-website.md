---
title: Poner la reserva en tu web (WordPress, Wix, Squarespace)
description: Dónde pegar el código de reserva en cada tipo de web, cómo comprobar que funciona y qué hacer si no aparece.
collection: online-booking
order: 2
---

Puedes poner tu página de reservas dentro de tu propia web, para que el paciente reserve sin salir de ella. No hace falta instalar nada: basta con pegar un código de dos líneas en la página donde quieras la reserva. Lo que cambies en QuiroFlow (horarios, servicios, colores) se ve en tu web al momento, sin volver a tocarla.

## Copiar el código

1. Ve a **Ajustes › Clínica › Reserva online**.
2. En la tarjeta de arriba, junto a **Insertar en tu web**, pulsa **Copiar**.

Tendrás algo así, con el nombre de tu clínica en lugar de `tu-clinica`:

```html
<div data-quiroflow-booking data-slug="tu-clinica"></div>
<script src="https://app.quiroflow.com/embed.js" async></script>
```

Cópialo siempre desde QuiroFlow en lugar de escribirlo a mano: `tu-clinica` tiene que ser exactamente el de tu cuenta.

> **Ten en cuenta:** el código se pega como **HTML**, no como texto. Si lo pegas en un párrafo normal, tu web mostrará el código en lugar de la reserva. Abajo tienes el bloque que hay que usar en cada plataforma.

## WordPress

**Editor de bloques (el editor normal de WordPress)**

1. Abre la página donde quieres la reserva y pulsa **+** para añadir un bloque.
2. Busca **HTML personalizado** y añádelo.
3. Pega el código y pulsa **Actualizar** (o **Publicar**).

En el editor el bloque puede verse vacío; es normal. La reserva aparece en la página publicada.

**Elementor:** arrastra el widget **HTML** a la sección que quieras, pega el código y pulsa **Actualizar**.

**Divi:** añade un módulo **Código**, pega el código y guarda.

**Otros constructores de páginas:** casi todos tienen un bloque llamado «HTML», «Código» o «Código personalizado». Es ese.

> **Ten en cuenta:** en **WordPress.com** (el servicio de WordPress con alojamiento incluido, no WordPress instalado en tu propio hosting), los planes más baratos quitan los scripts al guardar. Si allí la reserva no aparece, usa una de las opciones de [Si tu web no admite el script](#si-tu-web-no-admite-el-script).

## Wix

1. En el editor, pulsa **+** en la barra de la izquierda y busca **Insertar HTML** (en el apartado de código incrustado).
2. Elige la opción de pegar **código**, pega el código y pulsa **Actualizar**.
3. Haz el recuadro tan ancho como la página y de unos 800 píxeles de alto, para que la reserva quepa sin barra de desplazamiento.

> **Ten en cuenta:** Wix mete el código en un recuadro aparte, así que el script no ve de qué anuncio viene la visita. Las reservas entran igual, pero sin saber si vienen de Google o de Meta.

## Squarespace

1. Edita la página, pulsa **Añadir bloque** y elige **Código**.
2. Pega el código y guarda.

Mientras editas, Squarespace no ejecuta los scripts, así que el bloque se ve vacío. Comprueba la página publicada. En algunos planes de Squarespace los bloques de código no ejecutan scripts; si la reserva no aparece, usa una de las opciones de [Si tu web no admite el script](#si-tu-web-no-admite-el-script).

## Comprobar que funciona

1. Abre la página publicada en una ventana privada o en el móvil.
2. Tiene que verse la reserva: servicio, profesional, fecha y hora.
3. Si quieres hacer una reserva completa de prueba, hazla con tus datos y anúlala después en el calendario: es una cita de verdad, y el aviso de reserva le llega a la clínica.

## Si no aparece o se ve mal

- **Se ve el código como texto.** Está pegado en un bloque de texto. Bórralo y pégalo en un bloque **HTML personalizado** o **Código**.
- **No aparece hasta que haces scroll o tocas la pantalla.** Lo provoca un plugin de velocidad o de caché (WP Rocket, LiteSpeed Cache, Perfmatters, Autoptimize…) con la opción de **retrasar JavaScript** activada. En esa opción, añade `embed.js` a la lista de exclusiones y vacía la caché.
- **Sale un recuadro en blanco.** Algún plugin de seguridad está bloqueando contenido de otras webs. Permite `app.quiroflow.com` en ese plugin.
- **Se corta por abajo o tiene su propia barra de desplazamiento.** El recuadro mide 780 píxeles de alto. Para hacerlo más alto, añade `data-height` a la primera línea del código:

```html
<div data-quiroflow-booking data-slug="tu-clinica" data-height="950px"></div>
```

## Si tu web no admite el script

Algunas plataformas no dejan pegar scripts. Tienes dos alternativas:

**Un recuadro sin script.** Pega esto, cambiando `tu-clinica` por lo que va detrás de `/book/` en el **Enlace** de la tarjeta:

```html
<iframe src="https://app.quiroflow.com/book/tu-clinica" title="Reserva de cita" allow="payment" style="width:100%;min-height:780px;border:0"></iframe>
```

**Un botón.** Pon en tu web un botón «Reservar cita» que lleve al **Enlace** de la tarjeta. Funciona en cualquier web, y ese mismo enlace sirve para Instagram, Google o WhatsApp.

> **Ten en cuenta:** sin el script, QuiroFlow no sabe qué reservas llegan desde anuncios de Google o Meta que llevan a tu web. Si tienes anuncios, merece la pena el código completo; si tu web no lo permite, haz que los anuncios lleven directamente al **Enlace** de reservas, que sí lo registra.

Para decidir qué se puede reservar y cómo se ve la página, consulta [Configurar la reserva online](/es/articles/online-booking/setting-up-online-booking) y [Personalizar la página de reservas](/es/articles/online-booking/customizing-the-booking-page).
