import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import { PaymentContext } from '@moneyboy/contexts/paymentContext';
// eslint-disable-next-line no-restricted-imports
import { useContext } from 'react';

export const usePayments = () => useContext(PaymentContext) as PaymentContextType;
