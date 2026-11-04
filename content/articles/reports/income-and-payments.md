---
title: Income & Payments, and Income Performance
description: What each Income & Payments figure counts (charged, paid, outstanding) and how to compare practitioners month by month.
collection: reports
order: 2
---

**Income & Payments** answers three questions: how much was charged, how much actually came in, and how much is still to collect. You'll find it under **Reports › Financial**. Its companion, **Income Performance** (under Growth & Performance), puts each practitioner's income side by side, month by month.

::help-video{clip="reports--income" caption="Last month's Income & Payments, filtered to one practitioner"}
::

## Seeing the income for a period

1. Go to **Reports** and open **Income & Payments**.
2. Pick the date range (**This month** by default) and, if you like, a practitioner or a clinic.
3. Read the three figures at the top and scroll down to the breakdowns.
4. Click **Download PDF** to keep a copy.

## What each figure counts

**Total charged** is the sum of the receipts raised in the period: visits paid or still to pay, quick receipts, product sales, memberships… Bono session receipts count too, at the bono's per-session price. It **leaves out** voided receipts. Remember a receipt is not a factura: see [Receipts and facturas](/articles/invoices-verifactu/receipts-and-invoices).

**Total paid** is the money that came in during the period, by the date it was taken, whichever receipt it pays (even one from an earlier month). It includes:

- payments for visits, receipts and products;
- money taken for bonos and memberships;
- money a patient leaves on account (**Add credit**);
- a gift voucher, on the day it is redeemed onto a patient (not the day it was bought online).

**Refunds** are subtracted. It **leaves out**:

- anything paid with **Credit on account**: that money was already counted on the day the patient paid it in. A note under the figures, "A further X was settled from credit on account…", makes sure it doesn't simply vanish;
- anything written off (**Write off** in the ledger, shown as the method **Write-off** elsewhere): settling a debt without collecting it is not money coming in;
- payments on a receipt that was later voided.

**Outstanding** is what is still unpaid on the receipts raised in the period that are not marked paid. In other words: of what was charged in these dates, how much hasn't come in yet. It does not include older debts or money owed on bonos (that is in [Debtors](/articles/reports/debtors-and-memberships)). That is why **Total charged** minus **Total paid** need not equal **Outstanding**: the paid figure includes payments on older receipts and on bonos, which have no receipt in this period.

## The breakdowns

- **Revenue by month**: **Total paid**, month by month, as a line.
- **By payment method**: what was paid, by how it was taken (Cash, Card, Bizum…), with the names you set in Settings › Payments.
- **By practitioner**: what was paid, by whose money it is. A payment for a visit counts for that visit's practitioner. With no visit behind it (a bono, money on account, a quick receipt), it counts for the practitioner assigned to the patient on their record. If the patient has none, it shows as **Unassigned**.
- **By service**: what was paid for. It splits the receipts paid in the period by what is on them: the service or product, the bono the session came from, or the visit's appointment type. It counts each line's full amount, including when it was paid with credit, because a session paid from the balance is still a session delivered. Anything that can't be identified shows as **Not identified**. Bono sales themselves don't appear here, because they have no receipt.

> **Good to know:** when you filter to one practitioner, money that can't be attributed to anyone (no visit and no practitioner on the patient) is left out of the figures, and a note says so: "Plus X in this period that no filter can attribute…". That way the filtered total still reconciles with the whole clinic's.

> **Good to know:** a bono sold by one practitioner to another's patient counts for the patient's practitioner. It is an attribution, not a record of who made the sale. For what each person sells, see [Commissions](/articles/reports/commissions).

## Comparing practitioners with Income Performance

**Income Performance** draws one line per practitioner with what was taken each month (**Revenue by practitioner, by month**) and, below it, each one's **Total over range**. It uses exactly the same rules as **Total paid**: money that came in, refunds subtracted, credit and write-offs left out.

::help-video{clip="reports--income-performance" caption="Comparing practitioners month by month"}
::

1. Open **Reports › Income Performance**.
2. Pick a range of several months with **Custom range**, so each line has several points.
3. Hover over the chart to see each practitioner's figure for each month.

> **Good to know:** months go by the date of payment, not the date of the visit. A visit at the end of a month paid on the 2nd counts in the following month.
