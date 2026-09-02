---
title: Registrar un pago
description: Registra un pago contra una factura pendiente.
collection: billing-payments
order: 3
---

En la pestaña **Billing** de un paciente, selecciona **Take payment**.

![Account Ledger mostrando una factura y un pago parcial con tarjeta contra ella, con 200,00 € aún pendientes](/screenshots/patient-billing.png)

1. Elige a qué **invoice** aplicar el pago -- por defecto se selecciona la más antigua sin pagar, con su importe completo ya rellenado.
2. Ajusta el **amount** si el paciente solo paga una parte.
3. Elige el **method**: Cash, Card, o Credit (usando el saldo a favor propio del paciente -- limitado a lo que realmente esté disponible).
4. Confirma para registrarlo.

La factura pasa a **Paid** automáticamente en cuanto los pagos registrados suman el importe completo; si no, se queda parcialmente pendiente, y **Take payment** puede volver a usarse más adelante para seguir reduciendo el saldo.

Si un paciente no tiene facturas sin pagar, **Take payment** no tiene nada contra lo que aplicar y no ofrecerá ninguna -- esto es normal justo después de vender un bono o una membresía pagados por completo, ya que eso ya crea y salda su propia factura por la cantidad cobrada en el momento.

## Añadir saldo a favor en su lugar

Si un paciente ha pagado de más, o quieres añadir un saldo que pueda usar más adelante (por ejemplo, un reembolso mantenido en su cuenta), usa **Add credit** en lugar de Take payment -- eso se añade a su saldo a favor en lugar de aplicarse a una factura concreta. El saldo a favor aparece como opción de método de pago la próxima vez que vendas un bono, registres un pago, o el paciente pague al finalizar una cita, así que es una forma cómoda de gestionar reembolsos sin una transferencia bancaria real.

## Dónde aparecen los pagos después

Cada pago, saldo a favor y factura aparece en el **Account Ledger** de la misma pestaña Billing, en orden de fecha con un saldo acumulado -- este es el registro definitivo si un paciente (o tu gestoría) pregunta "¿qué se cobró realmente y cuándo?". También es de donde **Reports** obtiene las cifras de ingresos y saldos pendientes, así que mantener los pagos registrados aquí conforme ocurren (en lugar de anotados aparte en papel) mantiene tus informes precisos.
