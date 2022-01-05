import { defaultStorage } from '@context/StorageContext';
import { useStorage } from '@hooks/useStorage';
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
  theme: defaultStorage.theme,
  useSystemTheme: defaultStorage.useSystemTheme,
});

type SettingsContextProviderProps = unknown;

export const SettingsContextProvider: React.FC<PropsWithChildren<SettingsContextProviderProps>> = ({ children }) => {
  const [theme, setTheme] = useStorage('theme');
  const [useSystemTheme, setUseSystemTheme] = useStorage('useSystemTheme');

  const [settings, setSettings] = useState<Settings>({
    theme,
    useSystemTheme,
  });

  function set<T extends keyof Settings>(key: T, value: Settings[T]): void {
    setSettings(currentSettings => {
      const newSettings = {
        ...currentSettings,
      };
      newSettings[key] = value;
      return newSettings;
    });
    switch (key) {
      case 'theme':
        setTheme(value as Settings['theme']);
        break;

      case 'useSystemTheme':
        setUseSystemTheme(value as Settings['useSystemTheme']);
        break;

      default:
    }
  }

  const value = {
    set,
    ...settings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
