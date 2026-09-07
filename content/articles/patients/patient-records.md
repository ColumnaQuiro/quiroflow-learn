---
title: A patient's record
description: What's on a patient's page, and how to add a new patient.
collection: patients
order: 1
---

## Adding a patient

The fastest way is right from the Calendar when booking an appointment -- search for them, and if they're not found, add them without leaving the booking panel (first name, last name, email, phone). This is the path most staff use day to day, since it turns "new patient calls to book" into a single flow instead of two separate steps.

You can also go to **Patients** and add one directly, with more fields available (date of birth, national ID, address, referral source, preferred language, and more) -- worth using when you're entering a patient ahead of their first visit and already have their full details on hand, rather than just enough to get them on the calendar.

## The patient page

Open any patient to see their full record, organized into tabs:

- **Overview** -- contact details, flags, care plan, and account summary at a glance.
- **Appointments** -- their full visit history and any upcoming bookings.
- **Visit notes** -- clinical notes recorded by practitioners, one per visit. See [Visit notes](/articles/patients/visit-notes).
- **Billing** -- invoices, payments, packages, memberships, and cards on file. See the **Billing & Payments** collection.
- **Communications** -- every message sent to or from this patient.
- **Docs** -- forms and documents sent for them to fill out or sign; see [Sending forms and documents to a patient](/articles/patients/patient-documents).
- **Files** -- uploaded files (photos, reports, etc).

![Patient Overview tab showing visit stats, care plan, contact details, and recent activity](/screenshots/patient-overview.png)

The Overview tab's stat row -- **Visits (12mo)**, **Attendance**, **Last visit**, **Lifetime value** -- is the fastest way to size up a patient at a glance before opening any of the other tabs: a low attendance percentage or a lifetime value that's dropped off might be worth a Recall, for instance.

## Patient note

Separate from Flags, the **Patient note** card on Overview is a single free-text field for anything true about the patient generally -- intake history, ongoing precautions, context worth reading before their first session with a new practitioner. Select **Edit** to write or update it. Unlike [Visit notes](/articles/patients/visit-notes), it isn't tied to a specific date or appointment -- there's only ever one, and editing it overwrites what was there before, so it's for standing context rather than a running log.

## Flags

The **Flags** card on Overview surfaces anything staff should know at a glance -- things like do-not-contact, minor status, or other account markers. Select **Edit** to change them. Because it's the first thing visible on the page, this is the right place for anything that should change how staff handle the patient before they even open another tab -- not clinical detail, which belongs in Visit notes, and not general background, which belongs in the Patient note above.

## Duplicate patients

If the same person ends up with two records -- a walk-in created before someone realized they'd called in before, a CSV import that didn't match an existing entry -- avoid just deleting one, since that takes its appointment history, billing, and documents with it. Merging and deleting patients are both permission-gated actions (see **Roles & Permissions** in [Roles & permissions](/articles/team-roles/roles-and-permissions)); if you run into duplicates regularly, check with whoever holds Owner or Front Desk-level access about the right way to consolidate them in your account.

## Deactivating vs. deleting

If a patient stops coming to your clinic, select **Edit** on **Patient details** and set **Status** to **Inactive** rather than deleting the record -- this keeps their full billing and visit history intact, which matters both for accounting and for the rare case they come back later. The same edit panel has two related checkboxes worth knowing about: **This patient is under age** (for parental-consent-style handling) and **Do not contact**, which blocks all communications and recalls to that patient outright -- use it for anyone who's asked not to be messaged, rather than relying on staff to remember not to.
