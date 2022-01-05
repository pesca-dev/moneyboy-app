import React, { createContext, PropsWithChildren, useState } from 'react';
import { ColorSchemeName } from 'react-native';

type Settings = {
  theme: ColorSchemeName;
  useSystemTheme: boolean;
};

type SettingsContextType = {
  set<T extends keyof Settings>(key: T, value: Settings[T]): void;
} & Settings;

export const SettingsContext = createContext<SettingsContextType>({
  set<T extends keyof Settings>(_key: T, _value: Settings[T]): void {
    //
  },
  useSystemTheme: true,
  theme: 'light',
});

type SettingsContextProviderProps = unknown;

export const SettingsContextProvider: React.FC<PropsWithChildren<SettingsContextProviderProps>> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    useSystemTheme: true,
    theme: 'light',
  });

  function set<T extends keyof Settings>(key: T, value: Settings[T]): void {
    setSettings(currentSettings => {
      const newSettings = {
        ...currentSettings,
      };
      newSettings[key] = value;
      return newSettings;
    });
  }

  const value = {
    set,
    ...settings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
