import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { Text } from 'react-native';

import { FlyoutType } from '@api/FlyoutType';
import Flyout from '@components/structure/Flyout';

/**
 * @deprecated use flyout directly instead
 */
export const FlyoutContext = React.createContext<FlyoutType>({
  open() {},
  close() {},
  setChildren(_childred: ReactNode, _open?: boolean) {},
});

type FlyoutContextProviderProps = {};

type FlyoutState = {
  open: boolean;
  children: ReactNode;
};

/**
 * Component, which provides a way to create and manage a flyout.
 *
 * @deprecated use flyout directly instead
 */
export function FlyoutContextProvider({ children }: PropsWithChildren<FlyoutContextProviderProps>) {
  const [flyoutState, setFlyoutState] = useState<FlyoutState>({
    open: false,
    children: <Text> Lol </Text>,
  });

  function openFlyout() {
    setFlyoutState({
      ...flyoutState,
      open: true,
    });
  }

  function closeFlyout() {
    setFlyoutState({
      ...flyoutState,
      open: false,
    });
  }

  function setFlyoutChildren(childs: ReactNode, open?: boolean) {
    setFlyoutState({
      ...flyoutState,
      children: childs,
      open: !!open,
    });
  }

  const flyout: FlyoutType = {
    open: openFlyout,
    close: closeFlyout,
    setChildren: setFlyoutChildren,
  };

  return (
    <FlyoutContext.Provider value={flyout}>
      {children}
      <Flyout isOpen={flyoutState.open} close={closeFlyout}>
        {flyoutState.children}
      </Flyout>
    </FlyoutContext.Provider>
  );
}
