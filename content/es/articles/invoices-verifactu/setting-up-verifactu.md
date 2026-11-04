---
title: Configurar VeriFactu
description: Elige cuándo se envían tus facturas a la AEAT, quién las envía y con qué certificado.
collection: invoices-verifactu
order: 3
---

VeriFactu es el sistema de la AEAT por el que cada factura se registra, se encadena con la anterior y se envía a Hacienda. En QuiroFlow, cada factura que emite tu clínica ya se registra y se encadena desde el primer día. En **Ajustes › VeriFactu** decides tres cosas: si esos registros van a la AEAT (a su servicio de pruebas o al real), **quién los envía** (tú, con tu propio certificado, o QuiroFlow por ti) y, si los envías tú, con qué certificado.

Solo la persona propietaria de la cuenta ve esta página (aparece con la etiqueta **Solo propietarios**).

## Antes de empezar

- Rellena la razón social y el NIF de tu clínica en **Ajustes › Facturación › Datos fiscales**. Sin NIF no se envía nada: la página lo indica con «la clínica no tiene NIF en Facturación › Datos fiscales». Lo explica [Ajustes de facturación](/es/articles/settings/billing-configuration).
- La fecha en la que pasas al servicio real viene propuesta para el **1 de enero de 2027**. Confirma con tu gestoría la fecha que te corresponde.

## Leer el estado

Arriba verás un aviso con el estado actual: **Todavía no se envía nada** (con el motivo), **VeriFactu está desactivado**, **Enviando al servicio de pruebas de la AEAT** o **Enviando a la AEAT**. Debajo, cuatro datos: **Empresa**, **Quién envía**, **Certificado** y **Envío**. **Ver actividad** te lleva a lo último que ha respondido la AEAT.

## Elegir el modo de envío

::help-video{clip="invoices--verifactu-mode" caption="Pasar VeriFactu a Solo pruebas"}
::

1. Ve a **Ajustes › VeriFactu**.
2. En **Envío a la AEAT**, elige el **Modo de envío**:
   - **Desactivado**: no se envía nada. Las facturas se siguen registrando y encadenando, así que al activarlo se envía todo el historial.
   - **Solo pruebas**: el servicio de pruebas de la AEAT. Nada tiene efecto fiscal; sirve para comprobar que la configuración funciona.
   - **En producción desde una fecha**: pruebas hasta ese día y después el servicio real. Desde la medianoche (hora de Madrid) de ese día, la primera factura inicia la cadena real.
3. Si eliges producción, indica la fecha en **En producción desde**.
4. Pulsa **Guardar**. Al pasar a producción te pedimos que lo confirmes, porque una vez enviada la primera factura real **la fecha no se puede cambiar y VeriFactu no se puede desactivar**.

> **Ten en cuenta:** desde el día en que pasas a producción, VeriFactu cuesta 7,50 € + IVA por centro y mes, que se añade a tu suscripción. El aviso de confirmación te muestra el total para tus centros.

## Elegir quién envía

::help-video{clip="invoices--verifactu-who-sends" caption="Elegir que QuiroFlow envíe por ti con un apoderamiento IZ860"}
::

Los registros siempre identifican a tu empresa como emisora. Esto solo decide con qué certificado se envían a la AEAT. En **Quién envía** hay tres opciones:

- **Tu propio certificado**: subes el certificado de tu empresa y lo renuevas cuando caduque.
- **QuiroFlow envía por ti, con autorización de la AEAT**: autorizas a QuiroFlow una vez en la sede electrónica de la AEAT (apoderamiento **IZ860**). No tienes certificado que subir ni renovar.
- **QuiroFlow envía por ti, con un documento firmado**: firmas un documento de representación a favor de QuiroFlow como colaborador social de la AEAT y lo subes aquí. Tampoco necesitas certificado.

Elige una y pulsa **Guardar**.

### Si eliges el apoderamiento IZ860

La página te muestra un recuadro **Qué hacer en la AEAT** con los datos exactos. En resumen:

1. El representante legal de tu empresa, con su certificado, entra en la sede electrónica de la AEAT → **Registro de Apoderamientos** → «Apoderamiento para un trámite concreto».
2. Como **Apoderado** indica la empresa y el NIF que aparecen en ese recuadro.
3. Como trámite elige **IZ860** — «Remisión y consulta de registros de facturación por servicio web» (en IVA). **No IZ862 ni IZ863**: se parecen, pero la AEAT rechaza los registros.
4. Después QuiroFlow acepta el apoderamiento en la AEAT y lo confirma en esta página. Mientras tanto verás **Pendiente de autorización**; cuando esté confirmado, **Autorizado**, y los registros empiezan a enviarse en ese momento.

### Si eliges el documento firmado

1. Rellena el modelo de documento de representación que indica la página (Resolución de 18 de diciembre de 2024, BOE-A-2024-27600) a favor de QuiroFlow.
2. Haz que lo firme tu representante legal: a mano con copia de su DNI, o con firma electrónica cualificada. Aceptar algo en pantalla no sirve como firma.
3. Sube el PDF con **Subir documento firmado**.
4. QuiroFlow revisa el documento y lo confirma. Si lo sustituyes más adelante, vuelve a quedar pendiente y no se envía nada hasta que se confirme de nuevo.

> **Ten en cuenta:** con cualquiera de las dos vías de QuiroFlow, **no se envía nada por tu clínica hasta que QuiroFlow confirme tu autorización**. Hasta entonces, el estado lo indica con «QuiroFlow aún no ha confirmado tu autorización».

## Subir tu propio certificado

Si envías tú, en **Certificado**:

1. En **Tipo**, elige **Representante (FNMT “AC Representación”)** o **Sello de empresa**.
2. En **Archivo (.p12 o .pfx)**, elige el archivo del certificado.
3. Escribe la **Contraseña del certificado**. Se comprueba con el archivo antes de guardarlo y se conserva cifrada; no se vuelve a mostrar.
4. Pulsa **Subir certificado**.

Después verás **Certificado guardado** con su fecha de caducidad y unas comprobaciones: que es de tu empresa, que sigue vigente, que la contraseña lo abre y si la AEAT ya ha aceptado registros enviados con él. Cuando caduque, súbelo de nuevo con **Sustituir certificado**.

## Revisar la actividad

En **Actividad** ves cuántos registros están **Pendientes de envío**, cuántos se han **Rechazados 10+ veces**, cuántos son **Registros de prueba** y **Registros reales**, y la **Última respuesta de la AEAT** (**Aceptado**, **Aceptado con avisos**, **Rechazado**, **Error interno de la AEAT** o **Sin conexión**).

QuiroFlow envía los registros pendientes aproximadamente cada minuto, dentro del plazo que marca la AEAT. Las personas propietarias reciben un correo si un registro no se ha aceptado a los 15 minutos, y cuando al certificado le quedan 30 y 7 días para caducar.

### Si ves el error 4112

La AEAT responde **4112** cuando el certificado no está autorizado a enviar por el NIF de tu empresa. No significa que el certificado esté roto:

- Con **tu propio certificado**: comprueba que el certificado es de tu empresa o que su titular está autorizado para representarla.
- Si **envía QuiroFlow**: comprueba que el apoderamiento se otorgó para el trámite **IZ860** (no IZ862 ni IZ863) y al NIF que indica la página. QuiroFlow recibe el aviso también.

> **Ten en cuenta:** QuiroFlow cumple con VeriFactu como sistema de facturación, pero las obligaciones fiscales de tu clínica (qué IVA aplicas, desde cuándo estás obligado) son tuyas. Ante cualquier duda, consúltalo con tu gestoría.
