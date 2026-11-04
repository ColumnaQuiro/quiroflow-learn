---
title: Connecting WhatsApp and choosing templates
description: Connect your clinic's WhatsApp Business number in one click and choose which Meta-approved template each automatic message uses.
collection: communications
order: 1
---

QuiroFlow sends and receives WhatsApp messages from your clinic's own number. You connect it once in **Settings › Communication › WhatsApp**, and from then on confirmations, reminders, automations and replies from the **Inbox** go out from that number. On the same page you choose which Meta-approved template each automatic message uses.

You need the **Open Settings** and **Communication and Growth** permissions.

## Connecting your number

1. Go to **Settings › Communication › WhatsApp**.
2. On the **Connect WhatsApp** card, click **Connect**.
3. A Meta window opens: sign in, pick your business and the WhatsApp Business number you want to use.
4. Back in QuiroFlow you'll see "WhatsApp connected on +34…" and, under **Status**, **Messages can be sent**.

There is nothing to copy across: no Meta app, no tokens. If Meta ever withdraws access, click **Reconnect** on the same card.

> **Good to know:** if your clinic already has its own Meta app, open **Already have your own Meta app? Set it up by hand** and fill in **Phone Number ID**, **WhatsApp Business Account ID**, **Access token** and **Meta App Secret**. On that route the secret is required: without it, patients' replies and delivery status are ignored.

## Choosing the template for each message

WhatsApp only lets a business start a conversation with a template Meta has approved, so each automatic message has its own:

- **Appointment confirmation**: when an appointment is booked.
- **Appointment reminder**: before the appointment, as far ahead as you set in **Messages**.
- **Recall**: pre-selected when staff send a recall from Recalls (it can be changed each time).
- **New booking alert (to staff)**: to the online-booking notify number.
- **New lead alert (to staff)**: to the notify number in **Leads**, with name, phone, email and source.

::help-video{clip="comms--whatsapp-templates" caption="Choosing the template for each automatic message"}
::

1. Under **Message templates**, click **Refresh from Meta** to fetch your approved templates.
2. For each message, open the drop-down and pick the template.
3. Click **Save changes**. **Status** shows how many you have chosen, for example "5 of 5 templates chosen".

A message left on **None -- not sent** does not go out. If a template you chose disappears from Meta, the drop-down marks it "not in Meta's list".

> **Good to know:** templates are created and approved in your Meta account (WhatsApp Manager), not in QuiroFlow. Approval can take from a few minutes to a day, so set them up ahead of time.

> **Good to know:** if the same template is approved in several languages, each patient gets it in their own (the preferred language on their record). Nothing else to set up.

## The 24-hour rule

When a patient writes to you, you have 24 hours to answer with free text from the Inbox. After that, WhatsApp only lets you send an approved template. The Inbox warns you and offers **Send template**; see [The Inbox](/articles/communications/the-shared-inbox).

## On the same page

Below the templates are the other Meta accounts that use this connection: Instagram messages, Facebook Messenger and the chat on your website (see [Instagram, Messenger and your website chat](/articles/communications/instagram-messenger-web-chat)), and **Meta Ads spend**, which lets Growth read what you spent on ads instead of you typing it each month (see [The Growth dashboard](/articles/growth/growth-overview)).
