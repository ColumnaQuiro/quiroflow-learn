---
title: The Billing page and quick receipts
description: Find what is outstanding, make a receipt without an appointment and manage each receipt from its own page.
collection: billing-payments
order: 1
---

**Billing**, in the sidebar, lists every receipt the clinic has raised, newest first. From here you see how much is owed, find a receipt by number or by patient, make a **quick receipt** for something not tied to an appointment (a report, a fee…) and, if WhatsApp is connected, remind patients what they owe.

You need the **Charge and issue receipts** permission.

> **Good to know:** this page lists receipts, not facturas. Each patient's facturas are on their **Money › Facturas & receipts** tab, and the whole clinic's under **Reports › Issued facturas**. The difference is explained in [Receipts, facturas and rectifying facturas](/articles/invoices-verifactu/receipts-and-invoices).

## Seeing what is outstanding

::help-video{clip="billing--find-unpaid" caption="Seeing unpaid receipts and sorting them by amount"}
::

1. Open **Billing** in the sidebar. At the top you'll see the total, for example "120,00 € outstanding across 3 receipts".
2. The list opens on **Unpaid**. Switch to **Paid**, **Void** or **All** with the buttons at the top; each one shows how many there are.
3. To see the biggest debts first, in the sort selector (**Newest first** by default) choose **Largest amount**.
4. To search, type in **Patient or receipt number**.
5. Click a receipt to open it.

> **Good to know:** money owed on a bono doesn't show here, because selling a bono doesn't create a receipt: you'll see it on the bono itself and under **Reports › Debtors**. What insurers owe isn't here either: it's under **Third parties**.

## Making a quick receipt

::help-video{clip="billing--quick-receipt" caption="Making a quick receipt with a service and a custom line"}
::

A quick receipt is for charging something that isn't a calendar appointment.

1. On **Billing**, click **+ Quick receipt**. (You can also do it from the patient's record: under **Account ledger**, menu **⋯**, **New receipt**.)
2. Under **Patient**, type in **Search patients…** and pick the patient.
3. On the first line, choose a service from the list to fill in the **Description** and price, or leave **Custom** and type them yourself.
4. Adjust the quantity and price. **Add line** adds more items; **✕** removes one.
5. Check the **Total:** and click **Create receipt**.

The receipt is left outstanding. Collect it from its page or from the patient's **Money** tab, and the factura is issued at that moment.

> **Good to know:** a quick receipt only offers services. Products are sold from the **Money** tab, so that they come off stock and carry their IVA: see [Selling products and tracking stock](/articles/billing-payments/products-and-stock). Services are created in **Settings › Services & Products** ([Appointment types and services](/articles/settings/appointment-types-and-services)).

## A receipt's page

::help-video{clip="billing--receipt-page" caption="Recording a part payment and marking the receipt as paid"}
::

Opening a receipt shows the document as the patient receives it, with its **Payments** on the right. From here you can:

- **Record a payment**: enter the **Amount (€)**, choose the **Method** and click **Record payment**. You can collect just part of it; **Total due** shows what is left.
- **Mark as paid**: records everything still owed in one go, with the default method.
- **Send by email** or **Download PDF**. To send it, the patient needs an email address on their record.
- **Void receipt**: only if it has no payment. If it has one, the button is disabled: refund or remove the payment first.
- **Refund…**: takes you to the patient's **Money** tab with the refund ready. See [Refunds, rectifying facturas and annulments](/articles/invoices-verifactu/refunds-and-corrections).

To record payments you also need the **Record payments and run the till** permission.

## Reminding people by WhatsApp

If the clinic has WhatsApp connected and your role includes the **Recalls, waitlist and plan alerts** permission, you can remind several patients at once:

1. On **Billing**, with **Unpaid** selected, tick the receipts (or the box at the top to select every one on the page).
2. Click **Send WhatsApp**.
3. Choose the template and send.

Patients with no phone, under age, or who don't want to be contacted are left out; you'll see how many before sending.

> **Good to know:** each receipt's number comes from the receipt series, set in **Settings › Invoicing › Numbering** ([Invoicing settings](/articles/settings/billing-configuration)).
