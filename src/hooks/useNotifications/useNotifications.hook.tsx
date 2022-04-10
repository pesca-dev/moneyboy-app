/* eslint-disable no-restricted-imports */
import { NotificationContext } from '@moneyboy/contexts/notificationContext';
import { useContext } from 'react';

export const useNotifications = () => useContext(NotificationContext);
