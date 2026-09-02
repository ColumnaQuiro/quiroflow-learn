---
title: Connecting WhatsApp
description: Connect your Meta WhatsApp Business account so QuiroFlow can send and receive messages.
collection: communications
order: 1
---

Go to **Settings &rarr; WhatsApp**. You'll need a Meta WhatsApp Business account already set up -- QuiroFlow connects to it rather than providing its own number, which means you keep the same WhatsApp number and message history structure Meta manages, and QuiroFlow becomes one more client sending through it.

![WhatsApp settings page with Phone Number ID, Business Account ID, and default template fields](/screenshots/settings-whatsapp.png)

## Connecting

Enter:

- **Phone Number ID** and **WhatsApp Business Account ID** -- both from your Meta Business account, found in Meta Business Manager under your WhatsApp app's API setup.
- **Access token** -- also from Meta. Once saved, it's stored securely and the field just shows that a token is on file; you only need to re-enter it if you're rotating it. If messages suddenly stop sending, an expired or revoked token is one of the first things worth checking here.

If the connection details are wrong or the token has expired, campaign and confirmation sends will fail with a "Could not reach WhatsApp" error rather than failing silently -- so a broken connection is usually noticed quickly rather than discovered after weeks of missed messages.

## Default templates

Meta requires pre-approved message templates for anything sent outside a 24-hour reply window (which covers most automatic messages -- a confirmation sent the moment someone books, for example, isn't a reply to anything). Set your default template and language for each purpose:

- **Confirmation template** -- used by [automatic appointment confirmations](/articles/calendar-appointments/setting-up-confirmations-and-reminders).
- **Reminder template** -- same, for reminders.
- **Recall template** -- used when messaging patients from the Recalls queue. The picker stays visible when sending a recall, so staff can switch it per patient if needed.
- **Staff notification template** -- used to notify your team of a new online booking, specifically when it falls outside WhatsApp's 24-hour free-form window (i.e. your notification number hasn't messaged the clinic recently). Leave it blank to send free-form instead when that window is open.

Templates themselves are created and approved in your Meta Business account, not in QuiroFlow -- this is just where you tell QuiroFlow which approved template (and language variant) to use for each purpose. Approval can take anywhere from a few minutes to a day or two through Meta, so set up new templates ahead of when you'll need them rather than the same day.

## Language variants

Each template field pairs with a language code (e.g. `es`). If a patient's preferred language has its own approved variant of that template, QuiroFlow uses it automatically instead of the default -- there's nothing extra to configure per patient beyond setting their **Preferred language** on their profile.

## Once connected

Every WhatsApp conversation appears in the **Inbox**, and patients can reply directly to confirm, reschedule, or cancel appointments -- see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained) and [The shared Inbox](/articles/communications/the-shared-inbox) for what happens next.
