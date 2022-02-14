import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import { usePesca } from '@moneyboy/hooks/usePesca';
import { useStorage } from '@moneyboy/hooks/useStorage';
import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

export const PaymentContext = createContext<PaymentContextType | null>(null);

type PaymentContextProviderProps = unknown;

export const PaymentContextProvider: React.FC<PropsWithChildren<PaymentContextProviderProps>> = ({ children }) => {
  const {
    payments: { create, getAll },
  } = usePesca();
  const [storagePayments, setStoragePayments] = useStorage('payments');
  const [payments, updatePayments] = useState<Pesca.PaymentInformation[]>([]);

  const update = useCallback(async () => {
    // fetch all payments and update payments in storage
    await getAll().then(fetchedPayments => {
      if (fetchedPayments) {
        setStoragePayments(fetchedPayments);
      }
    });
  }, [getAll, setStoragePayments]);

  // initially, we update the payments, that are stored
  useEffect(() => {
    update();
  }, [update]);

  // when payments in storage change, update payments in state
  useEffect(() => {
    updatePayments(storagePayments);
  }, [storagePayments, updatePayments]);

  // simply forward to pesca client
  const createPayment = (payment: Pesca.PaymentCreateDTO) => create(payment);

  const context: PaymentContextType = {
    payments,
    createPayment,
    update,
  };

  return <PaymentContext.Provider value={context}>{children}</PaymentContext.Provider>;
};
