import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import { StorageItems } from '@moneyboy/api/Storage';
import { usePesca } from '@moneyboy/hooks/usePesca';
import { useStorage } from '@moneyboy/hooks/useStorage';
import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

export const PaymentContext = createContext<PaymentContextType | null>(null);

type PaymentContextProviderProps = unknown;

export const PaymentContextProvider: React.FC<PropsWithChildren<PaymentContextProviderProps>> = ({ children }) => {
  const {
    payments: { create, getAll, update },
  } = usePesca();
  const [storagePayments, setStoragePayments] = useStorage('payments');
  const [payments, updatePayments] = useState<StorageItems['payments']>({});

  const updateState = useCallback(async () => {
    // fetch all payments and update payments in storage
    await getAll().then(fetchedPayments => {
      if (fetchedPayments) {
        setStoragePayments(
          fetchedPayments.reduce<typeof payments>((memo, p) => {
            const key: keyof typeof memo = p.id;
            // eslint-disable-next-line no-param-reassign
            memo[key] = p;
            return memo;
          }, {}),
        );
      }
    });
  }, [getAll, setStoragePayments]);

  // initially, we update the payments, that are stored
  useEffect(() => {
    updateState();
  }, [updateState]);

  // when payments in storage change, update payments in state
  useEffect(() => {
    updatePayments(storagePayments);
  }, [storagePayments, updatePayments]);

  // simply forward to pesca client
  const createPayment = async (payment: Pesca.PaymentCreateDTO) => {
    const success = await create(payment);
    if (success) {
      updateState();
    }
    return success;
  };

  const getPayment = useCallback((id: string): Pesca.PaymentInformation | undefined => payments[id], [payments]);

  const updatePayment = useCallback(
    async (payment: Pesca.PaymentUpdateDTO) => {
      const result = await update(payment);
      if (result) {
        updateState();
      }
      return result;
    },
    [update, updateState],
  );

  const context: PaymentContextType = {
    payments: Object.values(payments),
    createPayment,
    getPayment,
    updatePayment,
    update: updateState,
  };

  return <PaymentContext.Provider value={context}>{children}</PaymentContext.Provider>;
};
