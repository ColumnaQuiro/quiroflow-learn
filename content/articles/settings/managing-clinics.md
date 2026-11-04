---
title: Managing your clinics
description: Add locations and complete each one -- address and contact, opening hours, time zone, billing details, logo -- and archive them when they close.
collection: settings
order: 2
---

In QuiroFlow, each place you work from is a **location** (a clinic). Your account starts with the one you created when you signed up, and you can add more. Each location has its own opening hours, closures and holidays, contact details, time zone, rooms and check-in portal. Everything is managed in **Settings → Clinics**.

You need the **Clinic and diary** permission.

## The clinics list

Each card shows the essentials: whether it has **Online booking**, whether it's the one that **Issues facturas**, whether it has **No tax ID**, today's hours (**Closed today**, **No opening hours set**…), phone and address. Click one to open its page.

If your plan limits locations, the top of the page shows how many you use. There's no limit during the free trial.

Who works at each location isn't set here but on each person's page, in **Settings → Team** (**Clinics**).

## Adding a location

::help-video{clip="settings--add-clinic" caption="Adding a second location and filling in its address"}
::

1. Click **Add location**.
2. Enter the **Name** (your team sees it in the clinic picker and patients see it on online booking) and choose the **Time zone**.
3. Click **Add location**. Its page opens.
4. Fill in the **Address**, **Phone** and **Email**, and click **Save changes**.
5. Don't forget the **Hours** (further down): a location without hours offers no slots to online booking.

If your plan includes no more locations, you'll see **Your plan has no more locations** with **See plans**. See [Your subscription](/articles/settings/subscription).

## Each location's page

The page is split into sections: **The location**, **Contact**, **Hours**, **Closures**, **Time zone**, **Billing details**, **Logo**, **Check-in portal** and **Close this location**. A single **Save changes** saves the fields; closures, the logo and the check-in portal save by themselves as soon as you change them.

### The location and contact

- **Address**: shown on your invoices and receipts, and on online booking.
- **Phone** and **Email**: shown to patients when they book online and at the foot of confirmation and reminder emails. Your WhatsApp templates and automatic emails can use them as the clinic's phone and address. Leave them empty to show nothing.

### Opening hours

::help-video{clip="settings--clinic-hours" caption="Setting the clinic's opening hours"}
::

1. Under **Hours**, switch on each day you open and set the opening and closing time.
2. To close at lunchtime, click **+ Range** and add the afternoon range.
3. **Copy Monday to Tuesday–Friday** repeats Monday across the rest of the week.
4. Click **Save changes**.

These are the default hours: the calendar uses them, as do online booking when the patient picks "any practitioner", the API and every practitioner without hours of their own. Below, QuiroFlow tells you how many practitioners at that location have their own hours; for them, theirs apply, not these. See [A practitioner's working hours](/articles/team-roles/practitioner-working-hours).

### Closures and holidays

Whole days the location is closed (bank holidays, the clinic's holidays) are covered in [Holidays and closures](/articles/settings/holidays-and-closures).

### Time zone and calendar slot

- **Time zone**: decides the times online booking offers and the time shown in confirmation and reminder emails. Changing it moves no appointment: each one keeps its exact moment.
- **Calendar slot**: how finely the calendar grid is divided (10, 15, 20, 30 or 60 minutes). With 15 min you'll see 9:00, 9:15, 9:30… It doesn't change how long an appointment lasts: appointment types decide that.

### Billing details

**Legal name**, **Tax ID** and **Invoice footer**. The whole account is a single taxpayer: every factura carries the legal name and tax ID of the first location you created, whichever location issues it. Other locations show that their facturas are issued under that first location's details; what changes per location is the address, the footer and the logo. Without a tax ID no factura can be issued. See [Receipts and invoices](/articles/invoices-verifactu/receipts-and-invoices).

### Logo

Click **Upload** (or **Replace**). It saves at once and is shown on invoices and the online booking page.

### Check-in portal

A tablet at reception where patients say they've arrived. It's switched on and set up here, per location; how it works is covered in [Checking patients in](/articles/calendar-appointments/check-in).

## Closing a location

Under **Close this location** there are two options:

- **Archive…**: for a location you no longer use. It disappears from the clinic picker, the calendar and online booking, but its appointments, patients and invoices are kept, and you can reactivate it whenever you like from **Archived** in the list.
- **Delete…**: only for a location with no appointments at all, such as one created by mistake. It's removed entirely with its rooms and closures; its patients stay, with no location assigned.

> **Good to know:** if the location has appointments from today on, move them to another location or cancel them before archiving, so no patient is left with an appointment at a closed location. You can't archive your only active location, or delete the location whose billing details go on your invoices.
