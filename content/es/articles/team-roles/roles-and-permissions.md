---
title: Roles y permisos
description: Cómo funciona el sistema de roles de QuiroFlow, y cómo crear un rol personalizado.
collection: team-roles
order: 1
---

Cada miembro del equipo tiene un rol, y cada rol tiene su propio conjunto de permisos. Gestiónalos desde **Settings &rarr; Roles**.

## Roles predefinidos

- **Owner** -- siempre tiene todos los permisos. No se puede editar ni eliminar.
- **Practitioner** -- limitado a su propia agenda y sus propios pacientes por defecto.
- **Front Desk** -- ve toda la agenda y todos los pacientes, gestiona la facturación, pero sin acceso a la configuración de la cuenta.

![Página de configuración Roles & Permissions listando los roles Owner, Front Desk y Practitioner](/screenshots/settings-roles.png)

## Crear un rol personalizado

Si los roles predefinidos no encajan, crea el tuyo propio desde **Settings &rarr; Roles**. Algunos de los permisos que puedes activar o desactivar:

- **Settings** -- controla el acceso a toda la sección Settings. Los permisos que van debajo (Roles & permission settings, Team member administration, Clinic configuration, Billing configuration, Communication configuration, Data administration, Developer API & tokens) requieren todos que este esté activado.
- **Billing** -- ver y crear facturas.
- **Recalls & patient messaging**
- **WhatsApp Inbox** -- leer y responder conversaciones de pacientes.
- **Allow access to reports**, con una opción para restringirlo a **solo sus propios informes**.
- Permisos a nivel de paciente como editar pacientes, eliminar/fusionar pacientes, asignar pagos y editar bonos.
- Permisos clínicos para acceder, editar y eliminar notas de las citas.

El calendario y la visibilidad de pacientes también se pueden limitar a **All** (todos) u **Own only** (solo los propios) por rol, que es lo que hace que Practitioner vea solo su propia agenda mientras que Front Desk ve la de todos.

## Asignar un rol

Establece el rol de un miembro del equipo al invitarlo (consulta [Invitar a tu equipo](/es/articles/getting-started/inviting-your-team)), o cámbialo después desde **Settings &rarr; Team**.
