---
title: Setting up appointment confirmations and reminders
description: Automatically message patients to confirm their upcoming appointments.
collection: calendar-appointments
order: 3
---

Go to **Settings &rarr; Communication &rarr; General** to control automatic confirmation and reminder messages. Both are turned on by default.

![Settings General page with Appointment Confirmations and Appointment Reminders toggles, both enabled with WhatsApp checked](/screenshots/settings-communications-general.png)

## Appointment Confirmations

Sent right after an appointment is booked (whether booked by staff or by the patient online). Choose which channels to send it on:

- **WhatsApp** -- uses the confirmation template configured in **Settings &rarr; WhatsApp**.
- **Email** -- write your own subject and body here, with merge fields like the patient's first name, the appointment date, the practitioner, and the appointment type.

## Appointment Reminders

Sent a set number of hours before the appointment (24 hours by default, adjustable here). Same channel options as confirmations, with their own WhatsApp template (also configured in **Settings &rarr; WhatsApp**) and email subject/body.

## How patient replies are handled

Whichever message goes out -- confirmation or reminder -- the patient can reply directly on WhatsApp to confirm, ask to change the appointment, or cancel it. QuiroFlow reads that reply automatically and updates the appointment's status; see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained) for what each reply does.

This only works if your account has WhatsApp connected -- see the **Communications** collection for setting that up.
