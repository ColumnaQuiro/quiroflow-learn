---
title: Recalls -- bringing patients back
description: The queue of patients with no future appointment, and how to work through it.
collection: patients
order: 5
---

**Recalls** is a live, automatically-maintained list of patients who don't have a future appointment booked -- no setup required to start using it, since it's built directly from your appointment data rather than a separate list you maintain by hand.

::image-carousel
---
images:
  - src: /screenshots/recalls-list.png
    alt: Recalls list showing overdue patients with last visit date, weeks overdue, practitioner, balance, and last action taken
    caption: "The queue, sorted by most overdue first"
---
::

## Reading the list

Each row shows:

- **Last visit** -- their most recent completed appointment.
- **Overdue** -- how many weeks past the recall threshold they are, sorted with the most overdue patients first by default.
- **Practitioner** -- who they normally see (or "Unassigned" if that's never been set).
- **Balance** -- any outstanding balance on their account, so you can spot a recall that's also a billing follow-up.
- **Last action** -- the most recent thing staff did about this patient's recall (a WhatsApp sent, a call logged), and how many actions total. A patient with several logged actions and still no booking is worth a different approach than one nobody's tried yet.

## Filtering the queue

- **Search by name** -- find one specific patient.
- **Weeks overdue** -- the threshold itself is adjustable (1+ up to 12+ weeks), so you can work a tight "just crossed the line" list or a long-neglected one separately.
- **Last visit since** -- limit to patients whose last visit falls after a given date, useful for excluding patients who left the practice long ago from a fresh outreach push.
- **Any practitioner** -- narrow to one practitioner's own patients, handy if each practitioner works their own recalls.
- **Any balance** -- filter to patients who also owe money, if you want to combine a recall call with a billing follow-up.
- **Filter by tag** -- if you use patient tags, narrow the queue to a specific segment.
- **Not contacted yet** -- hide anyone who already has a logged action, so you're only looking at patients nobody has reached out to.

## Taking action on a patient

Each row has an **Action…** dropdown:

- **Send WhatsApp** -- message them directly, logged as an action against this recall.
- **Called -- no answer** / **Called -- left message** -- log a phone attempt when WhatsApp isn't the right channel or didn't get a response.
- **Booked** -- mark them handled once they've rebooked (they'll also naturally drop off the list once a future appointment exists).
- **Mark as high priority** -- flag one that needs attention sooner, without waiting for the overdue count alone to surface it.
- **Dismiss from recalls** -- remove a patient from the queue without booking them (they've moved away, they've explicitly said not to contact them, etc.). This is different from [Do not contact](/articles/patients/patient-records), which blocks all future communications -- dismissing just clears this one list.

Select multiple patients with the checkboxes and use **Message selected** to send the same WhatsApp message to a batch at once, or **Export** to pull the current filtered list out as a file.

## Why a patient drops off the list

A patient leaves Recalls the moment they have a future appointment booked -- there's nothing to manually clear. This is also why **Booked** as an action and simply booking them from the Calendar have the same end result; the action option just lets you log it in the same click if you booked them over the phone rather than in QuiroFlow.
