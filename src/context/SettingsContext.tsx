import React, { createContext, PropsWithChildren } from 'react';

type SettingsContextType = {};

export const SettingsContext = createContext<SettingsContextType>({});

type SettingsContextProviderProps = {};

export const SettingsContextProvider: React.FC<PropsWithChildren<SettingsContextProviderProps>> = ({ children }) => {
  return <SettingsContext.Provider value={{}}>{children}</SettingsContext.Provider>;
};
