---
title: El calendario
description: Cómo se lee el calendario de la clínica, sus vistas, pestañas, filtros, interruptores de visualización y atajos de teclado.
collection: calendar-appointments
order: 1
---

El **Calendario** es la agenda de la clínica. Desde aquí recepción y profesionales reservan, mueven, registran la llegada, cobran y cancelan visitas, y ven de un vistazo quién está esperando, quién no ha confirmado y quién debe dinero. Lo encuentras en el menú lateral, en **Hoy** › **Calendario**.

## Lo que ves en pantalla

- **Barra superior:** las flechas ‹ › y **Hoy** para moverte por las fechas, el selector de vista, y los botones **Turno de caja**, **Bloquear horario**, **Ausencia imprevista**, **Nueva clase** y **+ Nueva Cita**.
- **Pestañas de profesionales:** **Toda la clínica**, una pestaña por cada profesional y **Sin profesional** (las citas que no tienen a nadie asignado).
- **Fila de recuentos:** encima de la cuadrícula, cuántas citas hay en lo que estás viendo ("48 citas", o "12 citas hoy") y unos botones de estado: **sin confirmar**, **quieren cambiar**, **esperando**, **en consulta**, **por cobrar** y **deben**. Cada uno solo aparece si hay alguna cita en ese estado.
- **La cuadrícula:** una columna por sala (más **Sin asignar**) para cada día, de 08:00 a 20:00. Una línea roja marca la hora actual. Bajo el nombre de cada sala ves quién atiende en ella ese día.
- **Panel izquierdo:** un mes en miniatura (haz clic en un día para saltar a él), el [Seguimiento de flujo](/es/articles/calendar-appointments/flow-tracker), **Hoy de un vistazo**, los interruptores de **Visualización** y la **Leyenda de estados**. En pantallas estrechas este panel se abre con el botón **Info**.

Las horas en las que nadie trabaja aparecen rayadas con el texto **Fuera de horario**, y el tiempo bloqueado se ve en gris (**Bloqueado**, **Bloqueado (toda la clínica)** o **Bloqueado para** seguido del nombre).

## Cambiar de vista y de profesional

::help-video{clip="calendar--views-and-tabs" caption="Pasar de la semana a un día, a la agenda de un profesional y al mes"}
::

1. Abre el selector de vista (pone **Semana laboral** la primera vez) y elige **Día**, **Semana laboral** (de lunes a viernes), **Semana** (de lunes a domingo) o **Mes**.
2. Haz clic en la pestaña de un profesional para ver solo su agenda, o en **Toda la clínica** para verlas todas.
3. En la vista **Mes**, cada día muestra cuántas citas tiene, el % ocupado y las horas libres. Un día sin hueco pone **Lleno** y uno en que la clínica cierra, **Cerrado**. Haz clic en un día para abrirlo en vista Día.

La vista y la pestaña que elegiste se recuerdan en ese navegador la próxima vez que abras el calendario.

> **Ten en cuenta:** la ocupación del mes se calcula con los horarios de los profesionales. Si nadie tiene horario, verás "Pon los horarios en Ajustes › Equipo para ver la ocupación de cada día." Consulta [Horario laboral de un profesional](/es/articles/team-roles/practitioner-working-hours).

En la vista **Día** caben hasta seis citas solapadas una al lado de otra, y en las vistas de semana hasta cuatro; si hay más, se agrupan en un botón "+N más" que abre ese momento en vista Día. En la vista de semana, la cabecera de cada día indica también cuántas citas tiene **sin confirmar** y cuántos pacientes **deben** dinero.

## Filtrar por estado con la fila de recuentos

::help-video{clip="calendar--count-filter" caption="Resaltar las citas sin confirmar y volver a verlas todas"}
::

1. Haz clic en uno de los botones de la fila de recuentos, por ejemplo **sin confirmar**.
2. Las citas que no encajan se atenúan (no desaparecen), así que ves enseguida las que te interesan.
3. Haz clic en **Ver todas** para quitar el filtro.

Solo se puede usar un filtro a la vez. **sin confirmar** incluye también las citas reservadas online que aún no se han confirmado, y **deben** muestra el total que deben esos pacientes.

## Leer un bloque de cita

Cada cita es un bloque con el nombre del paciente (abreviado si no cabe, como "M. Gil") y su hora. Sin abrirlo ya te dice mucho:

- **El borde** indica si la cita está firme: discontinuo mientras está sin confirmar, reservada online o el paciente quiere cambiarla; continuo cuando está confirmada.
- **La etiqueta** dice dónde está el paciente: **Sin confirmar**, **Confirmada**, **Llegó** con la hora, **En consulta**, **Por cobrar**, **Hecha** o **No vino**.
- **El rojo es solo para el dinero:** una etiqueta "Debe" con el importe.
- **El color** es el del tipo de cita. Las visitas hechas conservan su color, más apagado.
- **Iconos pequeños:** señales rojas en la ficha, formularios sin completar, nota clínica, **Movida antes** (se ha movido alguna vez) y la marca del plan de cuidados ("Visita N" del plan). Un chip discontinuo **Sin próxima** avisa de que el paciente no tiene otra visita reservada mientras está en consulta, por cobrar o recién atendido.

