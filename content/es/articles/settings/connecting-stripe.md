---
title: Conectar Stripe
description: Conecta Stripe para cobrar con tarjeta, guardar tarjetas y activar el cobro automático.
collection: settings
order: 2
---

Ve a **Settings &rarr; Payments (Stripe)**. Stripe es lo que hace posible cada función relacionada con tarjetas en QuiroFlow: cobrar con tarjeta, guardar la [tarjeta de un paciente](/es/articles/billing-payments/adding-a-patients-card), y el autopay de bonos y membresías. Nada relacionado con tarjetas funciona hasta que esto está conectado -- los pagos en efectivo y con saldo a favor no se ven afectados.

![Página de configuración de Payments con un botón Connect with Stripe de un clic](/screenshots/settings-payments.png)

## Conectar

Selecciona **Connect with Stripe** -- un clic, sin claves de API que buscar ni copiar. Esto te lleva por el propio flujo de alta de Stripe (o vincula una cuenta de Stripe existente si ya tienes una), y te trae de vuelta a QuiroFlow al terminar. Una vez conectado, verás el ID de tu cuenta de Stripe y una opción de **Test connection** para confirmar que funciona antes de depender de ella para cobros reales.

Si aún no tienes una cuenta de Stripe, se crea una para ti como parte de este proceso -- no hace falta configurar una por separado de antemano.

## Desconectar

Hay una opción de **Disconnect** si alguna vez necesitas desvincularla -- las facturas y el historial de pagos existentes no se ven afectados, pero no se pueden cobrar nuevas tarjetas hasta que vuelvas a conectar. Esto incluye el autopay: cualquier cuota programada o renovación de membresía que dependa de una tarjeta guardada fallará en silencio hasta que Stripe vuelva a estar conectado, así que no desconectes a la ligera si tienes calendarios de autopay activos en marcha.

## Vía alternativa (legacy)

Si ya tienes tus propias claves de API de Stripe y prefieres pegarlas directamente en lugar de conectar a través de Stripe, esa opción sigue disponible -- busca **advanced setup**. Esta vía también requiere registrar manualmente una URL de webhook en tu propio panel de Stripe, escuchando un conjunto específico de eventos (Settings muestra la lista exacta y la URL a usar). Prioriza **Connect with Stripe** siempre que puedas -- se encarga de todo esto automáticamente, incluido mantener la configuración del webhook al día si cambian los requisitos de QuiroFlow.
