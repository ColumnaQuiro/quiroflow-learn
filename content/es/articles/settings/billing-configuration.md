---
title: Ajustes de facturación
description: Los datos fiscales de tus facturas, el IVA, la numeración de facturas, rectificativas y recibos, y lo que muestran y dicen tus recibos.
collection: settings
order: 7
---

En **Ajustes › Facturación** decides lo que dicen tus facturas y recibos, cómo se numeran y el correo con el que se envía un recibo. Conviene dejarlo listo antes de cobrar la primera visita real, porque una factura ya emitida conserva los datos con los que se emitió.

Necesitas los permisos **Entrar en Ajustes** y **Facturación** (en el apartado de Ajustes del rol). Los cambios de esta página se guardan con **Guardar cambios**, arriba a la derecha.

## ¿Listo para emitir facturas?

Arriba de la página verás una lista de comprobación: **Datos fiscales** (cuántas clínicas están completas), **Numeración** (la próxima factura) y el estado de VeriFactu. Si algo falta, te lo indica. VeriFactu solo lo puede configurar la persona propietaria; lo explica [Configurar VeriFactu](/es/articles/invoices-verifactu/setting-up-verifactu).

## Datos fiscales

::help-video{clip="invoices--fiscal-data" caption="Completar la razón social y el NIF de la clínica"}
::

La razón social, el NIF y la dirección con los que se emiten las facturas y recibos. Son necesarios para que una factura sea válida.

1. En **Datos fiscales**, pulsa la clínica.
2. Rellena **Razón social**, **NIF / CIF** y la dirección. Sin NIF no se pueden emitir facturas.
3. Si quieres, escribe un **Pie de factura** (se imprime al pie de facturas y recibos) y sube el **Logotipo**.
4. Guarda. De vuelta en **Ajustes › Facturación**, la clínica aparece como **Completo**.

> **Ten en cuenta:** la cuenta es un solo contribuyente. Las facturas de todas tus clínicas se emiten con la razón social y el NIF de la clínica marcada **Emite las facturas** (la primera que creaste). Lo que cambia por clínica es la dirección, el pie y el logotipo.

## IVA

Cómo tratan el IVA tus facturas. Elige una opción:

- **Exento** (la opción por defecto): la asistencia sanitaria de un profesional colegiado está exenta por el art. 20.Uno.3 de la Ley 37/1992. La factura muestra el total como base y cita la exención. En **Exención** eliges la causa.
- **Con IVA**: los precios ya lo incluyen. La factura separa lo que pagó el paciente en base y cuota, y el total sigue coincidiendo con el pago. Indica el **Tipo de IVA (%)**.

El cambio se aplica a las facturas que se emitan a partir de ahora; las ya emitidas conservan el tratamiento con el que se emitieron. Los productos llevan siempre su propio IVA, sea cual sea esta opción.

> **Ten en cuenta:** qué opción te corresponde es una decisión fiscal de tu clínica. Si no lo tienes claro, pregúntaselo a tu gestoría antes de emitir facturas.

## Numeración

Las facturas se numeran PREFIJO-AÑO-NÚMERO (por ejemplo **F-2026-0001**) y vuelven a empezar en 1 cada año. Hay tres series:

- **Facturas**: elige el **Prefijo de facturas** y, si continúas la serie de tu sistema anterior, el próximo número.
- **Rectificativas**: su propio prefijo, que tiene que ser distinto del de las facturas.
- **Recibos**: una sola serie; solo eliges el **Próximo número de recibo**.

Un número puede avanzar (por ejemplo, para continuar donde lo dejaste en otro programa), pero **nunca retroceder**: los números anteriores ya están usados. Un prefijo tiene de 1 a 10 letras o números.

## Qué muestran los recibos

::help-video{clip="invoices--receipt-content" caption="Elegir qué datos aparecen en el PDF del recibo"}
::

Lo que aparece en el PDF del recibo que el paciente descarga o recibe por correo. Activa o desactiva cada dato y mira el resultado en **Vista previa**:

- **Paciente**: **Fecha de nacimiento**, **DNI/NIE / número de la seguridad social**.
- **Importes**: **Impuestos (IVA, o la exención)**, **Pagos realizados**, **Pendiente de este recibo**, **Saldo de la cuenta**.
- **Otros**: **Profesional**, **"Tu próxima visita"**, **Logotipo**.

Las facturas siempre llevan lo que exige la ley, sea cual sea esta configuración.

## Correo del recibo

- **Enviar recibos por correo automáticamente**: con lo que empiezan los pacientes nuevos. Se puede cambiar en cada paciente.
- **Asunto** y **Mensaje** del correo. Si dejas el asunto vacío, se usa «Recibo» y su número. En el mensaje puedes usar el nombre de la clínica y el del paciente con las variables que indica la página.

Al pie de la página verás el sistema informático de facturación (QuiroFlow y su versión) con un enlace a su declaración responsable.
