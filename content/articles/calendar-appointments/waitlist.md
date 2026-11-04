---
title: The waitlist
description: Add patients who want an earlier visit, and let QuiroFlow offer them freed-up slots by WhatsApp.
collection: calendar-appointments
order: 10
---

The **Waitlist** is for patients who want a visit sooner than the first one available. When a visit that matches what they want is cancelled or moved, QuiroFlow offers them that slot by WhatsApp, with a link to take it without having to call. You'll find it in the sidebar under **Patients** › **Waitlist**.

## Add a patient

::help-video{clip="calendar--waitlist-add" caption="Adding a patient to the waitlist for an appointment type and practitioner"}
::

1. Click **+ Add to waitlist**.
2. Under **Patient**, search by name and pick them.
3. Choose the **Appointment type** they want, or leave **Any type**.
4. Choose the **Practitioner**, or leave **Any practitioner**.
5. Click **Add**.

Patients can also join the list themselves ("Joined themselves") or through the AI receptionist ("Added by the AI receptionist"). In the booking panel, a patient on the list carries an **On waitlist** flag.

## Read the list

Each row shows the **Patient**, what they **Want** (type and practitioner), the **Status**, the **Offered slot** (with when the offer expires) and how long they've been waiting (**Waiting since**). The statuses are:

- **Waiting**: nothing offered yet.
- **Offer sent**: they have a slot on offer and still have time to accept.
- **Booked**: they accepted and have the visit.
- **Offer expired**: they didn't reply in time.
- **Cancelled**.

By default you only see people waiting or with an offer; untick **Show only waiting / offered** to see them all.

To remove someone, click the bin icon (**Remove from waitlist**) and confirm. It only works while they're **Waiting**: if they've just been offered a slot you'll see "Not removed: they have just been offered a slot."

## Choose how slots are offered

::help-video{clip="calendar--waitlist-settings" caption="Turning on automatic offers and choosing who gets them"}
::

At the top of the page, the **When a slot frees up** card:

1. Turn on **Offer it to the waitlist automatically** so that whenever a visit is cancelled or moved (by the desk, by the patient on WhatsApp or from an integration) it's offered without anyone having to remember.
2. Under **Who gets the offer**, choose:
   - **One by one, in order**: "The first in line gets it, with a deadline; if they do not accept, the next."
   - **Everyone at once**: "Everyone who fits is told together and the first to accept books it; the rest stay on the list."
3. Click **Save**.

You need the clinic configuration permission to change this card.

> **Good to know:** the offer is sent by an automation. If none is active for "Waitlist slot offered", the card warns you: "Nobody will be told". Turn one on in [Automations](/articles/communications/automations).

> **Good to know:** with automatic offers off, cancelling a visit at the desk asks you in the cancel step itself whether to offer the slot (see [Moving and cancelling appointments](/articles/calendar-appointments/moving-and-cancelling)), and moving a visit offers nothing. When a patient cancels from their app or portal, the slot is always offered.

## What the patient gets

The patient gets a WhatsApp message with a link. Opening it shows **¡Se ha liberado una cita!** ("A slot has opened up!"), with the clinic, day, time, type and practitioner, and the button **Reservar esta cita** ("Book this appointment"). Tapping it shows **¡Cita reservada!** ("Appointment booked!") and the visit appears on your calendar. They don't need to sign in.

> **Good to know:** this page for the patient is only in Spanish for now.

While the offer is open, the slot shows on the calendar as "Slot offered to" the patient "· replies by" the deadline, and can't be booked.

## How the next person is chosen

- An entry's type and practitioner match when they're the same or set to "any". Whoever has waited longest goes first.
- An offer lasts **2 hours**, but never later than **20 minutes before the visit**. A slot starting sooner than that isn't offered.
- If nobody accepts in time, it's offered to the next person automatically.
- With **Everyone at once**, the first to accept gets it and the others go back to waiting.

Group classes have their own waitlist inside each class's panel: see [Group classes](/articles/calendar-appointments/group-classes).

> **Good to know:** the waitlist shows for people with the **Recalls, waitlist and plan alerts** permission.
