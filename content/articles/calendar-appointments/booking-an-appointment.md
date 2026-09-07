---
title: Booking an appointment
description: Create a new appointment for an existing or new patient from the Calendar.
collection: calendar-appointments
order: 1
---

Booking is the thing you and your team will do most in QuiroFlow, so it's designed to be fast: one panel, no page reloads, and it works the same whether you're booking a regular visit or a brand-new patient's first one.

::image-carousel
---
images:
  - src: /screenshots/booking-panel-new.png
    alt: Create Appointment panel with Appointment Type, Date, Time, Room, Practitioner, Patient search, Note, and Repeat fields
    caption: "The booking panel -- everything in one place"
  - src: /screenshots/calendar.png
    alt: Calendar view with several appointments in different colors and statuses
    caption: "Booked appointments, colored by appointment type"
---
::

## From the Calendar

Click any empty slot on the Calendar, or use the **+ New Appointment** button, to open the booking panel. Clicking a slot pre-fills the date, time, and room from where you clicked -- the button opens the same panel blank, which is handy when you know the patient but not yet the exact time.

Fill in:

- **Appointment Type** -- determines the color, default duration, and price shown on the calendar. Set these up in advance under **Settings &rarr; Appointment Types** so this list matches the visits you actually offer.
- **Date** and **Time**
- **Room** and **Practitioner** -- both scoped to the clinic you're currently viewing. "No room" is fine if your clinic doesn't assign specific rooms.
- **Patient** -- search by name, phone, or email. If they're not in the system yet, select **+ New Patient** and add them right here with first name, last name, email, and phone -- there's no need to leave the panel to create a patient record first.
- **Note (Optional)** -- anything staff should know before the visit (e.g. "brings X-rays", "first session, allow extra time"). This shows up on the appointment for anyone who opens it, not just the person who booked it.
- **Repeat** -- for a recurring series (Daily, Weekly, or Monthly); see [Recurring appointments and blocking time](/articles/calendar-appointments/recurring-and-blocking-time) for how that works.
- **Collect Payment** -- toggle this on to take payment as part of booking, instead of billing at checkout.

Select **Create** (or the equivalent submit button) to save it. The appointment appears on the calendar immediately, colored by its appointment type, and -- if confirmations are turned on -- the patient gets a WhatsApp or email message right away.

## Understanding the calendar block

Each appointment block shows a small status dot -- see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained) for what each color means.

## The quick view

Clicking an appointment block opens a small popover first, before the full editor -- it's built for the common case of "what's this, and can I move it along" without a full edit screen:

- Patient name, status, time, type, and practitioner at a glance.
- A balance warning if they owe money from a past visit (e.g. "Patient owes €55.00 -- will need to pay").
- A quick note field for this specific visit, and the patient's persistent **Patient note** (see [A patient's record](/articles/patients/patient-records)) shown inline and editable right there.
- A recent activity log (who created it, what's changed).
- **Check in**, **Open chart** (jumps straight to the patient's record), and **Reschedule…**.

## The full editor

Select the small edit icon in the corner of an appointment block to open the fuller **Edit Appointment** window, split into four tabs:

::image-carousel
---
images:
  - src: /screenshots/appointment-edit-details.png
    alt: Edit Appointment Details tab with date, time, duration, room, practitioner, status, and confirmation fields
    caption: "Details -- the same fields as booking, plus Status and Confirmation"
  - src: /screenshots/appointment-edit-billing.png
    alt: Edit Appointment Billing tab with an invoice, Add Service/Product, and a Process payment form
    caption: "Billing -- invoice and take payment without leaving the appointment"
  - src: /screenshots/appointment-edit-history.png
    alt: Edit Appointment History tab listing this patient's past completed visits
    caption: "History -- this patient's past visits, for context"
  - src: /screenshots/appointment-edit-notes.png
    alt: Edit Appointment Notes tab with a field to add a sticky note
    caption: "Notes -- a sticky note on this specific appointment"
---
::

- **Details** -- everything from the booking panel, plus **Status** (Booked, Completed, No-show, Cancelled -- see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained)) and **Confirmation**, which you can also set by hand here if a patient confirms by phone instead of replying on WhatsApp.
- **Billing** -- the invoice tied to this appointment, right there: add a service or product to it, see the running total and balance due, and take a payment (amount + method) without leaving the appointment or navigating to the patient's own Billing tab. A banner reminds you when there's no future appointment booked, since that's exactly what puts a patient into [Recalls](/articles/patients/recalls).
- **History** -- a quick list of this patient's past appointments (date, type, practitioner, status), so you can see the pattern of their visits without opening their full record.
- **Notes** -- a sticky note on this one appointment. This is different from the patient's general **Patient note** (persistent, about the patient) and from [Visit notes](/articles/patients/visit-notes) (clinical notes tied to a specific visit) -- think of it as a short-lived reminder for whoever handles this particular appointment.

From either the quick view or the Details tab you can change the time, room, or practitioner, mark it checked in, completed, or a no-show, or cancel it entirely. If it's part of a recurring series, editing or cancelling only affects that one occurrence -- the rest of the series is untouched.
