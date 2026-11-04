---
title: Data exports
description: Download the patient list as a CSV, or find records that are missing a phone number, an email, a consent or a next appointment.
collection: reports
order: 14
---

**Data Exports** does two things: it takes the patient list out as a CSV that opens in Excel, and it finds records with gaps worth filling (patients without a phone number, without a signed consent, without a next appointment…). You'll find it under **Reports › Data**.

::help-video{clip="reports--data-exports" caption="Exporting the patients with no next appointment to a CSV"}
::

## Generating an export

1. Open **Reports › Data Exports**.
2. Under **Generate New Export**, leave **Data Type** on **Patients**.
3. If you like, choose a **Created Date Range**: it filters by the date each patient's record was created. **Clear (all time)** removes it.
4. Tick the **Filters** you need:
   - **Missing email**
   - **Missing phone number**
   - **Missing consent form**
   - **Missing data protection form**
   - **Missing next appointment**
   - **Patient needs to pay**
   - **Age**, with **Min** and **Max**

   While you choose, the page tells you how many patients match "right now".
5. Click **Generate Export**. The CSV downloads straight away and stays under **Generated this session**, with its filters and the number of rows, in case you want to download it again with **Download CSV**.

## What's in the CSV

One row per patient with: **First name**, **Last name**, **Email**, **Phone**, **Date of birth**, **Age**, **Practitioner** (or **Unassigned**), **Balance (€)**, **Has next appointment**, **Data protection form signed**, **Consent form signed**, **Status**, **Tags** and **ID**.

**How each filter is decided.**
- **Missing consent form** / **data protection form**: the patient has no completed document from a template in that category. If your templates have no category, every patient shows up as missing it (see [Patient documents](/articles/patients/patient-documents)).
- **Missing next appointment**: they have no future appointment that isn't cancelled.
- **Patient needs to pay**: their balance is negative, meaning they owe money.

Below, **Patients per practitioner** counts how many patients each practitioner has assigned, and how many are **Unassigned**.

> **Good to know:** for now only **Patients** can be exported. The other types in the dropdown (appointments, care plans, treatment notes, forms, files) appear, but the button doesn't activate with them.

> **Good to know:** **Generated this session** empties when you leave the page; files you've already downloaded stay on your computer. Every export is noted in the clinic's activity log, which owners can see (see [Activity log](/articles/security-privacy/activity-log)).

> **Good to know:** a CSV with patient data is personal information. Keep it somewhere safe and delete it when you no longer need it. Data Exports doesn't appear for roles with **Only their own figures**.
