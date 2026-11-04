---
title: Custom fields
description: Add your own fields to the patient record, clinical or admin, and use them in your document templates.
collection: settings
order: 7
---

If you need to record something about your patients that QuiroFlow doesn't have out of the box (the sport they play, whether they're left- or right-handed, their insurer, what they like to be called), create it as a **custom field**. There are two kinds:

- **Clinical**: on the record's **Clinical** tab. Only roles with clinical access see them, like visit notes.
- **Admin**: in **Patient details**, for everyone who can see the patient.

Each field also works as a merge field in your document templates.

You need the **Clinic and diary** permission.

## Creating a field

::help-video{clip="settings--custom-field" caption="Creating a single-choice field"}
::

1. Go to **Settings → Custom Fields** and click **Add field**.
2. Enter the **Name** (for example, "Sport they play").
3. Choose the **Section**: clinical or admin.
4. Choose the **Type**: **Short text**, **Long text**, **Number**, **Date**, **Yes / no** or **Single choice**. For a single choice, type the **Options, one per line** (at least two).
5. Click **Save**.

If you want the front desk to fill it in when adding a patient, set it to **Optional** or **Required** in **Settings → New Patient Fields**. See [New patient fields and referral sources](/articles/settings/patient-intake-fields).

## Ordering, editing and archiving

- The arrows change the order they appear in on the record.
- The pencil changes the name or the options. Rewording an option leaves answers already given as they were.
- The archive icon retires it. Under **Archived** you can **Restore** a field, or **Delete** it if no patient has answered it.

> **Good to know:** once a field has answers, its type can't change and it can only be archived, not deleted.

To use it in a consent form or a report, see [Documents and consents](/articles/patients/patient-documents).
