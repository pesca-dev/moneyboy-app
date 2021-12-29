import React, { PropsWithChildren } from 'react';

export type StyleContextType = {};

export const StyleContext = React.createContext<StyleContextType>({});

type StyleContextProviderProps = {};

export const StyleContextProvider: React.FC<PropsWithChildren<StyleContextProviderProps>> = ({ children }) => {
  return <StyleContext.Provider value={{}}>{children}</StyleContext.Provider>;
};
