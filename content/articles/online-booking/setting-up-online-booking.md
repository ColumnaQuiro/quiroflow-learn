---
title: Setting up online booking
description: Publish your booking page, put it on your website, and decide what can be booked and who is told.
collection: online-booking
order: 1
---

With online booking, patients book their own appointment from your website or a link, without calling or writing. The page uses the same availability you see in the calendar, so it never offers a time that's already taken. Each booking lands in the diary straight away and the patient gets their confirmation.

It's set up in **Settings › Clinic › Online Booking**. You need the **Open Settings** and **Clinic and diary** permissions.

## Publishing your page

At the top of the page you'll see whether it's ready: "Your booking page is live" or "Nothing can be booked yet", and at how many clinics and for how many appointment types it can be booked.

1. Under **Where & what can be booked**, turn on **Online booking at** each clinic you want to offer. Hours are each clinic's own (**Edit hours**).
2. Check the **Appointment types** list: each shows as **online** or **not online**. Each appointment type decides whether it is bookable online, how far ahead and whether it's paid when booking; that's changed in **Settings › Appointment Types** (see [Appointment types and services](/articles/settings/appointment-types-and-services)).
3. Click **Save changes**.

## Sharing the link and viewing it

::help-video{clip="booking--copy-link-open" caption="Copying the booking link and opening the page"}
::

1. On the card at the top, under **Link**, click **Copy**. You can put that link on Instagram, on Google or in a WhatsApp message.
2. Click **Open page** to see it as a patient does.

## Putting it on your website

Under **Website embed** you have the **Website embed code**. Click **Copy** and paste it on the page of your website where you want booking to appear. Whoever manages your website can do it in a minute.

> **Good to know:** the code includes a script that tells bookings from paid ads (Google, Meta) apart from the rest, so Growth knows where each patient came from. If you already embedded booking by hand, adding just the script tag is enough.

## What the patient does

::help-video{clip="booking--book-as-patient" caption="Booking a first visit from the public page on a phone"}
::

1. Choose the **Clínica** (clinic, if there are several) and the **Servicio** (service).
2. Under **Elija un profesional**, choose a practitioner or **Cualquier profesional** (any practitioner).
3. Under **Elija su fecha y hora**, pick the day on the calendar and a morning or afternoon time.
4. Under **Introduzca sus datos**, enter first name, surname, email and mobile number (and optionally notes, a discount code or a gift voucher).
5. Click **Reservar cita**. They'll see "¡Cita reservada!" and an invitation to download the app.

The clip shows the page in Spanish; a patient whose browser is in English sees it in English. If the appointment type is paid when booking, there's a payment step. If the clinic asks for a card to guarantee the visit, they're asked to add one, with nothing charged now. Classes show the places left and, when full, offer the waiting list.

> **Good to know:** the public page is in Spanish, English or French depending on the patient's browser (or the language picker, if you show it).

## Telling the clinic: notifications

Under **Tell the clinic about new bookings**, enter an email (**By email**) and/or a number (**By WhatsApp**, in +34… format). The alert goes out the moment a patient books. If that number hasn't written to the clinic in 24 hours, WhatsApp only delivers the **New booking alert (to staff)** template you choose in **Settings › Communication › WhatsApp**.

## Measuring ads: tracking

Under **Tracking**:

- **Google Tag Manager**: your container ID (GTM-…). It's loaded on the booking page. Leave it empty if you don't run ads.
- **Thank-you page**: to send patients to a page on your own website after booking (to record the conversion there) instead of QuiroFlow's confirmation. The booking, type, value and currency are added to the address.

Click **Save changes** when you're done. For the look, the texts, how far ahead and discount codes, see [Customising the booking page](/articles/online-booking/customizing-the-booking-page).
