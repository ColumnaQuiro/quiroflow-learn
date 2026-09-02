---
title: Setting up appointment confirmations and reminders
description: Automatically message patients to confirm their upcoming appointments.
collection: calendar-appointments
order: 3
---

Go to **Settings &rarr; Communication &rarr; General** to control automatic confirmation and reminder messages. Both are turned on by default when your account is set up, so most clinics never need to touch this beyond deciding on channels and timing.

::image-carousel
---
images:
  - src: /screenshots/settings-communications-general.png
    alt: Settings General page with Appointment Confirmations and Appointment Reminders toggles, both enabled with WhatsApp checked
    caption: "Settings &rarr; Communication &rarr; General -- turn confirmations and reminders on or off"
  - src: /screenshots/settings-whatsapp.png
    alt: WhatsApp settings page with default confirmation, recall, and reminder template fields
    caption: "Settings &rarr; WhatsApp -- the actual message templates each one sends"
---
::

## Appointment Confirmations

Sent right after an appointment is booked (whether booked by staff or by the patient online). Choose which channels to send it on:

- **WhatsApp** -- uses the confirmation template configured in **Settings &rarr; WhatsApp**. This is the channel most patients actually respond to, since replying is as easy as texting back.
- **Email** -- write your own subject and body here, with merge fields like the patient's first name, the appointment date, the practitioner, and the appointment type.

You can enable both channels at once -- a patient with a phone number gets WhatsApp, and email goes out regardless as a backup, so nothing depends on a single delivery channel working.

## Appointment Reminders

Sent a set number of hours before the appointment (24 hours by default, adjustable in the **hours before the appointment** field). Same channel options as confirmations, with their own WhatsApp template (also configured in **Settings &rarr; WhatsApp**) and email subject/body.

A shorter window (e.g. 2-4 hours) catches same-day no-shows better but gives patients less time to reschedule if they can't make it; a longer window (24-48 hours) gives more notice but is easier to forget by the time the appointment arrives. Most clinics land somewhere around 24 hours as a balance between the two.

## How patient replies are handled

Whichever message goes out -- confirmation or reminder -- the patient can reply directly on WhatsApp to confirm, ask to change the appointment, or cancel it. QuiroFlow reads that reply automatically and updates the appointment's status; see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained) for what each reply does.

This only works if your account has WhatsApp connected -- see [Connecting WhatsApp](/articles/communications/connecting-whatsapp) in the **Communications** collection for setting that up. If WhatsApp isn't connected yet, leave the WhatsApp checkboxes here off and rely on email until it is -- toggling WhatsApp on without a connection just means messages queue up without sending.

## Choosing templates per message type

Each message type (confirmation, reminder, recall, staff notification) has its own **default template** set in **Settings &rarr; WhatsApp**, plus a language variant. If a patient's preferred language has its own approved template variant, QuiroFlow uses that one automatically instead of the default -- there's nothing extra to configure per patient for this to work, as long as the variant exists and is approved in your WhatsApp Business account.
