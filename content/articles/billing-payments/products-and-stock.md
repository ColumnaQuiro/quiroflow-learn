---
title: Selling products and tracking stock
description: Add what you sell over the counter, receive deliveries and sell it from the patient's record at its own IVA.
collection: billing-payments
order: 7
---

If you sell things over the counter (pillows, creams, insoles…), create them in **Settings › Products & stock**. There you see the stock, the margin and what has sold this month. They are sold from the patient's **Money** tab: the sale takes the units off stock, records the payment and issues the factura at the product's IVA. Products carry IVA even when your services are exempt.

To create products and move stock you need the **Open Settings** and Settings **Billing** permissions; to sell them, **Record payments and run the till**.

## Creating a product

::help-video{clip="billing--product-create" caption="Creating a product and receiving a delivery"}
::

1. Go to **Settings › Products & stock** and click **New product**.
2. Enter the **Name** and the **Price, IVA incl. (€)**, and choose the **IVA** (21 %, 10 % or 4 %).
3. Choose **Count stock** to track units, with a **Minimum** so it warns you when it runs low, or **Not counted (to order)** if you order it when someone buys it.
4. Click **Save**.

## Receiving deliveries and adjusting stock

Stock isn't typed in by hand: it changes through movements, so you always know why.

- **Receive a delivery**: enter the **Units** that arrived and, optionally, the **Cost per unit** (this is how the **Margin** is worked out) and the **Supplier**. Click **Add to stock**.
- **Adjust stock**: for something expired, broken or a recount. Enter the **Units (+/−)** (for example −2) and a **Reason**, and click **Adjust**.

**Movements** lists every **Delivery**, **Sale**, **Adjustment** and **Returned**. Products below their minimum are marked **Low stock**, and those that run out **Out of stock**.

> **Good to know:** to stop counting a product's stock, adjust it to zero first.

## Selling a product

::help-video{clip="billing--sell-product" caption="Selling a product from the patient's record"}
::

1. On the patient's **Money** tab, under **Owed now**, click **Sell product**.
2. Find the product under **Search product** and click **Add**. **−** and **+** change the quantity.
3. On the right, under **Take payment**, check the **Total** and choose **Paid by**.
4. Click **Take payment and hand over**.

You'll see "Sold and paid. Factura …" with the factura's number. The stock goes down by itself.

> **Good to know:** if a product is returned, when you record the refund you can say how many units go back to stock ([Refunds, rectifying facturas and annulments](/articles/invoices-verifactu/refunds-and-corrections)).

> **Good to know:** services (a report, a test) aren't products: they're created in **Settings › Services & Products** and carry no stock ([Appointment types and services](/articles/settings/appointment-types-and-services)).
