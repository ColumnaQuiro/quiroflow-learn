---
title: Receipts, facturas and rectifying facturas
description: What each document is, when each one is created and what can be corrected.
collection: invoices-verifactu
order: 1
---

QuiroFlow keeps two different documents, and understanding the difference answers almost every billing question. The **receipt** is the charge: what the patient owes for a visit or for something you sell them. The **factura** is the fiscal document: it is issued by itself every time money comes in, is recorded for VeriFactu and can never be changed. If you make a mistake, it isn't deleted: it is corrected with a **rectifying factura** (factura rectificativa) or, if the payment should never have existed, annulled.

## The receipt: what is owed

A receipt is created when you charge a visit from the calendar or with a [quick receipt](/articles/billing-payments/the-billing-page). It moves the patient's balance (what you see under **Owed now** on their **Money** tab) and becomes **paid** once payments cover its amount.

- It has its own number, from a single series (set in **Settings › Invoicing › Numbering**).
- It is not a fiscal document: the taxes are carried by the factura of each payment.
- It can be voided or deleted **only while no payment is recorded against it**. If it already has a payment, refund or remove that payment first.

## The factura: one for every payment

Every time you record money coming in, QuiroFlow issues a factura automatically, with nothing for you to do. It doesn't matter where the payment is taken: the calendar, the **Money** tab, the receipt page, the staff app or a patient paying online.

These issue a factura:

- Recording a payment against a receipt.
- **Add credit** (money on account): the factura reads "Saldo a cuenta para servicios en la clínica".
- Any payment toward a bono, partial ones included: the factura describes the part of the bono that has been paid.
- A membership payment.
- A product sale, at the product's own IVA.
- A gift voucher, **when it is redeemed** (not when it is bought).

These don't:

- Paying with **Credit on account**: that money was invoiced when it came in.
- **Write off**: no money comes in.
- What you charge an insurer or mutua: their statement is not a factura.

Facturas are numbered PREFIX-YEAR-NUMBER (for example **F-2026-0001**) and the numbering starts again at 1 every year.

### Simplified or full

- **Simplified**: a visit or an on-account payment of up to 400 €. It doesn't need the patient's NIF.
- **Full**: any amount over 400 €, and **always** a bono or membership payment. It needs the recipient's NIF (a valid Spanish DNI, NIE or NIF).

If a full factura is missing its NIF, the tab warns you: "N of these need the patient's NIF…". Add it in the patient's details and facturas already issued pick it up by themselves.

## Seeing a patient's facturas

::help-video{clip="invoices--facturas-tab" caption="A patient's facturas, on the Money tab"}
::

1. Open the patient's record and go to the **Money** tab.
2. Below the bonos and memberships, click **Facturas & receipts**.
3. Under **Facturas** there is one line per payment, with its number, its tag (**simplified**, **rectifying**, **annulled**…), what it was for and the amount.
4. Click **PDF** to open it, or **Send** to email it to the patient.

All of the clinic's facturas, with their IVA, are in **Reports › Issued facturas**, and the quarterly download for your accountant (gestoría) is in **Reports › Accountant**. See [Understanding your reports](/articles/reports/understanding-your-reports).

## Facturas in the tutor's name

For a patient under age, you can tick **Facturas in the tutor’s name** in their details. From then on their facturas carry the tutor's name, address and NIF, and the list shows "In the name of …". Facturas already issued stay in the patient's name.

## Rectifying facturas and annulment

A factura is never edited or deleted. To correct one:

- If you give money back to the patient, record a **refund**: QuiroFlow issues a **rectifying factura** by itself, with a negative amount, in its own series (for example **R-2026-0001**).
- If the payment was recorded by mistake and nothing was taken, remove the payment and **annul** the factura.

The steps are in [Refunds, rectifying facturas and annulments](/articles/invoices-verifactu/refunds-and-corrections).

> **Good to know:** IVA on facturas follows one rule for the whole account (**Exempt** by default, or **With IVA**), except products, which always carry their own IVA. Prices always include IVA. It is set in [Settings › Invoicing](/articles/settings/billing-configuration). If you're unsure which option applies to you, ask your accountant (gestoría).

> **Good to know:** if a factura can't be issued (for example, because of a connection problem), the payment is still recorded and you'll see "The payment was recorded, but its factura could not be issued: …".
