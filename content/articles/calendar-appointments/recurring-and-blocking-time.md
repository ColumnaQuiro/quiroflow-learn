---
title: Recurring appointments and blocking time
description: Book a series of appointments at once, or block off time a practitioner, room, or the whole clinic isn't available.
collection: calendar-appointments
order: 5
---

## Recurring appointments

When booking an appointment, the **Repeat** field creates a series instead of a single visit: Daily, Weekly, or Monthly, each generating 8 occurrences at once.

![New appointment panel with Repeat set to "Weekly (8 occurrences)"](/screenshots/new-appointment-repeat.png)

It's intentionally capped at 8 rather than open-ended -- a bounded series is predictable to review, edit, or cancel, and one series running out is a natural moment to check in on whether the patient still needs the same schedule before booking the next batch.

Each occurrence is its own appointment afterward -- editing or cancelling one doesn't affect the others in the series.

## Blocking time

Select **Block time** on the Calendar to mark a stretch of time as unavailable -- a practitioner's holiday, a room being serviced, or the whole clinic closing for a day.

![Block Time modal with Practitioner, Room (Whole clinic), date range, and a Note field](/screenshots/block-time-modal.png)

- **Practitioner** and **Room** -- block a specific practitioner, a specific room, or choose **Whole clinic** to block everything at once.
- **Start date** / **End date** -- the range being blocked.
- **Whole day** -- check this for an all-day block (holidays, closures); leave it unchecked to set specific **Start time** / **End time** instead (a lunch break, a half-day).
- **Note** -- free text for your own reference (e.g. "maintenance", "holiday").

A block prevents new appointments from being booked into that time -- both by staff and through online booking -- but doesn't touch appointments already booked there, so double-check the calendar before blocking over an already-busy period.
