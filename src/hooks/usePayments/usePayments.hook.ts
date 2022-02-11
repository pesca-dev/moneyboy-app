import { PaymentContext } from '@moneyboy/contexts/paymentContext';
import { useContext } from 'react';

export const usePayments = () => useContext(PaymentContext);
