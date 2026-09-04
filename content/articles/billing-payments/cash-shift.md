---
title: Cash shifts
description: Reconcile the physical cash in your drawer against what QuiroFlow recorded.
collection: billing-payments
order: 4
---

If your front desk takes cash payments, **Cash Shift** (on the Calendar toolbar) is how you reconcile what's physically in the drawer against what QuiroFlow recorded -- without it, cash is the one payment method with no independent record to check against.

::image-carousel
---
images:
  - src: /screenshots/cash-shift-modal.png
    alt: Cash Shift panel showing invoiced and collected totals, a cash drawer breakdown, and a form to log cash in or out
    caption: "Today's shift -- collected totals and the drawer breakdown"
---
::

## How a shift works

A shift runs automatically from 00:00 and rolls over into the next day on its own -- there's no "start shift" step to remember. Select **Cash Shift** at any point during the day to see where things stand so far:

- **Invoiced this shift** -- the total value of invoices created today, across all payment methods.
- **Total collected** -- what's actually been paid today, which can be less than invoiced if some of today's invoices are still outstanding.
- **Cash** -- just the cash portion of what's been collected.

## The cash drawer breakdown

- **Cash payments** -- cash collected from patient payments specifically.
- **Cash in** -- any other cash added to the drawer (a float top-up, for example).
- **Cash out** -- cash removed (a bank drop, petty cash, change given from the till for a non-payment reason).
- **Expected in drawer** -- the running total QuiroFlow expects to physically be there, combining all three.

Use the **Type / Amount / Note** form to log a cash-in or cash-out event as it happens -- a bank drop at midday, for instance -- so the expected total stays accurate for the rest of the shift rather than only being right at open and close.

## Closing a shift

You don't need to close a shift for it to roll over -- it closes itself into the next day automatically. Only use **Close Shift** if you want to leave an end-of-day note (a discrepancy explanation, a handover note for the next person opening the drawer) attached to that specific day's record.

## When the numbers don't match

If the physical cash in the drawer doesn't match **Expected in drawer**, log the difference as a **Cash out** (for a shortfall) or **Cash in** (for an overage) with a note explaining why, rather than leaving it unreconciled -- that keeps the discrepancy visible and dated instead of it just quietly not adding up next time someone checks.
