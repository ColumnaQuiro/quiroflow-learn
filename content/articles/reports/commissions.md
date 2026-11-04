---
title: Commissions and pay plans
description: Set how each person is paid (fixed, a percentage, per visit with tiers, bonuses) and see what they earned each month.
collection: reports
order: 5
---

**Commissions** works out what each team member earned in a month from their pay plan: a fixed amount, a percentage of what was taken, an amount per visit with tiers, a bonus per new patient and a percentage of what they sell. You set each person's pay plan once and the report does the sums every month. You'll find it under **Reports › Financial**.

> **Good to know:** **Commissions** is visible to the clinic's owners only, whatever the other roles are.

## Setting up a person's pay plan

::help-video{clip="reports--commissions-setup" caption="Setting up a practitioner's pay plan and seeing what they earned"}
::

1. Open **Reports › Commissions**.
2. On the person's row, click **Set up** (or **Edit plan** if they already have one).
3. In **Pay for …**, fill in only the parts you use. As the window says: "Fill in the parts you use; anything left empty does not count."
   - **Fixed per month (€)**: a fixed amount every month.
   - **% of the payments for their visits and patients**: a percentage of the money taken that month that is attributed to them.
   - **Per attended visit (€)**: an amount for each attended visit.
   - **Tiers by visits in the month**: different amounts depending on how many visits they do in the month. Click **+ Add a tier**, enter the number of visits it starts from and its amount, and choose how tiers apply (see below).
   - **Bonus per new patient (€)**: an amount for each patient who has their first visit with them.
   - **% of bonos and memberships they sell**: a percentage of the price of what they sell.
4. Click **Save**. The row recalculates straight away.

### How tiers apply

- **All visits at the tier reached**: once they reach a tier, every visit that month is paid at that tier's amount. With a tier from 30 visits and 35 visits done, all 35 are paid at the tier's amount.
- **Each band at its own rate**: like tax brackets. Visits 1 to 29 at the per-visit amount, from 30 onwards at the tier's amount.
- **A bonus for each tier reached**: every visit at the per-visit amount, plus the tier's amount once for reaching it.

## Seeing what each person earned

1. Pick the **Month** at the top. It opens on last month, because pay is worked out once the month has closed.
2. The table shows, per person, **Visits**, **New** patients, the **Payments** attributed to them, **Sales** and what they **Earned**. The team's **Total** is at the top right.
3. Click a row to see the breakdown: each part of the pay plan with how it was worked out (for example "10 % × 4.200,00 €" or "25 × 12,00 €").
4. Click **Export CSV** to take it to payroll or your accountant.

Practitioners without a pay plan show **No pay plan** and the **Set up** button. People who aren't practitioners only appear once you give them a pay plan.

## What each column counts

- **Visits**: that practitioner's appointments in the month marked completed. Cancelled, no-show and still-booked appointments don't count.
- **New**: patients whose first ever completed visit was that month, with that practitioner.
- **Payments**: the money taken that month that is attributed to them, by the same rule as [Income & Payments](/articles/reports/income-and-payments): the visit's practitioner or, with no visit, the practitioner assigned to the patient. Refunds are subtracted; credit applied and write-offs don't count.
- **Sales**: the price of the bonos and memberships that person recorded in the month, whether or not they have been paid yet.
- **Earned**: the sum of every part of their pay plan.

> **Good to know:** if some payments can't be attributed to anyone (no visit and no practitioner on the patient), a note under the table says how much, and no percentage counts them. Assigning a practitioner to every patient on their record prevents it.

> **Good to know:** the report works out earnings from the pay plan you entered. It is not a payslip and doesn't take tax or social security into account.
