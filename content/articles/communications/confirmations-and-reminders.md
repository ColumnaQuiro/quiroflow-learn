---
title: Appointment confirmations and reminders
description: The two messages QuiroFlow sends on its own around every appointment, which channel they go out on and how far ahead.
collection: communications
order: 3
---

Whenever an appointment is booked, QuiroFlow can send the patient a **confirmation**, and before the visit, a **reminder**. Both are set up in **Settings › Communication › Messages** and go out on their own: nobody has to remember to send anything. The patient has the appointment in writing, and fewer patients forget to come.

You need the **Open Settings** and **Communication and Growth** permissions.

## What is sent, and when

- **Appointment confirmation**: sent right after an appointment is booked, whether at the desk, online, in the app or through the API.
- **Appointment reminder**: sent automatically before the visit, as far ahead as you set in **When** (between 1 and 168 hours, so up to a week).

Each has its own switch. Turn one off and that message stops going out for the whole clinic.

## Changing the timing and the channels

::help-video{clip="comms--reminder-settings" caption="A reminder 48 hours before, by WhatsApp and email"}
::

1. Go to **Settings › Communication › Messages**.
2. Under **Appointment reminder**, type in **When** how many **hours before** it should go out (for example, 48).
3. Under **Send by**, tick the channels: **WhatsApp**, **Email** and/or **Patient app**.
4. If you tick **Email**, fill in **Email subject** and **Email message**. You can insert details such as the first name, the appointment date, the appointment type, the practitioner or the clinic address, and see how it looks on the right ("What Lucía receives").
5. Click **Save changes**.

The confirmation is set up the same way, on its own card.

> **Good to know:** the **Patient app** only reaches patients who have it installed, so it adds to WhatsApp and email rather than replacing them.

> **Good to know:** to go out on WhatsApp, your number must be connected and each message needs its template chosen in **Settings › Communication › WhatsApp**. A message without one is not sent. See [Connecting WhatsApp and choosing templates](/articles/communications/connecting-whatsapp).

> **Good to know:** if you tick **Email**, the subject and message are required. Leave them empty and QuiroFlow won't save, and tells you why.

## Exceptions for one patient

On a patient's record you can change their own messages: the **Confirmation type**, the **Reminder type** and the **Reminder timing** (for example, someone who prefers the reminder the morning before). A patient marked **Do not contact** receives none of them.

## When the patient replies

If the patient answers the reminder on WhatsApp (for example "SÍ" to confirm, or asking to change the time), the reply arrives in the [Inbox](/articles/communications/the-shared-inbox) and QuiroFlow marks the appointment according to what they said. What each status means is in [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained).

## More reminders before the visit

This page sends a single reminder. For a second one (say, one 3 days before and another 24 hours before), create an automation with the **Hours before the appointment** trigger. See [Automations](/articles/communications/automations).

## Details messages use

At the bottom of the page, under **Details messages use**:

- **Default phone country**: the prefix added to a number typed without one (at the desk, on the booking page or in an import).
- **Google review link**: where the review-request automation sends patients. See [Reputation and Google reviews](/articles/growth/reputation).
