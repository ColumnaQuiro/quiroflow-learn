---
title: Importing and migrating your data
description: Bring patients, appointments, and files over from PracticeHub or another system.
collection: settings
order: 8
---

If you're moving to QuiroFlow from another practice management system, three Settings pages handle getting your existing data across -- records, then the files attached to them, then a cleanup pass on those files.

::image-carousel
---
images:
  - src: /screenshots/settings-import.png
    alt: Import Patients (CSV) page with a PracticeHub tab showing URL, API Key, and email fields, and per-record-type import buttons
    caption: "A dedicated PracticeHub connection, or a generic CSV importer"
  - src: /screenshots/settings-migrate-attachments.png
    alt: Migrate Attachments page with a progress bar and a four-step guide to running a local migration script
    caption: "Pulling the actual file content across, step by step"
---
::

## Import Patients (CSV)

**Settings -> Import Patients (CSV)** has two tabs:

- **PracticeHub** -- if you're coming from PracticeHub specifically, save your PracticeHub URL, API key, and email once here, and every import type connects automatically afterward: Patients, Appointments, Appointment Types, Payments, Packages / Bonos, Patient Logs, Sticky Notes, Treatment Notes, Care Plans, Custom Form Responses, and File Attachments -- no need to paste the API key again for each one, or after a page reload.
- **Other system** -- a generic CSV importer for anything else. Export patients as a CSV from your current system and drop it in; column names don't need to match QuiroFlow's, since you map them to the right fields in the next step.

## Migrate Attachments

Patient files (X-rays, reports, signed forms) need a second pass after the main import, because PracticeHub itself doesn't offer a bulk file-download API -- only a metadata export and a one-file-at-a-time "View" link in its own interface. **Settings -> Migrate Attachments** works around that with a script you run yourself:

1. **Import the attachment list** -- export "File Attachments - List" from PracticeHub (Reports -> Data Exports), then import it via Import Patients (CSV) above. This creates the file records with names, sizes, and dates, but no actual content yet.
2. **Download the migration script** from this page -- it runs on your own computer, since it needs a real browser window for you to log into PracticeHub yourself.
3. **Install dependencies once** (`npm install playwright @supabase/supabase-js papaparse ws` and `npx playwright install chromium`).
4. **Run it**, filling in your PracticeHub URL and the CSV filename. It asks for your QuiroFlow login in the terminal, then opens a real browser window for you to log into PracticeHub -- from there it drives that browser itself to fetch every file and attach it to the matching patient.

It's safe to stop and re-run at any point: it only ever processes files still missing content, so nothing is repeated or lost partway through. Your QuiroFlow and PracticeHub passwords are typed by you directly into their own login prompts -- the script itself never stores or transmits either.

## Compress Files

Once files are in, **Settings -> Compress Files** re-encodes the images embedded in uploaded PDFs and images at a high but non-original quality -- typically 40-60% smaller with no visible difference on screen. It runs once per file (anything already compressed is skipped), so it's safe to stop and restart, and every new upload from that point on is compressed automatically without needing to run this again.
