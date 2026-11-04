---
title: Messaging a group of patients
description: Use the "A group of patients" trigger to write once, or every week, to everyone who matches a set of filters.
collection: communications
order: 7
---

To write to a group of patients (those who haven't been in for six months, those halfway through a bono, everyone at one clinic) you use an automation with the **A group of patients** trigger. You choose the filters, see how many match today and decide whether it goes out once or repeats. This is what used to be called a "campaign".

You need the **Communication and Growth** permission.

## Sending once to a group

::help-video{clip="automations--group-message" caption="An email to patients not seen for six months, tried first in test mode"}
::

1. In **Patients › Automations**, click **New automation** and name it.
2. Under **When…**, choose **A group of patients**.
3. Under **How often**, choose **Once** (**Repeats** is selected by default). Under **When**, choose **When switched on** or **On a date**.
4. Under **Patients who**, add the filters: for example **Last visit** more than 180 days ago and no **Future appointment**. Below you'll see "N patients match today."; click **See the list** to check who they are.
5. Click **+** and add the message: an **Email**, or a **WhatsApp** with a template.
6. Click **Save changes** and turn on the switch.
7. QuiroFlow shows the summary in **Switch on a group**: how many will enter and when, and for a marketing message how many accepted each channel. Choose **Try first (test mode)** to see what would happen without sending anything, or **Switch on**.

With **When switched on**, everyone who matches enters at the next check, within 15 minutes.

## Repeating it every day or week

Under **How often**, choose **Repeats** and set **Every** (day or week), the **Day** and the time (**At**). Each time it runs, whoever matches that day enters. At the bottom you decide whether someone can come back: **Only those who have not been through here yet**, or **They can enter again after** N days.

That's how the win-back templates work, such as **Maintenance: 3 months away**: each week, the patients who have just reached that point enter.

## Not overdoing it: "At most, per day"

**At most, per day** caps how many patients enter each day, the most recently seen first; the rest wait for the next day. It keeps a long list from going out in one morning (failed sends count against your WhatsApp number's quality) and keeps the Inbox answerable. Leave it at "no limit" if the group is small.

> **Good to know:** minors and patients marked **Do not contact** never enter a group. If you mark the automation as marketing, each channel only reaches patients who accepted it. See [Marketing consent and unsubscribing](/articles/communications/marketing-consent-and-unsubscribe).

> **Good to know:** WhatsApp needs a Meta-approved template. If the message is promotional, use a Marketing-category template and mark the automation as marketing.

To see afterwards who received it and whether anything failed, see [Testing and checking an automation](/articles/communications/testing-and-fixing-automations).
