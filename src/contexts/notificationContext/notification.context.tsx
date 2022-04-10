import { NotificationContextType } from '@moneyboy/api/Notifications';
import { useSecureStorage } from '@moneyboy/hooks/useSecureStorage';
import React, { createContext, FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { isEmulatorSync } from 'react-native-device-info';
import { Notifications, Registered, RegistrationError } from 'react-native-notifications';

export const NotificationContext = createContext<NotificationContextType>({});

export const NotificationContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [useSecureItem] = useSecureStorage();
  const [tokenInStorage, setTokenInStorage] = useSecureItem('token');
  const [finished] = useSecureItem('finished');
  const [token, setToken] = useState<undefined | string>(tokenInStorage);

  const notificationsRegistered = useRef(false);

  useEffect(() => {
    setToken(tokenInStorage);
  }, [tokenInStorage]);

  useEffect(() => {
    const shallRegisterNotifications = !notificationsRegistered.current && finished && !isEmulatorSync();
    if (shallRegisterNotifications) {
      notificationsRegistered.current = true;
      Notifications.registerRemoteNotifications();
      Notifications.events().registerRemoteNotificationsRegistered(({ deviceToken }: Registered) => {
        if (tokenInStorage !== deviceToken) {
          setTokenInStorage(deviceToken);
        }
      });
      Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
        // eslint-disable-next-line no-console
        console.error(event);
      });
      Notifications.events().registerNotificationOpened((notification, completion) => {
        if (notification.badge) {
          // TODO: adjust this to work on android aswell
          if (Platform.OS === 'ios') {
            Notifications.ios
              .getBadgeCount()
              .then(count => Notifications.ios.setBadgeCount(count - notification.badge));
          }
        }
        completion();
      });
    }
  }, [finished, tokenInStorage, setTokenInStorage]);
  return <NotificationContext.Provider value={{ token }}>{children}</NotificationContext.Provider>;
};
