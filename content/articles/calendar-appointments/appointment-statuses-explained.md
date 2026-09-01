---
title: Appointment statuses explained
description: What each colored dot on a calendar block means, and how it changes.
collection: calendar-appointments
order: 2
---

Every appointment block on the Calendar shows a small colored dot indicating its status. Hovering over a block shows the full status as text.

| Status | Color | Meaning |
| --- | --- | --- |
| Booked | Blue | Scheduled, no confirmation reply yet and no reminder sent. |
| Unconfirmed | Amber | A confirmation or reminder message was sent, and the patient hasn't replied yet. |
| Confirmed | Green | The patient replied confirming the appointment. |
| Wants to reschedule | Purple | The patient replied asking to change the appointment, instead of confirming it. |
| Completed | Green | The visit happened. |
| No-show | Red | The patient didn't come and wasn't marked as cancelled in advance. |
| Cancelled | Gray | The appointment was cancelled. |

![Calendar showing appointments with Booked, Confirmed, Wants to reschedule, and Missed statuses, plus the status key legend](/screenshots/calendar.png)

## How Confirmed / Wants to reschedule / Unconfirmed get set

If you've set up [automatic confirmations and reminders](/articles/calendar-appointments/setting-up-confirmations-and-reminders), QuiroFlow sends the patient a WhatsApp message asking them to confirm. When they reply:

- Something like "Confirmar", "Sí", or "Ok" &rarr; the appointment turns **Confirmed**.
- Something like "Cambiar cita" or mentioning wanting to change the time &rarr; it turns **Wants to reschedule**, so staff know to reach out rather than assuming it's set.
- Something like "Cancelar" &rarr; the appointment itself is cancelled.

If the reply doesn't clearly match any of these, the appointment stays **Unconfirmed** and it's worth a quick look at the conversation in the **Inbox**.

## Manually changing a status

Booked, Completed, No-show, and Cancelled can all be set by staff directly by opening the appointment. Confirmed and Wants to reschedule are driven by the patient's own reply and aren't meant to be set by hand.
