---
title: Adding a patient's card
description: Save a card on file by entering it yourself, or send the patient a link to enter it themselves.
collection: billing-payments
order: 2
---

A saved card lets you take payments without asking for card details every visit, and enables autopay for package installments and memberships. Stripe must be connected first -- see **Settings &rarr; Payments**.

![Billing tab toolbar showing Add credit, Take payment, Add card, and Copy card link buttons, with Card on file set to None](/screenshots/patient-billing.png)

On a patient's **Billing** tab, you have two ways to add one.

## Option 1: Enter it yourself

Select **Add card** (or **Replace card** if one's already on file). A secure card form opens right there, hosted by Stripe -- card details go straight to Stripe and are never stored in QuiroFlow itself, or seen by anyone outside that form.

![Add card modal with Card number, Expiration date, Security code, and Country fields, plus an optional email and mobile number for faster checkout](/screenshots/billing-add-card-modal.png)

The form also offers to save the email and mobile number for faster checkout next time -- this is optional and only affects future Stripe payment flows, not the patient's QuiroFlow contact record.

## Option 2: Send the patient a link

Select **Copy card link**. This creates a one-time Stripe-hosted page and copies its link to your clipboard. Send it to the patient however you like -- WhatsApp, email, text -- and they enter their own card on Stripe's own page, without staff ever seeing or touching it. This is the better option when the patient isn't physically in front of you, or when you'd rather not handle their card details even briefly on a shared front-desk screen.

Once they submit it, the patient's **Card on file** status updates automatically, usually within a few seconds -- there's no need to refresh manually, though doing so never hurts if you want to confirm it landed.

## Removing a card

Select **Remove card** next to a patient's card details. This detaches it from Stripe and clears it from their record -- ask for confirmation before doing this if the patient has an active autopay schedule relying on it, since those charges will start failing until a new card is added. Removing a card doesn't cancel any package or membership itself, only the automatic collection method for it.
