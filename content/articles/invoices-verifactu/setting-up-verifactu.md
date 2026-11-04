---
title: Setting up VeriFactu
description: Choose when your facturas are sent to the AEAT, who sends them and with which certificate.
collection: invoices-verifactu
order: 3
---

VeriFactu is the AEAT's system under which every factura is recorded, chained to the one before it and sent to the Spanish tax agency. In QuiroFlow, every factura your clinic issues is already recorded and chained from day one. In **Settings › VeriFactu** you decide three things: whether those records go to the AEAT (to its test service or the real one), **who sends them** (you, with your own certificate, or QuiroFlow on your behalf) and, if you send them yourself, with which certificate.

Only the account's owner sees this page (it is tagged **Owners only**).

## Before you start

- Fill in your clinic's legal name and NIF under **Settings › Invoicing › Fiscal data**. Without an NIF nothing is sent: the page says so with "the clinic has no NIF in Invoicing › Fiscal data". See [Invoicing settings](/articles/settings/billing-configuration).
- The date you move to the real service is suggested as **1 January 2027**. Check with your accountant (gestoría) which date applies to you.

## Reading the status

At the top there's a banner with the current status: **Nothing is being sent yet** (with the reason), **VeriFactu is off**, **Sending to the AEAT’s test service** or **Sending to the AEAT**. Below it are four facts: **Company**, **Who sends**, **Certificate** and **Sending**. **See activity** takes you to the AEAT's latest answers.

## Choosing the sending mode

::help-video{clip="invoices--verifactu-mode" caption="Switching VeriFactu to Test only"}
::

1. Go to **Settings › VeriFactu**.
2. Under **Sending to the AEAT**, choose the **Sending mode**:
   - **Off**: nothing is sent. Facturas are still recorded and chained, so switching on later sends the whole history.
   - **Test only**: the AEAT's test service. Nothing counts fiscally; use it to check the set-up works.
   - **Live from a date**: test until that day, then the real service. From midnight (Madrid time) that day, the first factura starts the real chain.
3. If you choose live, set the date under **Live from**.
4. Click **Save**. Going live asks you to confirm, because once the first real factura has gone **the date cannot change and VeriFactu cannot be switched off**.

> **Good to know:** from the day you go live, VeriFactu costs 7,50 € + IVA per location per month, added to your subscription. The confirmation shows the total for your locations.

## Choosing who sends

::help-video{clip="invoices--verifactu-who-sends" caption="Letting QuiroFlow send for you under an IZ860 apoderamiento"}
::

Records always name your company as the issuer. This only decides whose certificate sends them to the AEAT. **Who sends** has three options:

- **Your own certificate**: you upload your company's certificate and renew it when it expires.
- **QuiroFlow sends for you, with an AEAT authorisation**: you authorise QuiroFlow once in the AEAT's online office (apoderamiento **IZ860**). No certificate to upload or renew.
- **QuiroFlow sends for you, with a signed document**: you sign a representation document for QuiroFlow as a colaborador social of the AEAT, and upload it here. No certificate needed either.

Pick one and click **Save**.

### If you choose the IZ860 apoderamiento

The page shows a **What to do at the AEAT** box with the exact details. In short:

1. Your company's legal representative, with their certificate, opens the AEAT's online office → **Registro de Apoderamientos** → "Apoderamiento para un trámite concreto".
2. As the **Authorised party (apoderado)**, enter the company and NIF shown in that box.
3. As the procedure, choose **IZ860** — "Remisión y consulta de registros de facturación por servicio web" (listed under IVA). **Not IZ862 or IZ863**: they look alike, but the AEAT refuses the records.
4. QuiroFlow then accepts the apoderamiento at the AEAT and confirms it on this page. Until then you'll see **Waiting for authorisation**; once confirmed, **Authorised**, and records start going at that moment.

### If you choose the signed document

1. Fill in the model representation document the page points to (Resolución de 18 de diciembre de 2024, BOE-A-2024-27600), naming QuiroFlow.
2. Have your legal representative sign it: by hand with a copy of their ID, or with a qualified electronic signature. Agreeing to something on screen is not a signature.
3. Upload the PDF with **Upload signed document**.
4. QuiroFlow checks the document and confirms it. If you replace it later, it goes back to waiting and nothing is sent until it is confirmed again.

> **Good to know:** with either QuiroFlow route, **nothing is sent for your clinic until QuiroFlow has confirmed your authorisation**. Until then the status says "QuiroFlow has not confirmed your authorisation yet".

## Uploading your own certificate

If you send yourself, under **Certificate**:

1. Under **Type**, choose **Representative (FNMT “AC Representación”)** or **Company seal**.
2. Under **File (.p12 or .pfx)**, pick the certificate file.
3. Enter the **Certificate password**. It is checked against the file before it is stored, then kept encrypted; it is never shown again.
4. Click **Upload certificate**.

You'll then see **Certificate on file** with its expiry date and a few checks: that it belongs to your company, that it is still valid, that the password opens it, and whether the AEAT has already accepted records sent with it. When it expires, upload the renewed one with **Replace certificate**.

## Checking the activity

Under **Activity** you see how many records are **Waiting to send**, how many were **Refused 10+ times**, how many are **Test records** and **Real records**, and the **Last answer from the AEAT** (**Accepted**, **Accepted with warnings**, **Refused**, **AEAT internal error** or **Not reached**).

QuiroFlow sends pending records about every minute, within the window the AEAT sets. Owners get an email if a record hasn't been accepted after 15 minutes, and when the certificate has 30 and 7 days left before it expires.

### If you see error 4112

The AEAT answers **4112** when the certificate isn't authorised to send for your company's NIF. It does not mean the certificate is broken:

- With **your own certificate**: check that the certificate belongs to your company, or that its holder is authorised to represent it.
- If **QuiroFlow sends**: check that the apoderamiento was granted for procedure **IZ860** (not IZ862 or IZ863) to the NIF the page shows. QuiroFlow is alerted as well.

> **Good to know:** QuiroFlow meets VeriFactu as an invoicing system, but your clinic's tax obligations (which IVA you apply, from when you are required to send) are yours. If in doubt, ask your accountant (gestoría).
