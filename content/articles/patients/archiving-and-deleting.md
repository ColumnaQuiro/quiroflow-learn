---
title: Archiving, deleting and cancelling future appointments
description: What to do when a patient stops coming, when a record can be deleted, and how to cancel all their upcoming appointments at once.
collection: patients
order: 7
---

When a patient stops coming, the usual move is to **archive** them, not delete them: they disappear from the active list and stop being picked up by **Recalls** and segment sends, but you keep their clinical history and payments, which the law requires you to keep. Deleting a record is for mistakes (a test record, someone registered by error), and QuiroFlow won't delete the record of a patient with issued facturas.

All of this is done from the record's **More actions** menu (⋯).

## Archive a patient

1. Open the record and click **More actions** (⋯) › **Archive patient**.
2. You'll see **Patient archived** and the **Archived** pill in the banner.

The patient becomes **Inactive**: they no longer show in the patient list (unless you filter by **Inactive** or **Any status**), and they're left out of the **Recalls** list and of automations and campaigns sent to a segment. Their record stays intact. To undo it, click **More actions** › **Unarchive patient**.

> **Good to know:** archiving doesn't cancel appointments they already have booked, and those appointments still send their messages. If they're stopping treatment, cancel those too (below).

> **Good to know:** archiving is the same as setting **Status** to **Inactive** in **Edit all details**; it's just quicker.

## Delete a record

::help-video{clip="patients--delete" caption="Deleting a record created by mistake"}
::

1. Open the record and click **More actions** (⋯) › **Delete patient**.
2. The dialog lists everything that goes with it: how many appointments, receipts and files. Clinical notes and messages are deleted along with the appointments they belong to.
3. To confirm, type the patient's full name exactly as shown (**Type … to confirm**).
4. Click **Delete permanently**.

It can't be undone.

### When a record can't be deleted

::help-video{clip="patients--delete-refused" caption="A record with facturas can't be deleted: archive it instead"}
::

If the patient has **issued facturas**, you'll see **This record cannot be deleted**. Facturas are fiscal records chain-signed under VeriFactu: deleting one would break the chain for every one issued after it. The same applies if they have visits charged to an insurer or company, because what a third party owes the clinic is kept.

In that case, click **Archive instead**: the record is archived and out of the way.

> **Good to know:** if what you have is a duplicate record, don't delete it: merge it into the right one so nothing is lost. See [Merging duplicate records](/articles/patients/merging-patients).

## Cancel all their future appointments

When a patient stops treatment, you can cancel all their upcoming appointments in one go instead of one by one in the calendar.

::help-video{clip="patients--cancel-future" caption="Cancelling all of a patient's future appointments"}
::

1. Open the record and click **More actions** (⋯) › **Cancel future appointments**.
2. You'll see their appointments from today on. They stay in their history as cancelled, no cancellation fee is charged, and the slots are freed up in the calendar.
3. If you want the patient to know, tick **Let the patient know**: your "appointment cancelled" automation runs **once**, for the soonest visit (one message, not one per visit).
4. Click **Cancel N appointments** (or **Keep them** to leave without changes).

## Export their data (GDPR)

If a patient exercises their right of access, the clinic owner can download everything held about them from **More actions** › **Export their data (GDPR)**. QuiroFlow builds a ZIP (personal details, appointments, clinical history, billing, signed documents, communications and access log) and downloads it; the download link is valid for one hour. The export is written to the **Activity log**. More in [Data retention and privacy](/articles/security-privacy/data-retention).

## Who can do what

- **Archive patient** and **Cancel future appointments**: the **Edit patient details** permission.
- **Delete patient**: the **Delete and merge patients** permission.
- **Export their data (GDPR)**: clinic owners only.
