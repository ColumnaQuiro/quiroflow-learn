---
title: Mover y cancelar citas
description: Cambia una cita de hora o de día, cancélala con o sin cargo ofreciendo el hueco a la lista de espera, o márcala como no presentada.
collection: calendar-appointments
order: 4
---

Las citas cambian: el paciente pide otro día, alguien avisa de que no viene o directamente no aparece. Todo se hace desde el calendario y desde el panel de la cita, y QuiroFlow deja constancia de cada cambio en el **Historial** de la cita.

## Mover una cita a otro día con «Mover…»

::help-video{clip="calendar--move-to-another-week" caption="Mover una cita a la semana siguiente con «Mover…»"}
::

1. Abre la cita y pulsa **Mover…**, abajo del panel.
2. Aparece un aviso: **Reprogramando** el paciente y el tipo, "navega a cualquier día y haz clic en un hueco libre para moverla ahí." Puedes cambiar de semana, de vista o de pestaña libremente.
3. Haz clic en el hueco nuevo.
4. Se abre **Cambiar fecha de la cita**: revisa los datos, elige un **Motivo** si quieres y añade una **Nota**.
5. Pulsa **Confirmar**.

Para salir sin mover nada, pulsa **Cancelar** en el aviso.

## Arrastrar una cita

::help-video{clip="calendar--drag-reschedule" caption="Arrastrar una cita a otra hora y elegir el motivo"}
::

1. Arrastra el bloque a otra hora o a otra sala de los días que tienes en pantalla.
2. En **Cambiar fecha de la cita**, elige el **Motivo** y, si quieres, escribe una nota.
3. Deja marcado **Reenviar confirmación (si está activada)** para que el paciente reciba la hora nueva.
4. Pulsa **Confirmar**.

En la hora antigua queda una marca tenue, **Movida al** y la fecha nueva; si haces clic en ella se abre la cita. El bloque movido lleva el icono **Movida antes**. Para alargar o acortar una cita, arrastra su borde inferior.

En el diálogo **Cambiar fecha de la cita** también puede aparecer **Aplicar un cargo por política de citas al historial del paciente**, si tu clínica tiene una tarifa por reprogramar. Viene desmarcado: márcalo solo si quieres cobrarla, y se añade como un recibo pendiente. Las tarifas y los motivos se configuran en [Políticas de programación y salas](/es/articles/settings/scheduling-and-resources).

> **Ten en cuenta:** si la hora nueva coincide con otra cita o con un bloqueo, QuiroFlow pregunta primero (**Ese hueco está ocupado**: "Dos a la vez es posible, pero solo a propósito."). Elige **Moverla igualmente** o **Elegir otra hora**. Si la hora nueva queda fuera del horario del profesional, también pide confirmación.

> **Ten en cuenta:** si arrastras una cita a otra sala sin cambiar la hora, o solo cambias su duración, se guarda al momento, sin diálogo y sin avisar al paciente.

## Cambiar los datos de una cita

En el panel de la cita, el botón **Cambiar** (junto a la hora) abre una edición rápida con **Fecha**, **Hora**, **Tipo**, **Minutos**, **Sala** y **Profesional**. Pulsa **Guardar**.

> **Ten en cuenta:** si con **Cambiar** pones otra hora de inicio, cuenta como mover la cita: queda en el historial y se avisa al paciente con las automatizaciones de "cita reprogramada". A diferencia de arrastrar o de **Mover…**, no pide motivo ni ofrece la tarifa.

## Cancelar una cita

::help-video{clip="calendar--cancel-and-offer" caption="Cancelar una cita y ofrecer el hueco a la lista de espera"}
::

1. Abre la cita y pulsa **Cancelar cita…**. El panel pasa a **Cancelar la cita** e indica cuánto falta ("Empieza en 3 h 10 min").
2. En **¿Se cobra la cancelación?** elige **Sin cargo**, **Añadir** la tarifa **a su saldo**, o **Cobrar** la tarifa a la tarjeta guardada del paciente. Este apartado solo aparece si tu clínica tiene tarifa de cancelación.
3. En **El hueco de las …**, QuiroFlow te dice cuántas personas de la [lista de espera](/es/articles/calendar-appointments/waitlist) encajan con ese hueco. Elige **Ofrecérselo** a la primera por WhatsApp (o a todas a la vez, según cómo lo tengas configurado) o **Dejar el hueco libre**.
4. Lee la frase de resumen (por ejemplo "La cita queda como cancelada en su historial y Lucía recibe la oferta ahora.") y pulsa el botón de confirmar, que resume lo que va a pasar ("Cancelar cita · ofrecer hueco"). **No cancelar** vuelve atrás.

La cita sale del calendario y su hueco queda libre. Si se ha ofrecido, el hueco se dibuja como "Hueco ofrecido a" la persona "· responde antes de las" la hora límite, y no se puede reservar hasta que conteste o caduque la oferta.

> **Ten en cuenta:** al cancelar se ponen en marcha las automatizaciones de "cita cancelada" de tu clínica, que avisan al paciente.

> **Ten en cuenta:** la oferta dura hasta dos horas y como tarde hasta 20 minutos antes de la cita. Si la cita empieza demasiado pronto, verás "Empieza demasiado pronto para que alguien lo aproveche."

> **Ten en cuenta:** cobrar a la tarjeta solo aparece a quien tiene permisos de facturación y si el paciente tiene una tarjeta guardada. Si la tarjeta se rechaza, la tarifa queda en su saldo.

Para ver una cita cancelada en el calendario, activa **Mostrar canceladas** en **Visualización**.

## Marcar que el paciente no vino

::help-video{clip="calendar--no-show-fee" caption="Marcar una cita como no presentada y añadir la tarifa al saldo"}
::

1. Abre la cita y pulsa **No vino**.
2. Si tu clínica tiene tarifa por cita perdida, aparece una franja amarilla, "Cargo por no presentarse", con **Cobrar a** la tarjeta guardada (solo con permisos de facturación), **Añadir al saldo** o **Sin cargo**.

La cita queda como **No vino** y se ponen en marcha las automatizaciones de "no presentado". El botón **No vino** se desactiva ("Ya ha llegado") en cuanto se registra la llegada del paciente.

## Eliminar una cita

Con el permiso **Eliminar citas**, abajo del panel aparece **Eliminar cita**. Te pregunta "¿Eliminar esta cita?": desaparece del calendario. Si el paciente no vino o anuló la cita, es mejor cancelarla o marcarla como **No vino**, para que quede constancia. Las citas eliminadas se pueden volver a ver desactivando **Ocultar eliminadas**.

## Varias citas a la vez

Si un profesional falta de repente, no muevas sus citas una a una: **Ausencia imprevista** bloquea su agenda y pasa sus citas a un compañero o las cancela de golpe. Se explica en [Citas recurrentes, bloqueos y ausencias](/es/articles/calendar-appointments/recurring-and-blocking-time).
