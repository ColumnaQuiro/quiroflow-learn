---
title: Appointment statuses explained
description: What each colored dot on a calendar block means, and how it changes.
collection: calendar-appointments
order: 2
---

Every appointment block on the Calendar shows a small colored dot indicating its status. Hovering over a block shows the full status as text, so you never have to memorize colors -- they're a fast visual scan for a busy day, not the only way to see status.

![Calendar showing appointments with Booked, Confirmed, Wants to reschedule, and Missed statuses, plus the status key legend](/screenshots/calendar.png)

| Status | Color | Meaning |
| --- | --- | --- |
| Booked | Blue | Scheduled, no confirmation reply yet and no reminder sent. |
| Unconfirmed | Amber | A confirmation or reminder message was sent, and the patient hasn't replied yet. |
| Confirmed | Green | The patient replied confirming the appointment. |
| Wants to reschedule | Purple | The patient replied asking to change the appointment, instead of confirming it. |
| Completed | Green | The visit happened. |
| No-show | Red | The patient didn't come and wasn't marked as cancelled in advance. |
| Cancelled | Gray | The appointment was cancelled. |

The Calendar's **Status Key** panel (in the sidebar, below the mini calendar) shows this same legend at a glance, so new team members don't need to come back to this article once they've learned it.

## How Confirmed / Wants to reschedule / Unconfirmed get set

If you've set up [automatic confirmations and reminders](/articles/calendar-appointments/setting-up-confirmations-and-reminders), QuiroFlow sends the patient a WhatsApp message asking them to confirm. When they reply:

- Something like "Confirmar", "Sí", or "Ok" &rarr; the appointment turns **Confirmed**.
- Something like "Cambiar cita" or mentioning wanting to change the time &rarr; it turns **Wants to reschedule**, so staff know to reach out rather than assuming it's set.
- Something like "Cancelar" &rarr; the appointment itself is cancelled.

If the reply doesn't clearly match any of these, the appointment stays **Unconfirmed** and it's worth a quick look at the conversation in the **Inbox** -- the patient may have replied with something QuiroFlow couldn't parse automatically (a question, a typo, a voice note), and it's easy to miss that if you're only watching the calendar.

Note that **Booked** and **Unconfirmed** look similar in intent (neither has a positive reply yet) but mean different things: Booked means no message has gone out at all yet (or confirmations are off), while Unconfirmed means a message *was* sent and QuiroFlow is still waiting on a reply.

## Manually changing a status

Booked, Completed, No-show, and Cancelled can all be set by staff directly by opening the appointment -- useful when a patient confirms by phone or in person instead of replying on WhatsApp. Confirmed and Wants to reschedule are driven by the patient's own reply and aren't meant to be set by hand; if a patient confirms verbally, the practical equivalent is leaving it as Booked (or marking it Completed once the visit happens) rather than trying to force it to Confirmed.

## Why this matters for your day

Statuses aren't just cosmetic -- they drive what shows up where else in QuiroFlow:

- **Reports** count Completed and No-show visits separately when calculating attendance rates.
- The **Flow Tracker** (see [Tracking patients through their visit](/articles/calendar-appointments/flow-tracker)) is a separate, same-day pipeline -- it doesn't read or change these statuses, but Completed there is the same underlying status as Completed here.
- A block of **Unconfirmed** appointments close to their time slot is usually the clearest early-warning sign of a day that's about to have gaps -- worth a glance each morning.
