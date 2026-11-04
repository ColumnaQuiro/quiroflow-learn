---
title: Automatizaciones
description: Mensajes y tareas que se lanzan solos tras una cita, en un cumpleaños o con una factura pendiente, montados como un flujo de pasos.
collection: communications
order: 6
---

Una **automatización** es un mensaje (o una serie de pasos) que QuiroFlow lanza solo cuando pasa algo: se reserva una cita, un paciente no viene, alguien cumple años, una factura lleva días sin pagar. Cada una tiene un disparador (**Cuándo…**) y debajo un flujo de pasos: enviar un WhatsApp o un email, esperar, decidir según los datos del paciente, poner una etiqueta o avisar a alguien del equipo.

Están en **Pacientes › Automatizaciones** y se pueden usar en todos los planes; las de leads necesitan Growth. Necesitas el permiso **Comunicación y Growth**.

## Empezar desde una plantilla

La forma más rápida es partir de una de las plantillas, escritas para una clínica quiropráctica. Se crean pausadas y con los datos de tu clínica, para que las revises antes de activarlas.

::help-video{clip="automations--from-template" caption="Crear el recordatorio de 24 horas desde una plantilla y activarlo"}
::

1. En **Automatizaciones**, pulsa **Plantillas**.
2. Elige una, por ejemplo **Recordatorio 24 h**. Se abre en el editor, en pausa.
3. Pulsa el paso de WhatsApp y elige, en **Plantilla aprobada por Meta**, la plantilla que quieres enviar.
4. Pulsa **Guardar cambios**.
5. Activa el interruptor junto al nombre. Verás «Activada».

Algunas de las plantillas disponibles:

- **Recordatorio 24 h**: con botones para confirmar o cambiar.
- **Bienvenida a primera visita**: qué traer, cómo llegar y el formulario, al reservar.
- **Recuperar tras la visita**: si en 2 días no tiene próxima cita, un WhatsApp; si en 7 días no reserva, un aviso para recepción.
- **Segunda visita pendiente**, **Mantenimiento: 3 meses sin venir**, **Reactivación: 6 a 12 meses** y **Planes sin terminar**: para recuperar a pacientes que dejaron de venir.
- **No asistió**, **Recordatorio de pago** y **Cumpleaños**.
- **Pedir reseña** y **¿Qué tal te hemos atendido?**: consulta [Reputación y reseñas de Google](/es/articles/growth/reputation).
- **Lead de anuncio** (Growth): respuesta en minutos a quien rellena un formulario de tus anuncios.
- En **Emails para pacientes**, correos de un solo paso: primera visita agendada, informe listo, fin de plan de cuidado, cumpleaños…

Si ya tienes una con el mismo nombre, la plantilla aparece como «ya añadida». **Empezar en blanco** abre una automatización vacía.

## Crear una desde cero

1. Pulsa **Nueva automatización** y ponle nombre en **Nombre de la automatización**.
2. En el disparador, elige **Cuándo…**: por ejemplo **Cumpleaños del paciente**, **Cita completada**, **No asistió**, **Horas antes de la cita**, **Factura sin pagar** o **Un segmento de pacientes**.
3. Si quieres limitarlo, añade condiciones en **Solo si** (tipo de cita, profesional, paciente nuevo, número de visitas…).
4. Pulsa el **+** bajo el disparador y elige un paso: **WhatsApp**, **Email**, **Esperar**, **Esperar hasta que…**, **Si / si no**, **Añadir o quitar etiqueta**, **Avisar a alguien del equipo** o **Webhook**.
5. Configura el paso en el panel lateral. Para un WhatsApp, elige la plantilla y qué dato va en cada variable (**Nombre del paciente**, **Fecha y hora de la cita**, **Enlace de reserva online**…). Para un email, escribe **Asunto** y **Mensaje**.
6. Repite con el **+** entre pasos hasta el **Fin**.
7. Pulsa **Guardar cambios** y activa el interruptor.

Si falta algo al activarla (por ejemplo, un WhatsApp sin plantilla), QuiroFlow te avisa con «Falta algo antes de activarla» y te lleva al paso.

> **Ten en cuenta:** cada paso de WhatsApp necesita una plantilla aprobada por Meta. Consulta [Conectar WhatsApp y elegir las plantillas](/es/articles/communications/connecting-whatsapp).

> **Ten en cuenta:** el editor se usa en tablet u ordenador. En el móvil las automatizaciones se ven como lista de pasos.

## Esperas y caminos

- **Esperar**: un tiempo fijo (minutos, horas o días) antes del paso siguiente.
- **Esperar hasta que…**: espera a que el paciente **Reserve una cita**, **Responda por WhatsApp**, **Pague lo pendiente**, abra o haga clic en el email, haga check-in o complete un formulario, con un máximo. Sale por un camino si ocurre y por otro si se acaba el plazo.
- **Si / si no**: divide el flujo en dos según los datos del paciente (por ejemplo, **Cita futura** existe o no existe).

Sobre el lienzo, cada paso muestra sus cifras: cuántos se enviaron y leyeron, cuántos van por **Sí** y por **No**, cuántos esperan.

## Ajustes de cada automatización

En la pestaña **Ajustes** del editor:

- **Salir antes de terminar**: la persona deja la automatización en cuanto **Reserva una cita** o **Responde por WhatsApp** (o, en las de leads, **Se convierte en paciente (leads)**), esté en el paso que esté.
- **Cuándo se envía**: los mensajes nunca salen de noche. Eliges los días y el horario (por defecto de 10:00 a 20:00, de lunes a sábado); lo que toque fuera de ese horario espera al siguiente hueco.
- **Marketing**: marca **Es una comunicación comercial** si el mensaje es promocional. Entonces cada canal solo llega a quien lo aceptó. Consulta [Consentimiento de marketing y bajas](/es/articles/communications/marketing-consent-and-unsubscribe).
- **Si ya está dentro** (en el disparador): **Entra otra vez (una por cada vez que ocurre)**, **No entra hasta terminar** o **Solo una vez en la vida**.

## Pausar o eliminar

Apaga el interruptor para pausarla: no entra nadie nuevo y quienes ya están dentro esperan en su paso hasta que la reanudes. En **Ajustes › Pausar o eliminar** puedes **Eliminar automatización**; quienes estaban dentro salen y los mensajes ya enviados se quedan como estaban.

## La lista de automatizaciones

Cada fila muestra si está activa, sus etiquetas (**Growth**, **Marketing**, **Modo prueba**) y sus cifras: **dentro ahora**, **entraron · 30 días** y los enviados, leídos o emails abiertos. Los filtros **Activas**, **Pausadas**, **Pacientes**, **Leads** y **Con fallos** te ayudan a encontrar la que buscas.

Para enviar un mensaje a un grupo de pacientes una sola vez, consulta [Enviar un mensaje a un grupo de pacientes](/es/articles/communications/sending-to-a-group). Para probar sin enviar nada y corregir fallos, consulta [Probar y revisar una automatización](/es/articles/communications/testing-and-fixing-automations).

> **Ten en cuenta:** si una automatización de leads se queda sin Growth, se pausa y se guarda tal cual («Pausada · sin Growth»). Vuelve a funcionar al activar Growth.
