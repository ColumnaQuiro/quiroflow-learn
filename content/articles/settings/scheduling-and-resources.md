---
title: Scheduling policies
description: The fees for rescheduling, cancelling or not turning up, and the reasons picked when a visit is moved.
collection: settings
order: 5
---

**Settings › Scheduling Policies** decides what a patient can be charged when a visit changes and which reasons the team gives when moving one. You set it once and rarely touch it again. You need the clinic configuration permission.

## Fees for changes and cancellations

::help-video{clip="calendar--policies-fees" caption="Turning on the reschedule fee and adding a reason"}
::

In **Settings › Scheduling Policies**, the **Fees** section has three fees. Each has a switch and an amount; switched off it reads **Not offered**.

- **Reschedule**: offered when a visit is moved by dragging or with **Move…**, in the **Rescheduling Appointment** dialog.
- **Cancellation**: offered when cancelling, to add to the patient's balance or charge to their saved card.
- **Missed appointment**: offered when a visit is marked **No-show**.

1. Switch on the fee you want and enter the amount in euros.
2. Click **Save fees**.

Fees are "offered, never charged automatically": each time, whoever moves, cancels or marks the visit decides whether to apply it. What that looks like is in [Moving and cancelling appointments](/articles/calendar-appointments/moving-and-cancelling).

**Ask for a card at online booking** means that straight after booking online, the patient saves a card on Stripe's own page (nothing is charged), so these fees can be charged to it. The booking page tells them before they book. It needs online payments set up in **Settings › Payments**: see [Connecting Stripe](/articles/settings/connecting-stripe).

> **Good to know:** the reschedule fee is only offered when dragging or using **Move…**. Changing the time with **Change** in the appointment panel doesn't offer it.

## Reschedule reasons

On the same page, **Reschedule reasons** is the list of reasons picked when a visit is moved (for example "Patient request" or "Practitioner off sick").

1. Type the reason in "Add a reason, e.g. Practitioner off sick" and click **Add**.
2. Each reason shows how often it has been used. You can rename or delete it.

Deleting a reason leaves visits already moved with it as they are; they simply show no reason.

## Other settings that shape the calendar

- Opening hours, time zone, calendar slot and public holidays are set per clinic: see [Managing clinics](/articles/settings/managing-clinics) and [Holidays and closures](/articles/settings/holidays-and-closures).
- Rooms, the calendar's columns: [Rooms](/articles/settings/rooms).
- Each practitioner's hours: [Practitioner working hours](/articles/team-roles/practitioner-working-hours).
- Appointment types, their lengths, prices and group classes: [Appointment types and services](/articles/settings/appointment-types-and-services).
- When a slot is offered to the waitlist: [The waitlist](/articles/calendar-appointments/waitlist).
