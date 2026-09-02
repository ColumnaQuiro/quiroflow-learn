---
title: Managing clinics
description: Add a location, edit its details, and where business hours actually live.
collection: settings
order: 1
---

Go to **Settings &rarr; Clinics** to see every location on your account -- most practices start with one, created during [account setup](/articles/getting-started/creating-your-clinic), and can add more here as they grow.

![Clinics settings page listing one clinic, with an Add Clinic form below](/screenshots/settings-clinics.png)

## Editing a clinic

Name, address, logo, and default **calendar slot** (how finely that clinic's calendar grid is divided -- e.g. 15 minutes shows 9:00, 9:15, 9:30...) can all be edited directly in the clinics table -- select a field to change it in place, no separate edit mode to enter first.

## Adding a clinic

Use the form below the table to create a new one, giving it a name and address to start. Everything else -- appointment types, practitioners, rooms, business hours -- is configured per clinic afterward, so a brand-new clinic starts with none of your existing setup automatically carried over. This is deliberate: a second location often has different hours, different staff, and sometimes a different set of services, so nothing is assumed to be shared.

## What's scoped per clinic

Each clinic has its own calendar, business hours, and online booking configuration -- a practitioner working across two locations shows up separately on each one's calendar rather than one merged view. Patients, however, aren't scoped to a single clinic -- a patient who visits both your Downtown and Uptown locations is still one record, with their full visit and billing history in one place regardless of which clinic they were seen at.

## Business hours

Hours and availability for online booking aren't set here -- they live in **Settings &rarr; Online Booking &rarr; Clinics & Hours**, alongside the rest of your online booking configuration. See [Setting up online booking](/articles/online-booking/setting-up-online-booking). This split exists because clinic identity (name, address, logo) rarely changes, while hours and booking rules are the kind of thing you might adjust seasonally or per campaign.

## Removing a clinic

Select the **X** at the end of a clinic's row to remove it. Be careful with this on a clinic that already has appointment or billing history -- if a location has genuinely closed but you want to keep its past records intact, disabling its online booking and simply not scheduling new appointments there is the safer path over deleting the record outright.
