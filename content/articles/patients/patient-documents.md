---
title: Forms, consents and letters
description: Send forms for the patient to fill in and sign on their phone, build your templates, and write letters such as a report for their doctor.
collection: patients
order: 8
---

The record's **Attachments** tab has three sections, one below the other: **Documents** (forms the patient fills in and signs: informed consent, data protection, intake history…), **Letters** (what the clinic writes: a report for their doctor, a certificate of treatment) and **Files** (what you upload; see [Patient files and photos](/articles/patients/patient-files)).

Forms are built once as a template and then sent to each patient as a link. The patient fills them in and signs on their own phone, with no account or password.

## Send a form to a patient

::help-video{clip="patients--send-form" caption="Sending a consent form from the record"}
::

1. On the record, open the **Attachments** tab. The forms are at the top (**Forms sent to the patient**).
2. Click **Send a form** and choose **From template** › the template (for example "Consentimiento informado"), or **Blank document**.
3. The form is created with the patient's details already filled in (name, date of birth, email, address, ID number, occupation, emergency contact, clinic name, today's date and any of your own fields the template uses).
4. Go back to the list with **← Docs**. Each form shows the patient's full link.
5. Share it:
   - **Resend** opens WhatsApp Web with the message "Hi! Please complete this document:" and the link (only if the patient has a phone).
   - **Copy link** copies it to paste wherever you like (email, SMS, chat).
   - **Open** opens it in a new tab, for example so they can fill it in on a waiting-room tablet.

Each form shows **Awaiting patient** until they send it, then **Completed**, with the date it was signed.

> **Good to know:** there are no automatic reminders for forms. Unreturned ones appear under **Overview** › **Needs attention**, with a **Resend** button.

> **Good to know:** forms don't appear in the patient portal or app; they reach the patient only through the link (or at the desk, with the staff app's **Sign at reception** mode; see [Signing at reception](/articles/patient-app/reception-signing)).

## What the patient sees

::help-video{clip="patients--form-patient-side" caption="The patient fills in and signs the form"}
::

The link opens a page with the clinic's name and the form in the patient's language. They answer the questions, sign with a finger in the **Signature** box (with **Clear signature** if they slip) and tap **Submit**. They see **Thank you / This document has been completed.**

For privacy, once completed the link no longer shows the answers, even if someone opens it again.

## Read the answers

In **Attachments** › **Documents**, click the form's **title**: it opens inside QuiroFlow with all the answers and the signature.

> **Good to know:** the **View answers** button on a completed form opens the patient's link, which only shows "Thank you". To read the answers, click the title.

From that view you can also fill the form in on the patient's behalf and click **Mark as completed**. Clicking **✓ Completed** on a completed form reopens it, and the link works again.

If a template question is **linked** to a field on the record (for example the ID number or address), the patient's answer updates their record when they submit. The email is only filled in if the record had none; it never replaces an existing one.

Deleting a form needs the **Delete documents** permission.

## Build the templates

Templates live in **Settings › Docs** (you need the **Communication and Growth** permission).

::help-video{clip="patients--doc-template" caption="Building a consent template"}
::

1. Click **New Template** and give it a **Name**.
2. Choose a **Category**: **None**, **Data protection** or **Consent**. With a category, **Reports** can list the patients still missing that form.
3. If the consent expires, set **Valid for (months)**. Signed copies about to expire are listed in **Settings › Privacy**.
4. Add the content with **Add block**: **Heading**, **Text**, **Short answer**, **Long answer**, **Checkbox**, **Options**, **Number scale**, **Rating**, **Date**, **Signature** and **Drawable image** (upload a diagram, such as a body chart, for the patient to mark where it hurts).
5. On each question you can tick **Required** and, with **Link to**, link it to a field on the record. **Insert field** puts patient details into the text (their name, the date…).
6. Click **Save**.

Under **Other languages** you can add a version in another language: each patient gets the version in their preferred language. Translate the wording, but keep the same questions.

> **Good to know:** editing a template only changes what is sent from now on; forms already sent keep their questions. Deleting a template doesn't remove forms already sent, but **Reports** stops counting them in their category.

## Letters: reports and certificates

Letters are documents the clinic writes for the patient or for another professional: a report for their doctor, a certificate of treatment.

::help-video{clip="patients--letter" caption="Writing a letter from a template"}
::

1. On the record, open **Attachments** and, in the **Letters** section, click **New letter**.
2. Choose **From template** › the template, or **Blank letter**.
3. Check the **Title** and the text, which already carries the patient's details. Leave **Print the clinic’s logo** ticked if you want the logo.
4. Click **Save letter**.
5. Use **Download** (PDF) or **Print**.

The clinic's name, NIF and address head every letter, taken from **Settings › Clinics**. Letter templates are created in **Settings › Letters** with **New template**: **Name**, **Letterhead** and **Template text**, where you can insert patient details.

> **Good to know:** if the template includes the chief complaint or diagnosis and the person writing the letter can't see clinical notes, those are left blank and QuiroFlow says so.

Deleting a letter removes it from the record; copies already printed or sent aren't affected.
