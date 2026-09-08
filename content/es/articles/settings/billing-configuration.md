---
title: Métodos de pago, facturación y datos fiscales
description: Contra qué métodos puede el personal registrar un pago, cómo se ven las facturas, y los datos legales que se imprimen en ellas.
collection: settings
order: 7
---

Tres páginas de Settings completan tu configuración de facturación, más allá de qué vendes (consulta [Tipos de cita, servicios y productos](/es/articles/settings/appointment-types-and-services)) y cómo cobras (consulta [Conectar Stripe](/es/articles/settings/connecting-stripe)).

::image-carousel
---
images:
  - src: /screenshots/settings-invoice-settings.png
    alt: Página de Invoice Settings con la numeración de facturas, Send Invoices Automatically, Patient Information Display e Invoice Content Visibility
    caption: "Invoice Settings -- numeración, qué se muestra, y valores por defecto del correo"
---
::

## Payment Methods

Los métodos contra los que el personal puede registrar un pago al [cobrar a un paciente](/es/articles/billing-payments/taking-a-payment). **Cash** y **Card** vienen dados por defecto -- añade otros que tu clínica use de verdad (Bank Transfer es habitual) o desactiva los que no uses, para que el desplegable que ve el personal al cobrar solo muestre opciones reales. **Credit on account** y las anulaciones (write-offs) son tipos de pago aparte, integrados, ligados al saldo de crédito real del paciente, y no se gestionan desde esta lista.

## Invoice Settings

- **Invoice Numbering** -- define el próximo número de factura si necesitas continuar una numeración de un sistema anterior, o déjalo en blanco para que siga contando automáticamente.
- **Send Invoices Automatically** -- el valor por defecto para el ajuste "enviar factura por correo automáticamente" de los pacientes nuevos. Cambiarlo aquí solo afecta a los pacientes nuevos a partir de ahora, no a los existentes.
- **Patient Information Display** -- interruptores para mostrar fecha de nacimiento, documento de identidad e impuestos en facturas y extractos.
- **Invoice Content Visibility** -- oculta el saldo de la factura, el saldo de cuenta, los pagos, el nombre del profesional, la línea de "tu próxima visita" o tu logo, cada uno por separado, si tus facturas deben verse más sencillas que el diseño por defecto.
- **Email Customization** -- tu propio asunto y cuerpo de texto para el correo que recibe un paciente junto a su factura.

## Fiscal Data

El nombre legal, el NIF/CIF y la dirección que se imprimen en cada factura, más una nota de pie -- obligatorio para que una factura sea fiscalmente válida en la mayoría de jurisdicciones, así que conviene tenerlo bien configurado antes de enviar tu primera factura real y no después de que un paciente pregunte por ello. Esto es de toda la clínica, se configura una vez por clínica y no por factura.
