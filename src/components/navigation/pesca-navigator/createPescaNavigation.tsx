import { PescaNavContextType } from '@moneyboy/api/PescaNavContextType';
import { createContext } from 'react';
import { createPescaNavigator } from './pescaNavigator';
import { createPescaScreen } from './pescaScreen';

export const PescaNavContext = createContext<PescaNavContextType | null>(null);

/**
 * Create a new pesca navigation, which will happen inside of a flyout.
 */
export const createPescaNavigation = () => ({
  Navigator: createPescaNavigator(),
  Screen: createPescaScreen(),
});
