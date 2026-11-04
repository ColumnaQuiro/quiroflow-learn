---
title: Verificación en dos pasos
description: Protege tu acceso con un código del móvil además de la contraseña, exígelo a todo el equipo y recupera el acceso si alguien pierde el móvil.
collection: security-privacy
order: 1
---

Con la verificación en dos pasos, para entrar en QuiroFlow no basta la contraseña: también hace falta un código de 6 dígitos que genera una app de autenticación en tu móvil. Así, si alguien consigue tu contraseña, no puede abrir tu cuenta ni ver los datos de tus pacientes. Cada persona la activa en su propia cuenta, y una persona propietaria puede exigirla a todo el equipo.

## Activarla en tu cuenta

::help-video{clip="security--enable-2fa" caption="Activar la verificación en dos pasos con una app de autenticación"}
::

1. Instala en tu móvil una app de autenticación: Google Authenticator, Microsoft Authenticator, 1Password o la app Contraseñas del iPhone sirven.
2. En QuiroFlow, abre el menú de tu foto › **Ajustes de la cuenta** y ve a **Seguridad**.
3. Junto a **Verificación en dos pasos** (**Desactivada**), pulsa **Configurar verificación en dos pasos**.
4. Escanea el código QR con la app. Si no puedes escanearlo, pulsa **Copiar clave** y pégala en la app (**¿No puedes escanearlo? Introduce esta clave:**). Si lo estás haciendo desde el móvil, **Añadir a la app de autenticación de este móvil** lo hace por ti.
5. Escribe el código de 6 dígitos que muestra la app en **Código de la app**.
6. Pulsa **Activar verificación en dos pasos**.

Verás **La verificación en dos pasos está activada.** y, en **Seguridad**, la fecha desde la que la usas. A partir de ahora, cada vez que entres te pedirá el código después de la contraseña. Consulta [Iniciar sesión y recuperar la contraseña](/es/articles/getting-started/signing-in).

## Desactivarla

En **Seguridad**, pulsa **Desactivar…** y confirma con **Desactivar** (o **Mantenerla activada** si te arrepientes). Para entrar volverá a bastar la contraseña. Si tu clínica la exige, no puedes desactivarla: verás **Tu clínica exige la verificación en dos pasos, así que permanece activada.**

## Exigirla a todo el equipo

::help-video{clip="security--require-2fa" caption="Exigir la verificación en dos pasos a todo el equipo"}
::

Necesitas el permiso **Equipo**, y tener tú misma la verificación activada y haber entrado con ella.

1. Ve a **Ajustes › Equipo**. El filtro **Sin verificación en dos pasos** te enseña quién aún no la tiene.
2. Abajo, activa **Exigir verificación en dos pasos**.
3. El diálogo te dice quién tendrá que configurarla. Pulsa **Exigirla**.

La próxima vez que alguien sin la verificación abra QuiroFlow (en el ordenador o en la app), tendrá que configurarla antes de seguir. Para volver a hacerla opcional, desactiva el interruptor: se guarda al momento.

> **Ten en cuenta:** si el interruptor no te deja activarlo, es porque tú aún no la tienes, o no has entrado con ella en esta sesión. Configúrala primero en tus **Ajustes de la Cuenta**, cierra sesión y vuelve a entrar.

> **Ten en cuenta:** no es solo una pantalla. Mientras alguien no introduce el código, QuiroFlow no le enseña ningún dato de la clínica, ni siquiera a quien intentara saltarse la aplicación con la contraseña robada.

## Si alguien pierde el móvil

Sin el móvil no hay código. Una persona con el permiso **Equipo** puede restablecerla:

1. Ve a **Ajustes › Equipo** y abre la ficha de la persona.
2. En **Seguridad**, junto a **Verificación en dos pasos: configurada**, pulsa **Restablecer** y confirma.

Su app de autenticación deja de funcionar para QuiroFlow. Si tu clínica la exige, la configurará de nuevo la próxima vez que entre; si no, entrará solo con su contraseña hasta que la vuelva a activar.

> **Ten en cuenta:** solo una persona propietaria puede restablecer la verificación de otra propietaria. Si la única persona propietaria pierde el móvil y no hay nadie más que pueda hacerlo, escribe a **hola@quiroflow.com** desde el correo de la cuenta y te ayudamos a recuperar el acceso. Nombrar a una segunda persona propietaria evita quedarte en esa situación.

Cada vez que alguien activa o quita la verificación, o introduce el código, queda en el [registro de actividad](/es/articles/security-privacy/activity-log).
