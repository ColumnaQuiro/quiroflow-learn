---
title: Importing your data
description: Bring your patients, appointments, payments, bonos, notes and files into QuiroFlow from PracticeHub, or your patients from a CSV file from any other program.
collection: settings
order: 8
---

If your clinic is coming from another program, you don't need to start from scratch. In **Settings › Import** you can bring over your **PracticeHub** records step by step, or patients from **any other system** from a CSV file. Each step first shows a preview of what is going to change: nothing is written until you confirm it.

You need the **Data** permission.

## Importing patients from a CSV

::help-video{clip="settings--import-csv" caption="Importing patients from a CSV file"}
::

It works for any program that can export its patients to a CSV file (or to Excel, then saved as CSV).

1. Export your patients from your current program.
2. In **Settings › Import**, under **Import from**, choose **Another system** (**Patients from a CSV file**).
3. Drag the file onto the upload area, or click **browse for a file**. QuiroFlow tells you how many rows it has detected.
4. Match each **QuiroFlow field** to the **Column in your file**. QuiroFlow suggests the ones it recognises; fix any that are missing. **First name** is the minimum required.
5. If you like, choose under **Import into clinic** the location they belong to, and click **Continue**.
6. Review the summary: **Total rows**, **Will import**, **Will update** and **No changes / no name**, with a sample of the changes to patients that already exist.
7. Click **Import…** (the button says how many will be imported and how many updated). When it finishes, **View Patients** takes you to the list; **Import another file** starts again.

> **Good to know:** if your file has its own identifier for each patient, match it to **Record ID (optional — enables safe re-import)**. That way you can import the same file again later and QuiroFlow updates the patients instead of duplicating them. Without that identifier, it recognises them by email.

## Importing from PracticeHub

For clinics coming from PracticeHub, QuiroFlow connects to its API and brings over much more than patients. The list on the left has the steps in the order it's best to do them; each one says **Not run yet** or how many records it has imported.

### 1. Connect

1. Choose **PracticeHub** under **Import from** and open **Set up › Connection**.
2. Fill in the **PracticeHub URL**, the **API Key** (in PracticeHub, **Developers → API Keys**) and **Your email** (PracticeHub asks for it as an identifier). If your clinic is already on PracticeHub 2.0, also add the **PracticeHub 2.0 API key**, the one that starts with phk_.
3. Click **Test connection** and then **Save**. The connection is saved for all the steps.

### 2. The steps, in order

- **1 · Records**: **Patients** (goes first: everything else is matched to its patient), **Appointment types** and **Appointments**.
- **2 · Money**: **Ledger** (invoices and payments as PracticeHub has them), **Bonos** and **2.0 care plans** (read-only, for now). Payments first, so each bono knows what is outstanding.
- **3 · Clinical**: **Treatment notes**, **Care plans**, **Patient logs**, **Sticky notes**, **Form responses** (this also creates a document template for each form) and **Files** (scans, photos and PDFs).
- **Check**: **Check migration** (what arrived and what didn't) and **Check a patient** (one patient, both systems side by side). It's read-only.

In each step, click the read button, review the preview (**Sample of changes**) and confirm with the import button.

> **Good to know:** you can repeat any step without worry: patients are recognised by their PracticeHub reference (and if not, by email), and they're never duplicated. If you keep using PracticeHub for a few days while you start with QuiroFlow, run the steps again to bring over what's new.

> **Good to know:** imported appointments carry the PracticeHub practitioner's name. If that name isn't anyone on your team yet, link it in **Settings › Team › Unlinked imported names**. See [Inviting your team](/articles/team-roles/inviting-your-team).

To stop using the connection, click **Disconnect**: the API key is deleted and nothing already imported changes.

## Files

::help-video{clip="settings--files" caption="Compressing patients' files"}
::

**Settings › Files** counts your patients' scans, photos and PDFs (**Files on patients**) and has two jobs for tidying them up after a migration:

- **Files that arrived without their content**: they appear on the record with their name and date, but can't be opened. **Fetch from PracticeHub** takes you to **Import › Files** to download them, if PracticeHub still has them; **Which ones** shows you the list.
- **Compress**: saves PDFs and images again at high quality, 40 to 60% smaller with no difference on screen. Click **Compress N files** and keep the page open while it works; **Stop** halts it and you can carry on another day.

> **Good to know:** files you upload in QuiroFlow, and those brought by **Import › Files**, are already compressed on arrival. Compressing is only needed for those that arrived earlier.
