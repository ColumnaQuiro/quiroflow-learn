---
title: Roles y permisos
description: Cómo funciona el sistema de roles de QuiroFlow, y cómo crear un rol personalizado.
collection: team-roles
order: 1
---

Cada miembro del equipo tiene un rol, y cada rol tiene su propio conjunto de permisos. Gestiónalos desde **Settings &rarr; Roles & Permissions**.

## Roles predefinidos

- **Owner** -- siempre tiene todos los permisos. No se puede editar ni eliminar, y siempre hay exactamente un Owner por cuenta.
- **Practitioner** -- ve su propia agenda y sus propios pacientes por defecto.
- **Front Desk** -- ve toda la agenda y todos los pacientes, gestiona la facturación, pero no tiene acceso a la configuración de la cuenta.

![Página de configuración de Roles & Permissions listando los roles Owner, Front Desk y Practitioner](/screenshots/settings-roles.png)

## Crear un rol personalizado

Si los roles predefinidos no encajan, selecciona **+ New Role** desde **Settings &rarr; Roles & Permissions**. Algunos de los permisos que puedes activar o desactivar:

- **Settings** -- controla el acceso a toda la sección Settings. Los permisos que hay debajo (Roles & permission settings, Team member administration, Clinic configuration, Billing configuration, Communication configuration, Data administration, Developer API & tokens) requieren todos que este esté activado también -- desactivar Settings los oculta todos, sin importar su interruptor individual.
- **Billing** -- ver y crear facturas.
- **Recalls & patient messaging**
- **WhatsApp Inbox** -- leer y responder conversaciones de pacientes.
- **Allow access to reports**, con una opción para restringirlo a **own reports only** -- útil para un profesional senior que debería ver sus propias cifras de rendimiento sin ver las finanzas de toda la clínica.
- Permisos a nivel de paciente como editar pacientes, eliminar/fusionar pacientes, asignar pagos, y editar bonos.
- Permisos clínicos para acceder, editar y eliminar notas de visita.

La visibilidad de calendario y pacientes también se puede acotar a **All** o **Own only** por rol, que es lo que hace que Practitioner vea solo su propia agenda mientras Front Desk ve la de todos. Esta es la opción a cambiar si quieres un rol personalizado que se comporte como Practitioner pero con visibilidad de toda la clínica, por ejemplo -- empieza copiando los permisos de Practitioner y cambia solo esa opción.

## Un enfoque práctico para roles personalizados

En lugar de construir un rol desde cero, suele ser más fácil empezar cerca de uno de los roles predefinidos y ajustar desde ahí -- decide a cuál de los roles existentes se parece más en espíritu el nuevo (un Practitioner que también necesita acceso a facturación, o una persona de Front Desk que no debería ver los informes financieros), y luego activa o desactiva solo el puñado de permisos que realmente difieren.

## Asignar un rol

Establece el rol de un miembro del equipo al invitarlo (consulta [Invitar a tu equipo](/es/articles/getting-started/inviting-your-team)), o cámbialo después desde **Settings &rarr; Team Members**. Cambiar un rol tiene efecto inmediato -- puede que la persona necesite recargar su página para ver el cambio reflejado en su propio menú lateral y accesos.
