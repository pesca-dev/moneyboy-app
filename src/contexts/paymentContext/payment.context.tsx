import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import { StorageItems } from '@moneyboy/api/Storage';
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
  const [payments, updatePayments] = useState<StorageItems['payments']>({});

  const update = useCallback(async () => {
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
    update();
  }, [update]);

  // when payments in storage change, update payments in state
  useEffect(() => {
    updatePayments(storagePayments);
  }, [storagePayments, updatePayments]);

  // simply forward to pesca client
  const createPayment = async (payment: Pesca.PaymentCreateDTO) => {
    const success = await create(payment);
    if (success) {
      update();
    }
    return success;
  };

  const getPayment = useCallback((id: string): Pesca.PaymentInformation | undefined => payments[id], [payments]);

  const updatePayment = useCallback(async (payment: Pesca.PaymentInformation) => {
    //
    return true;
  }, []);

  const context: PaymentContextType = {
    payments: Object.values(payments),
    createPayment,
    getPayment,
    updatePayment,
    update,
  };

  return <PaymentContext.Provider value={context}>{children}</PaymentContext.Provider>;
};
