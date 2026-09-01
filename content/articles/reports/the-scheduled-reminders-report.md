---
title: The Scheduled Reminders report
description: See who has confirmed, who hasn't replied, and who wants to reschedule.
collection: reports
order: 2
---

Go to **Reports &rarr; Scheduled Reminders**. This report only counts appointments that had a confirmation or reminder message sent -- it needs the WhatsApp reply webhook configured (see [Connecting WhatsApp](/articles/communications/connecting-whatsapp)).

## What it shows

- **WhatsApp messages** sent in the selected date range, with delivery status.
- **Confirmed** -- patients who replied confirming their appointment.
- **Pending** -- a message was sent and there's been no reply yet (or the reply wasn't a clear confirm/reschedule/cancel).
- **Wants to reschedule** -- patients who replied asking to change their appointment instead of confirming it.

Each name links straight to that patient's record.

![Scheduled Reminders report with WhatsApp delivery stats and Confirmed / Pending / Wants to reschedule counts](/screenshots/reports-scheduled-reminders.png)

## Using it day to day

This is the fastest way to see who genuinely needs a follow-up call before their visit, rather than scrolling the whole Calendar looking for amber or purple dots -- see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained) for what those mean on the calendar itself.
