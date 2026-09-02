---
title: Customizing your booking page
description: Discount codes, layout, per-type booking rules, and text overrides.
collection: online-booking
order: 2
---

**Settings &rarr; Online Booking** has several tabs beyond General for shaping the booking experience -- from per-type rules down to the exact wording patients see.

::image-carousel
---
images:
  - src: /screenshots/settings-online-booking-entities.png
    alt: Bookable Entities tab listing appointment types with a Configure link for each
    caption: "Bookable Entities -- per-type booking rules"
  - src: /screenshots/settings-online-booking-discounts.png
    alt: Discount Codes tab with a form for Code, percent off, amount off, expiry date, and max uses
    caption: "Discount Codes -- create one in a single form"
---
::

## Bookable Entities

For each appointment type, select **Configure** to set:

- **Bookable by** -- everyone, new patients only, or existing patients only. Useful for keeping a "New Patient Exam" type from being booked by someone who's already a patient, or vice versa.
- **Bypass practitioner selection** -- skip straight to date/time instead of asking which practitioner, for clinics where the type is always handled by whoever's available.
- **Max days ahead override** -- a per-type limit, if different from the account-wide default set in General.
- **Deposit amount** -- charge a fixed deposit instead of the full price, when online payment is required for that type (set alongside the **online payment required** toggle in Settings &rarr; Appointment Types).

## Discount Codes

Create a code with:

- **Code** -- the text patients type in at checkout (e.g. "WELCOME10").
- **% off** or **€ off** -- pick one; they're alternatives, not combinable on the same code.
- **Expires** -- an optional expiry date, after which the code stops working automatically.
- **Max uses** -- an optional cap on total redemptions across all patients; leave blank for unlimited.

Patients enter the code during checkout on the booking page, and the discount applies before payment is collected. There's no per-patient limit built in beyond the account-wide **Max uses** -- if you need to stop one patient from reusing a code repeatedly, set a low max-uses cap or retire the code after their booking.

## Layout

Set your primary and secondary colors and choose whether to show your clinic logo, so the booking page matches your branding rather than looking like a generic third-party tool. Changes here apply immediately to your live public booking link -- there's no separate "publish" step.

## Language Overrides

The booking page's text (headings, button labels, step titles) can be overridden here if you want different wording than the defaults -- useful for translating it fully into another language, or just matching your own clinic's tone (more casual, more formal, industry-specific terms your patients expect to see).
