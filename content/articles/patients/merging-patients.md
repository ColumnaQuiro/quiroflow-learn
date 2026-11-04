---
title: Merging duplicate records
description: Join two records for the same person into one, without losing appointments, payments, bonos or documents.
collection: patients
order: 6
---

Sometimes the same person ends up with two records: someone registered them while booking without noticing they already existed, or an import didn't recognise them. Don't delete one of the two: its appointments, payments and bonos would go with it. The right move is to **merge** them: everything on one record moves to the other, and the spare one is deleted.

## Merge two records

::help-video{clip="patients--merge" caption="Merging two records for the same person"}
::

1. Open either record and, in **More actions** (⋯), click **Merge with another record**.
2. In **Search by name, email or reference**, type the name and pick the other record. Each result shows its reference, email and date of birth so you don't pick the wrong person.
3. You'll see the two records side by side. Click the one you want to **keep**: it will say **Keeps everything** and the other **Will be deleted**. By default the record you started from is kept.
4. Check the table: for each thing (**Appointments**, **Invoices**, **Bonos**, **Credit**, **Docs and files**) it tells you how much is **Moving across**, how much is **Kept**, and which record is **Deleted**.
5. Click **Merge** and confirm. You'll see **Patients merged**. If you were on the record being deleted, QuiroFlow takes you to the one that's kept.

If you picked the wrong record, click **Pick another** before merging.

## What happens to the data

- Everything on the deleted record moves to the kept one: appointments, visit notes, charges, payments, facturas, bonos, memberships, credit, forms and files.
- The kept record **keeps its own details**. Only its blank fields are filled in from the other (for example, if it had no email and the other did).
- **Tags** and **phone numbers** from both are kept.
- Facturas move safely: the patient isn't part of the data VeriFactu signs, so the chain isn't affected.

> **Good to know:** a merge can't be undone. Before clicking **Merge**, look carefully at the numbers in the table: sometimes the record that looks empty is the one holding the bono or the credit.

> **Good to know:** to avoid duplicates, always search for the patient by name, phone or email before creating a new one. QuiroFlow doesn't warn you if they already exist.

You need the **Delete and merge patients** permission.
