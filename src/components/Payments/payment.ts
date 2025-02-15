import { PaymentStage } from '@/types';

export const findPaymentLabel = (paymentStages: PaymentStage[], paymentValue: string) => {
    return paymentStages.find(paymentStage => paymentStage.value === paymentValue)?.label;
};
