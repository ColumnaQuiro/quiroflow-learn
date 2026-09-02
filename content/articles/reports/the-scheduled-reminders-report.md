---
title: The Scheduled Reminders report
description: See who has confirmed, who hasn't replied, and who wants to reschedule.
collection: reports
order: 2
---

Go to **Reports &rarr; Scheduled Reminders**. This report only counts appointments that had a confirmation or reminder message sent -- it needs the WhatsApp reply webhook configured (see [Connecting WhatsApp](/articles/communications/connecting-whatsapp)), and if that's not set up, the counts here will stay at zero even though messages might still be sending.

![Scheduled Reminders report with WhatsApp delivery stats and Confirmed / Pending / Wants to reschedule counts](/screenshots/reports-scheduled-reminders.png)

## What it shows

**WhatsApp delivery status**, for the selected date range:

- **Sent** -- messages QuiroFlow attempted to send.
- **Delivered** -- confirmed delivered by WhatsApp.
- **Read** -- the patient opened the message.
- **Failed** -- didn't go through. A non-zero Failed count is worth investigating right away -- it usually means an invalid number, a patient who's blocked your business number, or an issue with your WhatsApp connection itself (see [Connecting WhatsApp](/articles/communications/connecting-whatsapp)).

**Appointment confirmations**, broken down into three counts:

- **Confirmed** -- patients who replied confirming their appointment.
- **Pending** -- a message was sent and there's been no reply yet (or the reply wasn't a clear confirm/reschedule/cancel).
- **Wants to reschedule** -- patients who replied asking to change their appointment instead of confirming it.

Selecting a count opens the list of appointments behind it, and each patient's name links straight to their record -- so going from "12 pending" to actually calling those 12 patients takes a couple of clicks, not a manual cross-reference against the calendar.

## Changing the date range

The date picker at the top (defaulting to **This month**) controls both the delivery stats and the confirmation counts together -- there's no way to view one on a different range than the other. Narrow it to a single day when you're specifically checking on tomorrow's appointments, or widen it to spot a delivery problem that's been building over a week or more.

## Using it day to day

This is the fastest way to see who genuinely needs a follow-up call before their visit, rather than scrolling the whole Calendar looking for amber or purple dots -- see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained) for what those mean on the calendar itself. Many clinics check this once each morning as part of opening up: anyone still Pending for a same-day appointment is a quick, worthwhile phone call.
