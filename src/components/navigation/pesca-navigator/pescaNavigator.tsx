import { PescaNavContextScreen, PescaNavContextType } from '@api/PescaNavContextType';
import Flyout from '@components/structure/Flyout';
import { ThemeContext } from '@context/ThemeContext';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';

type PescaNavigatorProps = PropsWithChildren<{
  isOpen: boolean;
  setOpen(open: boolean): void;
  heading?: string;
}>;

export function createPescaNavigator(
  PescaNavContext: React.Context<PescaNavContextType | null>,
): React.FC<PescaNavigatorProps> {
  return function ({ children, isOpen, setOpen, heading }: PescaNavigatorProps) {
    const [screens, setScreens] = useState<PescaNavContextScreen[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

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

    function next(params?: any) {
      if (currentIndex + 1 < screens.length) {
        setScreens(s =>
          s.map((screen, i) => {
            if (params && i === currentIndex + 1) {
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

    const navContext: PescaNavContextType = {
      register,
      navigate,
      unregister,
      screens,
      current: currentIndex,
      next,
      back,
    };

    const theme = useContext(ThemeContext);
    const style = StyleSheet.create({
      screensContainer: {
        flexDirection: 'row',
        width: '100%',
      },
      flyoutHeading: {
        color: theme.flyout.heading.color,
        fontSize: theme.flyout.heading.fontSize,
        fontWeight: 'bold',
      },
    });

    return (
      <PescaNavContext.Provider value={navContext}>
        <Flyout isOpen={isOpen} close={() => setOpen(false)}>
          {heading && (
            <View style={{ width: '100%' }}>
              <Text style={[style.flyoutHeading]}>{heading}</Text>
            </View>
          )}
          <View style={[style.screensContainer]}>{children}</View>
        </Flyout>
      </PescaNavContext.Provider>
    );
  };
}
