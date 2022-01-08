/* eslint-disable @typescript-eslint/no-empty-function */
import { PescaMenuContextType } from '@moneyboy/api/PescaMenuContextType';
import { createPescaMenuItem } from '@moneyboy/components/general/pescaMenu/menuItem';
import { createPescaMenuContainer } from '@moneyboy/components/general/pescaMenu/pescaMenu';
import { createContext } from 'react';

/**
 * Create a PescaMenu.
 */
export const createPescaMenu = () => {
  const PescaMenuContext = createContext<PescaMenuContextType>({
    count: 0,
    isOpen: false,
    open() {},
    close() {},
    register(_fn) {},
  });
  return {
    Menu: createPescaMenuContainer(PescaMenuContext),
    Item: createPescaMenuItem(PescaMenuContext),
  };
};
