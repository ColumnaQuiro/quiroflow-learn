---
title: Appointment stages and the appointment panel
description: What each appointment stage means, how a visit moves from one to the next, and what you can do from the panel that opens when you click it.
collection: calendar-appointments
order: 3
---

Every visit has a single stage that says where the patient is: whether they've confirmed, arrived, gone in, still need to pay or are done. You see that same stage on the calendar block, on the card that appears when you hover, in the counts row, in the appointment panel and in the [flow tracker](/articles/calendar-appointments/flow-tracker), so they never disagree.

## The stages

| Stage | Block border | When |
|---|---|---|
| **Unconfirmed** | Dashed | A confirmation or reminder was sent and the patient hasn't replied. |
| **Online · unconfirmed** | Dashed | The patient booked online and it isn't confirmed yet. |
| **Wants to move** | Dashed, amber | The patient replied asking to change it. |
| **Confirmed** | Solid | The patient replied yes, someone clicked **Mark as confirmed**, or no confirmation was ever asked for. |
| **Arrived** (with the time) | Solid | The front desk checked them in, or the patient did it themselves on the tablet or with "I'm here". |
| **In session** | Solid | Someone clicked **Into session**, or the practitioner opened the visit on My Day. |
| **To pay** | Solid | Someone clicked **To checkout**. |
| **Done** | Faded | The visit was charged, marked **Done, nothing to charge**, signed off on My Day or marked as attended in a class. |
| **No-show** | Grey | Someone clicked **No-show**. |
| **Cancelled** | Leaves the calendar | Cancelled at the desk, by the patient replying to cancel or from their app or portal, or by an unplanned absence. |

The rule for reading the calendar at a glance: **a dashed border is a visit that isn't firm yet**, and **red only ever means money owed**. The **Stage key**, at the bottom of the calendar's left panel, reminds you.

> **Good to know:** a visit booked at the desk without asking for confirmation shows straight away as **Confirmed**. It only becomes **Unconfirmed** when a message asking for a reply is sent.

## How patients reply on WhatsApp

When a patient answers the confirmation or the reminder, QuiroFlow reads the reply:

- If it starts with "yes", "ok", "confirm" (or the Spanish or French equivalent, such as "sí", "vale", "confirmo"), the visit becomes **Confirmed**.
- If it starts with "cancel" (or "cancelar", "anular"…), **the visit is cancelled**, with no fee, and the waitlist is offered the slot where that applies.
- If it talks about changing, rescheduling, postponing or moving the visit, it becomes **Wants to move**. It doesn't count when what they want to change is something else, such as their email or phone.
- Anything else changes nothing: your team reads it in the [inbox](/articles/communications/the-shared-inbox).

An answer already on record isn't lost to a later message. And once the patient is in the building, what they said before stops counting: someone who asked to move and then turned up shows as **Arrived**.

## Open a visit

Click a block (or press **Enter** on it) and the appointment panel opens on the right (full screen on a phone). At the top you see the name, type, time, practitioner, room, how many visits they've had and whether they have a next one, plus **Chart** to open their record. It has three tabs:

- **Summary**: where it stands, alerts, money, notes, messages sent and documents.
- **Billing**: charge the visit, use a bono or send the receipt (see [Taking a payment](/articles/billing-payments/taking-a-payment)). A red dot means it still needs charging.
- **History**: everything that has happened to the visit, and who did it: booked (at the desk, online or by the AI receptionist), messages sent, moved, arrived, into session, to checkout, cancelled, no-show, done or undone, and changes of time, practitioner, room or type.

## Take the patient from arrival to payment

::help-video{clip="calendar--check-in-to-checkout" caption="Checking in, into session, to checkout and charging"}
::

On **Summary**, the **Where it stands** section shows a five-step track: **Unconfirmed** or **Confirmed** → **Arrived** → **In session** → **To pay** → **Done**. The main button is always the next step:

1. When the patient arrives, click **Check in**.
2. When they go in with the practitioner, click **Into session**.
3. When they come out, click **To checkout**.
4. Click **Charge**: the **Billing** tab opens. Once charged, the visit is **Done**.

When there's nothing to charge (a courtesy visit, say), **To pay** offers **Done, nothing to charge**. You can skip steps: the visit lands on the latest one you mark. With a visit open, the `a` key takes the next step and `p` opens **Billing**.

> **Good to know:** **Check in** sets off any "checked in" automations your clinic has.

## Confirm by hand

::help-video{clip="calendar--mark-confirmed" caption="Marking as confirmed a visit the patient confirmed by phone"}
::

When a patient confirms by phone or at the desk:

1. Open the visit (it has a dashed border).
2. Click **Mark as confirmed**.

The block's border turns solid.

## Undo a step

::help-video{clip="calendar--undo-step" caption="Undoing a check-in made by mistake"}
::

Next to the main button is the one that undoes the last step: **Undo arrival**, **Undo session** or **Undo checkout**. The visit goes back one step.

A visit that's already **Done** can be reopened with **Undo visit**. It asks "Undo this visit?": it stops being marked done and goes back to the step it was on. If it was paid with a bono, the session goes back to the bono and its charge is voided.

> **Good to know:** a visit paid with money can't be undone here: "This visit has a payment recorded, so it can't be undone here. Refund the payment from the patient's Money tab first."

## What else is on Summary

- **Red flags**, **For the team** (the appointment type's note), tags and pending forms, with **See forms**. Without access to clinical notes, red flags only say "On the clinical record. Let the practitioner know."
- **Money**: **This visit** (paid, not paid, the bono it uses…) and **Patient balance** (**Owes**, with a button to collect it; credit available; or **Nothing owed**).
- **Notes**: the "Patient note · shows on every appointment" and the "Note for this visit". Both save by themselves.
- **Messages sent**: when the **Confirmation**, **Reminder** and **Same-day info** went out.
- **Documents**: once the patient has arrived, **Certificate of attendance** opens a printable certificate.

If the visit is part of a care plan you'll see "Visit N of the plan". If it was booked as a different type from the one the plan asks for, a warning appears with a **Change to** button for the right type.

At the bottom of the panel are **Cancel appointment…**, **No-show** and **Move…**: see [Moving and cancelling appointments](/articles/calendar-appointments/moving-and-cancelling).
