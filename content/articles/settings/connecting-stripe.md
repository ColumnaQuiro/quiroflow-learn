---
title: Payment methods and Stripe
description: Choose which methods payments are recorded with, and connect Stripe to save cards, charge in instalments and sell online.
collection: settings
order: 8
---

**Settings › Payments** brings together how money comes into your clinic: the **payment methods** staff choose when recording a payment (cash, card, Bizum…) and the **Stripe** connection for the card charges QuiroFlow makes for you.

You need the **Open Settings** and Settings **Billing** permissions.

## Payment methods

::help-video{clip="billing--payment-methods" caption="Adding a payment method and no longer offering another"}
::

**Cash**, **Card**, **Bank transfer**, **Bizum** and **Other** come ready-made. Next to each you see how many times it has been used.

- **Add one**: type the name under **New payment method** (for example "Cheque") and click **Add**.
- **Stop offering it**: turn off its **Offered** switch. It disappears from payment forms and payments already recorded keep it.
- **Delete it**: only if it has never been used. If it has payments, turn it off instead.

Below, under **Built in, always available**, are **Credit on account** and **Write-off**. They're tied to the patient's real balance, so they aren't managed here.

> **Good to know:** recording a payment with **Card** only notes that you took it on your terminal. For QuiroFlow to charge cards for you, you need Stripe.

## What Stripe gives you

With Stripe connected you can use:

- **Saved cards**: the patient adds a card once, from a link.
- **Bono instalments**: split a bono into scheduled charges.
- **Membership renewals**: charged every period the plan sets.
- Patients paying their receipts online, and selling [gift vouchers](/articles/billing-payments/gift-vouchers).

How it's used for each patient is covered in [Saved card, autopay and online payment](/articles/billing-payments/adding-a-patients-card).

## Connecting Stripe

1. Under **Card payments with Stripe**, click **Connect with Stripe**.
2. Follow Stripe's steps: create your account or sign in to the one you already have.
3. Back in QuiroFlow you'll see "Stripe account connected." and the status **Connected**, with your **Account** id.
4. Click **Test connection** to check it works.

There are no API keys to copy and no webhook to set up.

## Disconnecting Stripe

Click **Disconnect** and confirm. Charge schedules already running stay in Stripe, but QuiroFlow can't charge new cards until you reconnect. Your receipts, payments and facturas don't change.

## Using your own API keys

If you'd rather not use the one-click connection, open **Advanced: use your own Stripe API keys instead**, paste the **Publishable key**, the **Secret key** and the **Webhook signing secret**, and click **Save keys**. In that case you need to register the webhook address the page shows in your Stripe dashboard, with the events it lists. Whenever you can, use **Connect with Stripe**.
