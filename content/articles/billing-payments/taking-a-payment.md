---
title: Charging a visit and recording payments
description: Charge a visit from the calendar or record a payment from the patient's record, split between two methods if needed.
collection: billing-payments
order: 2
---

Charging in QuiroFlow has two steps that almost always go together: the **receipt** is created (what is owed) and the **payment** is recorded (the money coming in). Usually you do both at once from the appointment, in the calendar. If the patient pays later, or pays something left over from another day, you record the payment from their **Money** tab. Every payment issues its factura automatically; see [Receipts, facturas and rectifying facturas](/articles/invoices-verifactu/receipts-and-invoices).

You need the **Charge and issue receipts** permission to charge appointments, and **Record payments and run the till** to record payments.

## Charging a visit from the calendar

::help-video{clip="billing--charge-visit" caption="Charging a visit from its appointment in the calendar"}
::

1. In the calendar, open the appointment and go to its **Billing** tab. (From the flow tracker, **Charge** takes you straight there.)
2. Until it has been charged you'll see **Not charged yet** with the appointment type and its price. Click **Charge** (the button shows the price, for example **Charge 45,00 €**). The receipt is created.
3. If needed, add more items with **-- Add Service/Product --**.
4. Check the **Amount (€)** and choose the **Method**. If they pay with two methods, click **Split into another method**.
5. Click **Process**. The receipt is paid and its factura is issued.
6. If you like, click **Send receipt** to email it.

If the patient has a bono, instead of charging you'll see a **Use** button for each bono, with what the session is worth (for example **Use Bono 10 sesiones — 38,00 €**), and the normal charge button then says **… instead**. See [Bonos: selling, collecting and using them](/articles/billing-payments/selling-a-package-bono).

> **Good to know:** an appointment that hasn't happened yet can't be charged: you'll see "This appointment hasn't happened yet — no receipt until it does."

## The patient's Money tab

On each patient's record, the **Money** tab gathers everything to do with their money. At the top are three cards:

- **Owed now**: what they owe, with its receipts. This is where you record a payment or sell a product.
- **On account**: their credit balance, split into **Credit** and **In bonos**. This is where you add credit or redeem a gift voucher.
- **How they pay**: whether they have a card saved for automatic charges.

Below are their **Packages / bonos**, their **Memberships** and, if you work with insurers, their cover under **Third parties**. At the bottom, **Account ledger** shows every movement with its running balance, and **Facturas & receipts** their documents.

You need the **See billing history** permission to see this tab.

## Recording a payment from the record

::help-video{clip="billing--split-payment" caption="Recording a payment split between cash and card"}
::

1. On the **Money** tab, under **Owed now**, click **Take payment**.
2. Under **Receipt**, choose the receipt being paid. The oldest one is preselected, with its outstanding amount.
3. Adjust the **Amount (€)** if they're only paying part of it, and choose the **Method**.
4. If they pay with two methods (part cash, part card, for example), click **Split into another method** and fill in the second line. **Total:** shows the sum.
5. Click **Record payment**.

The receipt becomes paid once payments cover its amount; otherwise it stays outstanding for the difference and you can record another payment later. Each payment line issues its own factura.

If the patient owes nothing, you'll see "No unpaid receipts to take a payment against."

## Paying with credit

If the patient has credit, **Method** offers **Credit on account** with the amount available. You can only use up to that amount. Paying with credit doesn't issue a new factura, because that money was invoiced when it came in. More in [Credit, write-offs and statements](/articles/billing-payments/credit-and-statements).

> **Good to know:** the **Card** method only records that you took the card on your own terminal. QuiroFlow doesn't charge the card at that moment. Automatic charges to a saved card are covered in [Saved card, autopay and online payment](/articles/billing-payments/adding-a-patients-card).

> **Good to know:** the methods offered under **Method** are set in **Settings › Payments**. See [Payment methods and Stripe](/articles/settings/connecting-stripe).