Todos los estados se explican en [Estados de una cita](/es/articles/calendar-appointments/appointment-statuses-explained).

## Ver los detalles sin abrir la cita

::help-video{clip="calendar--hover-card" caption="Pasar el ratón por encima de una cita para ver su ficha rápida"}
::

Pasa el ratón por encima de un bloque (o llega a él con el teclado) y aparece una tarjeta con:

- nombre, hora, profesional y sala;
- en qué punto está ("Sin confirmar · Recordatorio enviado hoy 10:00 · sin respuesta", por ejemplo);
- formularios pendientes, la nota **Para el equipo** del tipo de cita y las **Señales rojas**;
- si se ha movido ("Movida 2 veces" y desde cuándo);
- el dinero: lo que debe, el saldo a su favor o **Sin saldo pendiente**, y lo que costará esta visita;
- el bono que usará y las sesiones que le quedan;
- la **Nota del paciente**.

La tarjeta es solo de lectura. Haz clic (o pulsa **Intro**) para abrir la cita. En una pantalla táctil no hay tarjeta: un toque abre directamente la cita.

## Hoy de un vistazo

En el panel izquierdo, **Hoy de un vistazo** resume el día de hoy de toda la clínica: **Cobrado** y **Facturado** (solo para quien puede ver las transacciones del día en Informes; al hacer clic se abren), y las citas **Reservadas**, **Atendidas**, **Reprogramadas**, **Canceladas** y **Perdidas**, cada una con su porcentaje. Siempre habla de hoy, aunque estés mirando otro día.

## Interruptores de visualización

::help-video{clip="calendar--privacy-mode" caption="Activar el modo privacidad para ocultar los nombres"}
::

En **Visualización**, en el panel izquierdo:

| Interruptor | Qué hace | Por defecto |
|---|---|---|
| **Modo privacidad** | Difumina los nombres de los pacientes en el calendario y en el seguimiento de flujo. Útil si la pantalla se ve desde la sala de espera. | Apagado |
| **Seguimiento de flujo** | Muestra u oculta el [seguimiento de flujo](/es/articles/calendar-appointments/flow-tracker). | Encendido |
| **Mostrar disponibilidad** | Muestra las franjas grises de tiempo bloqueado. Las horas **Fuera de horario** siguen rayadas. | Encendido |
| **Mostrar canceladas** | Vuelve a mostrar las citas canceladas, que normalmente salen de la cuadrícula para dejar el hueco libre. | Apagado |
| **Ocultar reprogramadas** | Oculta las marcas "Movida al …" que quedan en la hora antigua de una cita movida. | Apagado |
| **Ocultar eliminadas** | Oculta las citas eliminadas. | Encendido |

> **Ten en cuenta:** estos interruptores no se guardan. Al recargar la página vuelven a su valor por defecto, así que si usas el **Modo privacidad** en recepción, actívalo cada vez que abras el calendario.

## Atajos de teclado

Pulsa `?` en cualquier pantalla para ver la lista completa (**Atajos de teclado**). En el calendario:

| Tecla | Acción |
|---|---|
| `c` o `n` | Nueva cita |
| `t` | Ir a hoy |
| `j` / `k` | Día o semana siguiente / anterior |
| `d` / `w` / `m` | Vista de día / semana laboral / mes |
| flechas e **Intro** | Moverte por los huecos de la cuadrícula; **Intro** reserva un hueco libre o abre la cita |
| `a` (con una cita abierta) | Siguiente paso: llegada, a consulta, a cobro |
| `p` (con una cita abierta) | Cobrar |

Desde cualquier pantalla, `g` y luego `c` te lleva al calendario. Los atajos no actúan mientras escribes en un campo.

## En el móvil

En una pantalla de teléfono el calendario se convierte en una agenda de una sola columna: arriba eliges **Mis citas** o **Toda la clínica**, las visitas ya hechas se agrupan en una sola fila, y un botón redondo **+** crea una cita nueva. El menú **Más** tiene la vista, **Nueva cita**, **Bloquear horario**, **Turno de caja** e **Información del día**.

## Quién puede hacer qué

- El permiso **Calendario** decide qué citas ve cada persona: **Todas las citas**, **Solo las suyas** o **Nada** (en ese caso no ve ni el Calendario ni Mi día).
- Con **Calendario de solo lectura**, la persona ve las citas pero no puede reservar, mover, editar ni bloquear: verás una etiqueta **Solo lectura** en lugar de los botones. Sí puede cobrar.
- **Turno de caja** solo aparece a quien tiene el permiso **Registrar pagos y llevar la caja**. Cómo se usa está en [Turno de caja](/es/articles/billing-payments/cash-shift).

Los permisos se cambian en [Roles y permisos](/es/articles/team-roles/roles-and-permissions).

> **Ten en cuenta:** la cuadrícula siempre va de 08:00 a 20:00. Una cita que empieza antes de las 08:00 o termina después de las 20:00 se dibuja pegada al borde.

> **Ten en cuenta:** en la pestaña de un profesional, las horas rayadas siguen su propio horario (o el de la clínica si no tiene). En **Toda la clínica**, una hora solo sale rayada si no trabaja nadie.
