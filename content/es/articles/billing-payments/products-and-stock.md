---
title: Vender productos y llevar el stock
description: Da de alta lo que vendes en el mostrador, recibe mercancía y véndelo desde la ficha del paciente con su IVA.
collection: billing-payments
order: 7
---

Si vendes cosas en el mostrador (almohadas, cremas, plantillas…), créalas en **Ajustes › Productos y stock**. Allí ves el stock, el margen y lo vendido este mes. Se venden desde la pestaña **Dinero** del paciente: la venta descuenta el stock, registra el pago y emite la factura con el IVA del producto. Los productos llevan IVA aunque tus servicios estén exentos.

Para crear productos y mover el stock necesitas los permisos **Entrar en Ajustes** y **Facturación** (de Ajustes); para venderlos, **Registrar pagos y llevar la caja**.

## Crear un producto

::help-video{clip="billing--product-create" caption="Crear un producto y recibir mercancía"}
::

1. Ve a **Ajustes › Productos y stock** y pulsa **Nuevo producto**.
2. Escribe el **Nombre** y el **Precio, IVA incl. (€)**, y elige el **IVA** (21 %, 10 % o 4 %).
3. Elige **Contar stock** si quieres llevar las unidades, con un **Mínimo** para que te avise cuando quede poco, o **Sin stock (bajo pedido)** si lo pides cuando alguien lo compra.
4. Pulsa **Guardar**.

## Recibir mercancía y ajustar el stock

El stock no se escribe a mano: cambia con movimientos, para que siempre sepas por qué.

- **Recibir mercancía**: indica las **Unidades** que han llegado y, si quieres, el **Coste por unidad** (así se calcula el **Margen**) y el **Proveedor**. Pulsa **Sumar al stock**.
- **Ajustar stock**: para algo caducado, roto o un recuento. Escribe las **Unidades (+/−)** (por ejemplo −2) y un **Motivo**, y pulsa **Ajustar**.

En **Movimientos** ves cada **Entrada**, **Venta**, **Ajuste** y **Devolución**. Los productos por debajo del mínimo se marcan **Stock bajo**, y los que se acaban, **Agotado**.

> **Ten en cuenta:** para dejar de contar el stock de un producto, primero ajústalo a cero.

## Vender un producto

::help-video{clip="billing--sell-product" caption="Vender un producto desde la ficha del paciente"}
::

1. En la pestaña **Dinero** del paciente, en **Debe ahora**, pulsa **Vender producto**.
2. Busca el producto en **Buscar producto** y pulsa **Añadir**. Con **−** y **+** cambias la cantidad.
3. A la derecha, en **Cobrar**, revisa el **Total** y elige la **Forma de pago**.
4. Pulsa **Cobrar y entregar**.

Verás «Vendido y cobrado. Factura …» con el número de la factura. El stock baja solo.

> **Ten en cuenta:** si devuelves un producto, al registrar el reembolso puedes indicar cuántas unidades vuelven al stock ([Reembolsos, rectificativas y anulaciones](/es/articles/invoices-verifactu/refunds-and-corrections)).

> **Ten en cuenta:** los servicios (un informe, una prueba) no son productos: se crean en **Ajustes › Servicios y productos** y no llevan stock ([Tipos de cita y servicios](/es/articles/settings/appointment-types-and-services)).
