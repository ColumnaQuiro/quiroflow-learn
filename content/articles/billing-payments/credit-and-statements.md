---
title: Credit, write-offs and statements
description: Put money on a patient's account, use it on their receipts, move it to another patient, forgive an amount and send them their statement.
collection: billing-payments
order: 3
---

Credit is money a patient has left with the clinic to use later: a payment in advance, a gift, change they didn't take. You see it on the **On account** card of their **Money** tab. This article also covers how to **write off** an amount (settle a receipt without collecting it) and how to download or send the patient's account **statement**.

## Adding credit

::help-video{clip="billing--add-credit" caption="Adding credit to a patient's account"}
::

1. On the **Money** tab, under **On account**, click **Add credit**.
2. Enter the **Amount (€)** and choose the **Method** they paid with.
3. Optionally, add a **Reason** (for example "Birthday gift").
4. Click **Add credit**.

The amount shows under **Available**, within **Credit**.

> **Good to know:** adding credit is money coming in, not an adjustment: it is recorded as a payment and **issues a factura** ("Saldo a cuenta para servicios en la clínica"). Don't use it to give away a balance nobody has paid for.

You need the **Record payments and run the till** permission.

## Using credit on a receipt

There are two ways:

- When recording a payment, choose **Credit on account** as the **Method**. See [Charging a visit and recording payments](/articles/billing-payments/taking-a-payment).
- Under **On account**, click **Apply to receipt**, pick the receipt under **Select receipt…**, enter the **Amount (€)** and click **Apply credit**.

You can only apply up to the credit available; otherwise you'll see "Amount exceeds available credit." Using credit doesn't issue another factura, because that money was invoiced when it came in.

> **Good to know:** **Available** adds up the credit and the money left in their bonos (**In bonos**). Paying with **Credit on account** only uses the credit; bono sessions are used from the bono itself.

## Moving credit to another patient

For example, when a mother paid in advance and her son will use it:

1. In **Account ledger**, open the **⋯** menu (**More actions**) and click **Transfer credit**.
2. Under **To patient**, search for the other patient.
3. Enter the **Amount (€)** and click **Transfer**.

## Writing off an amount

::help-video{clip="billing--write-off" caption="Writing off what's left on a receipt"}
::

A write-off settles a receipt without collecting it: useful for a small debt you decide to forgive.

1. In **Account ledger**, on the receipt's row, open its menu and click **Write off** (it shows the amount, for example **Write off 5,00 €**).
2. Confirm: "This settles the receipt without collecting payment."

No money comes in and no factura is issued. In the cash shift and in **Settings › Payments** this movement appears as **Write-off**.

You need the **Correct past charges** permission set to **Always**.

## The account ledger

**Account ledger**, at the bottom of the **Money** tab, shows every movement with **Date**, **Description**, **Debit**, **Credit** and the running **Balance**. A visit paid with a bono shows "—" in both columns, because the money moved when the bono was bought.

From each row's menu you can open the receipt, email it, refund, write off or delete. Payments also have **Change method…** and **Remove payment** (covered in [Refunds, rectifying facturas and annulments](/articles/invoices-verifactu/refunds-and-corrections)).

## Downloading or sending the statement

1. In **Account ledger**, open the **⋯** menu (**More actions**).
2. Click **Download Statement** for the PDF, or **Send Statement** to email it to the patient.

> **Good to know:** nothing is emailed to a patient who is under age or marked do not contact. Download the statement and hand it to their tutor.
