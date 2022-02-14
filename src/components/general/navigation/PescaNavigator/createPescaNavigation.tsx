import { PescaNavContextType } from '@moneyboy/api/PescaNavContextType';
import { createContext } from 'react';
import { createPescaNavigator } from './PescaNavigator';
import { createPescaScreen } from './PescaScreen';

// TODO lome: move this to context section
export const PescaNavContext = createContext<PescaNavContextType | null>(null);

/**
 * Create a new pesca navigation, which will happen inside of a Flyout.
 */
export const createPescaNavigation = () => ({
  Navigator: createPescaNavigator(),
  Screen: createPescaScreen(),
});
