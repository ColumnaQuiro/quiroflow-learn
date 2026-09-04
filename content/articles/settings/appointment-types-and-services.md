---
title: Appointment types, services, and products
description: What you offer, what you sell, and where each list is used.
collection: settings
order: 4
---

Three related but separate catalogs live under **Settings**, and it's easy to conflate them since they all involve a name and a price. Each feeds a different part of QuiroFlow.

::image-carousel
---
images:
  - src: /screenshots/settings-appointment-types.png
    alt: Appointment Types table with color, duration, default price, stage, online booking, and online payment columns
    caption: "Appointment Types -- what can be booked on the calendar"
  - src: /screenshots/settings-services.png
    alt: Services & Products table used by quick invoices and appointment billing
    caption: "Services & Products -- what can be invoiced"
---
::

## Appointment Types

**Settings -> Appointment Types** defines what shows up when booking on the Calendar. Each one has:

- **Color** -- how it's shown on the calendar, so different visit types are visually distinguishable at a glance.
- **Duration** -- the default length of the slot it books.
- **Default price** -- shown on the calendar block and used as the starting price when billing that visit.
- **Stage** -- classifies the type (Adjustment, Revision / check-up, Report / exam findings, First visit, First visit (offer), Maintenance package, or Not classified). This is what feeds the **Statistics** report's first-visit, revision, and conversion numbers -- an appointment type left as **Not classified** won't be counted correctly there, so it's worth setting deliberately rather than leaving the default.
- **Online Booking** -- whether patients can book this type themselves; see [Setting up online booking](/articles/online-booking/setting-up-online-booking).
- **Online Payment** -- whether payment (or a deposit) is required at the time of online booking.
- **Overrides** -- set a different duration or price for a specific practitioner doing this same appointment type, when one practitioner's sessions genuinely run longer (or are priced differently) than the type's default.

This list is also what **Bookable Entities** in Online Booking settings builds on -- that's where you set booking-specific rules (who can book it, how far ahead, deposit amount) for a type that's already been created and enabled here. See [Customizing your booking page](/articles/online-booking/customizing-the-booking-page).

## Services & Products

**Settings -> Services & Products** is a separate catalog used by quick invoices and appointment billing -- not the calendar. Each entry has a name, price, and tax rate. Reach for this when you're billing something that isn't tied to a bookable calendar slot (a product sold at the front desk, a one-off service added to an invoice alongside a visit).

## Packages and Memberships

The other two "what you sell" catalogs -- **Packages / Bonos** and **Memberships** -- have their own dedicated articles, since selling one is enough of a process to walk through on its own: see [Selling a package to a patient](/articles/billing-payments/selling-a-package-bono) and [Selling and managing memberships](/articles/billing-payments/memberships).

## Which one to use

As a rule of thumb: if it needs a slot on the calendar, it's an **Appointment Type**. If it's billed without booking time (a product, a one-off charge), it's a **Service or Product**. If a patient is prepaying for several future visits at once, it's a **Package**. If they're paying on a recurring schedule regardless of visit count, it's a **Membership**.
