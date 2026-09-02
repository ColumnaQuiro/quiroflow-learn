---
title: Setting up online booking
description: Let patients book their own appointments, and get your public booking link.
collection: online-booking
order: 1
---

Online booking lets patients book directly, without calling or messaging your clinic -- it runs against the same real-time availability your team sees on the Calendar, so there's no risk of it offering a slot that's actually taken.

## Turning it on

There are two switches, and both need to be on before a given appointment type is bookable online:

1. **Per clinic** -- business hours and availability are managed in **Settings &rarr; Online Booking &rarr; Clinics & Hours**, which is what online booking checks against.
2. **Per appointment type** -- in **Settings &rarr; Appointment Types**, each type has its own **online booking enabled** toggle, plus a separate **online payment required** toggle if you want to collect payment (or a deposit) at the time of booking.

Even after both are on, a type can be narrowed further under **Bookable Entities** -- restricted to new or existing patients only, for example -- see [Customizing your booking page](/articles/online-booking/customizing-the-booking-page).

## General settings

![Online booking General settings tab with the maximum booking window and public booking link](/screenshots/settings-online-booking-general.png)

- **Maximum future booking time** -- how many days ahead patients can book online (90 by default). This can be overridden per appointment type under Bookable Entities if some visits should open up further or less far ahead than others.
- **Google Tag Manager** -- an optional GTM container ID, injected on the public booking page if you want conversion tracking on booking completions without QuiroFlow needing to know about your specific analytics setup.
- **Patient referral URL** -- where a referred-patient link redirects to, if you track referrals separately from QuiroFlow's own [referral sources](/articles/settings/settings-overview).
- **Public booking link** -- your standalone booking page URL. Copy it to share directly, or embed it on your own website.
- **Booking notifications** -- get pinged as soon as a patient books online, by email, WhatsApp, or both. The WhatsApp notification only delivers as a free-form message within 24 hours of that number last messaging your clinic's WhatsApp number -- either message it occasionally to keep notifications flowing, or set a staff notification template in **Settings &rarr; WhatsApp** to send outside that window too.

## What patients see

They pick an appointment type, choose a practitioner (unless you've set that type to skip practitioner selection), then a date and time from real availability -- see [Customizing your booking page](/articles/online-booking/customizing-the-booking-page) for the options that shape this experience further.

## Testing it yourself

Before sharing your booking link widely, open it yourself (in a private/incognito window, so you're not logged in as staff) and go through a full booking as a patient would. It's the fastest way to catch a misconfigured appointment type or confusing wording before a real patient runs into it.
