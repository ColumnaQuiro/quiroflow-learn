---
title: Appointment types and services
description: Create what gets booked -- duration, price, colour, stage, online booking, deposit and per-practitioner prices -- and the services you charge separately.
collection: settings
order: 4
---

An **appointment type** is what gets booked in your calendar: "First visit", "Adjustment", "Review", "Physiotherapy"… Each has its own duration, price, colour in the calendar and its own online booking rules. You manage them in **Settings → Appointment Types**.

You need the **Clinic and diary** permission.

## Creating an appointment type

::help-video{clip="settings--new-type" caption="Creating an appointment type and choosing its stage"}
::

1. Click **New type**. **New appointment type** opens.
2. Enter the **Name**, the **Duration (min)** (between 5 and 480) and the **Price (€)**.
3. If you want to offer it on your booking page already, turn on **Bookable online from now**.
4. Click **Create and complete**. The type's page opens.
5. Choose its **Colour in the calendar** and **Treatment stage**, and click **Save changes**.

## Each type's page

Each type has sections: **The appointment type**, **Online booking**, **Per practitioner**, **Where it is used** and **Archive or delete**. A single **Save changes** saves everything.

### The appointment type

- **Name**, **Duration** and **Price** (what's charged when the appointment is closed; 0 if nothing is charged).
- **Colour in the calendar**.
- **Treatment stage**: first visit, first visit with offer, report, review, maintenance, adjustment or other. It feeds the Statistics report: without a stage, these appointments aren't counted there, and the list reminds you with **No stage: not counted in Statistics**.
- **Group class**: enter a number of places (between 2 and 200) to turn the type into a class. See [Calendar & appointments](/articles/calendar-appointments).
- **Note for the team**: shown to the team when booking this type and on each visit (for example, "check finances"). Patients never see it.
- **Only for patients under 18** and **Only for patients referred by a patient**: these are for the AI receptionist, which only offers these types in those cases. The booking page asks neither age nor who referred them, so don't turn them on for online booking.

### Online booking

::help-video{clip="settings--type-online" caption="Opening a type to online booking for new patients only"}
::

1. Turn on **Can be booked online**: the type appears on your booking page and in the patient app.
2. Under **Who can book it**, choose **Everyone**, **New patients only** or **Existing patients only**. "New" means someone who has never had an appointment; it's checked by email and phone at booking.
3. Turn on **The patient does not choose a practitioner** if you'd rather the first free one is assigned (useful for first visits).
4. Under **How far ahead it can be booked**, set a maximum number of days, or leave it empty to use the clinic's (**Settings › Online booking**).
5. **Payment when booking** takes a card payment at booking; **Deposit** says how much (leave it empty to charge the full price). It needs Stripe connected: see [Connecting Stripe](/articles/settings/connecting-stripe).
6. Click **Save changes**.

> **Good to know:** the deposit can't be more than the price. The rest is charged at the clinic.

### Per practitioner

::help-video{clip="settings--type-per-practitioner" caption="Giving a practitioner their own duration and price"}
::

- **Who does it**: tick who does this type. Patients are only offered times with those people, on the booking page, through the API and by the AI receptionist. If nobody is ticked, everyone does it.
- If someone takes longer or charges differently, fill in their **Duration (min)** and **Price (€)** in the table. Empty: they use the duration and price above. The calendar, online booking, the patient app and the API all use it.

> **Good to know:** **Who does it** doesn't restrict you in the calendar: from there you can still book this type with anyone.

### Where it is used

Before changing or archiving a type, look here: how many appointments use it (and how many from today on), how many patients are waiting for a slot of this type on the waitlist, which automations filter by it and whether the AI receptionist offers it.

## Ordering the types

The list order is the order in the calendar and on online booking, and the first one is proposed when creating an appointment. Drag each type by its handle, or use the arrows to move it up or down.

## Archiving or deleting a type

- **Archive…**: it's no longer offered in the calendar, online booking or pickers, but stays on its appointments, in reports and in payments. Reactivate it from **Archived** in the list.
- **Delete…**: only for a type no appointment has ever used. It's removed entirely with its per-practitioner prices.

> **Good to know:** two active types can't share a name. To reactivate an archived type when another active one has its name, rename one of them first.

## Services

**Services** are what you charge for besides appointments: a clinical report, an insole, strapping… They're offered on quick receipts and when charging an appointment. They live in **Settings → Services & Products** and need the **Billing** permission.

1. Type the name into **Add a service, e.g. Clinical report** and its **Price (€)**.
2. Click **Add**.

The pencil changes the name or price; a new price applies from now on and receipts already made keep theirs. A service that has been charged can be renamed but not deleted, so the income report keeps counting it. The page also reminds you which VAT rate your invoices are issued at. For stocked products, bonos and the rest of the catalogue, see [Billing & payments](/articles/billing-payments).
