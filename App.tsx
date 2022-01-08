import { AuthContextProvider } from '@moneyboy/context/AuthContext';
import { PescaContextProvider } from '@moneyboy/context/PescaContext';
import { SettingsContextProvider } from '@moneyboy/context/SettingsContext';
import { StorageContextProvider } from '@moneyboy/context/StorageContext';
import { StyleContextProvider } from '@moneyboy/context/StyleContext';
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
