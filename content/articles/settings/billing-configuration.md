---
title: Payment methods, invoicing, and fiscal data
description: What methods staff can record a payment against, how invoices look, and the legal details printed on them.
collection: settings
order: 7
---

Three Settings pages round out your billing setup, beyond what you sell (see [Appointment types, services, and products](/articles/settings/appointment-types-and-services)) and how you get paid (see [Connecting Stripe](/articles/settings/connecting-stripe)).

::image-carousel
---
images:
  - src: /screenshots/settings-invoice-settings.png
    alt: Invoice Settings page with invoice numbering, Send Invoices Automatically, Patient Information Display, and Invoice Content Visibility toggles
    caption: "Invoice Settings -- numbering, what shows, and email defaults"
---
::

## Payment Methods

The methods staff can record a payment against when [taking a payment](/articles/billing-payments/taking-a-payment). **Cash** and **Card** are seeded by default -- add others your clinic actually uses (Bank Transfer is a common one) or deactivate ones you don't, so the dropdown staff see at checkout only shows real options. **Credit on account** and write-offs are separate, built-in payment types tied to a patient's actual credit balance, and aren't managed from this list.

## Invoice Settings

- **Invoice Numbering** -- set the next invoice number if you need to match a sequence from a previous system, or leave it blank to keep counting automatically.
- **Send Invoices Automatically** -- the default for new patients' "send invoice via email automatically" setting. Changing it here only affects new patients going forward, not existing ones.
- **Patient Information Display** -- toggles for showing date of birth, national ID, and taxes on invoices and statements.
- **Invoice Content Visibility** -- hide the invoice balance, account balance, payments, provider name, "your next visit" line, or your logo, individually, if your invoices should look leaner than the full default.
- **Email Customization** -- your own subject line and body text for the email a patient receives with their invoice.

## Fiscal Data

The legal name, tax ID, and address printed on every invoice, plus a footer note -- required for an invoice to be fiscally valid in most jurisdictions, so get this right before sending your first real invoice rather than after a patient asks about it. This is clinic-wide, set once per clinic rather than per invoice.
