---
title: Moving and cancelling appointments
description: Move a visit to another time or day, cancel it with or without a fee while offering the slot to the waitlist, or mark it as a no-show.
collection: calendar-appointments
order: 4
---

Visits change: the patient asks for another day, someone calls to say they can't come, or they simply don't turn up. It's all done from the calendar and the appointment panel, and QuiroFlow records every change in the visit's **History**.

## Move a visit to another day with "Move…"

::help-video{clip="calendar--move-to-another-week" caption="Moving a visit to the next week with Move…"}
::

1. Open the visit and click **Move…**, at the bottom of the panel.
2. A banner appears: **Rescheduling** the patient and type, "navigate to any day and click an open slot to move it there." You can change week, view or tab freely.
3. Click the new slot.
4. **Rescheduling Appointment** opens: check the details, choose a **Reason** if you like and add a **Note**.
5. Click **Confirm**.

To leave without moving anything, click **Cancel** on the banner.

## Drag a visit

::help-video{clip="calendar--drag-reschedule" caption="Dragging a visit to another time and choosing the reason"}
::

1. Drag the block to another time or room within the days on screen.
2. In **Rescheduling Appointment**, choose the **Reason** and, if you like, write a note.
3. Leave **Resend confirmation (if enabled)** ticked so the patient gets the new time.
4. Click **Confirm**.

A faded marker stays at the old time, **Moved to** and the new date; clicking it opens the visit. The moved block carries the **Moved before** icon. To make a visit longer or shorter, drag its bottom edge.

The **Rescheduling Appointment** dialog can also show **Apply a scheduling policy fee to patient file**, when your clinic has a reschedule fee. It starts unticked: tick it only if you want to charge it, and it's added as an unpaid receipt. Fees and reasons are set up in [Scheduling policies and rooms](/articles/settings/scheduling-and-resources).

> **Good to know:** if the new time overlaps another visit or a block, QuiroFlow asks first (**That time is taken**: "Two at once is possible, but only on purpose."). Choose **Move it anyway** or **Choose another time**. If the new time falls outside the practitioner's hours, it asks too.

> **Good to know:** dragging a visit to another room at the same time, or only changing its length, saves at once, with no dialog and no message to the patient.

## Change a visit's details

In the appointment panel, the **Change** button (next to the time) opens a quick edit with **Date**, **Time**, **Type**, **Minutes**, **Room** and **Practitioner**. Click **Save**.

> **Good to know:** giving a new start time with **Change** counts as moving the visit: it's recorded in the history and the patient is told through your "appointment rescheduled" automations. Unlike dragging or **Move…**, it doesn't ask for a reason or offer the fee.

## Cancel a visit

::help-video{clip="calendar--cancel-and-offer" caption="Cancelling a visit and offering the slot to the waitlist"}
::

1. Open the visit and click **Cancel appointment…**. The panel changes to **Cancel the appointment** and shows how soon it is ("Starts in 3 h 10 min").
2. Under **Is the cancellation charged?** choose **No charge**, **Add** the fee **to their balance**, or **Charge** the fee to the patient's saved card. This section only appears when your clinic has a cancellation fee.
3. Under **The … slot**, QuiroFlow tells you how many people on the [waitlist](/articles/calendar-appointments/waitlist) fit that slot. Choose **Offer it** to the first one by WhatsApp (or to everyone at once, depending on your setting) or **Leave the slot free**.
4. Read the summary sentence (for example "The appointment is kept as cancelled in their history and Lucía gets the offer now.") and click the confirm button, which spells out what will happen ("Cancel appointment · offer slot"). **Don't cancel** goes back.

The visit leaves the calendar and its slot is free. If it was offered, the slot is drawn as "Slot offered to" the person "· replies by" the deadline, and can't be booked until they answer or the offer expires.

> **Good to know:** cancelling sets off your clinic's "appointment cancelled" automations, which tell the patient.

> **Good to know:** the offer lasts up to two hours, and at the latest until 20 minutes before the visit. When the visit starts too soon you'll see "It starts too soon for anyone to take it."

> **Good to know:** charging the card is only offered to people with billing permissions and when the patient has a saved card. If the card is declined, the fee goes onto their balance.

To see a cancelled visit on the calendar, turn on **Show cancelled** under **Display**.

## Mark a no-show

::help-video{clip="calendar--no-show-fee" caption="Marking a visit as a no-show and adding the fee to the balance"}
::

1. Open the visit and click **No-show**.
2. If your clinic has a missed-appointment fee, a yellow strip appears, "Missed-appointment fee", with **Charge** the saved card (billing permissions only), **Add to balance** or **No fee**.

The visit becomes **No-show** and your "no-show" automations run. The **No-show** button is disabled ("Already arrived") once the patient has been checked in.

## Delete a visit

With the **Delete appointments** permission, **Delete appointment** appears at the bottom of the panel. It asks "Delete this appointment?": the visit disappears from the calendar. If the patient didn't come or called it off, it's better to cancel it or mark it **No-show**, so there's a record. Deleted visits can be seen again by turning off **Hide deleted**.

## Many visits at once

If a practitioner is suddenly off, don't move their visits one by one: **Unplanned absence** blocks their diary and passes their visits to a colleague or cancels them in one go. See [Recurring appointments, blocks and absences](/articles/calendar-appointments/recurring-and-blocking-time).
