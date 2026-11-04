---
title: Saved card, autopay and online payment
description: Save a patient's card to charge bonos and memberships automatically, and let patients pay their receipts online.
collection: billing-payments
order: 6
---

With Stripe connected, a patient can leave a card on file and QuiroFlow charges it by itself on the dates you set: a bono's instalments or each period of a membership. Patients can also pay an outstanding receipt online. All of this needs Stripe connected under **Settings › Payments** ([Payment methods and Stripe](/articles/settings/connecting-stripe)). Payments in cash, by card on your own terminal or with credit work without Stripe.

## Saving a patient's card

On the patient's **Money** tab, the **How they pay** card shows whether they have a card on file (for example "Visa •••• 4242", with its expiry) or **No card on file**. There are two ways to add one:

- **With the patient in front of you**: click **Add card**, let the patient type the details into Stripe's secure form and click **Save card**.
- **Remotely**: click **Copy card link** and send it to the patient (by WhatsApp or email). The patient saves it on a Stripe page and sees "Card saved" when done. The record updates by itself.

Card details go straight to Stripe; QuiroFlow never stores or sees them. To change it, click **Replace card**; to take it off, **Remove card** and confirm.

> **Good to know:** the saved card is used for automatic charges. There's no button to charge it there and then from the front desk: if you take a card at the clinic, use your terminal and record the payment with the **Card** method.

> **Good to know:** if you remove a card a running autopay uses, those charges fail until the patient adds another.

## Charging a bono in automatic instalments

::help-video{clip="billing--autopay" caption="Splitting a bono into two monthly instalments on the saved card"}
::

With a card on file, you can split a bono's price into instalments that are charged automatically:

1. On the bono, click **Set up autopay**.
2. Under **Installments**, set how many equal charges the bono's price is split into.
3. Under **Every**, set how often (for example, 1 **month(s)**).
4. Under **Already paid**, set how many of those instalments they've already paid (for example, 1 if they paid the first at the clinic). Only the remaining ones are scheduled.
5. Click **Start**.

The bono shows **Autopay** with the instalments charged out of the total (for example 1/2). To stop it, click **Cancel** and confirm. Each charge issues its factura. If a charge fails, it shows under **Reports › Debtors** as a failed Stripe charge.

Without a saved card you'll see "No card on file -- add one to enable autopay for the remaining balance." and an **Add card** button.

## Charging a membership automatically

On the patient's membership, click **Set up autopay**, check **Every** (it comes with the plan's period) and click **Start**. It is charged every period until you cancel it.

## Letting the patient pay online

- **From their portal or app**: the patient sees their outstanding receipts and can click **Pay** to pay by card on Stripe. The payment is recorded by itself and the factura is issued.
- **From the inbox**: when replying to a patient, use **Put a payment link in the reply** to add a link to their outstanding receipt. If Stripe isn't connected you'll see "Online payment is not set up for this clinic."

## Automatic payment reminders

If you have an overdue-receipt automation switched on, the **How they pay** card shows **Payment reminders** with a switch to pause them for that patient only (**Paused for this patient**) and the date of the last one sent. Automations are covered in [Automations](/articles/communications/automations).
