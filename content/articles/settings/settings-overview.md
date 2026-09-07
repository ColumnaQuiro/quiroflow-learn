---
title: A tour of Settings
description: What's in each section of Settings, and where to find it.
collection: settings
order: 3
---

Settings is grouped into a few sections (some items only show up if your role has permission for them -- see [Roles & permissions](/articles/team-roles/roles-and-permissions), since a Front Desk role, for example, won't see most of this at all).

![Settings sidebar showing the Clinic and Billing groups](/screenshots/settings-team.png)

This page covers clinic-wide configuration -- everything here affects your whole team. Your own personal preferences (theme, language, password) live somewhere else entirely: select your name in the top-right corner -- see [Your account settings](/articles/getting-started/account-settings).

## Clinic
- **Clinics** -- your locations. See [Managing clinics](/articles/settings/managing-clinics).
- **Online Booking** -- see the **Online Booking** collection.
- **Team Members** and **Practitioners** -- staff accounts and invites; see [Inviting your team](/articles/getting-started/inviting-your-team). Practitioners is specifically for linking migrated names to real accounts, or inviting a practitioner who doesn't have login access yet.
- **Roles & Permissions** -- see [Roles & permissions](/articles/team-roles/roles-and-permissions).
- **Appointment Types** -- see [Appointment types, services, and products](/articles/settings/appointment-types-and-services).
- **Scheduling Policies**, **Calendar Resources** (rooms), **Modalities** -- how your calendar is structured: cancellation/no-show rules, the physical rooms available, and how you categorize practitioners and appointments.
- **Mobile App** -- your clinic's join code and QR for the patient-facing app; see [Getting patients on the QuiroFlow app](/articles/patients/mobile-app).
- **Referral Sources**, **New Patient Fields** -- smaller configuration for patient intake: the referral source options offered when adding a patient, and which fields show (and are required) on that form.

## Billing
- **Services & Products**, **Packages / Bonos**, **Memberships** -- what you sell: one-off services, prepaid session packages, and recurring memberships, each with their own pricing setup. See [Appointment types, services, and products](/articles/settings/appointment-types-and-services), [Selling a package to a patient](/articles/billing-payments/selling-a-package-bono), and [Selling and managing memberships](/articles/billing-payments/memberships).
- **Payments (Stripe)** -- see [Connecting Stripe](/articles/settings/connecting-stripe).
- **Payment Methods**, **Invoice Settings**, **Fiscal Data** -- invoicing details and legal information. Fiscal Data specifically holds the legal name, tax ID, and address printed on every invoice, plus a footer note -- required for an invoice to be fiscally valid, so it's worth getting right before you send your first one.

## Communication
- **General** -- automatic confirmations and reminders, see [Setting up appointment confirmations and reminders](/articles/calendar-appointments/setting-up-confirmations-and-reminders).
- **WhatsApp** -- see [Connecting WhatsApp](/articles/communications/connecting-whatsapp).
- **Saved Replies** -- canned responses for the Inbox, useful for questions your front desk answers often (parking, what to bring to a first visit, cancellation policy).
- **Docs** -- document templates for the [Docs tab](/articles/patients/patient-documents), where you build reusable consent forms and intake questionnaires once and send them to any patient.

## Data
- **Import Patients (CSV)**, **Migrate Attachments** -- bulk data tools, mostly used once when first setting up or migrating from another system.
- **Webhooks** -- account-wide, separate from the per-campaign webhook action covered in [Sending campaigns](/articles/communications/sending-campaigns).

## Developers
- **API & Tokens** -- for anyone integrating QuiroFlow with something you've built yourself, separate from the ready-made Stripe/WhatsApp connections covered elsewhere in Settings.

## If you can't find something

Settings is organized by what you're configuring rather than how often you'd use it, so a rarely-touched item can still be exactly where you'd expect once you know the grouping above. If a section you expect to see is missing entirely, it's very likely a permissions issue rather than a feature that doesn't exist -- check with your account's Owner.
