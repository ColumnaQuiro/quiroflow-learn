---
title: Webhooks and the API
description: Subscribe to clinic events, or read and write data with a scoped API token.
collection: settings
order: 9
---

For connecting QuiroFlow to something you've built yourself -- separate from the ready-made Stripe and WhatsApp connections covered elsewhere in Settings.

## Webhooks

**Settings -> Webhooks** subscribes an endpoint you control to receive an HTTP POST whenever a subscribed event happens: appointment created, updated, deleted, or checked in; patient created, updated, or deleted; invoice paid. Each request carries an `X-QuiroFlow-Event` header and a JSON body of `{ event, created_at, data }`.

To verify a request genuinely came from QuiroFlow (rather than someone who's guessed your endpoint URL), recompute an HMAC-SHA256 of the raw request body using your webhook's own secret, and compare it to the `X-QuiroFlow-Signature` header (hex-encoded) -- if they don't match, discard the request.

This is account-wide, separate from the per-campaign webhook action covered in [Sending campaigns](/articles/communications/sending-campaigns), which fires from one specific campaign rule rather than every event of a given type.

## API & Tokens

**Settings -> API & Tokens** is for external software -- an automation tool like n8n, a custom booking widget, an AI receptionist, or your own scripts -- to read and write this clinic's data without a QuiroFlow login. Full reference docs, with examples, filtering, pagination, and error codes, are at `developers.quiroflow.com`.

Creating a token:

1. Give it a **name** so you remember what it's for later.
2. Optionally set an **expiry** (Never, 30 days, 90 days, 1 year) and note the **integration name** / **developer contact** for your own records.
3. Choose **scopes** -- grant only what the integration actually needs, grouped by area: Patients (read/write), Appointments (read/write), Catalog (read-only: clinics, practitioners, appointment types, services), Billing (read-only: invoices and payments), and Messaging (send WhatsApp as the clinic).

Treat a token like a password: anyone holding it can act as your clinic within whatever scopes it was granted. A token that was never given `billing:read`, for instance, simply cannot leak invoice data even if it leaks itself -- which is the point of scoping narrowly rather than granting everything by default.

Send it as a bearer token:

```
curl "https://app.quiroflow.com/api/public/v1/appointments?starts_at=gte:2026-03-01T00:00:00Z" \
  -H "Authorization: Bearer qf_live_..."
```

The base URL is the same for every clinic on QuiroFlow -- which clinic a request acts for is determined entirely by which clinic's token you send, not by anything else in the request. **Recent API activity** on the same page shows the last 30 requests made with your tokens, useful for confirming an integration is actually connecting rather than silently failing.
