---
title: Cobrar un pago
description: Registra un pago contra una factura pendiente.
collection: billing-payments
order: 3
---

En la pestaña **Billing** de un paciente, selecciona **Take payment**.

1. Elige a qué **factura** aplicar el pago -- por defecto es la pendiente más antigua, con su importe total ya rellenado.
2. Ajusta el **importe** si el paciente solo paga una parte.
3. Elige el **método**: Cash, Card, o Credit (usando el saldo a favor de la cuenta del paciente -- limitado a lo realmente disponible).
4. Confirma para registrarlo.

![Account Ledger mostrando una factura y un pago parcial con tarjeta contra ella, con €200.00 aún pendientes](/screenshots/patient-billing.png)

La factura pasa a **Paid** automáticamente en cuanto los pagos registrados contra ella suman el importe total; si no, se queda parcialmente pendiente.

## Añadir saldo en su lugar

Si un paciente ha pagado de más o quieres añadir un saldo que pueda usar más adelante (un reembolso guardado en la cuenta, por ejemplo), usa **Add credit** en lugar de Take payment -- eso añade saldo a la cuenta del paciente en lugar de aplicarlo a una factura concreta.
