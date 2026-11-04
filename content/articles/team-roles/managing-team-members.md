---
title: Managing team members
description: Each team member's page -- role, owner status, whether they see patients, their clinics and security -- and how to deactivate someone who leaves.
collection: team-roles
order: 2
---

**Settings → Team** shows the whole team: their role, whether they see patients, which clinics they work at and whether they have two-factor authentication. Click someone to open their page. Everything about them is there, in sections: **Profile**, **Access**, **Sees patients**, **Away**, **Security** and **Deactivate**.

You need the **Team** permission. Some things only an owner can do; each case says so.

> **Good to know:** the page has one save button for all its fields. When you change something, **Unsaved changes** appears at the bottom with **Discard** and **Save changes**. If you try to leave without saving, QuiroFlow asks **Leave without saving?**.

## Searching the list

Above the list you can **Search by name** and filter by **All**, **Practitioners** or **Without two-factor**. If your plan has a limit, the seat bar shows how many practitioner seats you use (staff who don't see patients take no seat) and offers **Add seats**.

## Profile: photo, name and colour

1. Click the photo to change it, or **Remove photo**.
2. Correct the **Name**: it shows in the calendar, on online booking and in appointment messages.
3. Choose their **Colour on the calendar**.
4. Click **Save changes**.

The sign-in **Email** isn't changed here: only that person can change it, from their **Account Settings**.

## Changing someone's role

::help-video{clip="team--change-role" caption="Changing someone's role from their page"}
::

1. Under **Access**, choose the **Role**. **See permissions** shows what that role can do.
2. Click **Save changes**. The change applies at once.

You can't change your own role: another person with the **Team** permission has to. See [Roles and permissions](/articles/team-roles/roles-and-permissions).

## Making someone an owner

Owners can do everything whatever their role: they also manage the subscription and appoint other owners. There can be several, and there's always at least one. Only an owner can change this.

::help-video{clip="team--make-owner" caption="Making a colleague an owner"}
::

1. Under **Access**, turn on **Owner**.
2. Confirm with **Make owner**. That person will be able to do everything, including the subscription, billing and removing you as an owner.

To undo it, turn **Owner** off and confirm with **Remove owner**: they keep their role and permissions but stop managing the subscription and owners. **Access** also shows when they **Last signed in** and since when they've been **On the team since**.

## If they see patients

Under **Sees patients**:

- **Sees patients**: they show in the calendar as a practitioner and take a practitioner seat on your plan. Front desk and admin staff don't. If no seat is free when you save, you'll see **Add a seat**.
- **Can be booked online**: patients can pick them on your booking page.
- **Clinics**: which clinics they work at (at least one).
- **Their hours**: by default they follow their clinic's; you can give them their own. See [A practitioner's working hours](/articles/team-roles/practitioner-working-hours).
- **Their own durations and prices**: if an appointment type takes longer or costs differently with them. These are edited on each appointment type, under **By practitioner**. See [Appointment types and services](/articles/settings/appointment-types-and-services).

For someone who doesn't see patients, instead of hours you'll see **Their shift**: the planned hours their clocking is compared with on the **Turnos** tab. See [Working time log](/articles/team-roles/working-time-log).

## Absences

Sick leave, holidays or a training course are recorded under **Away**. See [Team absences](/articles/team-roles/absences).

## Security: password and two-factor

- **Forgot their password? Send them an email to set a new one.** Click **Send reset email** and confirm with **Send**. They get an email to create a new one; their current password keeps working until then.
- **Two-factor authentication: set up / not set up**. If they've lost their phone, click **Reset two-factor** and confirm. Their authenticator app stops working for QuiroFlow and they'll set it up again next time they sign in (or sign in with just their password, if your clinic doesn't require it).

Only an owner can reset another owner's two-factor. For your own password and two-factor, go to your **Account Settings**.

## Deactivating someone who leaves

::help-video{clip="team--deactivate" caption="Deactivating a practitioner and passing her appointments to a colleague"}
::

When someone stops working at the clinic, deactivate them. They can no longer sign in, they leave the calendar and their seat is freed; everything they did (appointments, notes, payments) is kept under their name.

1. On their page, go to **Deactivate** and click **Deactivate** followed by their name.
2. If they have future appointments, the dialog says how many. Under **Pass their appointments to**, choose who will see them, or **Nobody — I will move them myself** to move them one by one.
3. Click **Deactivate**. Their session is closed at once.

In **Settings → Team** they appear under **Deactivated**, with the date. To bring them back, click **Reactivate** (in the list or on the notice on their page).

> **Good to know:** reactivating a practitioner needs a free seat on your plan. While they're deactivated, they can't be booked online.

> **Good to know:** you can't deactivate yourself, and only an owner can deactivate another owner. Someone who wants to remove their own access can do so from their **Account Settings** (**Remove my access**).
