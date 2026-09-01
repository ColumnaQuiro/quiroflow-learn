---
title: Connecting WhatsApp
description: Connect your Meta WhatsApp Business account so QuiroFlow can send and receive messages.
collection: communications
order: 1
---

Go to **Settings &rarr; WhatsApp**. You'll need a Meta WhatsApp Business account already set up -- QuiroFlow connects to it rather than providing its own number.

## Connecting

Enter:

- **Phone Number ID** and **WhatsApp Business Account ID** -- both from your Meta Business account.
- **Access token** -- also from Meta. Once saved, it's stored securely and the field just shows that a token is on file; you only need to re-enter it if you're rotating it.

![WhatsApp settings page with Phone Number ID, Business Account ID, and default template fields](/screenshots/settings-whatsapp.png)

## Default templates

Meta requires pre-approved message templates for anything sent outside a 24-hour reply window (which covers most automatic messages). Set your default template and language for each purpose:

- **Confirmation template** -- used by [automatic appointment confirmations](/articles/calendar-appointments/setting-up-confirmations-and-reminders).
- **Reminder template** -- same, for reminders.
- **Recall template** -- used when messaging patients from the Recalls queue.
- **Staff notification template** -- used to notify your team of a new online booking.

Templates themselves are created and approved in your Meta Business account, not in QuiroFlow -- this is just where you tell QuiroFlow which approved template (and language variant) to use for each purpose.

## Once connected

Every WhatsApp conversation appears in the **Inbox**, and patients can reply directly to confirm, reschedule, or cancel appointments -- see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained).
