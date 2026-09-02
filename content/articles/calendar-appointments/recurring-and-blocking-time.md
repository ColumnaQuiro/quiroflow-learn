---
title: Recurring appointments and blocking time
description: Book a series of appointments at once, or block off time a practitioner, room, or the whole clinic isn't available.
collection: calendar-appointments
order: 5
---

Two related but different tools: **Repeat** creates several appointments at once for a patient who's coming back regularly; **Block time** does the opposite, marking a stretch of time as unavailable so nothing can be booked into it.

::image-carousel
---
images:
  - src: /screenshots/new-appointment-repeat.png
    alt: New appointment panel with Repeat set to "Weekly (8 occurrences)"
    caption: "Booking a recurring series"
  - src: /screenshots/block-time-modal.png
    alt: Block Time modal with Practitioner, Room (Whole clinic), date range, and a Note field
    caption: "Blocking time off instead"
---
::

## Recurring appointments

When booking an appointment, the **Repeat** field creates a series instead of a single visit: Daily, Weekly, or Monthly, each generating 8 occurrences at once.

It's intentionally capped at 8 rather than open-ended -- a bounded series is predictable to review, edit, or cancel, and one series running out is a natural moment to check in on whether the patient still needs the same schedule before booking the next batch. It also avoids the calendar quietly filling up months in advance with visits that might not happen.

Each occurrence is its own appointment afterward -- editing or cancelling one doesn't affect the others in the series. If a patient needs to skip just one week, open that single occurrence and cancel it; the rest of the series stays intact.

## Blocking time

Select **Block time** on the Calendar to mark a stretch of time as unavailable -- a practitioner's holiday, a room being serviced, or the whole clinic closing for a day.

- **Practitioner** and **Room** -- block a specific practitioner, a specific room, or choose **Whole clinic** to block everything at once. Blocking a practitioner without a room (or vice versa) only removes availability for that one resource -- other rooms or practitioners stay bookable.
- **Start date** / **End date** -- the range being blocked. A block can span multiple days in one go, useful for holidays or extended leave.
- **Whole day** -- check this for an all-day block (holidays, closures); leave it unchecked to set specific **Start time** / **End time** instead (a lunch break, a half-day, a training session).
- **Note** -- free text for your own reference (e.g. "maintenance", "holiday", "conference"). This shows up when anyone hovers over or opens the block later, so it's worth being specific.

A block prevents new appointments from being booked into that time -- both by staff and through online booking -- but doesn't touch appointments already booked there, so double-check the calendar before blocking over an already-busy period. If you block over existing appointments by mistake, they stay on the calendar as normal; you'll need to reschedule or cancel them separately.

To remove a block, open it the same way you'd open an appointment and delete it -- the time becomes bookable again immediately.
