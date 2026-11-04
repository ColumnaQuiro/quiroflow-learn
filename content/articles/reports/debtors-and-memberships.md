---
title: Debtors and Memberships
description: Who owes money on a bono and exactly how much, and how active memberships and their payments are doing.
collection: reports
order: 4
---

Two reports under **Reports › Financial** for money collected in advance or every month. **Debtors** tells you who has a bono that isn't fully paid and how much is left. **Memberships** counts active memberships, what was collected this month and the payments that failed. Both cover the whole clinic: they don't filter by practitioner and roles with **Only their own figures** don't see them.

## Debtors: who owes on a bono

::help-video{clip="reports--debtors" caption="Seeing what is left to collect on bonos and opening a debtor's record"}
::

1. Open **Reports › Debtors**.
2. At the top you see the **Total outstanding** and how many purchases it is spread over.
3. In the table each row is a bono: **Patient**, **Package**, **Purchased** (the date of sale), **Amount owed** and **Status**.
4. Click the patient's name to open their record and collect what is left from the **Money** tab (see [Selling a bono](/articles/billing-payments/selling-a-package-bono)).

**What it counts.** **Amount owed** is what is really left: the bono's price minus what has already been paid towards it. A 400 € bono with 150 € paid shows 250 €, not 400 €. **Total outstanding** adds those amounts up.

**The status.** **no receipt** is a bono sold and not fully paid. **stripe charge failed** is a bono on autopay whose last charge failed. A bono that has its own sale receipt shows that receipt's status, in English (*unpaid*).

**What it leaves out.**
- Bonos being collected automatically by autopay that are up to date: they are not a debt while the charges go through.
- Unpaid visits. Those debts are in **Billing**, with the **Unpaid** filter, and on each patient's record.
- It has no date range: it shows what is owed today, whenever the bono was sold.

> **Good to know:** if a bono was sold by mistake and won't be collected, fix it on the patient's record; as long as it has an amount outstanding it will show here.

## Memberships: active, collected and failed

::help-video{clip="reports--memberships" caption="The Memberships report"}
::

1. Open **Reports › Memberships**.
2. Read the three figures at the top and go over the table.
3. Click a patient to open their record.

**Active memberships** is how many memberships are currently active. Paused and cancelled ones don't count.

**Revenue this month (paid)** adds up this calendar month's membership payments marked paid. The report combines payments logged by hand on the membership card (**Log payment**) and automatic card charges through Stripe, as its note says: "Manual and Stripe autopay combined."

**Failed payments (all time)** counts every failed payment since the start, both those marked with **Log failed** and declined automatic charges. A red number usually means an expired card: let the patient know and save the new one.

The table lists each membership with its **Plan**, **Status**, **Started** date and **Last payment** (the period's date and whether it was paid or failed).

> **Good to know:** the payment taken when the membership is set up on the record counts in [Income & Payments](/articles/reports/income-and-payments), but not in this report's **Revenue this month (paid)**, which only adds up the monthly payments. To know how much money came in overall, use Income & Payments.

> **Good to know:** status and last payment show raw words (*active*, *paused*, *cancelled*, *paid*, *failed*), in English even in the Spanish app.

To set up, pause or charge a membership, see [Memberships](/articles/billing-payments/memberships).
