---
title: Putting booking on your website (WordPress, Wix, Squarespace)
description: Where to paste the booking code on each kind of website, how to check it works, and what to do if it doesn't show.
collection: online-booking
order: 2
---

You can put your booking page inside your own website, so patients book without leaving it. There's nothing to install: you paste a two-line code on the page where you want booking to appear. Whatever you change in QuiroFlow (hours, services, colours) shows on your website straight away, without touching it again.

## Copying the code

1. Go to **Settings › Clinic › Online Booking**.
2. In the card at the top, next to **Website embed**, click **Copy**.

You'll get something like this, with your clinic's name instead of `your-clinic`:

```html
<div data-quiroflow-booking data-slug="your-clinic"></div>
<script src="https://app.quiroflow.com/embed.js" async></script>
```

Always copy it from QuiroFlow rather than typing it by hand: `your-clinic` has to be exactly your account's.

> **Good to know:** the code is pasted as **HTML**, not as text. Pasted into a normal paragraph, your website shows the code instead of the booking page. Below is the block to use on each platform.

## WordPress

**Block editor (WordPress's standard editor)**

1. Open the page where you want booking and click **+** to add a block.
2. Search for **Custom HTML** and add it.
3. Paste the code and click **Update** (or **Publish**).

The block may look empty in the editor; that's normal. Booking shows on the published page.

**Elementor:** drag the **HTML** widget into the section you want, paste the code and click **Update**.

**Divi:** add a **Code** module, paste the code and save.

**Other page builders:** almost all of them have a block called "HTML", "Code" or "Custom code". That's the one.

> **Good to know:** on **WordPress.com** (the hosted WordPress service, not WordPress installed on your own hosting), the cheaper plans strip scripts when you save. If booking doesn't show there, use one of the options under [If your website won't run the script](#if-your-website-wont-run-the-script).

## Wix

1. In the editor, click **+** in the left-hand bar and look for **Embed HTML** (under embed code).
2. Choose the option to paste **code**, paste the code and click **Update**.
3. Make the box as wide as the page and about 800 pixels tall, so booking fits without a scrollbar.

> **Good to know:** Wix puts the code in a separate box, so the script can't see which ad a visit came from. Bookings still come in, just without knowing whether they came from Google or Meta.

## Squarespace

1. Edit the page, click **Add block** and choose **Code**.
2. Paste the code and save.

Squarespace doesn't run scripts while you edit, so the block looks empty. Check the published page. On some Squarespace plans, code blocks don't run scripts; if booking doesn't show, use one of the options under [If your website won't run the script](#if-your-website-wont-run-the-script).

## Checking it works

1. Open the published page in a private window or on your phone.
2. You should see booking: service, practitioner, date and time.
3. If you want to make a full test booking, use your own details and cancel it afterwards in the calendar: it's a real appointment, and the clinic gets the booking notification.

## If it doesn't show or looks wrong

- **The code shows as text.** It's pasted in a text block. Delete it and paste it into a **Custom HTML** or **Code** block.
- **It only appears once you scroll or tap the screen.** A speed or caching plugin (WP Rocket, LiteSpeed Cache, Perfmatters, Autoptimize…) has its **delay JavaScript** option on. In that option, add `embed.js` to the exclusions list and clear the cache.
- **There's a blank box.** A security plugin is blocking content from other websites. Allow `app.quiroflow.com` in that plugin.
- **It's cut off at the bottom or has its own scrollbar.** The box is 780 pixels tall. To make it taller, add `data-height` to the first line of the code:

```html
<div data-quiroflow-booking data-slug="your-clinic" data-height="950px"></div>
```

## If your website won't run the script

Some platforms don't let you paste scripts. There are two alternatives:

**A box without the script.** Paste this, replacing `your-clinic` with what comes after `/book/` in the card's **Link**:

```html
<iframe src="https://app.quiroflow.com/book/your-clinic" title="Book an appointment" allow="payment" style="width:100%;min-height:780px;border:0"></iframe>
```

**A button.** Put a "Book now" button on your website that goes to the card's **Link**. It works on any website, and the same link works for Instagram, Google or WhatsApp.

> **Good to know:** without the script, QuiroFlow can't tell which bookings come from Google or Meta ads that lead to your website. If you run ads, the full code is worth it; if your website won't allow it, point the ads straight at the booking **Link**, which does record it.

To decide what can be booked and how the page looks, see [Setting up online booking](/articles/online-booking/setting-up-online-booking) and [Customising the booking page](/articles/online-booking/customizing-the-booking-page).
