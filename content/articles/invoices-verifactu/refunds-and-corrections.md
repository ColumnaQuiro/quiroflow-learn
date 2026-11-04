---
title: Refunds, rectifying facturas and annulments
description: How to give money back, correct a payment recorded wrongly and annul a factura issued by mistake.
collection: invoices-verifactu
order: 2
---

A factura that has been issued can't be edited or deleted: it is a fiscal record, chained for VeriFactu. What you can do is correct it the right way for what actually happened. If you **gave money back** to the patient, you record a refund and QuiroFlow issues the rectifying factura by itself. If the payment **never happened** (you recorded it by mistake), you remove the payment and annul its factura. And if you only picked the wrong **payment method**, you change it without touching anything else.

Everything is done from the patient's **Money** tab, under **Account ledger** and **Facturas & receipts**.

You need the **Correct past charges** permission set to **Always**. To remove a payment, change its method or annul a factura you also need **Record payments and run the till**.

## Refunding a payment

::help-video{clip="invoices--refund" caption="Refunding a payment and seeing its rectifying factura"}
::

1. On the **Money** tab, open **Account ledger**.
2. On the receipt's row, open its menu and click **Refund…** (refunds the whole receipt). On a payment's row, **Refund…** refunds just that payment. You can also start from the receipt page, with **Refund…**.
3. Enter the **Amount (€)**. It can't be more than was paid.
4. Under **Refunded via**, choose how you gave the money back.
5. If the receipt included products, set **Back to stock (units)** to how many go back on the shelf (0 if they were opened or broken).
6. Optionally, add a **Reason**.
7. Click **Refund**.

QuiroFlow records the refund in the ledger, reduces the patient's balance, and automatically issues a **rectifying factura**: a document with a negative amount, in its own series (for example **R-2026-0001**), at the same IVA as the original factura. You'll see it under **Facturas & receipts** tagged **rectifying**.

> **Good to know:** QuiroFlow **does not move the money back** for you. Recording a refund doesn't call Stripe or the bank: make the actual refund (in cash, by transfer, from Stripe…) yourself.

## Removing a payment recorded by mistake

If you recorded a payment that was never taken (you clicked twice, it was another patient…), remove it instead of refunding it.

1. In **Account ledger**, on the payment's row, click **Remove payment**.
2. Read the warning: the receipt becomes outstanding again and no money is refunded. If that payment already had a factura, the warning gives its number: the factura stays on the fiscal series, flagged as no longer matching a payment.
3. Confirm.

Then annul that factura as described below.

## Annulling a factura issued by mistake

::help-video{clip="invoices--annul" caption="Removing a payment recorded by mistake and annulling its factura"}
::

Only a factura whose payment you have already removed can be annulled. In the list it is tagged **payment removed**.

1. On the **Money** tab, open **Facturas & receipts**.
2. On the factura tagged **payment removed**, click **Annul**.
3. Choose how to annul it:
   - **Annul it (recommended)**: the factura should never have been issued. An annulment record goes to the AEAT and the number stays on the series, marked annulled.
   - **Issue a rectifying factura**: a rectifying factura that cancels it is issued, as its own document in the R series.
4. Enter the reason. With an annulment it is kept with the factura; with a rectifying factura it is printed on it.
5. Click **Annul factura** or **Issue rectifying factura**.

The factura is then tagged **annulled**.

> **Good to know:** only annul when nothing was taken. If you did take the money and later gave it back, record a refund: that way the record shows the money coming in and going out.

## Changing a payment's method

If you recorded a cash payment that was really by card, there's no need to remove it:

1. In **Account ledger**, on the payment's row, click **Change method…**.
2. Choose the right method under **Paid with**.
3. Click **Save**.

The amount, date and receipt stay as they are, and the change is logged with your name.

## Voiding or deleting a receipt

A receipt (not the factura) can be voided or deleted **only if it has no payments**. On the receipt page, **Void receipt** is disabled while there is a payment; in the ledger, **Delete** tells you the receipt has payments recorded. Refund or remove those payments first.

To settle a receipt without collecting it (for example, a small debt you decide to forgive), use **Write off**, explained in [Credit, write-offs and statements](/articles/billing-payments/credit-and-statements).

> **Good to know:** QuiroFlow applies these rules the way VeriFactu expects, but it doesn't replace your adviser. If you're unsure how to correct a particular transaction, ask your accountant (gestoría).
