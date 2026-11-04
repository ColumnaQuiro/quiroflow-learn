---
title: Automations
description: Messages and tasks that go out on their own after an appointment, on a birthday or when an invoice is unpaid, built as a flow of steps.
collection: communications
order: 6
---

An **automation** is a message (or a series of steps) QuiroFlow sends on its own when something happens: an appointment is booked, a patient doesn't turn up, someone has a birthday, an invoice has gone unpaid for days. Each one has a trigger (**When…**) and a flow of steps beneath it: send a WhatsApp or an email, wait, decide based on the patient's details, add a tag or notify someone on the team.

They live in **Patients › Automations** and are available on every plan; lead automations need Growth. You need the **Communication and Growth** permission.

## Starting from a template

The quickest way is to start from one of the templates, written for a chiropractic clinic. They're created paused and filled in with your clinic's details, so you review them before switching them on.

::help-video{clip="automations--from-template" caption="Creating the 24-hour reminder from a template and switching it on"}
::

1. In **Automations**, click **Templates**.
2. Pick one, for example **Recordatorio 24 h** (24 h reminder). It opens in the editor, paused.
3. Click the WhatsApp step and choose the template to send under **Template approved by Meta**.
4. Click **Save changes**.
5. Turn on the switch next to the name. You'll see "Switched on".

Some of the templates available:

- **24 h reminder**: with buttons to confirm or change.
- **First visit welcome**: what to bring, how to get there and the form, when they book.
- **Win back after the visit**: if they have no next appointment in 2 days, a WhatsApp; if they haven't booked in 7 days, a heads-up for the front desk.
- **Second visit pending**, **Maintenance: 3 months away**, **Reactivation: 6 to 12 months** and **Unfinished care plans**: to win back patients who stopped coming.
- **Did not attend**, **Payment reminder** and **Birthday**.
- **Ask for a review** and **How did we do?**: see [Reputation and Google reviews](/articles/growth/reputation).
- **Ad lead** (Growth): a reply within minutes to whoever fills in one of your ad forms.
- Under **Patient emails**, single-step emails: first visit booked, report ready, end of care plan, birthday…

In the Spanish interface (as in the clip) the templates have their Spanish names. If you already have one with the same name, the template shows "already added". **Start blank** opens an empty automation.

## Building one from scratch

1. Click **New automation** and name it in **Automation name**.
2. In the trigger, choose **When…**: for example **Patient's birthday**, **Appointment completed**, **Did not attend**, **Hours before the appointment**, **Invoice unpaid** or **A group of patients**.
3. To narrow it down, add conditions under **Only if** (appointment type, practitioner, new patient, number of visits…).
4. Click the **+** under the trigger and pick a step: **WhatsApp**, **Email**, **Wait**, **Wait until…**, **If / else**, **Add or remove a tag**, **Notify someone on the team** or **Webhook**.
5. Set the step up in the side panel. For a WhatsApp, choose the template and what goes in each variable (the patient's first name, the appointment date and time, the online booking link…). For an email, write the **Subject** and **Message**.
6. Keep adding steps with the **+** between them until the **End**.
7. Click **Save changes** and turn on the switch.

If something is missing when you switch it on (a WhatsApp step with no template, say), QuiroFlow tells you with "Something is missing before it can run" and takes you to the step.

> **Good to know:** every WhatsApp step needs a template approved by Meta. See [Connecting WhatsApp and choosing templates](/articles/communications/connecting-whatsapp).

> **Good to know:** the editor is for a tablet or computer. On a phone, automations are shown as a list of steps.

## Waits and paths

- **Wait**: a fixed time (minutes, hours or days) before the next step.
- **Wait until…**: waits for the patient to book an appointment, reply on WhatsApp, pay what they owe, open or click the email, check in or complete a form, up to a limit. It goes one way if that happens and another if time runs out.
- **If / else**: splits the flow in two based on the patient's details (for example, whether a **Future appointment** exists).

On the canvas, each step shows its own figures: how many were sent and read, how many went **Yes** and **No**, how many are waiting.

## Each automation's settings

On the editor's **Settings** tab:

- **Leave before the end**: the person leaves the automation as soon as they **Books an appointment** or **Replies on WhatsApp** (or, for lead automations, **Becomes a patient (leads)**), whatever step they're on.
- **When it sends**: messages never go out at night. You choose the days and hours (by default 10:00 to 20:00, Monday to Saturday); anything due outside that window waits for the next slot.
- **Marketing**: tick **It is a marketing message** if it's promotional. Each channel then only reaches patients who accepted it. See [Marketing consent and unsubscribing](/articles/communications/marketing-consent-and-unsubscribe).
- **If they are already inside** (on the trigger): **Enters again (once per trigger)**, **Not until they have finished** or **Only once, ever**.

## Pausing or deleting

Turn the switch off to pause it: nobody new enters, and people already inside wait at their step until you resume it. Under **Settings › Pause or delete** you can **Delete automation**; people inside leave, and messages already sent stay as they were.

## The automations list

Each row shows whether it's on, its tags (**Growth**, **Marketing**, **Test mode**) and its figures: **inside now**, **entered · 30 days** and the messages sent, read or emails opened. The **Active**, **Paused**, **Patients**, **Leads** and **With failures** filters help you find the one you want.

To message a group of patients once, see [Messaging a group of patients](/articles/communications/sending-to-a-group). To try one without sending anything and to fix failures, see [Testing and checking an automation](/articles/communications/testing-and-fixing-automations).

> **Good to know:** if a lead automation loses Growth, it's paused and kept exactly as it is ("Paused · no Growth"). It works again as soon as Growth is on.
