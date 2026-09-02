---
title: Sending campaigns
description: Automatically message patients around events like birthdays, bookings, or completed visits -- with audience targeting, marketing consent, and WhatsApp, email, or webhook actions.
collection: communications
order: 3
---

**Campaigns** lets you set up messages (WhatsApp, email, or a webhook) that fire automatically around something happening in the clinic, target them to the right patients, and send a one-off broadcast when you need to.

## Automatic campaigns: trigger + audience + actions

Each campaign is a rule with three parts:

### 1. When this happens (the trigger)

- Appointment booked, checked in, completed, cancelled, marked as missed, or rescheduled
- Day of appointment (a fixed morning send, around 9am, for anyone booked that day)
- **X hours before appointment** -- pick any number of hours yourself. Want a reminder at 3 days *and* one at 24 hours? Create two campaigns on this trigger with different values.
- Invoice paid
- Patient's birthday (checked once a day)
- Membership started, cancelled, or a membership payment processed

Leave the trigger unset entirely to make a campaign **manual-only** -- it never fires on its own, only when you select **Send now**.

### 2. Only when (the audience)

![New campaign panel with the trigger set to "Appointment completed" and audience filters for appointment type and visit count](/screenshots/campaigns-new-top.png)

Narrow a trigger down to the patients it should actually apply to:

- **Appointment type** -- only fire for a specific type (e.g. only "New Patient Exam").
- **Visit count** -- the patient's total *completed* visits of that type. `1` means the first time it's ever completed for them -- ideal for a "how was your first adjustment?" follow-up that shouldn't repeat on every visit.
- **Only for first-time patients** -- no other appointments at all, past or future, for that patient anywhere in the account.

### 3. Then do this (the actions)

A campaign can have more than one action -- WhatsApp *and* email on the same trigger, for instance. Three action types:

- **WhatsApp template** -- pick from your account's actually-approved Meta templates (fetched live), optionally attach a document template as one of the variables, and map each numbered placeholder in the template to a source: first name, last name, email, appointment date, appointment time, or fixed text.

  ![WhatsApp template action with a "Document" slot and an ordered list of template variables](/screenshots/campaigns-new-actions.png)

- **Email** -- your own subject and rich-text body, with click-to-insert merge fields (First name, Last name, Email) and support for images.

  ![Email action with a merge-field subject, rich text toolbar, and Marketing message enabled for a birthday campaign](/screenshots/campaigns-email-action.png)

- **Webhook** -- POSTs to any URL you provide, with an optional signing secret. This is the integration point for Zapier, Make, or anything custom you want to trigger off clinic events.

## Marketing consent

Every campaign has a **Marketing message** toggle. Turn it on for promotional content -- offers, birthday greetings -- and it only reaches patients who've explicitly opted that channel in under **Marketing channels** on their own profile. Leave it off for transactional messages tied to a specific appointment or invoice, which don't need separate marketing consent. The birthday trigger nudges you to turn it on, since a birthday greeting is a textbook marketing message rather than a transactional one.

## Testing before you go live

Every campaign has **Send test to me** -- enter your own WhatsApp number and see exactly what a patient would receive, before enabling the campaign for real.

## Sending one now

Select **Send now** from the campaign list to message a group of patients immediately, outside of any trigger -- useful for a one-off announcement (a holiday closure, a new service) rather than an ongoing automated rule. A campaign with no trigger set is built specifically for this.

## Where these get logged

Every campaign send is recorded the same way as any other WhatsApp message, so it shows up in that patient's **Communications** tab and in the shared **Inbox**.
