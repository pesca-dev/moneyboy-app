import React, { createContext, PropsWithChildren } from 'react';

type SettingsContextType = unknown;

export const SettingsContext = createContext<SettingsContextType>({});

type SettingsContextProviderProps = unknown;

export const SettingsContextProvider: React.FC<PropsWithChildren<SettingsContextProviderProps>> = ({ children }) => (
  <SettingsContext.Provider value={{}}>{children}</SettingsContext.Provider>
);
