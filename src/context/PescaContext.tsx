import React, { PropsWithChildren } from 'react';

import { PescaClient } from '@api/PescaClient';

import createPescaClient from '@pesca/createPescaClient';

export const PescaContext = React.createContext<PescaClient | undefined>(undefined);

type PescaContextProviderProps = {};

export function PescaContextProvider({ children }: PropsWithChildren<PescaContextProviderProps>) {
  const parseClient = React.useRef<PescaClient>(createPescaClient('http://192.168.2.127:3000'));

  return <PescaContext.Provider value={parseClient.current}>{children}</PescaContext.Provider>;
}
