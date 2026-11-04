---
title: Métodos de pago y Stripe
description: Elige con qué métodos se registran los pagos y conecta Stripe para guardar tarjetas, cobrar a plazos y vender online.
collection: settings
order: 8
---

**Ajustes › Pagos** reúne cómo entra el dinero en tu clínica: los **métodos de pago** que elige el personal al registrar un pago (efectivo, tarjeta, Bizum…) y la conexión con **Stripe** para los cobros con tarjeta que QuiroFlow hace por ti.

Necesitas los permisos **Entrar en Ajustes** y **Facturación** (en el apartado de Ajustes del rol).

## Métodos de pago

::help-video{clip="billing--payment-methods" caption="Añadir un método de pago y dejar de ofrecer otro"}
::

Vienen creados **Efectivo**, **Tarjeta**, **Transferencia bancaria**, **Bizum** y **Otro**. Junto a cada uno ves cuántas veces se ha usado.

- **Añadir uno**: escribe el nombre en **Nuevo método de pago** (por ejemplo, «Cheque») y pulsa **Añadir**.
- **Dejar de ofrecerlo**: apaga su interruptor **Disponible**. Desaparece de los formularios de pago y los pagos ya registrados lo conservan.
- **Eliminarlo**: solo si nunca se ha usado. Si tiene pagos, desactívalo en su lugar.

Debajo, en **Integrados, siempre disponibles**, están **Saldo a favor** y **Baja contable** (condonar). Van ligados al saldo real del paciente, así que no se gestionan aquí.

> **Ten en cuenta:** registrar un pago con **Tarjeta** solo apunta que cobraste con tu datáfono. Para que QuiroFlow cobre tarjetas por ti necesitas Stripe.

## Qué te da Stripe

Con Stripe conectado puedes:

- **Tarjetas guardadas**: el paciente añade una tarjeta una vez, desde un enlace.
- **Bonos a plazos**: divide un bono en cobros programados.
- **Renovación de membresías**: se cobra cada periodo que marca el plan.
- Que los pacientes paguen sus recibos online y vender [bonos regalo](/es/articles/billing-payments/gift-vouchers).

Cómo se usa en cada paciente lo explica [Tarjeta guardada, pago automático y pago online](/es/articles/billing-payments/adding-a-patients-card).

## Conectar Stripe

1. En **Cobros con tarjeta con Stripe**, pulsa **Conectar con Stripe**.
2. Sigue los pasos de Stripe: crea tu cuenta o entra en la que ya tienes.
3. Al volver a QuiroFlow verás «Cuenta de Stripe conectada.» y el estado **Conectado**, con el identificador de tu **Cuenta**.
4. Pulsa **Probar conexión** para comprobar que funciona.

No hay claves de API que copiar ni webhook que configurar.

## Desconectar Stripe

Pulsa **Desconectar** y confirma. Los calendarios de cobro que ya están en marcha siguen en Stripe, pero QuiroFlow no puede cobrar tarjetas nuevas hasta que vuelvas a conectar. Tus recibos, pagos y facturas no cambian.

## Usar tus propias claves de API

Si prefieres no usar la conexión de un clic, abre **Avanzado: usar tus propias claves de API de Stripe**, pega la **Clave publicable**, la **Clave secreta** y el **Secreto de firma del webhook**, y pulsa **Guardar claves**. En este caso tienes que registrar en tu panel de Stripe la dirección de webhook que muestra la página, con los eventos que indica. Siempre que puedas, usa **Conectar con Stripe**.
