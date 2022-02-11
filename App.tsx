import { AuthContextProvider } from '@moneyboy/contexts/authContext';
import { PaymentContextProvider } from '@moneyboy/contexts/paymentContext';
import { PescaContextProvider } from '@moneyboy/contexts/pescaContext';
import { SettingsContextProvider } from '@moneyboy/contexts/settingsContext';
import { StorageContextProvider } from '@moneyboy/contexts/storageContext';
import { StyleContextProvider } from '@moneyboy/contexts/styleContext';
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
            <PaymentContextProvider>
              <StyleContextProvider>
                <AppContainer />
              </StyleContextProvider>
            </PaymentContextProvider>
          </AuthContextProvider>
        </PescaContextProvider>
      </SettingsContextProvider>
    </StorageContextProvider>
  </SafeAreaProvider>
);
