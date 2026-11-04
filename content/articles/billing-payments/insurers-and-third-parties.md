---
title: Insurers, mutuas and companies (Third parties)
description: Bill part of a visit to an insurer or company, keep track of what they owe and record their payments.
collection: billing-payments
order: 9
---

When an insurer, a mutua or a company pays all or part of a patient's visits, in QuiroFlow it is a **third party**. When charging the visit you split the amount: the patient pays their share (the copago) and the rest is owed by the third party. What third parties owe is tracked separately, under **Billing › Third parties**, and is never added to what the patient owes.

## Adding a third party

::help-video{clip="billing--third-party-create" caption="Adding a mutua with its rate per type of visit"}
::

1. Go to **Settings › Third parties** and click **New third party**.
2. Enter the **Name** and choose the **Type** (insurer, medico-legal or company). Optionally, add **CIF / NIF**, **Address**, **Email**, **Phone**, **Contact** and **Notes**.
3. Under **Rates by type of visit**, click **Add rate**, choose the **Type of visit** and set what the **Third party pays (€)** and what the **Patient pays (€)**.
4. Click **Save**.

A third party already in use can't be deleted: click **Retire**. Retired ones are listed below and you can **Use again** any of them.

You need the **Open Settings** and Settings **Billing** permissions.

## Adding cover to a patient

1. On the patient's **Money** tab, on the **Third parties** card, click **Add cover**.
2. Choose the **Third party** and fill in what you have: **Policy / case number**, **Authorisation number**, **Authorised sessions** and **Valid until**.
3. Click **Save**.

The card shows the sessions used out of those authorised and what that third party owes for this patient ("Owed by …"). When the cover ends, click **End**.

## Charging a covered visit

1. On the appointment's **Billing** tab, click **Bill a third party (insurer, mutua, company)…**.
2. Under **Who pays**, choose the patient's cover (or another third party).
3. Check **Third party pays (€)** and **Patient pays (€)**. If there's a rate for that type of visit, they come filled in.
4. Click **Bill**.

The patient's receipt is left with only their share, which you collect as usual. The rest is owed by the third party.

## Seeing what they owe and recording their payments

::help-video{clip="billing--third-party-payment" caption="Recording a mutua's payment and opening its statement"}
::

1. Go to **Billing** and click **Third parties**. You'll see what each one owes, by age.
2. Click a third party to see its **Visits charged** and **Payments received**.
3. When they pay you, click **Record payment**: enter the **Amount (€)**, the **Received on** date, the **Method** and, optionally, a **Reference**.
4. The payment is spread across the visits, oldest first. You can change what is applied to each one under **Apply (€)**.
5. Click **Save payment**.

## Sending the statement

On the third party's page, under **Statement**, choose **From** and **To** and click **Open statement**. The **Statement of services** opens with every visit in the period, ready to **Print** or save as PDF and send to the third party.

> **Good to know:** the statement is an informative document, **not an invoice**, and what you charge a third party doesn't issue a factura in QuiroFlow. If the mutua or company asks you for a factura, check with your accountant (gestoría).

> **Good to know:** what a third party owes doesn't appear under the patient's **Owed now** or in their payment reminders.
