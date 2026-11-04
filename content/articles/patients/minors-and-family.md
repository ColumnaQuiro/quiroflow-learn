---
title: Minors, tutors and family
description: Mark a patient as under age, link their tutor so messages reach them, issue facturas in the tutor's name, and link relatives together.
collection: patients
order: 5
---

When you treat a child, the person who gets the reminders, signs the consent forms and pays is usually their mother, father or legal guardian. In QuiroFlow you handle that by linking the minor's record to their tutor's, who must also be a patient of the clinic. Separately, the **Family** card lets you link any relative who also comes (a partner, siblings…).

## Mark a minor and link their tutor

::help-video{clip="patients--minor-tutor" caption="Marking a patient as under age and linking their tutor"}
::

1. Make sure the tutor already has their own record. If not, create it first ([Adding a patient](/articles/patients/adding-a-patient)).
2. Open the minor's record and click **Edit all details**.
3. Under **Under age & do not contact**, tick **This patient is under age**. If the date of birth already says they're a minor, QuiroFlow suggests it with a **Mark as under age** button.
4. In **Tutor (parent / guardian, must be an existing patient)**, search for the tutor by name and pick them.
5. If facturas should be made out to the tutor, tick **Facturas in the tutor’s name**.
6. Click **Save**.

The record's banner shows **Minor** and **Messages go to** with the tutor's name (click it to open their record). With no tutor linked you'll see **No tutor linked**.

### What changes when they're marked as a minor

- **The minor is never written to.** Messages about their appointments (confirmations, reminders and the automations that aren't marketing) go to the tutor: their phone, their email, in their language. Emails to the tutor open by saying they're receiving it as the minor's guardian.
- **With no tutor, nothing is sent.** The same if the tutor is marked **Do not contact** or is a minor too.
- **Marketing never goes out**, neither to the minor nor to the tutor on their behalf, and minors are never added to recall lists.
- The **Communications** tab and the **Message** button disappear from the minor's record, and their visit history can't be sent.

### Facturas in the tutor's name

With **Facturas in the tutor’s name** ticked, facturas issued **from now on** carry the tutor's name, address and NIF. Facturas already issued stay in the patient's name; they don't change.

> **Good to know:** when the minor turns 18, QuiroFlow tells you in this same dialog ("N years old by the date of birth: no longer under age") and offers **Unmark**. It isn't unmarked automatically.

## The Family card

The **Family** card, on the **Overview** tab, links relatives who are also patients, each with a link to their own record. It tells you who is who: the mother who brings her two children, the couple who come the same afternoon.

::help-video{clip="patients--family" caption="Adding a relative on the Family card"}
::

1. On **Overview**, on the **Family** card, click **Add**.
2. Type in **Search patient by name…** and pick the person.
3. Under **Relation**, say what that person is to the patient (for example "Marta is Leo's…" › **Mother**).
4. Click **Add**.

The link is saved on both records at once: if Marta is Leo's mother, Marta's record shows Leo as her son. To remove it, click the ✕ next to the relative.

> **Good to know:** the **Family** card only says who is who. Who receives a minor's messages is decided by the **Tutor** in **Edit all details**, not by this card.

Changing these needs the **Edit patient details** permission.
