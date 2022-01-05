import { PescaNavContextScreen, PescaNavContextType } from '@api/PescaNavContextType';
import { PescaNavContext } from '@components/navigation/pesca-navigator/createPescaNavigation';
import { Flyout } from '@components/structure/Flyout';
import { FlyoutHeader } from '@components/structure/FlyoutHeader';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { LayoutAnimation, StyleSheet, View } from 'react-native';

export type PescaNavigatorProps = PropsWithChildren<{
  isOpen: boolean;
  setOpen(open: boolean): void;
  heading?: string;
}>;

export const createPescaNavigator =
  (): React.FC<PescaNavigatorProps> =>
  ({ children, isOpen, setOpen, heading }: PescaNavigatorProps) => {
    const [screens, setScreens] = useState<PescaNavContextScreen[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
      if (isOpen) {
        setCurrentIndex(0);
      }
    }, [isOpen]);

    function register(name: string) {
      if (!screens.map(s => s.name).includes(name)) {
        setScreens(s => [
          ...s,
          {
            name,
          },
        ]);
      }
    }

    function unregister(name: string) {
      setScreens(s => s.filter(screen => screen.name !== name));
    }

    function next(params?: unknown) {
      if (currentIndex + 1 < screens.length) {
        setScreens(s =>
          s.map((screen, i) => {
            if (params && i === currentIndex + 1) {
              // eslint-disable-next-line no-param-reassign
              screen.params = params;
            }
            return screen;
          }),
        );
        LayoutAnimation.easeInEaseOut();
        setCurrentIndex(currentIndex + 1);
      }
    }

    function back() {
      if (currentIndex > 0) {
        LayoutAnimation.easeInEaseOut();
        setCurrentIndex(currentIndex - 1);
      }
    }

    function navigate(name: string) {
      const index = screens.map(s => s.name).indexOf(name);
      if (index === -1) {
        throw new Error('Invalid name specified!');
      }

      setCurrentIndex(index);
    }

    function close() {
      setOpen(false);
    }

    const navContext: PescaNavContextType = {
      register,
      navigate,
      unregister,
      screens,
      current: currentIndex,
      next,
      back,
      close,
    };

    const styles = StyleSheet.create({
      screensContainer: {
        flexDirection: 'row',
        width: '100%',
        maxHeight: '100%',
        paddingBottom: 35,
      },
    });

    return (
      <PescaNavContext.Provider value={navContext}>
        <Flyout isOpen={isOpen} close={close}>
          {heading && <FlyoutHeader heading={heading} />}
          <View style={[styles.screensContainer]}>{children}</View>
        </Flyout>
      </PescaNavContext.Provider>
    );
  };
