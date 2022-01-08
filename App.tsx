import { AuthContextProvider } from '@moneyboy/context/authContext';
import { PescaContextProvider } from '@moneyboy/context/pescaContext';
import { SettingsContextProvider } from '@moneyboy/context/settingsContext';
import { StorageContextProvider } from '@moneyboy/context/storageContext';
import { StyleContextProvider } from '@moneyboy/context/styleContext';
import { AppContainer } from '@moneyboy/screens/AppContainer';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
declare const global: { HermesInternal: null | {} };

type AppProps = unknown;

export const App: React.FC<AppProps> = () => (
  <SafeAreaProvider>
    <StatusBar />
    <StorageContextProvider>
      <SettingsContextProvider>
        <PescaContextProvider>
          <AuthContextProvider>
            <StyleContextProvider>
              <AppContainer />
            </StyleContextProvider>
          </AuthContextProvider>
        </PescaContextProvider>
      </SettingsContextProvider>
    </StorageContextProvider>
  </SafeAreaProvider>
);
