---
title: Issued facturas and Accountant
description: The book of facturas for a period with its IVA, and the quarterly download for your accountant with the invoice register, the IVA summary and the payments.
collection: reports
order: 6
---

Two reports under **Reports › Data** for the tax side. **Issued facturas** lists all the facturas in a period with their base, IVA and total, and downloads them as a CSV. **Accountant** prepares in one go what your accountant (gestoría) asks you for each quarter: the register of issued facturas, the IVA summary and the payments, and the facturas as PDFs if they want them.

Only **facturas** count here, not receipts. QuiroFlow issues one factura for each payment that comes in (not for each visit), and a corrective factura for each refund. If the difference isn't clear, read [Receipts and facturas](/articles/invoices-verifactu/receipts-and-invoices) first.

## Issued facturas

::help-video{clip="reports--facturas" caption="Reviewing last month's facturas and downloading the CSV"}
::

1. Open **Reports › Issued facturas**.
2. Choose the period (**This month** by default).
3. At the top you see four figures: the number of **Facturas**, the **Tax base**, the **IVA** and the **Total**.
4. Use the type buttons to see only some: **All**, **Simplified**, **Full** or **Corrective** (each with how many there are). Or search in **Number, name, NIF…**.
5. Click **PDF** on a row to open that factura, or the recipient's name to go to their record.
6. Click **Download CSV** to get the list (it opens in Excel).

**What the figures count.**
- They add up the facturas you see: if you filter by type or search, the figures at the top change with the filter.
- The **Total** comes **net of corrective facturas**: a refund goes in with a negative amount and subtracts.
- **Void** facturas stay in the list, struck through and marked **annulled**, because their number is part of the series, but they don't count in any total.
- If the period has facturas with more than one IVA rate (for example exempt services and a product at 21%), the **By IVA rate** table appears with a line for each rate. Exempt ones show as **Exempt**.

In the table, **Type** says whether it's simplified, full or corrective; for a corrective one, next to it, the number of the factura it corrects.

> **Good to know:** since there's one factura per payment, a paid visit split half in cash and half by card has two facturas. That's normal.

## Accountant: the quarter's download

::help-video{clip="reports--gestoria" caption="Choosing the quarter and downloading the ZIP for the accountant"}
::

1. Open **Reports › Accountant**.
2. Choose the **Year** and the quarter (**Q1**, **Q2**, **Q3** or **Q4**). If your accountant works by months, choose a month in **or a month**.
3. Review the summary: how many facturas there are and, by IVA rate, the **Base**, the **IVA** and the **Total**. It is "Net of rectificativas (refunds), which go in with negative amounts."
4. Below, **Money in by method** says how much came in through each method in the period.
5. Click **Download ZIP** under **Download for the accountant**.
6. If they also want the facturas, click **Download PDFs** under **The facturas as PDF**. When there are many, they're split into parts (**Part 1**, **Part 2**…): download each one.

**What's in the ZIP.** Three CSV files that open in Excel, with the amounts written the Spanish way:
- the register of issued facturas: number, date, type, status (void ones show as "Anulada", with amounts at zero), which factura it corrects, recipient and NIF, base, IVA rate, IVA amount, total, exemption, payment method and description;
- the IVA summary, one line per rate and the total;
- the period's payments: date, amount, payment method and factura number.

The **Download PDFs** button downloads a ZIP with one PDF per factura.

> **Good to know:** anything paid with **Credit on account** isn't in the payments, because it isn't money coming in. Anything forgiven does appear in **Money in by method** as **Write-off**, even though it isn't money collected: bear that in mind when reconciling with the bank.

> **Good to know:** the download link expires after one hour. If you need it again, click the button again.

## Who can see them

You need **See reports**. **Accountant** also requires **Charge and issue receipts**. **Issued facturas** doesn't appear for roles with **Only their own figures**, because facturas belong to the whole clinic.
