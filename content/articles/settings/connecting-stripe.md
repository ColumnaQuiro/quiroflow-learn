---
title: Connecting Stripe
description: Connect Stripe to take card payments, save cards on file, and enable autopay.
collection: settings
order: 2
---

Go to **Settings &rarr; Payments (Stripe)**. Stripe powers every card feature in QuiroFlow: taking a payment by card, saving a [patient's card](/articles/billing-payments/adding-a-patients-card), and autopay for packages and memberships.

## Connecting

Select **Connect with Stripe** -- one click, no API keys to find or copy. Once connected, you'll see your Stripe account ID and a **Test connection** option to confirm it's working.

![Payments settings page with a one-click Connect with Stripe button](/screenshots/settings-payments.png)

There's also a **Disconnect** option if you ever need to unlink it (existing invoices and payment history aren't affected, but no new card charges can be taken until you reconnect).

## Legacy path

If you already have your own Stripe API keys and prefer to paste them in directly instead of connecting through Stripe, that option is still available -- look for the legacy form. This path also requires manually registering a webhook URL in your own Stripe dashboard, listening for a specific set of events (Settings shows the exact list and URL to use). Prefer **Connect with Stripe** when possible -- it handles all of this automatically.
