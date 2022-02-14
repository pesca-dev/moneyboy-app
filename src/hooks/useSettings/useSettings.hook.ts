/* eslint-disable no-restricted-imports */
import { SettingsContext, SettingsContextType } from '@moneyboy/contexts/settingsContext';
import { useContext } from 'react';

export const useSettings: () => SettingsContextType = () => useContext(SettingsContext);
