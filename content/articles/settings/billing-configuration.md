---
title: Invoicing settings
description: The fiscal details on your facturas, IVA, the numbering of facturas, rectifying facturas and receipts, and what your receipts show and say.
collection: settings
order: 7
---

In **Settings › Invoicing** you decide what your facturas and receipts say, how they are numbered and the email that sends a receipt. It's worth getting it ready before you charge your first real visit, because a factura already issued keeps the details it was issued with.

You need the **Open Settings** and Settings **Billing** permissions. Changes on this page are saved with **Save changes**, top right.

## Ready to issue facturas?

At the top of the page there's a checklist: **Fiscal data** (how many clinics are complete), **Numbering** (the next factura) and the state of VeriFactu. If something is missing, it tells you. Only the owner can set up VeriFactu; see [Setting up VeriFactu](/articles/invoices-verifactu/setting-up-verifactu).

## Fiscal data

::help-video{clip="invoices--fiscal-data" caption="Completing the clinic's legal name and NIF"}
::

The legal name, NIF and address your facturas and receipts are issued with. They're required for a factura to be valid.

1. Under **Fiscal data**, click the clinic.
2. Fill in the **Legal name**, **Tax ID** and the address. Without an NIF no factura can be issued.
3. Optionally, write an **Invoice footer** (printed at the foot of facturas and receipts) and upload the **Logo**.
4. Save. Back on **Settings › Invoicing**, the clinic shows as **Complete**.

> **Good to know:** the account is a single taxpayer. Facturas for all your clinics are issued with the legal name and NIF of the clinic marked **Issues facturas** (the first one you created). What changes per clinic is the address, the footer and the logo.

## IVA

How your facturas treat IVA. Choose one option:

- **Exempt** (the default): health care by a registered professional is exempt under art. 20.Uno.3 of Ley 37/1992. The factura shows the total as the base and cites the exemption. Under **Exemption** you pick the ground.
- **With IVA**: prices already include it. The factura splits what the patient paid into base and cuota, and its total still matches the payment. Set the **IVA rate (%)**.

The change applies to facturas issued from now on; facturas already issued keep the treatment they were issued with. Products always carry their own IVA, whichever option you choose.

> **Good to know:** which option applies to you is a tax decision for your clinic. If you're not sure, ask your accountant (gestoría) before issuing facturas.

## Numbering

Facturas are numbered PREFIX-YEAR-NUMBER (for example **F-2026-0001**) and start again at 1 every year. There are three series:

- **Facturas**: choose the **Factura prefix** and, if you're continuing your previous system's series, the next number.
- **Rectificativas**: their own prefix, which must differ from the facturas'.
- **Receipts**: a single series; you only choose the **Next receipt number**.

A number can move forward (for example, to carry on where you left off in another program) but **never back**: the earlier numbers are already used. A prefix is 1 to 10 letters or digits.

## What receipts show

::help-video{clip="invoices--receipt-content" caption="Choosing what appears on the receipt PDF"}
::

What appears on the receipt PDF patients download or are emailed. Switch each item on or off and check the result under **Preview**:

- **Patient**: **Date of birth**, **National ID / social security number**.
- **Amounts**: **Taxes (IVA, or the exemption)**, **Payments made**, **Outstanding on this receipt**, **Account balance**.
- **Other**: **Practitioner**, **"Your next visit"**, **Logo**.

Facturas always carry what the law requires, whatever this is set to.

## Receipt email

- **Email receipts automatically**: what new patients start with. It can still be changed on each patient.
- The email's **Subject** and **Message**. If you leave the subject empty, "Recibo" and its number are used. In the message you can include the clinic's and the patient's name with the variables the page shows.

At the foot of the page you'll see the invoicing system (QuiroFlow and its version) with a link to its responsible declaration (declaración responsable).
