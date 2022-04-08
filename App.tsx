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
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { Notification, Notifications, Registered, RegistrationError } from 'react-native-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
declare const global: { HermesInternal: null | {} };

type AppProps = unknown;

export const App: React.FC<AppProps> = () => {
  useEffect(() => {
    if (!isEmulatorSync()) {
      Notifications.registerRemoteNotifications();

      Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
        console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
        completion({ alert: false, sound: false, badge: false });
      });

      Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      });

      Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      });
      Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
        console.error(event);
      });
    }
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar />
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
};
