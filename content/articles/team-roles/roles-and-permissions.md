---
title: Roles & permissions
description: How QuiroFlow's role system works, and how to create a custom role.
collection: team-roles
order: 1
---

Every team member has a role, and every role has its own set of permissions. Manage them from **Settings &rarr; Roles & Permissions**.

## Built-in roles

- **Owner** -- always has every permission. Can't be edited or removed, and there's always exactly one Owner per account.
- **Practitioner** -- scoped to their own calendar and patients by default.
- **Front Desk** -- sees the whole calendar and all patients, handles billing, but no account settings.

![Roles & Permissions settings page listing Owner, Front Desk, and Practitioner roles](/screenshots/settings-roles.png)

## Creating a custom role

If the built-in roles don't fit, select **+ New Role** from **Settings &rarr; Roles & Permissions**. A few of the permissions you can toggle:

- **Settings** -- gates the whole Settings section. The permissions below it (Roles & permission settings, Team member administration, Clinic configuration, Billing configuration, Communication configuration, Data administration, Developer API & tokens) all require this to be on as well -- turning off Settings hides all of these regardless of their own individual toggles.
- **Billing** -- view and create invoices.
- **Recalls & patient messaging**
- **WhatsApp Inbox** -- read and reply to patient conversations.
- **Allow access to reports**, with an option to restrict to **own reports only** -- useful for a senior practitioner who should see their own performance numbers without seeing the whole clinic's financials.
- Patient-level permissions like editing patients, deleting/merging patients, allocating payments, and editing packages.
- Clinical permissions for accessing, editing, and deleting appointment notes.

Calendar and patient visibility can also be scoped to **All** or **Own only** per role, which is what makes Practitioner see only their own schedule while Front Desk sees everyone's. This is the setting to change if you want a custom role that behaves like Practitioner but with clinic-wide visibility, for example -- start from a copy of Practitioner's permissions and switch just that one setting.

## A practical approach to custom roles

Rather than building a role from scratch, it's often easier to start close to one of the built-in roles and adjust from there -- decide which existing role your new one is closest to in spirit (a Practitioner who also needs billing access, or a Front Desk person who shouldn't see financial reports), then toggle only the handful of permissions that actually differ.

## Assigning a role

Set a team member's role when you invite them (see [Inviting your team](/articles/getting-started/inviting-your-team)), or change it afterwards from **Settings &rarr; Team Members**. Changing a role takes effect immediately -- the team member may need to refresh their page to see the update reflected in their own sidebar and access.
