import { SettingsContext, SettingsContextType } from '@moneyboy/contexts/settingsContext';
// eslint-disable-next-line no-restricted-imports
import { useContext } from 'react';

export const useSettings: () => SettingsContextType = () => useContext(SettingsContext);
