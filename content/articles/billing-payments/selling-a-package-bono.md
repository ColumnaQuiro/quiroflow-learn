---
title: Selling a package (bono) to a patient
description: Sell a prepaid session package and record how it was paid.
collection: billing-payments
order: 1
---

Packages -- also called *bonos* -- let a patient prepay for a set number of sessions at a fixed price. Set up your package templates first in **Settings &rarr; Packages**, with the session count and price each one sells for.

::image-carousel
---
images:
  - src: /screenshots/sell-package-filled.png
    alt: Packages / bonos section with a package chosen from the dropdown, Paid now amount, and Method set to Cash
    caption: "Pick a package, set how much is being paid now"
  - src: /screenshots/patient-billing.png
    alt: Billing tab showing the Packages / bonos section with a purchased 10-Session Wellness Package and the Sell a package… dropdown
    caption: "Once sold, it shows sessions used and remaining"
---
::

## Selling one

On a patient's **Billing** tab, find the **Packages / bonos** section:

1. Choose the package from the **Sell a package…** dropdown -- it shows the session count and price.
2. Enter **Paid now (€)** -- the amount actually collected today. This defaults to the full price, but you can lower it if the patient is paying in installments or putting down a deposit.
3. Choose the **Method**: Cash, Card, or Credit on account (only shown if the patient has account credit available).
4. Select **Sell**.

The package appears in the patient's **Packages / bonos** list immediately, showing the full session count as available to use -- all sessions are unlocked as soon as the package is sold, regardless of how much of the price has actually been paid. An invoice is created for whatever amount was entered in **Paid now**, and it's marked paid right away for that amount.

## Partial payments and autopay

If **Paid now** is less than the package's full price, the difference isn't automatically tracked as a separate due invoice waiting to be chased -- QuiroFlow doesn't nag the patient or flag it as outstanding on its own. Instead, the practical way to collect the rest is:

1. Add a card to the patient (see [Adding a patient's card](/articles/billing-payments/adding-a-patients-card)).
2. Once a card is on file, the package's line in **Packages / bonos** offers to schedule the remaining balance via Stripe autopay -- QuiroFlow then charges the card automatically on the schedule you set, instead of you chasing the balance manually.

If you'd rather not use autopay, you can also come back later and record another payment against the patient the same way (via **Add credit** or a fresh charge), just without it being tied to a specific "amount owed on this package" figure -- keep your own note of what's expected if you're not using a card and autopay for it.

## Logging a session

Each time the patient comes in and uses a session from their package, select **Log session** next to the package to decrement the remaining count. This is separate from marking their appointment Completed -- do both so the package balance and the visit history stay in sync.
