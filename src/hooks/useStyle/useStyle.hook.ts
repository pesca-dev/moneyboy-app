import { StyleContext, StyleContextType } from '@moneyboy/contexts/styleContext';
// eslint-disable-next-line no-restricted-imports
import { useContext } from 'react';

export const useStyle: () => StyleContextType = () => useContext(StyleContext);
