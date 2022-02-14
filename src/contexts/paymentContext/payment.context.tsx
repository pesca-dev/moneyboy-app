import { PaymentContextType } from '@moneyboy/api/PaymentContextType';
import React, { createContext, PropsWithChildren } from 'react';

export const PaymentContext = createContext<PaymentContextType | null>(null);

type PaymentContextProviderProps = unknown;

export const PaymentContextProvider: React.FC<PropsWithChildren<PaymentContextProviderProps>> = ({ children }) => (
  <PaymentContext.Provider value={null}>{children}</PaymentContext.Provider>
);
