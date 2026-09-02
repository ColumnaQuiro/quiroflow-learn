---
title: Connecting Stripe
description: Connect Stripe to take card payments, save cards on file, and enable autopay.
collection: settings
order: 2
---

Go to **Settings &rarr; Payments (Stripe)**. Stripe powers every card feature in QuiroFlow: taking a payment by card, saving a [patient's card](/articles/billing-payments/adding-a-patients-card), and autopay for packages and memberships. Nothing card-related works until this is connected -- cash and account-credit payments are unaffected either way.

![Payments settings page with a one-click Connect with Stripe button](/screenshots/settings-payments.png)

## Connecting

Select **Connect with Stripe** -- one click, no API keys to find or copy. This walks you through Stripe's own onboarding flow (or links an existing Stripe account if you already have one), and brings you back to QuiroFlow once it's done. Once connected, you'll see your Stripe account ID and a **Test connection** option to confirm it's working before you rely on it for real payments.

If you don't have a Stripe account yet, one is created for you as part of this flow -- there's no need to set one up separately beforehand.

## Disconnecting

There's a **Disconnect** option if you ever need to unlink it -- existing invoices and payment history aren't affected, but no new card charges can be taken until you reconnect. This includes autopay: any scheduled installment or membership renewal relying on a saved card will fail silently until Stripe is reconnected, so don't disconnect casually if you have active autopay schedules running.

## Legacy path

If you already have your own Stripe API keys and prefer to paste them in directly instead of connecting through Stripe, that option is still available -- look for **advanced setup**. This path also requires manually registering a webhook URL in your own Stripe dashboard, listening for a specific set of events (Settings shows the exact list and URL to use). Prefer **Connect with Stripe** when possible -- it handles all of this automatically, including keeping the webhook configuration current if QuiroFlow's requirements change.
