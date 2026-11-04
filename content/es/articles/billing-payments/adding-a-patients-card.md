---
title: Tarjeta guardada, pago automático y pago online
description: Guarda la tarjeta de un paciente para cobrar bonos y membresías de forma automática, y deja que pague sus recibos online.
collection: billing-payments
order: 6
---

Con Stripe conectado, un paciente puede dejar su tarjeta guardada y QuiroFlow la cobra sola en las fechas que marques: los plazos de un bono o cada periodo de una membresía. Los pacientes también pueden pagar online un recibo pendiente. Todo esto necesita que hayas conectado Stripe en **Ajustes › Pagos** ([Métodos de pago y Stripe](/es/articles/settings/connecting-stripe)). Los pagos en efectivo, con tarjeta en tu datáfono o con saldo a favor funcionan sin Stripe.

## Guardar la tarjeta de un paciente

En la pestaña **Dinero** del paciente, la tarjeta **Cómo paga** muestra si tiene una tarjeta guardada (por ejemplo «Visa •••• 4242», con su caducidad) o **Sin tarjeta**. Hay dos formas de añadirla:

- **Delante del paciente**: pulsa **Añadir tarjeta**, deja que el paciente escriba los datos en el formulario seguro de Stripe y pulsa **Guardar tarjeta**.
- **A distancia**: pulsa **Copiar enlace de tarjeta** y envíaselo al paciente (por WhatsApp o correo). El paciente la guarda en una página de Stripe y ve «Tarjeta guardada» al terminar. La ficha se actualiza sola.

Los datos de la tarjeta van directamente a Stripe; QuiroFlow nunca los guarda ni los ve. Para cambiarla, pulsa **Sustituir tarjeta**; para quitarla, **Eliminar tarjeta** y confirma.

> **Ten en cuenta:** la tarjeta guardada se usa para los cobros automáticos. No hay un botón para cobrarla en el momento desde recepción: si cobras con tarjeta en la clínica, usa tu datáfono y registra el pago con el método **Tarjeta**.

> **Ten en cuenta:** si eliminas una tarjeta que usa un pago automático en marcha, esos cobros fallarán hasta que el paciente añada otra.

## Cobrar un bono a plazos automáticamente

::help-video{clip="billing--autopay" caption="Dividir un bono en dos plazos mensuales con la tarjeta guardada"}
::

Con una tarjeta guardada, puedes dividir el precio de un bono en plazos que se cobran solos:

1. En el bono, pulsa **Configurar pago automático**.
2. En **Plazos**, indica en cuántos cobros iguales se divide el precio del bono.
3. En **Cada**, indica cada cuánto (por ejemplo, 1 **mes(es)**).
4. En **Ya pagado**, indica cuántos de esos plazos ya te ha pagado (por ejemplo, 1 si pagó el primero en la clínica). Solo se programan los que faltan.
5. Pulsa **Iniciar**.

El bono muestra **Pago automático** con los plazos cobrados de los totales (por ejemplo 1/2). Para pararlo, pulsa **Cancelar** y confirma. Cada cobro emite su factura. Si un cobro falla, aparece en **Informes › Deudores** como «cobro de stripe fallido».

Sin tarjeta guardada verás «No hay tarjeta registrada; añade una para habilitar el pago automático del saldo restante» y el botón **Añadir tarjeta**.

## Cobrar una membresía automáticamente

En la membresía del paciente, pulsa **Configurar pago automático**, revisa **Cada** (viene con el periodo del plan) y pulsa **Iniciar**. Se cobra cada periodo hasta que lo canceles.

## Que el paciente pague online

- **Desde su portal o su app**: el paciente ve sus recibos pendientes y puede pulsar **Pagar** para pagar con tarjeta en Stripe. El pago se registra solo y se emite la factura.
- **Desde la bandeja de entrada**: al contestar a un paciente, usa **Poner un enlace de pago en la respuesta** para añadir un enlace a su recibo pendiente. Si Stripe no está conectado, verás «El pago online no está configurado en esta clínica.».

## Recordatorios de pago automáticos

Si tienes una automatización de recibos vencidos activa, la tarjeta **Cómo paga** muestra **Recordatorios de pago** con un interruptor para pausarlos solo para ese paciente (**Pausados para este paciente**) y la fecha del último enviado. Las automatizaciones se explican en [Automatizaciones](/es/articles/communications/automations).
