// eslint-disable-next-line no-restricted-imports
import { StyleContext, StyleContextType } from '@moneyboy/contexts/styleContext';
import { useContext } from 'react';

export const useStyle: () => StyleContextType = () => useContext(StyleContext);
