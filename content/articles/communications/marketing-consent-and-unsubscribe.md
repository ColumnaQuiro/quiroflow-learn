---
title: Marketing consent and unsubscribing
description: Who receives marketing messages, how a patient unsubscribes, and which WhatsApp replies stop messages going out.
collection: communications
order: 9
---

Not every message is the same. An appointment confirmation or reminder is part of the patient's care and always reaches them (unless they're marked **Do not contact**). A promotional message, such as a birthday greeting with a discount or an offer, is **marketing** and only reaches patients who accepted it. QuiroFlow applies that difference on every send.

## What each patient has accepted

On the patient's record, **Marketing channels** shows which channels they accept marketing on (WhatsApp, email…). The front desk can tick it when registering them or after talking to them.

Also on the record:

- **Do not contact** blocks all communications and recalls.
- Minors are never included in messages to groups.

## Marking an automation as marketing

In the automation, under **Settings › Marketing**, tick **It is a marketing message**. From then on each channel only reaches patients who accepted it under **Marketing channels**; the rest carry on through the automation without being sent anything. Reminders and confirmations are not marketing.

When you switch on a marketing message to a group, QuiroFlow first tells you how many accepted WhatsApp and how many email. See [Messaging a group of patients](/articles/communications/sending-to-a-group).

> **Good to know:** if you choose a WhatsApp template that Meta classes as Marketing, the editor reminds you to mark the automation as marketing.

> **Good to know:** the automations that win patients back (**Second visit pending**, **Maintenance**, **Reactivation**, **Unfinished care plans**) are not marketing: they go out as part of the patient's care, so consent isn't checked. Even so, anyone can ask you to stop by replying, as explained below.

## Unsubscribing by email

Every marketing email has an unsubscribe link at the bottom. When the patient opens it they see "Unsubscribe?" and that they'll stop receiving promotional emails from your clinic, while messages about their appointments (confirmations and reminders) keep coming. They click **Unsubscribe me** and that's it: email is removed from their **Marketing channels**. You don't need to do anything.

## Replying on WhatsApp

QuiroFlow reads some WhatsApp replies and acts on them by itself:

- **"No, gracias"**, **BAJA** or **STOP**: the patient is marked "do not contact" and the automations they were in end.
- **"Más adelante"** (to a recall message): they're parked for two months and don't get that recall again until then.

The conversation stays visible in the [Inbox](/articles/communications/the-shared-inbox), in case you want to answer.

## Contacts from ads

Someone who fills in a form from your Facebook or Instagram ads has consent if the form itself asks for it, or if you turn on in **Settings › Leads** that submitting the form counts as consent (only if your form's privacy text says so). See [Lead settings and Facebook lead ads](/articles/growth/lead-settings).
