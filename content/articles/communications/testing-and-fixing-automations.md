---
title: Testing and checking an automation
description: Send yourself a test, run it in test mode without sending anything, follow each patient's journey and retry a step that failed.
collection: communications
order: 8
---

Before switching an automation on it's worth seeing what it will send, and afterwards, checking it does what you expected. QuiroFlow has three ways to try one safely and two tabs to review it: **People** (where each patient is) and **History** (everything it has done).

You need the **Communication and Growth** permission. WhatsApp figures also need **Inbox**.

## Sending yourself a test

::help-video{clip="automations--send-test" caption="Sending a test to your own WhatsApp"}
::

1. In the automation editor, click **Send test**.
2. Type **Your WhatsApp number**. Email steps go to the email address you sign in to QuiroFlow with.
3. Click **Send**.

Every message step on screen, saved or not, is sent to you. Waits and conditions are skipped.

> **Good to know:** a test is not a real patient, so document links won't work. To check those, launch it for a real patient.

## Test mode: running it without sending anything

Under **Settings › Test mode**, turn on **Record without sending**. The automation runs for real (it picks the people, fills in the template, follows every step) but records what it would have sent instead of sending it. The messages appear in **History** and in the Inbox marked as not sent, and webhooks are not called. The **Test mode** tag shows at the top until you turn it off.

When switching on a group, **Try first (test mode)** does the same for that group.

## Launching it for one patient

Under **Settings**, click **Launch for one patient…**, search by name and click **Launch**. They enter the first step right now, as if the trigger had happened. Their marketing consent and "do not contact" are respected. The automation must be switched on.

## People: where everyone is

::help-video{clip="automations--person-journey" caption="Following a patient's journey through an automation"}
::

The **People** tab lists everyone who has been through the automation: **In progress**, **Finished**, **Left** and **Failed**. For each one you see **Where they are**, **Since** when and what comes **Next**. Click a row to see **Their journey**: each step, when it happened and each message's status (**Sent**, **Delivered**, **Read**, **Opened**, **Recorded (test mode)**…).

"Left" are those who stopped qualifying: they asked not to be contacted, their record was deleted, or they booked and the automation ends on booking.

From the journey you can also **Skip to the next** step, **Take out** the person, or open the conversation with **Open in Inbox**.

## Fixing a failure

If a step couldn't be done (a number with no WhatsApp, say, or a template Meta paused), the automation shows "N failed" in the list and appears under the **With failures** filter.

1. Open the automation and go to **People › Failed**.
2. Click the person: you'll see "This step could not be done:" and the reason.
3. Fix the cause (choose another template, correct the number on their record).
4. Click **Retry this step**. Anything already sent is not sent again.

## History

**History** shows everything the automation has done and its message figures for the last 30 days: sent, delivered, read and failed, and for email, opened, clicked and bounced.
