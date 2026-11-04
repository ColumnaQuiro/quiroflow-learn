---
title: Fusionar fichas duplicadas
description: Une dos fichas de la misma persona en una sola, sin perder citas, cobros, bonos ni documentos.
collection: patients
order: 6
---

A veces la misma persona acaba con dos fichas: alguien la dio de alta al reservar sin ver que ya existía, o una importación no la reconoció. No borres una de las dos: con ella se irían sus citas, sus cobros y sus bonos. Lo correcto es **fusionarlas**: todo lo de una ficha pasa a la otra, y la que sobra se elimina.

## Fusionar dos fichas

::help-video{clip="patients--merge" caption="Fusionar dos fichas de la misma persona"}
::

1. Abre cualquiera de las dos fichas y, en **Más acciones** (⋯), pulsa **Fusionar con otra ficha**.
2. En **Buscar por nombre, email o referencia**, escribe el nombre y elige la otra ficha. Cada resultado muestra su referencia, su correo y su fecha de nacimiento para que no te equivoques de persona.
3. Verás las dos fichas una al lado de la otra. Pulsa la que quieres **conservar**: esa dirá **Conserva todo** y la otra **Se eliminará**. Por defecto se conserva la ficha desde la que empezaste.
4. Revisa la tabla: para cada cosa (**Citas**, **Facturas**, **Bonos**, **Crédito**, **Documentos y archivos**) te dice cuánto **Se traslada**, cuánto queda **Conservado** y qué ficha queda **Eliminado**.
5. Pulsa **Fusionar** y confirma. Verás el aviso **Pacientes fusionados**. Si estabas en la ficha que se elimina, QuiroFlow te lleva a la que se conserva.

Si elegiste la ficha equivocada, pulsa **Elegir otro** antes de fusionar.

## Qué pasa con los datos

- Todo lo que tenía la ficha eliminada pasa a la conservada: citas, notas de visita, cobros, pagos, facturas, bonos, membresías, crédito, formularios y archivos.
- La ficha conservada **mantiene sus propios datos**. Solo se rellenan sus campos vacíos con los de la otra (por ejemplo, si no tenía correo y la otra sí).
- Se conservan las **etiquetas** y los **teléfonos** de las dos.
- Las facturas se pueden mover sin problema: el paciente no forma parte de los datos que firma VeriFactu, así que la cadena no se altera.

> **Ten en cuenta:** fusionar no se puede deshacer. Antes de pulsar **Fusionar**, mira bien los números de la tabla: a veces la ficha que parece vacía es la que tiene el bono o el saldo a favor.

> **Ten en cuenta:** para evitar duplicados, busca siempre al paciente por nombre, teléfono o correo antes de crear uno nuevo. QuiroFlow no avisa si ya existe.

Necesitas el permiso **Eliminar y fusionar pacientes**.
