---
title: Tracking patients through their visit (Flow Tracker)
description: Move a patient through Arrived, In Session, and Awaiting Checkout as they move through the clinic.
collection: calendar-appointments
order: 4
---

The Flow Tracker is a separate, same-day pipeline from an appointment's confirmation status -- it's about where a patient physically is in their visit *today*, not whether they replied to a WhatsApp message. It shows up as a panel on the Calendar, next to the day's schedule, and is most useful in clinics with more than one practitioner or a busy front desk, where "who's waiting" isn't obvious just by looking around.

![Calendar with the Flow Tracker panel showing one patient each in Arrived, In Session, and Awaiting Checkout](/screenshots/calendar-flow-tracker.png)

## The three stages

1. **Arrived** -- the patient has checked in. This happens the moment staff mark an appointment as checked in (the same check-in used elsewhere in the app); it's the entry point into the Flow Tracker. A patient who hasn't checked in yet doesn't appear here at all, even if their appointment time has passed.
2. **In Session** -- the patient is with the practitioner. Select the **&rarr;** arrow next to their name in Arrived to move them here. This step is purely informational -- moving someone to In Session doesn't start a timer or affect billing.
3. **Awaiting Checkout** -- the visit itself is done and the patient is finishing up at the front desk (payment, booking their next visit). Select **&rarr;** from In Session to move them here.

From Awaiting Checkout, select **Complete** to mark the appointment completed -- the same status used everywhere else in QuiroFlow (reports, patient visit history, care plans). Moving a patient backward (from In Session back to Arrived, for example) is also possible if someone advances them by mistake.

## Why it's useful

At a glance, front desk and practitioners can see exactly who's waiting, who's currently being seen, and who still needs to check out -- without walking over to ask or opening each appointment individually. In a multi-practitioner clinic this replaces a lot of "is Michael still with the chiropractor?" back-and-forth.

It's scoped to today only; there's no need (or way) to flow-track a past or future date. If a patient's visit spans midnight in some unusual edge case, or they're still Awaiting Checkout when the day rolls over, check them out before the date changes to keep the tracker accurate.

## Privacy mode

The Calendar's **Display** panel also has a **Privacy mode** toggle, separate from Flow Tracker -- turning it on hides patient names throughout the calendar view (useful if your screen is visible to other patients in a waiting area), while the Flow Tracker panel itself still shows who's in which stage for staff who need that visibility. The two toggles are independent, so you can run Flow Tracker with or without Privacy mode depending on how your front desk is laid out.

## Turning it off

If your clinic doesn't use this level of tracking -- a single-practitioner clinic often doesn't need it -- toggle **Flow tracker** off in the Calendar's **Display** settings panel. The panel disappears and appointments behave exactly as they do without it; check-in still works the same way, it just won't show up in a separate tracker view.
