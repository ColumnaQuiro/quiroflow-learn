---
title: Tracking patients through their visit (Flow Tracker)
description: Move a patient through Arrived, In Session, and Awaiting Checkout as they move through the clinic.
collection: calendar-appointments
order: 4
---

The Flow Tracker is a separate, same-day pipeline from an appointment's confirmation status -- it's about where a patient physically is in their visit *today*, not whether they replied to a WhatsApp message. It shows up as a panel on the Calendar, next to the day's schedule.

![Calendar with the Flow Tracker panel showing one patient each in Arrived, In Session, and Awaiting Checkout](/screenshots/calendar-flow-tracker.png)

## The three stages

1. **Arrived** -- the patient has checked in. This happens the moment staff mark an appointment as checked in (the same check-in used elsewhere in the app); it's the entry point into the Flow Tracker.
2. **In Session** -- the patient is with the practitioner. Select the **&rarr;** arrow next to their name in Arrived to move them here.
3. **Awaiting Checkout** -- the visit itself is done and the patient is finishing up at the front desk (payment, booking their next visit). Select **&rarr;** from In Session to move them here.

From Awaiting Checkout, select **Complete** to mark the appointment completed -- the same status used everywhere else in QuiroFlow (reports, patient visit history, care plans).

## Why it's useful

At a glance, front desk and practitioners can see exactly who's waiting, who's currently being seen, and who still needs to check out -- without walking over to ask or opening each appointment individually. It's scoped to today only; there's no need (or way) to flow-track a past or future date.

## Turning it off

If your clinic doesn't use this level of tracking, toggle **Flow tracker** off in the Calendar's **Display** settings panel -- the panel disappears and appointments behave exactly as they do without it (check-in still works the same way).
