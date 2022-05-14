/* eslint-disable no-restricted-imports */
import { AuthContextProvider } from '@moneyboy/contexts/authContext';
import { NotificationContextProvider } from '@moneyboy/contexts/notificationContext';
import { PaymentContextProvider } from '@moneyboy/contexts/paymentContext';
import { PescaContextProvider } from '@moneyboy/contexts/pescaContext';
import { SecureStorageContextProvider } from '@moneyboy/contexts/secureStorageContext';
import { SettingsContextProvider } from '@moneyboy/contexts/settingsContext';
import { StorageContextProvider } from '@moneyboy/contexts/storageContext';
import { StyleContextProvider } from '@moneyboy/contexts/styleContext';
import { AppContainer } from '@moneyboy/screens/AppContainer';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
declare const global: { HermesInternal: null | {} };

type AppProps = unknown;

export const App: React.FC<AppProps> = () => (
  <SafeAreaProvider>
    <StorageContextProvider>
      <SecureStorageContextProvider>
        <SettingsContextProvider>
          <NotificationContextProvider>
            <PescaContextProvider>
              <AuthContextProvider>
                <PaymentContextProvider>
                  <StyleContextProvider>
                    <AppContainer />
                  </StyleContextProvider>
                </PaymentContextProvider>
              </AuthContextProvider>
            </PescaContextProvider>
          </NotificationContextProvider>
        </SettingsContextProvider>
      </SecureStorageContextProvider>
    </StorageContextProvider>
  </SafeAreaProvider>
);
