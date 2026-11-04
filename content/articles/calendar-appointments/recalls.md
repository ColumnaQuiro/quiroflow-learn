---
title: "Recalls: bringing back patients with no next visit"
description: The list of patients who have stopped coming and have nothing booked, and how to work it -- message them, log calls, snooze, dismiss and assign.
collection: calendar-appointments
order: 11
---

**Recalls** is the list of patients who have no future visit and whose last visit (one they actually came to) is further back than usual. It fills itself from the calendar: nobody has to add anyone. The front desk works through it, messaging or calling each patient and noting what happened. It's in the sidebar under **Patients** › **Recalls**, with a number showing how many are still to contact.

## What's in the list

- **Tabs:** **To contact**, **Snoozed** (back in the list on their own on the date shown) and **Dismissed** (the ones you took off the list).
- **Filters:** **Search patient**, how overdue ("Overdue: 3+ weeks" by default; you can pick 1, 2, 3, 4, 6, 8 or 12 weeks), **Assigned to** (**Assigned to me**, **Unassigned**, **Everyone's** or one person), **Practitioner** and **Not contacted yet**. **More filters** has **Balance** (**Owing** or **In credit**), **Tag** and "Last visit since" a date instead of weeks. **Clear** removes them.
- **Each row:** the patient, their **Last visit** (and "Didn't come on …" if they missed one since), how overdue ("5 weeks overdue"), the **Balance**, the **Last contact** ("Not contacted yet" if nobody has been in touch), a link to their care plan and who's following them up.

Priority patients come first, then the most overdue. If you have recalls assigned to you, the list opens on yours. **Export CSV** downloads the list.

## Work the list

::help-video{clip="calendar--recalls-work" caption="Sending the recall on WhatsApp and logging an unanswered call"}
::

1. Set how overdue, for example **Overdue: 4+ weeks**.
2. To message a patient, click the WhatsApp button on their row (**Send the recall on WhatsApp**) and send the message. If they have no phone, the button says "No phone: add one on their chart".
3. If you call them, click **Log call** and choose **No answer**, **Left a message** or **Booked an appointment**.
4. After **No answer** or **Left a message**, QuiroFlow asks "Try again later?": choose **In 2 days**, **In 1 week** or **Keep in the list**.

After **Booked an appointment** you'll see "Logged as booked. Book the slot in the calendar if it is not there yet." As soon as the patient has a future visit, they leave the list on their own.

Each row's **⋯** menu has **Mark as priority**, **Snooze…** and **Dismiss…**.

## Snooze and dismiss

::help-video{clip="calendar--recalls-snooze" caption="Snoozing a patient for a month and restoring a dismissed one"}
::

- **Snooze…** takes the patient off the list until a date: **1 week**, **2 weeks**, **1 month**, **3 months** or **Or a date** (**Until when**). On that day they come back on their own if they still have nothing booked. You'll find them on the **Snoozed** tab, with **Bring back now** to return them sooner.
- **Dismiss…** takes them off the list with no date: "They stop appearing in recalls: nobody messages or calls them from here." You can choose a reason (for example "Moved away"). If they later come to a visit and lapse again, they reappear on their own. On **Dismissed** you can **Restore** them or **Add reason**.

## Several at once

Tick several rows (or **Select all**) and a bar appears with:

- **WhatsApp to N**: sends the recall to everyone selected who has a phone (those without one are skipped);
- **Assign to…** and **Assign practitioner**;
- **Snooze…** and **Dismiss…**;
- **Clear selection**.

## Who follows up

Each patient on the list can have one person in charge of them. Change it on the row itself. For newcomers, go to **Settings › Communication › Recalls** and choose under **Who follows up new recalls**:

- **Their practitioner**;
- **Nobody**: "They wait unassigned, and whoever takes one picks it up.";
- **One person**: "Everyone new goes to the same person, say reception."

Assigning by hand on the list always wins over this setting. On the same page, **Reasons for stopping care** is the list of reasons offered when you dismiss someone (for example "Pregnancy"); you can add, rename, reorder and delete them, and **Reports › Retention** counts them.

## Good to know

> **Good to know:** how overdue someone is counts from the last visit the patient **attended**. A missed visit doesn't restart the clock.

> **Good to know:** the list doesn't show an exact total, only how many are shown ("N shown").

> **Good to know:** Recalls shows for people with the **Recalls, waitlist and plan alerts** permission. The recall settings need the communications configuration permission.

Patients whose care plan has fallen behind have their own list, **Care Plan Alerts**: see [Care plans](/articles/clinical/care-plans). Appointment reminders (the message sent before each visit) are something else: see [Confirmations and reminders](/articles/communications/confirmations-and-reminders).
