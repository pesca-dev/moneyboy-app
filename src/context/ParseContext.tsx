import React, { PropsWithChildren } from 'react';

import createParseClient from '@parse/createParseClient';
import { ParseClient } from '@api/ParseClient';

export const ParseContext = React.createContext<ParseClient | undefined>(undefined);

type ParseContextProviderProps = {};

export function ParseContextProvider({ children }: PropsWithChildren<ParseContextProviderProps>) {
  const parseClient = React.useRef<ParseClient>(createParseClient('moneyboy', 'https://moneyboy.pesca.dev/parse'));

  return <ParseContext.Provider value={parseClient.current}>{children}</ParseContext.Provider>;
}
