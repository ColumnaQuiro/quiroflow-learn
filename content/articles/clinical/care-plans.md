---
title: Care plans
description: Build a patient's plan of visits with its cadence, re-exams and payment, follow its progress, renew it when it ends, and keep an eye on plans falling behind in Care Plan Alerts.
collection: clinical
order: 3
---

A care plan is the treatment you propose to the patient: how many visits, at what cadence (for example "twice a week for 6 weeks"), which visits are re-exams, and how it's paid. QuiroFlow counts the visits as they happen, tells you if it falls behind, and helps you book the ones left. The patient sees it in their app and portal too.

A plan is informative: it never stops a visit being booked or charged outside its cadence.

## Create a plan

::help-video{clip="clinical--care-plan-create" caption="Creating a care plan with a re-exam"}
::

1. On the record, open the **Clinical** tab and, in the plan box, click **+ Add plan**.
2. Give it a **Name** (for example "Corrective phase").
3. Set the cadence: **Visits** [number] **every** [number] **week(s)** or **month(s)**. Below you'll see how it reads: "2 times a week", "every 2 weeks", "monthly"…
4. Set the **Total visits in plan** and the **Start date**.
5. To mark re-exams, under **Re-exams** click **+ Add re-exam visit**: choose the **Visit** (for example the 6th), whether it repeats (**then every** 6 visits), which appointment type it's booked as (**Booked as Revisión**, or **Any type (highlight only)**) and a label. Visits are counted from the start of the plan, booked ones included.
6. Under **How it is paid**, choose **Per visit** (each visit at its normal price), **Bono** or **Membership**, and which one. If they have none open, sell them one in **Money** first.
7. Click **Save**.

The plan box straight away offers **Plan saved. Book its visits now?** with a **Book the N visits left →** button, which opens the calendar set up to repeat the plan's cadence.

> **Good to know:** when booking, the calendar tells you if a visit is a re-exam ("Visit N of the plan · Re-exam") and offers the appointment type the plan asks for. If it's booked as another type, the appointment says so and lets you change it.

## Follow the progress

On **Clinical** and **Overview** you see "X of Y visits", the cadence, a progress bar, how many are **completed** and how many **remaining**, which visits are re-exams, and how it's paid (for example "Paid: bono, 4 left").

Only visits since the plan's start date count: completed ones as done, booked ones as still to do.

On **Overview**, **Periods of the plan** splits the plan into periods (for example week by week) and marks each one **Done**, **Booked**, **Behind** or **Not booked**, with a summary of the current period ("This period: 1 of 2") and whether it's **On track** or **Behind**. Only people who can see all appointments see it.

::help-video{clip="clinical--care-plan-progress" caption="Plan progress and its periods, on the Overview tab"}
::

## Change a plan

Click **Edit** in the plan box, change what you need and click **Save**. Each save creates a new version of the plan, and the newest is the one that counts: the previous one isn't overwritten. A patient has one active plan: always the last one saved.

## When the plan ends: the review in My Day

When the plan has **two visits or fewer** left, **My Day** flags it on the patient's visit: "<plan> ends in N visits: what comes next?" (or "…is complete"). You'll see their pain over time, visits done and missed, and a link to the **Progress report**, to talk it through with the patient. Choose one:

- **Maintenance**: a new plan of 1 visit every 3 weeks, 8 visits.
- **Same again**: the same plan once more.
- **Discharge**: closes the plan, and the patient comes back onto the **Recalls** list after 3 months.

Adjust the **Plan name**, when it **Starts** and, if you like, a **Bono**, then click **Just create the plan** or **Create plan and add the bono** (the bono is left owing and the desk takes payment in **Money**, with its factura). For a discharge, click **Discharge**.

## Care Plan Alerts

You don't need to check every patient's plan one by one. **Patients › Care Plan Alerts** gathers what needs a call:

::help-video{clip="clinical--care-plan-alerts" caption="Fixing a re-exam booked as the wrong type from Care Plan Alerts"}
::

1. **Plans behind schedule**: patients with an active plan whose next visit should already have happened by their own plan's cadence, and who have nothing booked. You see the plan, progress, last visit, when it was due and how many days overdue, with a **Message** button to write to them without opening the record.
2. **Re-exams booked as the wrong type**: re-exam visits booked with a different appointment type from the one the plan asks for (it usually happens when appointments are moved). Click **Change to …** to fix it.
3. **Home exercises not being done**: patients with the app and assigned exercises who haven't ticked any for 5 days or more.

You need the **Recalls, waitlist and plan alerts** permission.

## What the patient sees

In their app and portal, the patient sees **Your care plan** with the visits they have left and a **Book** button (or **Ask the clinic**, when they can't book themselves). When they finish it, they see "Plan complete. Well done!" See [The patient portal](/articles/patient-app/patient-portal).
