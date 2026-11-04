---
title: Roles and permissions
description: What each person on the team can see and do -- the roles QuiroFlow comes with, how to create your own and how to compare them.
collection: team-roles
order: 5
---

A role is a named set of permissions: what someone sees in the menu and in lists, and what they can do with it. Everyone on the team has a role, chosen when you invite them or later from their page in **Settings → Team**. Roles are managed in **Settings → Roles & Permissions**.

You need the **Roles and permissions** permission (owners always have it).

## The roles QuiroFlow comes with

Every account starts with three:

- **Owner** (**Fixed**): full access. It can't be edited, because full access comes not from the role but from being an owner, which is decided on each person's page. That way nobody locks themselves out by mistake.
- **Practitioner**: sees their own patients: their calendar, their records, their notes and their reports.
- **Front Desk**: runs the diary and the desk: every patient and appointment, charging, the till and the inbox.

**Practitioner** and **Front Desk** are a starting point: you can change their permissions or create new roles. In the list, each role shows a summary of what it allows (for example **Calendar: all**, **Patients: only their own**, **No clinical notes**) and how many people have it.

> **Good to know:** owners can do everything, whatever role they have.

## Creating a role

::help-video{clip="team--new-role" caption="Creating a role from another and adjusting its permissions"}
::

1. Click **New role**.
2. Enter the **Name** (it can't repeat another role's).
3. Under **Start with the permissions of**, choose the closest role to the one you want, or **None** to start with no permissions.
4. Click **Create and edit**. The role opens for you to adjust.
5. Change the permissions you want and click **Save changes**.

You can add a **Description (optional)**: it shows on the roles list and when choosing someone's role. **People with this role** lists who has it; to change someone's role, go to their page.

## Which permissions there are

Permissions are grouped like this:

- **What they see**: **Dashboard** (Everything, Only their own or Nothing); **Calendar** (All appointments, Only their own or Nothing); **Read-only calendar** (sees appointments but can't create, move, edit or delete any); **Patients** (All, Only their own or None). "Their own" are patients who have an appointment with that person or have them as their usual practitioner.
- **Patients and appointments**: **Edit patient details**, **Remove patient tags**, **Delete and merge patients** and **Delete appointments** (cancelling an appointment is always allowed).
- **Clinical notes, documents and files**: **See visit notes**, **Write and edit notes**, **Delete notes**, **Which notes they can edit or delete** (anyone's or only their own), **Documents and files they see** (anyone's or only their own), **Delete documents** and **Delete files**.
- **Money**: **Charge and issue receipts**, **See billing history**, **Record payments and run the till**, **Correct past charges** (No, Same day only or Always) and **Sell and edit bonos and memberships**.
- **Communication**: **Inbox** and **Recalls, waitlist and plan alerts**.
- **Reports**: **See reports** and **Only their own figures** (reports only count their appointments, takings and patients).
- **Settings and administration**: **Open Settings** and, within it, **Team**, **Roles and permissions**, **Clinic and diary**, **Billing**, **Communication and Growth**, **Data** and **Developer API**. Which Settings page each one opens is in the [Settings map](/articles/settings/settings-overview).

> **Good to know:** without **Open Settings** nothing in Settings shows, even if other permissions in that group are ticked.

> **Good to know:** what a role doesn't allow doesn't appear in its menu. If someone types the address of a page they can't open, they're sent back to the **Dashboard**.

## Comparing roles

::help-video{clip="team--compare-roles" caption="Comparing every role in one table"}
::

Click **Compare roles** for a table with one permission per row and one role per column. It's the quickest way to see how two roles differ. Click a role's name to edit it.

## Changing your own role

If you edit the role you have yourself, QuiroFlow warns you: **This is your own role: what you change here applies to you as soon as it is saved.** If you take away your own **Open Settings** or **Roles and permissions**, it asks before saving, because you'd no longer be able to open this page and only an owner or someone else with that permission could give it back.

## Deleting a role

1. Open the role and, under **Delete the role**, click **Delete…**.
2. If nobody has it, confirm with **Delete role**.
3. If people (or pending invites) have that role, choose under **Move them to the role** which role they move to and click **Move and delete**. That way nobody is left without permissions.

> **Good to know:** moving people to another role also needs the **Team** permission.
