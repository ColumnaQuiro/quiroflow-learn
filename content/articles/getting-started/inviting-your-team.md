---
title: Inviting your team
description: Invite staff members and choose the right role for each one.
collection: getting-started
order: 3
---

Go to **Settings &rarr; Team** to see your roster and invite staff members. Every account starts with just you, listed as **Owner** -- everyone else is added through the invite flow below.

::image-carousel
---
images:
  - src: /screenshots/settings-team-roster.png
    alt: Team Members list with practitioners, front desk, and owner roles
    caption: "Your roster -- name, role, and online-booking visibility for each person"
  - src: /screenshots/settings-team-invite.png
    alt: Pending invites list and the email/role invite form
    caption: "Pending invites, and the form to send a new one"
---
::

## Sending an invite

1. Scroll to the invite form at the bottom of the page and enter the person's email address.
2. Choose a role from the dropdown -- **Practitioner** and **Front Desk** are the two you'll use most; see below for what each one can see and do.
3. Select **Create Invite Link**.

QuiroFlow emails them a sign-up link straight away. You'll also see the same link appear under **Pending invites** on screen, in case you'd rather send it yourself -- over WhatsApp or in person, for example -- instead of waiting on email delivery, or if their email provider is slow to deliver it.

A pending invite stays open until it's accepted -- there's no expiry to worry about, but you can **Revoke** it at any time from the same list if you sent it to the wrong address or a hire falls through. Revoking doesn't affect anyone who already has an active account.

Once they click the link, they'll set their own password and confirm their email, and they're added to your team immediately with the role you picked -- no further approval step needed from you.

## Choosing a role

Every account starts with three built-in roles:

- **Owner** -- full access to everything: billing, team management, settings, and every patient and clinic. There's always exactly one Owner per account (whoever created it), and ownership can be transferred from Settings if needed.
- **Practitioner** -- sees their own calendar and their own patients by default. Can manage visit notes, check patients in and out, and (if you enable it per person) appear as bookable on your online booking page.
- **Front Desk** -- sees the whole calendar and every patient across the clinic, can take payments and manage billing, but doesn't have access to account-wide settings like billing plans or role permissions.

Each row in the team list also has its own **Online Booking** toggle -- this controls whether that specific person shows up as a bookable practitioner on your public booking page, independent of their role. A Practitioner who mostly does off-calendar work (home visits, admin) can be switched off here without changing their role.

If none of the built-in roles fit exactly -- for example, a senior practitioner who should also see clinic-wide reports -- you can create a custom role with its own set of permissions from **Settings &rarr; Roles & Permissions**. See [Roles & permissions](/articles/team-roles/roles-and-permissions) for the full list of what can be turned on or off per role.

## If someone's sidebar or Calendar looks wrong after accepting an invite

Refreshing the page usually fixes it -- a team member's permissions and calendar data load right after they first sign in, and very occasionally that first load finishes before everything is ready. If it's still wrong after a refresh:

- Double check their role in **Settings &rarr; Team** matches what you intended -- it's easy to pick the wrong role from the dropdown when inviting several people in a row.
- If they should see a specific clinic's calendar and don't, confirm they're linked to that clinic under **Settings &rarr; Practitioners**.
- Ask them to sign out and back in fully (not just refresh) if the issue persists -- this clears any stale session data from before their role was finalized.
