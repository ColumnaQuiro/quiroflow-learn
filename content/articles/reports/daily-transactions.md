---
title: Daily Transactions
description: Every payment and refund on one day, by method, for cashing up at closing time.
collection: reports
order: 3
---

**Daily Transactions** lists everything taken and refunded on a given day, with the time, the patient and the method. It is meant for closing: you compare **Net collected** and each method's figure with what is in the drawer and what the card terminal says. You'll find it under **Reports › Financial**.

::help-video{clip="reports--daily-transactions" caption="Going over yesterday's and today's payments"}
::

## Cashing up a day

1. Open **Reports › Daily Transactions**. It opens on today.
2. To see another day, use the **Previous day** and **Next day** arrows, or type the date. **Today** takes you back to the current day.
3. If you like, filter by practitioner or clinic.
4. Compare the cards at the top with the till: **Net collected** is the total, and beside it there is one card per method (Cash, Card, Bizum…).
5. Click **Download PDF** if you want to keep the close.

## What counts and what doesn't

**Net collected** is the money that came in that day: payments for visits, bonos, memberships, products and money left on account. **Refunds** show in red, tagged **refund**, and are subtracted.

What **isn't money coming in** is listed in the table but not added up:

- Anything paid with **Credit on account** has its own card, **Credit applied**, with the note "Not money in today". That money was already counted on the day the patient paid it in.
- Anything written off shows in the table with the method **Write-off**, but is not in **Net collected**.
- Payments on a voided receipt don't appear.

## The table's columns

- **Time**, **Patient** (click the name to open their record) and **Amount**.
- **Receipt**: the number of the receipt it pays. A dash (—) means the payment doesn't settle a particular receipt, such as a bono sale or money on account.
- **For**: what the money was for: **Visit**, **Bono**, **Membership** or **On account**. It helps tell two identical payments from the same patient apart: is it a double charge, or a visit plus a prepayment?
- **Practitioner**: the visit's; with no visit, the practitioner assigned to the patient; if none, **Unassigned**. It is the same rule as [Income & Payments](/articles/reports/income-and-payments).
- **Method**: how it was taken, with the names from Settings › Payments.

> **Good to know:** the day runs from 00:00 to 23:59 of the chosen date, by the time the payment was recorded. A payment recorded the next day shows on the next day, even if the visit was the day before.

> **Good to know:** to open and close the till with a cash count, use the calendar's **Cash shift**: see [Cash shift](/articles/billing-payments/cash-shift).
