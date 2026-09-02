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

Each appointment block shows a small status dot -- see [Appointment statuses explained](/articles/calendar-appointments/appointment-statuses-explained) for what each color means. Hovering over a block shows a quick summary without opening it; clicking opens the full appointment.

## Editing or cancelling

Click an existing appointment to open it again. From there you can change the time, room, or practitioner, mark it as checked in, completed, or a no-show, or cancel it entirely. If it's part of a recurring series, editing or cancelling only affects that one occurrence -- the rest of the series is untouched.
