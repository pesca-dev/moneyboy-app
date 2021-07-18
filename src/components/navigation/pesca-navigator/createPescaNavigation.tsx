import { PescaNavContextType } from '@api/PescaNavContextType';
import { createContext } from 'react';
import { createPescaNavigator } from './pescaNavigator';
import { createPescaScreen } from './pescaScreen';

/**
 * Create a new pesca navigation, which will happen inside of a flyout.
 */
export function createPescaNavigation() {
  const PescaNavContext = createContext<PescaNavContextType | null>(null);
  return {
    Navigator: createPescaNavigator(PescaNavContext),
    Screen: createPescaScreen(PescaNavContext),
  };
}
