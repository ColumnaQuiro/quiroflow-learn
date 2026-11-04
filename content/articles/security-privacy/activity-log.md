---
title: Activity log
description: Who changed what, who opened each patient's record or files, and who signed in to QuiroFlow -- a record nobody can edit or delete.
collection: security-privacy
order: 2
---

The **Activity log** keeps every change to patients, clinical notes, payments, the team and the clinic's settings, along with who made it; every time someone opens a patient's record or files, or exports patients; and every sign-in. It's there to answer "who deleted this appointment?", "who has looked at this patient's record?" or "where did this person sign in from?", and to help you comply with data protection. Nothing in it can be edited or deleted.

Only owners can see it. It's in **Settings → Activity log**.

## Who changed something

::help-video{clip="security--activity-log" caption="Seeing who moved and deleted an appointment, and who opened a record"}
::

1. Open the **Changes** tab.
2. Filter by **Person** and by **Area**: **Clinical notes & files**, **Patients**, **Appointments**, **Money**, **Team & access** or **Clinic settings**.
3. Click a row to see the detail: **Before:** and **After:** for each field that changed. Anything deleted appears **As it was when deleted**, and anything created **As created**.

Besides the people on your team, you'll see changes made by **Patient (app)**, **Online booking / patient link**, **QuiroFlow (automatic)** (reminders, automations and other background processes) or **Former team member**, for someone who is no longer there.

## Who opened a patient's record

The **Patient access** tab lists **When**, **Who**, **What** and **Patient**. What gets recorded: **Opened the record**, **Viewed a file**, **Downloaded a file**, **Downloaded a receipt or factura**, **Downloaded the statement** and **Exported patients** (with how many rows).

## Who signed in

The **Sign-ins** tab lists **When**, **Who**, **What** and **From** (the device and browser): **Signed in**, **Entered the two-factor code**, **Turned on two-factor login**, **Removed two-factor login**, **Changed their password**, **Asked for a password reset** and **Changed their email**.

> **Good to know:** failed password attempts don't appear here, because they never create a session.

Click **Refresh** to see the latest and **Show older** to go further back.

> **Good to know:** anything that looks like a password or a key is hidden in the log. If a patient is anonymised, the log still keeps who did what, but no longer what their record said. See [Data retention and GDPR](/articles/security-privacy/data-retention).
