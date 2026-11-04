---
title: Scheduled Reminders
description: Whether the clinic's WhatsApp messages arrived, which ones failed and why, and which patients with an appointment have confirmed, are still pending or want to change it.
collection: reports
order: 12
---

**Scheduled Reminders** answers two everyday questions: did the WhatsApp messages actually go out, and who has confirmed their next appointment? It's the quick way to know who to call before their visit, without going through the calendar. You'll find it under **Reports › Operations**.

::help-video{clip="reports--scheduled-reminders" caption="WhatsApp delivery status and confirmations for upcoming appointments"}
::

## Reviewing deliveries and confirmations

1. Open **Reports › Scheduled Reminders**.
2. Choose the period for deliveries (**This month** by default).
3. Under **WhatsApp delivery status**, look at the four figures and, if there are any, the list of failed sends.
4. Under **Appointment confirmations**, go through the three columns and click a name to open the record and call or write to the patient.

## WhatsApp delivery status

It counts every WhatsApp the clinic has sent in the period (confirmations, reminders, recalls and the rest), each one once, in its latest known status:

- **Sent**: it went out, but WhatsApp hasn't yet confirmed it arrived.
- **Delivered**: it reached the phone, but hasn't been read.
- **Read**: the patient opened it.
- **Failed**: it didn't arrive. The card turns red.

Because each message counts only in its latest status, a read message doesn't also appear under delivered or sent.

If there are failures, **Failed sends — bad number or no WhatsApp account** appears below, with the patient and the reason (or "Error code N"). It's usually a mistyped number or a landline: fix it on the patient's record. If many fail at once, check the WhatsApp connection (see [Connecting WhatsApp](/articles/communications/connecting-whatsapp)).

## Appointment confirmations

It lists the **upcoming appointments** (from now on, still booked) that were sent a confirmation message, in three columns:

- **Confirmed**: the patient replied that they're coming.
- **Pending**: it was sent and there's no clear reply yet.
- **Wants to reschedule**: the patient asked to change the appointment instead of confirming it.

Each name carries the appointment's date and time and opens the patient's record.

> **Good to know:** the period only changes the delivery figures. Confirmations are always those of upcoming appointments, whatever period is chosen.

> **Good to know:** replies are only recorded if WhatsApp replies reach QuiroFlow (Settings → WhatsApp). If they don't, appointments stay under **Pending** even if the patient has answered. To set up the messages, see [Confirmations and reminders](/articles/communications/confirmations-and-reminders).

## Who can see it

You need **See reports** and also **Inbox**. Without it, the report says: "This report needs Inbox access — ask an owner to enable it for your role.". It doesn't appear for roles with **Only their own figures**.

It's a good habit to check it every morning: anyone still under **Pending** for today or tomorrow deserves a quick call. To see what the confirmation colours mean on the calendar itself, see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained).
