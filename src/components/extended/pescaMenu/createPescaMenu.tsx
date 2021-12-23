import { PescaMenuContextType } from '@api/PescaMenuContextType';
import { createPescaMenuItem } from '@components/extended/pescaMenu/menuItem';
import { createPescaMenuContainer } from '@components/extended/pescaMenu/pescaMenu';
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
