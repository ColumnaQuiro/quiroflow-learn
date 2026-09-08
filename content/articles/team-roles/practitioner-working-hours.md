---
title: Practitioner working hours
description: Give a practitioner their own schedule so online booking only offers the days and times they actually work.
collection: team-roles
order: 2
---

By default every practitioner is bookable across their clinic's own opening hours. When someone only works certain days -- mornings on Tuesdays, no Fridays, two afternoons a week -- give them their own working hours so online booking stops offering slots they'd never take.

## Setting them

Go to **Settings &rarr; Team** and find the practitioner's row. On the right, click **Working hours**.

That opens a schedule under their row with one line per weekday. For each day they work, click **+ Add hours** and set a start and end time. Days you leave empty are days they aren't offered at all.

Click **Save** when you're done. The link then reads **Working hours (custom)**, which is how you can tell at a glance which practitioners have their own schedule and which are just following the clinic's.

## Empty means "same as the clinic"

Leaving *every* day empty is not the same as being unavailable -- it means "no override", and the practitioner stays bookable across the clinic's normal opening hours. That's the default for everyone until you set something.

So to put a practitioner back on the clinic's hours, remove every time window you added rather than trying to fill in the full week by hand.

## They replace the clinic's hours, they don't narrow them

This is the part worth reading twice. Once a practitioner has hours of their own, the clinic's hours stop applying to them entirely -- theirs are used instead, rather than the two being combined.

Two consequences:

- A day you leave empty is a **day off**, not "no restriction". If you set Monday hours and leave the rest of the week blank, that practitioner is bookable on Mondays only.
- Their hours can fall **outside** the clinic's. If the clinic is open 9:00-17:00 and you give a practitioner 8:00-19:00, 8:00 and 18:00 really are offered to patients.

So set a practitioner's full week, not just the day you meant to change.

## What this affects

These hours drive what's offered on your public booking page, and the working-hours shading on the calendar.

They don't stop your own team booking outside them. If reception picks a time outside a practitioner's hours, QuiroFlow asks *"This appointment falls outside working hours. Book it anyway?"* -- so an exception takes one extra click rather than being refused.

## A practitioner who shouldn't be bookable at all

If someone should never appear on the booking page -- an assistant, or a practitioner who only takes referrals -- turn off the **Bookable** toggle on their row instead. That removes them from online booking entirely, whatever their hours say.
