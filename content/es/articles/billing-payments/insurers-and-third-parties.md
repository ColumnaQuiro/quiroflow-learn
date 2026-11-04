---
title: Mutuas, aseguradoras y empresas (Terceros)
description: Cobra una parte de la visita a una mutua o empresa, lleva lo que te debe y registra sus pagos.
collection: billing-payments
order: 9
---

Cuando una aseguradora, una mutua o una empresa paga todo o parte de las visitas de un paciente, en QuiroFlow es un **tercero**. Al cobrar la visita repartes el importe: el paciente paga su parte (el copago) y el resto queda pendiente del tercero. Lo que deben los terceros se lleva aparte, en **Facturación › Terceros**, y nunca se suma a lo que debe el paciente.

## Dar de alta un tercero

::help-video{clip="billing--third-party-create" caption="Dar de alta una mutua con su tarifa por tipo de visita"}
::

1. Ve a **Ajustes › Terceros** y pulsa **Nuevo tercero**.
2. Escribe el **Nombre** y elige el **Tipo** (aseguradora, médico-legal o empresa). Si quieres, añade **CIF / NIF**, **Dirección**, **Email**, **Teléfono**, **Persona de contacto** y **Notas**.
3. En **Tarifas por tipo de visita**, pulsa **Añadir tarifa**, elige el **Tipo de visita** e indica lo que **Paga el tercero (€)** y lo que **Paga el paciente (€)**.
4. Pulsa **Guardar**.

Un tercero que ya se usa no se puede eliminar: pulsa **Retirar**. Los retirados quedan abajo y puedes **Volver a usar** cualquiera.

Necesitas los permisos **Entrar en Ajustes** y **Facturación** (en el apartado de Ajustes del rol).

## Añadir la cobertura a un paciente

1. En la pestaña **Dinero** del paciente, en la tarjeta **Terceros**, pulsa **Añadir cobertura**.
2. Elige el **Tercero** y rellena lo que tengas: **Nº de póliza / expediente**, **Nº de autorización**, **Sesiones autorizadas** y **Válida hasta**.
3. Pulsa **Guardar**.

La tarjeta muestra las sesiones usadas de las autorizadas y lo que ese tercero debe por este paciente («Pendiente de …»). Cuando termine la cobertura, pulsa **Finalizar**.

## Cobrar una visita cubierta

1. En la pestaña **Cobro** de la cita, pulsa **Facturar a un tercero (aseguradora, mutua, empresa)…**.
2. En **Quién paga**, elige la cobertura del paciente (u otro tercero).
3. Revisa **Paga el tercero (€)** y **Paga el paciente (€)**. Si hay tarifa para ese tipo de visita, vienen rellenados.
4. Pulsa **Facturar**.

El recibo del paciente queda solo con su parte, que cobras como siempre. El resto lo debe el tercero.

## Ver lo que deben y registrar sus pagos

::help-video{clip="billing--third-party-payment" caption="Registrar el pago de una mutua y abrir su liquidación"}
::

1. Ve a **Facturación** y pulsa **Terceros**. Verás lo que debe cada uno, por antigüedad.
2. Pulsa un tercero para ver sus **Visitas facturadas** y sus **Cobros recibidos**.
3. Cuando te pague, pulsa **Registrar cobro**: escribe el **Importe (€)**, la **Fecha**, el **Método** y, si quieres, una **Referencia**.
4. El cobro se reparte entre las visitas, de la más antigua a la más reciente. Puedes cambiar lo que se aplica a cada una en **Aplicar (€)**.
5. Pulsa **Guardar cobro**.

## Enviar la liquidación

En la página del tercero, en **Liquidación**, elige **Desde** y **Hasta** y pulsa **Abrir liquidación**. Se abre la **Liquidación de servicios** con todas las visitas del periodo, lista para **Imprimir** o guardar en PDF y enviar al tercero.

> **Ten en cuenta:** la liquidación es un documento informativo, **no una factura**, y lo que cobras a un tercero no emite factura en QuiroFlow. Si la mutua o la empresa te pide una factura, consúltalo con tu gestoría.

> **Ten en cuenta:** lo que debe un tercero no aparece en **Debe ahora** del paciente ni en sus recordatorios de pago.
