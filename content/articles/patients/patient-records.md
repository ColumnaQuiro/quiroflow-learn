---
title: The patient record
description: What's on a patient's record, tab by tab, and how to edit their details.
collection: patients
order: 3
---

The record brings together everything you know about a patient: their details, their clinical history, their appointments, what they've paid, the messages the clinic has sent them and their documents. Open it from the **Patients** list, from the search bar at the top (**Search or jump to**) or from any appointment in the calendar.

::help-video{clip="patients--record-tour" caption="A tour of a patient record"}
::

## The banner

The same banner sits at the top whichever tab you open:

- The photo or initials (click it to change the photo; see [Patient files and photos](/articles/patients/patient-files)) and the full name.
- Warning pills when they apply: **VIP**, the balance (owing money or in credit), **Minor**, **Pregnant · N weeks**, **Do not contact**, **Archived** and **View only** (when your role can't edit patients).
- Age, date of birth and how long they've been a patient.
- Phone and email, each with a copy button (**Copy phone number**, **Copy email address**), the clinic, the practitioner and whether they use the patient app (**No app**, **Has an app account**, or when they last opened it). **Copy invite** copies a ready-to-paste text with the app links and your clinic's code.
- The **Message** (WhatsApp) and **Book visit** buttons.
- The **More actions** menu (⋯), with **Take payment**, **Send the app on WhatsApp**, **Cancel future appointments**, **Archive patient**, **Merge with another record**, **Export their data (GDPR)** and **Delete patient**. Each option appears only if your role allows it.

> **Good to know:** the phone in the banner is the first one added to the record, which isn't necessarily the WhatsApp one. See [Phones, WhatsApp and contact preferences](/articles/patients/managing-contact-numbers).

## The tabs

| Tab | What's there |
|---|---|
| **Overview** | What's pending, the next appointment, the care plan, recent activity and their details. |
| **Clinical** | Clinical summary, flags, visit notes, care plan, patient note, readings and home exercises. See [Clinical summary and flags](/articles/clinical/clinical-summary). |
| **Progress** | Pain over time and posture assessments. See [Pain and progress](/articles/clinical/pain-and-progress). |
| **Appointments** | Attendance stats and every visit, upcoming and past. |
| **Money** | Charges, payments, bonos and memberships. See the [Billing and payments](/articles/billing-payments) collection. |
| **Communications** | The WhatsApp messages and emails the clinic has sent them. See the [Communications](/articles/communications) collection. |
| **Attachments** | Forms, letters and files. See [Forms and letters](/articles/patients/patient-documents) and [Patient files and photos](/articles/patients/patient-files). |

**Progress** only appears if your role can **See visit notes**, and **Money** if it can **See billing history**. **Communications** doesn't appear on a minor's record (messages go to their tutor) or if your role has no access to the inbox.

## Overview: the first thing you see

::help-video{clip="patients--record-attention" caption="What needs attention, from the Overview tab"}
::

- **Needs attention** appears only when something is pending: unpaid charges (with a **Take payment** button that takes you to **Money**) and forms sent that the patient hasn't returned yet (with **Resend**, which takes you to **Attachments**).
- **Next appointment**: day, time, type, practitioner, room and whether it is **Confirmed** or **Not confirmed**, with **Reschedule** (opens the calendar) and **Send confirmation**. Below it, how the last visit was paid.
- **Care plan**: which visit they're on, the cadence, how it's paid and a button to book the visits left. See [Care plans](/articles/clinical/care-plans).
- **Activity**: a timeline of visits, messages, plan changes, exercises, documents and payments. Filter with **All**, **Visits**, **Contact**, **Plan & exercises**, **Documents** or **Billing**.

In the right-hand column:

- **Clinical snapshot**: chief complaint, working diagnosis and whether there are **Red flags** or **Yellow flags**.
- **Pregnancy**: click **Record a pregnancy**, set the **Due date** and, if you like, the number of **Babies** and a **Note**, then **Save**. The card shows the weeks and trimester, and the banner shows **Pregnant**. When it's over, click **End pregnancy**.
- **Family**: relatives who are also your patients. See [Minors, tutors and family](/articles/patients/minors-and-family).
- **Stopped coming**: why they stopped coming. Click **Record reason**, pick the reason, add a note if you like and click **Save**. It counts in **Reports › Retention** and stops applying if the patient comes back. Record only what the patient actually told you.
- **Patient details**: date of birth, national ID, email, practitioner, clinic and referral source, with the **Edit all details** button.

## Editing the patient's details

::help-video{clip="patients--edit-details" caption="Editing a patient's details"}
::

1. On **Overview**, click **Edit all details**.
2. Change what you need: name, date of birth, email, address, **National ID**, occupation, **Emergency contact**, **Referral source**, **Preferred language**, **Default practitioner**, **Clinic**, **Tags** and **Status** (**Active** or **Inactive**).
3. Click **Save**. You'll see **Patient saved**.

The same dialog holds the phone numbers and communication preferences ([Phones, WhatsApp and contact preferences](/articles/patients/managing-contact-numbers)) and the under-age and tutor options ([Minors, tutors and family](/articles/patients/minors-and-family)).

> **Good to know:** QuiroFlow checks the DNI/NIE. If the check letter doesn't match, it tells you it isn't valid. If it isn't a Spanish ID, it's saved anyway, but full facturas will go to the tax agency without the recipient's NIF.

> **Good to know:** if the **Referral source** says another patient recommended them (Paciente, Referido, Recomendación, Boca a boca…), a **Referred by (existing patient)** field appears so you can pick who it was.

> **Good to know:** anyone who can edit patients can add tags, but removing them needs the **Remove patient tags** permission.

## The Appointments tab

At the top you see **Visits, 12 mo**, **Attendance** and **Cancelled**. Below, **Upcoming** and **Past**: each visit shows its status (**Completed**, **Missed**, **Cancelled**, **Confirmed**, **Booked**), how it was paid, **Online** if the patient booked it themselves, and the **Notes** and **Send confirmation** buttons.

**Send history** sends the patient a PDF of their visit history, by **Email** or WhatsApp. It can't be sent to a minor or to a patient marked **Do not contact**.

## Who can do what

You need the **Patients** permission (**All** or **Only their own**) to open a record, and **Edit patient details** to change it. Without the latter you'll see the **View only** pill and a **View all details** button instead of **Edit all details**. Every time someone opens a record it's written to the **Activity log**.
