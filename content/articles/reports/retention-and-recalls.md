---
title: Retention and Recalls
description: Who comes back after their first visit, who leaves with the next one booked, who drops their plan halfway and why, and what the automations win back.
collection: reports
order: 8
---

Two reports under **Reports › Growth & Performance** about patients coming back. **Retention** answers "do patients come back and finish what they start?". **Recalls** answers "of the patients we write to so they come back, how many do?".

## Retention

::help-video{clip="reports--retention" caption="The Retention report: figures at the top, first visits by month and by practitioner"}
::

1. Open **Reports › Retention**. It opens with the last 12 months.
2. Change the period or filter by practitioner or clinic if you like.
3. Go through the cards at the top and scroll down through the sections.

### The figures at the top

- **New patients**: patients whose very first visit ever fell in the period. A patient who comes back after a year doesn't count as new.
- **Came back**: of those new patients, the percentage who had a second visit.
- **Still coming at 3 months**: of the new patients whose first visit was at least 90 days ago, the percentage who had some visit 90 days or more after the first.
- **Left with the next one booked**: of the period's visits, the percentage where the patient had another appointment booked before the end of the visit day.

### The sections

- **Win-back**: the patients someone called or wrote to in the period (from Recalls, or with this same page's WhatsApp) and how many booked in the following 30 days. Those contacted less than 30 days ago who haven't booked yet show as "still to tell". It only appears if your role has the **Recalls, waitlist and plan alerts** permission and contacts have been recorded.
- **Why patients stopped**: the reasons for stopping recorded in the period (for example *Improved*, *Price*, *No time*), with their **Share** and, per practitioner, how many **Stopped** and which **Reasons**. Each one counts for the practitioner and the clinic of the patient's last visit. The reasons are set up in Settings › Recalls.
- **Care plans left unfinished**: care plans with visits outstanding, nothing booked and past the date their frequency set. It doesn't depend on the period above: it's what is overdue today. See [Care plans](/articles/clinical/care-plans).
- **By month of first visit**: one row per month with the **New** patients, how many **Came back** and what percentage were still coming at **3 months** and at **6 months**. A month too recent to know shows a dash.
- **By practitioner**: for each practitioner, their **Visits** in the period, the percentage who **Rebooked** before the end of the day and the percentage who were **Back in 30 days** (only for visits at least 30 days old).

### Writing on WhatsApp to someone who dropped their plan

1. In **Care plans left unfinished**, tick the patients with the checkbox, or click **Select all**.
2. Click **WhatsApp to N**. If any of them has no phone number, the bar says so ("N without a phone, skipped").
3. In **Send WhatsApp to**, choose the WhatsApp template, fill in whatever it asks for and click **Send to…**. It's the same bulk send as in Recalls (see [Recalls](/articles/calendar-appointments/recalls)).

> **Good to know:** with a practitioner chosen, "who came back" is still looked at across all of their visits, whoever they were with. A new patient of Álex who comes back with Inés counts as having come back.

## Recalls

::help-video{clip="reports--recalls" caption="What an automation has won back: contacted, replies and bookings"}
::

**Recalls** measures the automations that write to patients so they come back (see [Automations](/articles/communications/automations)).

1. Open **Reports › Recalls** and choose the period.
2. Under **Rules**, leave ticked the automations you want to measure. The recall ones come ticked; you can add others.
3. Read the figures and the **By rule** table.
4. Below, under **Patients**, filter by status and call whoever replied and didn't book.

**What counts.** The report takes the messages sent by those rules in the period (by WhatsApp or email, not counting failed ones) and looks at what happened in the **30 days** after each one:

- **Contacted**: patients the message reached, each counted once.
- **Replied**: those who answered on WhatsApp.
- **Booked**: those with a new, non-cancelled appointment created in those 30 days. Underneath, how many **came** and how many bookings the AI receptionist made.
- **Estimated value**: the price of the visits booked, according to the price of their appointment type. It's an estimate, not money collected.

In the **By rule** table you also see how many asked for **Do not contact**. In the **Patients** list, each one has their status: **Booked**, **Replied, not booked**, **Do not contact**, **No reply yet** (still within their 30 days) or **No answer**. From **Conversation** you open the chat.

> **Good to know:** Recalls covers the whole clinic: it isn't filtered by practitioner and doesn't appear for roles with **Only their own figures**.
