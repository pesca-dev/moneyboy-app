import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import { StorageItems } from '@moneyboy/api/Storage';
import { usePesca } from '@moneyboy/hooks/usePesca';
import { useStorage } from '@moneyboy/hooks/useStorage';
import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

export const PaymentContext = createContext<PaymentContextType | null>(null);

type PaymentContextProviderProps = unknown;

export const PaymentContextProvider: React.FC<PropsWithChildren<PaymentContextProviderProps>> = ({ children }) => {
  const {
    payments: { create, getAll, update, delete: deletePescaPayment },
  } = usePesca();
  const [storagePayments, setStoragePayments] = useStorage('payments');
  const [payments, updatePayments] = useState<StorageItems['payments']>({});

  const updateState = useCallback(async () => {
    // fetch all payments and update payments in storage
    await getAll().then(fetchedPayments => {
      if (fetchedPayments) {
        setStoragePayments(
          fetchedPayments.reduce<typeof payments>((memo: typeof payments, p) => {
            const key: keyof typeof memo = p.id as keyof typeof memo;
            const newMemo: { [key: string]: Pesca.PaymentInformation } = {
              ...memo,
            };
            newMemo[key] = p as Pesca.PaymentInformation;
            return newMemo;
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

  const getPayment = useCallback(
    (id: keyof typeof payments): Pesca.PaymentInformation | undefined => payments[id],
    [payments],
  );

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

  const deletePayment = useCallback(
    async (id: string) => {
      const result = await deletePescaPayment(id);
      if (result) {
        updateState();
      }
      return result;
    },
    [deletePescaPayment, updateState],
  );

  const context: PaymentContextType = {
    payments: Object.values(payments),
    createPayment,
    getPayment,
    updatePayment,
    deletePayment,
    update: updateState,
  };

  return <PaymentContext.Provider value={context}>{children}</PaymentContext.Provider>;
};
