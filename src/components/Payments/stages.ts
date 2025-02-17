import { ConfigurationContextValue } from '@/root/ConfigurationContext';
import { Payment } from '@/types';

export type PaymentsByStage = Record<Payment['stage'], Payment[]>;

export const getPaymentsByStage = (
  unorderedDeals: Payment[],
  paymentStages: ConfigurationContextValue['paymentStages']
) => {
  if (!paymentStages) return {};
  const paymentsByStage: Record<Payment['stage'], Payment[]> =
    unorderedDeals.reduce(
      (acc, payment) => {
        acc[payment.stage].push(payment);
        return acc;
      },
      paymentStages.reduce(
        (obj, stage) => ({ ...obj, [stage.value]: [] }),
        {} as Record<Payment['stage'], Payment[]>
      )
    );
  // order each column by index
  paymentStages.forEach(stage => {
    paymentsByStage[stage.value] = paymentsByStage[stage.value].sort(
      (recordA: Payment, recordB: Payment) => recordA.index - recordB.index
    );
  });
  return paymentsByStage;
};
