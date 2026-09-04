---
title: Selling and managing memberships
description: Recurring plans, billed each period, with autopay once a card is on file.
collection: billing-payments
order: 5
---

A membership is a recurring plan a patient pays for on a schedule -- a monthly maintenance plan, for example -- rather than a fixed number of prepaid sessions like a [package](/articles/billing-payments/selling-a-package-bono). Set up your membership templates first in **Settings -> Memberships**, giving each one a name and a price per period.

::image-carousel
---
images:
  - src: /screenshots/patient-membership-activate.png
    alt: Memberships panel with a plan selected, Paid now amount, and Method set to Cash
    caption: "Activating a membership -- same pattern as selling a package"
  - src: /screenshots/patient-membership-active.png
    alt: Active membership card showing the plan, price per period, start date, status, and Log payment / Log failed controls
    caption: "Once active -- status, and how each period gets paid"
---
::

## Activating one

On a patient's **Billing** tab, find the **Memberships** card:

1. Choose the plan from the dropdown.
2. Adjust **Paid now (€)** if this period's charge differs from the template price.
3. Choose the **Method**: Cash, Card, or Credit on account.
4. Select **Activate**.

The membership card then shows the plan name, price per period, the date it started, and a status badge.

## Keeping it paid each period

Activating a membership doesn't set up automatic recurring billing by itself -- notice the **No card on file -- add one to enable autopay for this membership** prompt on a freshly-activated one. Without a saved card, you (or the patient) need to pay each period manually, and **Log payment** records that it happened. **Log failed** records the opposite -- useful for keeping an accurate history if a period is missed or paid late, rather than the record just silently having a gap.

Add a card (see [Adding a patient's card](/articles/billing-payments/adding-a-patients-card)) to switch this to autopay -- QuiroFlow then charges it automatically each period, the same underlying mechanism packages use for their own remaining-balance autopay.

## Changing status

The status dropdown next to the plan name isn't limited to **active** -- use it to pause or cancel a membership without deleting its record, so the history of what the patient was on (and for how long) stays intact even after it ends.

## Where memberships show up in reporting

**Reports -> Memberships** rolls this up account-wide: active membership count, monthly recurring revenue, and any failed payments -- check it periodically even if you're not actively managing individual memberships day to day, since a failed payment there often just means a patient's card expired and needs updating.
