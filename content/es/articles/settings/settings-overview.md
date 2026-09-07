---
title: Un recorrido por Settings
description: Qué hay en cada sección de Settings, y dónde encontrarlo.
collection: settings
order: 3
---

Settings está organizado en varias secciones (algunos elementos solo aparecen si tu rol tiene permiso para verlos -- consulta [Roles y permisos](/es/articles/team-roles/roles-and-permissions), ya que un rol Front Desk, por ejemplo, no verá casi nada de esto).

![Menú lateral de Settings mostrando los grupos Clinic y Billing](/screenshots/settings-team.png)

Esta página cubre la configuración de toda la clínica -- todo aquí afecta a todo tu equipo. Tus propias preferencias personales (tema, idioma, contraseña) están en otro sitio completamente distinto: selecciona tu nombre en la esquina superior derecha -- consulta [Tu configuración de cuenta](/es/articles/getting-started/account-settings).

## Clinic
- **Clinics** -- tus ubicaciones. Consulta [Gestionar clínicas](/es/articles/settings/managing-clinics).
- **Online Booking** -- consulta la colección **Reservas online**.
- **Team Members** y **Practitioners** -- cuentas de personal e invitaciones; consulta [Invitar a tu equipo](/es/articles/getting-started/inviting-your-team). Practitioners sirve específicamente para vincular nombres migrados a cuentas reales, o para invitar a un profesional que aún no tiene acceso de inicio de sesión.
- **Roles & Permissions** -- consulta [Roles y permisos](/es/articles/team-roles/roles-and-permissions).
- **Appointment Types** -- consulta [Tipos de cita, servicios y productos](/es/articles/settings/appointment-types-and-services).
- **Scheduling Policies**, **Calendar Resources** (salas), **Modalities** -- cómo está estructurado tu calendario: las reglas de cancelación/no presentado, las salas físicas disponibles, y cómo categorizas profesionales y citas.
- **Mobile App** -- el código de acceso y el QR de tu clínica para la app de pacientes; consulta [Llevar a tus pacientes a la app de QuiroFlow](/es/articles/patients/mobile-app).
- **Referral Sources**, **New Patient Fields** -- configuración más pequeña para la admisión de pacientes: las opciones de fuente de referencia que se ofrecen al añadir un paciente, y qué campos se muestran (y cuáles son obligatorios) en ese formulario.

## Billing
- **Services & Products**, **Packages / Bonos**, **Memberships** -- lo que vendes: servicios puntuales, bonos de sesiones prepagadas, y membresías recurrentes, cada uno con su propia configuración de precios. Consulta [Tipos de cita, servicios y productos](/es/articles/settings/appointment-types-and-services), [Vender un bono a un paciente](/es/articles/billing-payments/selling-a-package-bono) y [Vender y gestionar membresías](/es/articles/billing-payments/memberships).
- **Payments (Stripe)** -- consulta [Conectar Stripe](/es/articles/settings/connecting-stripe).
- **Payment Methods**, **Invoice Settings**, **Fiscal Data** -- detalles de facturación e información legal. Fiscal Data guarda concretamente el nombre legal, el NIF/CIF y la dirección que se imprimen en cada factura, más una nota de pie -- obligatorio para que una factura sea fiscalmente válida, así que merece la pena tenerlo bien configurado antes de emitir la primera.

## Communication
- **General** -- confirmaciones y recordatorios automáticos, consulta [Configurar confirmaciones y recordatorios de citas](/es/articles/calendar-appointments/setting-up-confirmations-and-reminders).
- **WhatsApp** -- consulta [Conectar WhatsApp](/es/articles/communications/connecting-whatsapp).
- **Saved Replies** -- respuestas predefinidas para el Inbox, útiles para las preguntas que tu recepción responde a menudo (aparcamiento, qué traer a una primera visita, política de cancelación).
- **Docs** -- plantillas de documentos para la [pestaña Docs](/es/articles/patients/patient-documents), donde creas una vez formularios de consentimiento y cuestionarios de admisión reutilizables y los envías a cualquier paciente.

## Data
- **Import Patients (CSV)**, **Migrate Attachments** -- herramientas de datos masivos, usadas sobre todo una vez al configurar la cuenta por primera vez o al migrar desde otro sistema.
- **Webhooks** -- de toda la cuenta, distinto de la acción de webhook por campaña que se explica en [Enviar campañas](/es/articles/communications/sending-campaigns).

## Developers
- **API & Tokens** -- para quien integre QuiroFlow con algo desarrollado por su cuenta, distinto de las conexiones ya hechas con Stripe/WhatsApp que se explican en otras partes de Settings.

## Si no encuentras algo

Settings está organizado según lo que configuras, no según con qué frecuencia lo usas, así que un elemento que se toca poco puede seguir estando exactamente donde esperarías una vez conoces la agrupación de arriba. Si una sección que esperas ver falta por completo, lo más probable es que sea un problema de permisos y no una función que no existe -- consúltalo con el Owner de tu cuenta.
