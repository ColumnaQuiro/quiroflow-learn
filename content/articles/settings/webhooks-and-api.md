---
title: API and webhooks
description: Connect QuiroFlow with other programs -- API tokens with limited permissions, and webhooks that tell another system when something changes.
collection: settings
order: 9
---

If you use other tools (a booking widget on your website, an ads form, n8n or Zapier, your own scripts), you can connect them to QuiroFlow in two ways:

- **API & Tokens**: another program **asks** QuiroFlow (reads patients, books appointments…) with a token that can only do what you allow it.
- **Webhooks**: QuiroFlow **tells** another program as soon as something happens (a new patient, an appointment created, a receipt paid).

Both pages are in **Settings › Developers** and need the **Developer API** permission. The full technical documentation (in English) opens with the **API docs** button on the **API & Tokens** page.

## Creating an API token

::help-video{clip="settings--api-token" caption="Creating an API token with limited permissions"}
::

1. Go to **Settings › API & Tokens** and click **New token**.
2. Give it a **Name** that says what it's for (for example, "Booking widget").
3. Choose when it **Expires**: **Never**, **In 30 days**, **In 90 days** or **In a year**.
4. Under **What it can do**, tick only what the integration needs:
   - **Read patients and their contact details**
   - **Create and update patients**
   - **Read appointments and availability**
   - **Book, reschedule and cancel appointments**
   - **Read clinics, practitioners, appointment types and services**
   - **Read invoices and payments**
   - **Create leads from an external form or ad platform**
   - **Send WhatsApp messages as the clinic**
   - **Forward incoming WhatsApp webhooks to this clinic**
5. If you like, fill in **Who built it (optional)**: the integration's name and the developer's contact.
6. Click **Create token**.
7. **Copy the token now; it is not shown again.** appears. Click **Copy**, paste it into the other tool and click **Done**.

> **Good to know:** treat the token like a password: whoever has it can read and write the data you've allowed it, without signing in. Create one per integration, so you can revoke each one separately.

In the **Tokens** table you see what each one **Can** do, its **Last used** and when it **Expires** (or **Expired**). **Quick start** shows an example call for whoever will build the integration.

## Revoking a token

Click **Revoke** and confirm with **Revoke token**. Anything using it stops working straight away, and it can't be reactivated: you'd have to create a new one.

## Seeing API activity

**Recent requests** shows the last 30 calls made with your clinic's tokens: **When**, **Request**, **Result** and **Token**. Click **Refresh** to see the latest. It's the first thing to look at when an integration "isn't working".

## Adding a webhook

::help-video{clip="settings--webhook" caption="Adding a webhook that notifies when an appointment is created"}
::

1. Go to **Settings › Webhooks** and click **Add endpoint**.
2. Under **Address**, paste the full address the other tool gave you (it has to start with https://).
3. Under **Send when**, tick the events it's interested in:
   - **Patients**: **Created**, **Updated**, **Deleted**
   - **Appointments**: **Created**, **Updated**, **Deleted**, **Checked in**
   - **Receipts**: **Paid**
4. Click **Add endpoint**.

From then on, QuiroFlow sends a notification (a POST) to that address every time one of those events happens.

## Managing a webhook

On each endpoint's card:

- The **Sending** switch pauses or resumes the notifications without deleting anything.
- **Signing secret**: **Show**, **Hide** or **Copy**. Whoever builds the integration needs it to check that the notifications really come from QuiroFlow (the technical explanation is in **Checking a request came from QuiroFlow**).
- **What was sent**: the record of what has been sent and what the other tool replied. Click a row to see the content.
- **Change** the address or the events, or **Delete** the endpoint (its record is deleted with it).
