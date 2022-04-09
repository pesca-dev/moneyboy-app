import { NotificationContextType } from '@moneyboy/api/Notifications';
import { useSecureStorage } from '@moneyboy/hooks/useSecureStorage';
import React, { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { isEmulatorSync } from 'react-native-device-info';
import { Notifications, Registered, RegistrationError } from 'react-native-notifications';

export const NotificationContext = createContext<NotificationContextType>({});

export const NotificationContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [useSecureItem] = useSecureStorage();
  const [tokenInStorage, setTokenInStorage] = useSecureItem('token');
  const [token, setToken] = useState<undefined | string>(tokenInStorage);

  useEffect(() => {
    setToken(tokenInStorage);
  }, [tokenInStorage]);

  useEffect(() => {
    if (!isEmulatorSync()) {
      Notifications.registerRemoteNotifications();
      Notifications.events().registerRemoteNotificationsRegistered(({ deviceToken }: Registered) => {
        setTokenInStorage(deviceToken);
      });
      Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
        // eslint-disable-next-line no-console
        console.error(event);
      });
    }
  }, [setTokenInStorage]);
  return <NotificationContext.Provider value={{ token }}>{children}</NotificationContext.Provider>;
};
