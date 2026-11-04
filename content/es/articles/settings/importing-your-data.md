---
title: Importar tus datos
description: Trae a QuiroFlow tus pacientes, citas, cobros, bonos, notas y archivos desde PracticeHub, o tus pacientes desde un archivo CSV de cualquier otro programa.
collection: settings
order: 8
---

Si tu clínica viene de otro programa, no hace falta empezar de cero. En **Ajustes › Importar** puedes traer los registros de **PracticeHub** paso a paso, o los pacientes de **cualquier otro sistema** desde un archivo CSV. Cada paso enseña primero una vista previa de lo que va a cambiar: no se escribe nada hasta que lo confirmas.

Necesitas el permiso **Datos**.

## Importar pacientes desde un CSV

::help-video{clip="settings--import-csv" caption="Importar pacientes desde un archivo CSV"}
::

Sirve para cualquier programa que pueda exportar sus pacientes a un archivo CSV (o a Excel, guardado después como CSV).

1. Exporta tus pacientes desde tu programa actual.
2. En **Ajustes › Importar**, en **Importar desde**, elige **Otro sistema** (**Pacientes desde un archivo CSV**).
3. Arrastra el archivo a la zona de carga, o pulsa **busca un archivo**. QuiroFlow te dice cuántas filas ha detectado.
4. Relaciona cada **Campo de QuiroFlow** con la **Columna en tu archivo**. QuiroFlow propone las que reconoce; corrige las que falten. Como mínimo hace falta **Nombre**.
5. Si quieres, elige en **Importar a la clínica** la sede a la que pertenecen, y pulsa **Continuar**.
6. Revisa el resumen: **Filas totales**, **Se importarán**, **Se actualizarán** y **Sin cambios / sin nombre**, con una muestra de los cambios en pacientes que ya existían.
7. Pulsa **Importar…** (el botón dice cuántos se importan y cuántos se actualizan). Al terminar, **Ver pacientes** te lleva a la lista; **Importar otro archivo** empieza de nuevo.

> **Ten en cuenta:** si tu archivo tiene un identificador propio de cada paciente, relaciónalo con **ID de registro (opcional — permite reimportar sin duplicar)**. Así puedes volver a importar el mismo archivo más adelante y QuiroFlow actualiza a los pacientes en lugar de duplicarlos. Sin ese identificador, los reconoce por el correo.

## Importar desde PracticeHub

Para las clínicas que vienen de PracticeHub, QuiroFlow se conecta a su API y trae mucho más que los pacientes. La lista de la izquierda tiene los pasos en el orden en que conviene hacerlos; cada uno dice **Aún sin ejecutar** o cuántos registros ha importado.

### 1. Conectar

1. Elige **PracticeHub** en **Importar desde** y abre **Configurar › Conexión**.
2. Rellena la **URL de PracticeHub**, la **Clave API** (en PracticeHub, **Developers → API Keys**) y **Tu correo electrónico** (PracticeHub lo pide como identificador). Si tu clínica ya está en PracticeHub 2.0, añade también la **Clave API de PracticeHub 2.0**, la que empieza por phk_.
3. Pulsa **Probar conexión** y después **Guardar**. La conexión queda guardada para todos los pasos.

### 2. Los pasos, en orden

- **1 · Registros**: **Pacientes** (va primero: todo lo demás se empareja con su paciente), **Tipos de cita** y **Citas**.
- **2 · Dinero**: **Libro mayor** (las facturas y pagos tal como los tiene PracticeHub), **Bonos** y **Planes 2.0** (solo lectura, por ahora). Primero los pagos, para que cada bono sepa lo que queda pendiente.
- **3 · Clínico**: **Notas de tratamiento**, **Planes de cuidados**, **Registros de pacientes**, **Notas adhesivas**, **Respuestas de formularios** (crea también una plantilla de documento por formulario) y **Archivos** (escaneos, fotos y PDF).
- **Comprobar**: **Comprobar migración** (qué llegó y qué no) y **Comprobar un paciente** (un paciente, los dos sistemas lado a lado). Es solo lectura.

En cada paso, pulsa el botón de leer, revisa la vista previa (**Muestra de cambios**) y confirma con el botón de importar.

> **Ten en cuenta:** puedes repetir cualquier paso sin miedo: los pacientes se reconocen por su referencia de PracticeHub (y si no, por el correo), y nunca se duplican. Si sigues usando PracticeHub unos días mientras empiezas con QuiroFlow, vuelve a pasar los pasos para traer lo nuevo.

> **Ten en cuenta:** las citas importadas llevan el nombre del profesional de PracticeHub. Si ese nombre aún no es nadie de tu equipo, vincúlalo en **Ajustes › Equipo › Nombres importados sin vincular**. Consulta [Invitar a tu equipo](/es/articles/team-roles/inviting-your-team).

Para dejar de usar la conexión, pulsa **Desconectar**: se borra la clave API y no cambia nada de lo ya importado.

## Archivos

::help-video{clip="settings--files" caption="Comprimir los archivos de los pacientes"}
::

**Ajustes › Archivos** cuenta los escaneos, fotos y PDF de tus pacientes (**Archivos en pacientes**) y tiene dos trabajos para ordenarlos tras una migración:

- **Archivos que llegaron sin su contenido**: aparecen en la ficha con su nombre y fecha, pero no se pueden abrir. **Traer de PracticeHub** te lleva a **Importar › Archivos** para descargarlos, si PracticeHub aún los tiene; **Cuáles** te enseña la lista.
- **Comprimir**: vuelve a guardar los PDF e imágenes con calidad alta, entre un 40 y un 60 % más pequeños sin diferencia en pantalla. Pulsa **Comprimir N archivos** y mantén la página abierta mientras trabaja; **Detener** lo para y puedes seguir otro día.

> **Ten en cuenta:** los archivos que subes en QuiroFlow, y los que trae **Importar › Archivos**, ya se comprimen al llegar. Comprimir solo hace falta para los que llegaron antes.
