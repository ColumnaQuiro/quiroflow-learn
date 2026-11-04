---
title: Recurring appointments, blocks and absences
description: Book a series of visits in one go, block off time that can't be booked, or redistribute the visits of a practitioner who is suddenly off.
collection: calendar-appointments
order: 5
---

Three tools for when a single visit isn't enough. **Repeat** books several visits at once for a patient who comes regularly. **Block time** marks a stretch that can't be booked. And **Unplanned absence** blocks the diary of a practitioner who is off and, at the same time, passes their visits to a colleague or cancels them.

## Book a series of visits

::help-video{clip="calendar--book-series" caption="Booking the remaining visits of a care plan in a single booking"}
::

1. Start a booking as usual (see [Booking an appointment](/articles/calendar-appointments/booking-an-appointment)) with the date and time of the first visit.
2. Open **More options** and choose under **Repeat**:
   - **Daily (8 occurrences)**, **Weekly (8 occurrences)** or **Monthly (8 occurrences)**;
   - or **Follow care plan**, when the patient has an active plan. It shows how many sessions are left and how often, and books up to 26 visits at the plan's pace.
3. Click **Book**.

Before anything is saved, QuiroFlow checks every date. If some don't fit, you'll see "N of M dates don't fit", with the reason for each (who it clashes with, or **Not working then**), and three choices:

- **Skip them, book the other N**, which books only the ones that fit;
- **Book all anyway**, overlapping the ones that clash;
- **Go back**, to change the time or practitioner.

Nothing is saved (not even a new patient) until you choose.

> **Good to know:** **Daily** skips days the practitioner doesn't work and still books 8 visits.

> **Good to know:** the patient gets a single confirmation message listing every date, not one per visit.

> **Good to know:** when the series follows a care plan, the plan's re-exam visits are booked as the appointment type the plan asks for.

## Block off time

::help-video{clip="calendar--block-time" caption="Blocking a practitioner's lunch hour"}
::

1. Click **Block time** in the calendar's top bar. (From a booking, **Block this time instead…** does the same.)
2. Choose the **Practitioner** (**All practitioners** if it's for nobody in particular) and the **Room** (**Whole clinic** if it isn't for one room).
3. Set the **Start date** and **End date**. Tick **Whole day**, or untick it and set **Start time** and **End time**.
4. Add a **Note** if you like (for example "Lunch" or "Training").
5. Click **Save**.

The stretch shows grey on the calendar: **Blocked for** the practitioner, **Blocked (whole clinic)** or **Blocked**. That time is no longer offered by online booking, to the waitlist or by the AI receptionist.

To change or remove a block, click it: **Edit Block** opens, with **Remove block**.

> **Good to know:** blocking doesn't move or cancel visits already there. If the stretch has visits, QuiroFlow lists them ("There are already N visits booked in this time") and the button changes to **Block anyway**. If what's happening is that a practitioner is off, use **Unplanned absence**.

> **Good to know:** a block with no practitioner and no room closes the whole clinic. A practitioner's block follows them to every clinic they work at, and shows on their tab and on **Whole clinic**, not on colleagues' tabs.

For whole days closed (public holidays, the clinic's own holidays) the clinic's closures are easier: see [Holidays and closures](/articles/settings/holidays-and-closures).

## When a practitioner is suddenly off

::help-video{clip="calendar--unplanned-absence" caption="Unplanned absence: blocking the diary and passing the visits to a colleague"}
::

1. Click **Unplanned absence** in the calendar's top bar.
2. Under **Who is away** choose the practitioner, then set **From** and **To**.
3. You'll see their visits on those days, all ticked. Untick any you want to leave as they are.
4. Under **What to do with them**, choose:
   - **Move to a colleague, where they are free**, and the colleague under **Choose a colleague…**;
   - or **Cancel them and let the patients know**. Underneath you'll see whether your "appointment cancelled" automations tell them or, if there are none, that you'll get their numbers to call them.
5. Click **Block and move** or **Block and cancel**.

The result says "Calendar blocked.", how many were moved and how many cancelled. Any that couldn't be handled are listed under "Left as they were — sort these by hand:" with the reason (for example "the colleague is busy then"). If you cancelled, they're listed with their phone numbers. Click **Done** to close.

> **Good to know:** the practitioner's diary is blocked first, at every clinic where they had visits, with the note "Unplanned absence". A visit only moves if the colleague is free at that time. Nothing is offered to the waitlist and no fee is charged.

> **Good to know:** places in group classes are left alone: handle the class from its own panel.

When the absence is known in advance (sick leave, holidays), record it on the practitioner's page: see [Team absences](/articles/team-roles/absences). From there, and from holidays approved in [Working time](/articles/team-roles/working-time-log), this same dialog opens already filled in to move or cancel their visits.
