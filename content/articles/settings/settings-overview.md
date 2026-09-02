---
title: A tour of Settings
description: What's in each section of Settings, and where to find it.
collection: settings
order: 3
---

Settings is grouped into five sections (some items only show up if your role has permission for them -- see [Roles & permissions](/articles/team-roles/roles-and-permissions), since a Front Desk role, for example, won't see most of this at all).

![Settings sidebar showing the Clinic and Billing groups](/screenshots/settings-team.png)

## General
- **Appearance** -- light/dark theme and similar personal preferences. This is per-user, not account-wide, so switching it doesn't change what your teammates see.

## Clinic
- **Clinics** -- your locations. See [Managing clinics](/articles/settings/managing-clinics).
- **Online Booking** -- see the **Online Booking** collection.
- **Team Members** and **Practitioners** -- staff accounts and invites; see [Inviting your team](/articles/getting-started/inviting-your-team). Practitioners is specifically for linking migrated names to real accounts, or inviting a practitioner who doesn't have login access yet.
- **Roles & Permissions** -- see [Roles & permissions](/articles/team-roles/roles-and-permissions).
- **Appointment Types**, **Scheduling Policies**, **Calendar Resources** (rooms), **Modalities** -- how your calendar is structured: what visits you offer, cancellation/no-show rules, the physical rooms available, and how you categorize practitioners and appointments.
- **Mobile App**, **Referral Sources**, **New Patient Fields** -- smaller configuration for the app and patient intake, including your clinic's join code for the mobile app and which fields show (and are required) when adding a new patient.

## Billing
- **Services & Products**, **Packages / Bonos**, **Memberships** -- what you sell: one-off services, prepaid session packages, and recurring memberships, each with their own pricing setup.
- **Payments (Stripe)** -- see [Connecting Stripe](/articles/settings/connecting-stripe).
- **Payment Methods**, **Invoice Settings**, **Fiscal Data** -- invoicing details and legal/tax information, including whatever your local tax authority requires on issued invoices.

## Communication
- **General** -- automatic confirmations and reminders, see [Setting up appointment confirmations and reminders](/articles/calendar-appointments/setting-up-confirmations-and-reminders).
- **WhatsApp** -- see [Connecting WhatsApp](/articles/communications/connecting-whatsapp).
- **Saved Replies** -- canned responses for the Inbox, useful for questions your front desk answers often (parking, what to bring to a first visit, cancellation policy).
- **Docs** -- document templates for the [Docs tab](/articles/patients/patient-documents), where you build reusable consent forms and intake questionnaires once and send them to any patient.

## Data
- **Import Patients (CSV)**, **Migrate Attachments**, **Webhooks** -- bulk data tools, mostly used once when first setting up or migrating from another system. Webhooks here is account-wide, separate from the per-campaign webhook action covered in [Sending campaigns](/articles/communications/sending-campaigns).

## If you can't find something

Settings is organized by what you're configuring rather than how often you'd use it, so a rarely-touched item can still be exactly where you'd expect once you know the grouping above. If a section you expect to see is missing entirely, it's very likely a permissions issue rather than a feature that doesn't exist -- check with your account's Owner.
