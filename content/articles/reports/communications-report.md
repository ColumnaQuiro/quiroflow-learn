---
title: Communications
description: The record of every message sent to patients and leads, by WhatsApp, email, the app or push notification, with its status.
collection: reports
order: 11
---

**Communications** is the record of everything the clinic has sent to patients and leads, in a single list: WhatsApp, emails, in-app messages, push notifications and Instagram, Messenger or website chats. It's there to answer "did the reminder reach them?" or "what did we send them last week?". You'll find it under **Reports › Operations**.

::help-video{clip="reports--communications" caption="Finding a patient's messages and filtering by channel and status"}
::

## Finding a message

1. Open **Reports › Communications**. It shows **This month**, from newest to oldest.
2. Type in **Search by name, recipient or message**: a name, a phone number, an email or a word from the text.
3. Narrow it down with the dropdowns:
   - **All channels**: WhatsApp, Instagram, Messenger, **Website chat**, **Email**, **In-app message** or **Push notification**.
   - **All types**: **Confirmation**, **Reminder**, **Recall**, **Automation**, **Announcement**, **Message**, **Exercises**, **Appointment** or **General**.
   - **Any status**: **Sent**, **Delivered**, **Read**, **Failed**, **Bounced**, **Marked as spam** or **No device**.
4. Change the period if you're looking for something older.
5. Move between pages with **Previous** and **Next**; at the top it says "Showing 1–50 of N".

## What each status means

- **Sent**: it left QuiroFlow, but there's no confirmation yet that it arrived.
- **Delivered**: it reached the phone or the inbox.
- **Read**: the patient opened it (WhatsApp reports this; email doesn't always).
- **Failed**: it couldn't be sent. On WhatsApp this is usually a mistyped number or one without a WhatsApp account.
- **Bounced**: the email address doesn't exist or it rejected the message.
- **Marked as spam**: the patient marked the email as spam.
- **No device**: a push notification to someone who doesn't have the app installed on any device.

An announcement sent to all patients with the app appears only once, with "Everyone with the app" or "N patients" as the recipient.

> **Good to know:** each channel follows its own permission. If your role doesn't have **Inbox**, WhatsApp messages don't appear in your list; emails and notifications follow your role's patient scope. Communications doesn't appear for roles with **Only their own figures**.

> **Good to know:** test sends from automations (in test mode) don't show up here, because they were never sent.

To see only whether the appointments' WhatsApp reminders arrived and who confirmed, use [Scheduled reminders](/articles/reports/the-scheduled-reminders-report).
