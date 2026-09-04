---
title: The Waitlist
description: Hold a patient's spot for a specific appointment type or practitioner, and offer it automatically when a slot opens up.
collection: patients
order: 6
---

The **Waitlist** is for the opposite situation from [Recalls](/articles/patients/recalls) -- not a patient who's overdue and needs chasing, but one who actively wants an appointment now and there's simply nothing bookable yet.

::image-carousel
---
images:
  - src: /screenshots/waitlist-add-modal.png
    alt: Add to waitlist panel with Patient search, Appointment type, and Practitioner fields
    caption: "Add a patient with what they're waiting for"
---
::

## Adding someone to the waitlist

Select **+ Add to waitlist** and fill in:

- **Patient** -- search by name, same as anywhere else in QuiroFlow.
- **Appointment type** -- the visit they're waiting for, or **Any type** if they're flexible.
- **Practitioner** -- a specific person, or **Any practitioner** if they just want the soonest slot regardless of who sees them.

The narrower the criteria, the longer they're likely to wait -- a patient waiting for one specific practitioner's cancellation will naturally sit longer than one who's open to anyone.

## How a slot gets offered

When a matching appointment is cancelled, QuiroFlow automatically offers the slot to the longest-waiting matching entry first, with a link they can use to claim it. You don't need to check the waitlist manually every time something opens up -- this happens on its own the moment a cancellation matches an entry's criteria.

## Reading the list

- **Wants** -- the appointment type and practitioner criteria for that entry.
- **Status** -- where they are: waiting, offered a slot, or (once claimed) effectively done.
- **Offered slot** -- if a slot has been offered, which one and when.
- **Waiting since** -- how long they've been on the list, which is also what determines offer order.

Check **Show only waiting / offered** off if you want to see the full history, including entries that were claimed or expired, rather than just the currently-active ones.

## Waitlist vs. Recalls

It's easy to mix these two up since both are about patients without a booked appointment, but they serve different moments:

- **Recalls** is for patients who *should* come back based on their own visit pattern, but haven't -- QuiroFlow surfaces them for your team to reach out.
- **Waitlist** is for patients who've *already told you* they want in as soon as possible -- QuiroFlow does the reaching out automatically, the moment a slot exists.

A patient can reasonably be on both at once -- overdue for a recall, and also waiting for a specific practitioner's next opening.
