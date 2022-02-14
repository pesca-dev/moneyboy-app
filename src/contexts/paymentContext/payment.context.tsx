import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import { usePesca } from '@moneyboy/hooks/usePesca';
import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

export const PaymentContext = createContext<PaymentContextType | null>(null);

type PaymentContextProviderProps = unknown;

export const PaymentContextProvider: React.FC<PropsWithChildren<PaymentContextProviderProps>> = ({ children }) => {
  const {
    payments: { create, getAll },
  } = usePesca();
  const [payments, updatePayments] = useState<Pesca.PaymentInformation[]>([]);

  const update = useCallback(async () => {
    // fetch all payments and update
    await getAll().then(fetchedPayments => {
      if (fetchedPayments) {
        updatePayments(fetchedPayments);
      }
    });
  }, [getAll]);

  useEffect(() => {
    update();
  }, [update]);

  // simply forward to pesca client
  const createPayment = (payment: Pesca.PaymentCreateDTO) => create(payment);

  const context: PaymentContextType = {
    payments,
    createPayment,
    update,
  };

  return <PaymentContext.Provider value={context}>{children}</PaymentContext.Provider>;
};
