---
title: Conectar Stripe
description: Conecta Stripe para cobrar con tarjeta, guardar tarjetas de pacientes y activar el cobro automático.
collection: settings
order: 2
---

Ve a **Settings &rarr; Payments (Stripe)**. Stripe es la base de todas las funciones de tarjeta en QuiroFlow: cobrar con tarjeta, guardar la [tarjeta de un paciente](/es/articles/billing-payments/adding-a-patients-card), y el cobro automático (autopay) para bonos y membresías.

## Conectar

Selecciona **Connect with Stripe** -- un clic, sin claves de API que buscar ni copiar. Una vez conectado, verás el ID de tu cuenta de Stripe y una opción **Test connection** para confirmar que funciona.

![Página de configuración Payments con el botón de un clic Connect with Stripe](/screenshots/settings-payments.png)

También hay una opción **Disconnect** por si alguna vez necesitas desvincularlo (las facturas y el historial de pagos existentes no se ven afectados, pero no se podrán cobrar tarjetas nuevas hasta que vuelvas a conectarlo).

## Vía alternativa (avanzada)

Si ya tienes tus propias claves de API de Stripe y prefieres pegarlas directamente en lugar de conectar a través de Stripe, esa opción sigue disponible -- busca el formulario avanzado. Esta vía también requiere registrar manualmente una URL de webhook en tu propio panel de Stripe, escuchando un conjunto específico de eventos (Settings muestra la lista exacta y la URL a usar). Prioriza **Connect with Stripe** siempre que sea posible -- se encarga de todo esto automáticamente.
