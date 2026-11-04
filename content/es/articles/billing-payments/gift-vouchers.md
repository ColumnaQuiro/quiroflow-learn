---
title: Bonos regalo
description: Vende bonos regalo en tu página pública, con pago con tarjeta, y canjéalos en la clínica o al reservar online.
collection: billing-payments
order: 8
---

Con los bonos regalo, cualquiera puede comprar desde tu página pública un importe, un servicio o un bono para regalárselo a otra persona. Se pagan con tarjeta a través de tu Stripe y llegan por correo con un código. Quien lo recibe lo canjea al reservar online o en la clínica, desde su pestaña **Dinero**.

Para venderlos online necesitas Stripe conectado en **Ajustes › Pagos** ([Métodos de pago y Stripe](/es/articles/settings/connecting-stripe)). Si no lo está, la página te avisa con «Conecta Stripe en Ajustes › Pagos para venderlos online.».

## Configurar los bonos regalo

::help-video{clip="billing--gift-settings" caption="Activar la venta de bonos regalo online y elegir qué se vende"}
::

1. Ve a **Ajustes › Bonos regalo**.
2. Activa **Vender bonos regalo online**. Debajo verás **Tu página:** con el enlace que puedes compartir.
3. En **Importes**, añade los importes que se pueden regalar (escribe uno en **Importe en euros** y pulsa **Añadir**). Si quieres, marca **Permitir otro importe (de 20 a 300 €)**.
4. En **Servicios y bonos**, marca los tipos de cita y los bonos que se pueden regalar.
5. En **Validez**, elige cuántos meses dura (6, 12, 18 o 24).
6. Pulsa **Guardar**.

Al canjearlo, un importe o un servicio se convierte en saldo a favor del paciente (un servicio, por su precio), y un bono, en ese bono.

> **Ten en cuenta:** la factura se emite **al canjear** el bono regalo, no al comprarlo: como saldo a cuenta, o como el bono en que se convierte. Confirma con tu gestoría que encaja con un bono de un servicio concreto.

## Lo que ve quien compra

En tu página de regalos, el comprador:

1. Elige **Un importe** o **Un servicio o bono**.
2. Escribe **Para**, **De parte de** y, si quiere, un **Mensaje**.
3. En **Cómo llega**, elige **Por correo a quien lo recibe** (con su correo y, si quiere, una fecha de envío) o **A mí, para darlo yo**.
4. Escribe su correo para el recibo y pulsa **Pagar con tarjeta**.

Al terminar ve «¡Bono regalo pagado!», y el bono se envía en la fecha elegida.

## Ver los bonos vendidos

En **Ajustes › Bonos regalo**, en **Vendidos**, tienes cada bono con su **Código**, qué es, **Para**, **De parte de** y su **Estado**: **Sin canjear**, **Canjeado**, **Caducado**, **Sin enviar** o la fecha en que se enviará. Pulsa **Reenviar** si alguien no lo recibió, o **Enviar ya** para no esperar a la fecha programada.

## Canjear un bono regalo en la clínica

::help-video{clip="billing--gift-redeem" caption="Canjear un bono regalo desde la ficha del paciente"}
::

1. En la pestaña **Dinero** del paciente, en **En cuenta**, pulsa **Canjear bono regalo**.
2. Escribe el código en **Código del bono regalo** (empieza por REGALO-).
3. Pulsa **Canjear**.

Verás «Canjeado: … añadido como saldo» o «Canjeado: …, añadido a sus bonos». En ese momento se emite la factura.

> **Ten en cuenta:** también se puede canjear al reservar online, en tu página de reservas ([Reserva online](/es/articles/online-booking/setting-up-online-booking)).
