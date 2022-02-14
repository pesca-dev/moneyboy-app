/* eslint-disable no-restricted-imports */
import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import { PaymentContext } from '@moneyboy/contexts/paymentContext';
import { useContext } from 'react';

export const usePayments = () => useContext(PaymentContext) as PaymentContextType;
