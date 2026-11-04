---
title: Memberships
description: Create recurring plans, sign a patient up and keep track of every paid period, by hand or with autopay.
collection: billing-payments
order: 5
---

A membership is a plan the patient pays periodically, for example a "Mantenimiento mensual" at 49 € a month. Unlike a [bono](/articles/billing-payments/selling-a-package-bono), it has no number of sessions: it is paid every period while it is active. You create plans in **Settings › Memberships** and activate them from the patient's **Money** tab.

You need the **Sell and edit bonos and memberships** permission to activate them for a patient.

## Creating a plan

::help-video{clip="billing--membership-plan" caption="Creating a monthly membership plan"}
::

1. Go to **Settings › Memberships**.
2. Click **New plan**.
3. Enter the **Name**, the **Price (€)** and, under **Every**, how often it is paid: **Week**, **Month**, **3 months**, **6 months** or **Year**.
4. Click **Create plan**.

At the top you'll see **Active members** and **Recurring each month**. To retire a plan, open it and click **Stop offering**.

> **Good to know:** changing or removing a plan only affects patients who sign up from now on. Those who already have it keep their price until you end it on their record.

## Activating a membership for a patient

::help-video{clip="billing--membership-activate" caption="Activating a membership and collecting the first month"}
::

1. On the patient's **Money** tab, under **Memberships**, open **Activate a membership…** and pick the plan.
2. Under **Paid now (€)**, enter what they pay today (for example, the first month).
3. If they pay something, choose the **Method**.
4. Click **Activate**.

The membership appears with its price per period and the date it started. Every membership payment issues a full factura.

## Recording each period

If the patient pays each period at the clinic:

- Click **Log payment** on the membership when they pay.
- Click **Log failed** if a period wasn't paid, so there is a record of it.

Each period is listed below with its status.

If you'd rather it charged itself, save a card for the patient and click **Set up autopay**: set **Every** (it comes filled in with the plan's period) and click **Start**. See [Saved card, autopay and online payment](/articles/billing-payments/adding-a-patients-card).

## Pausing or cancelling

With the membership's status selector you can set it to **paused** or **cancelled**, and back to **active**. Its history is kept.

> **Good to know:** a summary of all the clinic's memberships, with failed payments, is under **Reports › Memberships**.
