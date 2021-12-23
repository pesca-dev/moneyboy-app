import { PescaClient } from '@api/PescaClient';
import { createPescaClient } from '@pesca/createPescaClient';
import React, { PropsWithChildren } from 'react';

export const PescaContext = React.createContext<PescaClient | undefined>(undefined);

type PescaContextProviderProps = {};

export const PescaContextProvider: React.FC<PropsWithChildren<PescaContextProviderProps>> = ({ children }) => {
  const parseClient = React.useRef<PescaClient>(createPescaClient('https://moneyboy.pesca.dev'));

  return <PescaContext.Provider value={parseClient.current}>{children}</PescaContext.Provider>;
};
