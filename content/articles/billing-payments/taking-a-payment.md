---
title: Taking a payment
description: Record a payment against an outstanding invoice.
collection: billing-payments
order: 3
---

On a patient's **Billing** tab, select **Take payment**.

![Account Ledger showing an invoice and a partial card payment against it, with €200.00 still outstanding](/screenshots/patient-billing.png)

1. Choose which **invoice** to apply the payment to -- it defaults to the oldest unpaid one, with its full amount pre-filled.
2. Adjust the **amount** if the patient is only paying part of it.
3. Choose the **method**: Cash, Card, or Credit (using the patient's own account credit balance -- capped at what's actually available).
4. Confirm to record it.

The invoice updates to **Paid** automatically once payments against it add up to the full amount; otherwise it stays partially outstanding, and **Take payment** can be used again later to bring the balance down further.

If a patient has no unpaid invoices, **Take payment** has nothing to apply against and won't offer any -- this is expected right after selling a package or membership paid in full, since that already creates and settles its own invoice for the amount collected at the time.

## Adding credit instead

If a patient has overpaid, or you want to add a balance they can draw down later (a refund kept on account, for example), use **Add credit** instead of Take payment -- that adds to their account credit rather than applying to a specific invoice. Account credit shows up as a payment method option the next time you sell a package, take a payment, or the patient checks out from an appointment, so it's a convenient way to handle refunds without an actual bank transfer.

## Where payments show up afterward

Every payment, credit, and invoice appears in the **Account Ledger** on the same Billing tab, in date order with a running balance -- this is the definitive record if a patient (or your accountant) asks "what did we actually charge and when." It's also what **Reports** pulls from for revenue and outstanding-balance figures, so keeping payments recorded here as they happen (rather than tracked separately on paper) keeps your reporting accurate.
