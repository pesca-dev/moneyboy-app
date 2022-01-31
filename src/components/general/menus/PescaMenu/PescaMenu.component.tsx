import { PescaMenuContextType } from '@moneyboy/api/PescaMenuContextType';
import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { animated, useSpring } from '@react-spring/native';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePescaMenuStyles } from './PescaMenu.style';

type MainButtonProps = {
  iconName: string;
};

/**
 * Create a Container for a PescaMenu. This includes the button to open and close the menu.
 */
export const createPescaMenuContainer =
  (PescaMenuContext: React.Context<PescaMenuContextType>): React.FC<PropsWithChildren<MainButtonProps>> =>
  ({ children }: PropsWithChildren<MainButtonProps>) => {
    const [isOpen, setOpen] = useState(false);

    // count for items in the menu
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    function open() {
      setOpen(true);
    }

    function close() {
      if (isOpen) {
        setOpen(false);
      }
    }

    function register(fn: (n: number) => void) {
      fn(countRef.current);
      countRef.current += 1;
      setCount(countRef.current);
    }

    function handleClick() {
      if (isOpen) {
        close();
      } else {
        open();
      }
    }

    const contextValue: PescaMenuContextType = {
      isOpen,
      count,
      open,
      close,
      register,
    };

    const [outterContainerAnimStyle, outterContainerAnimation] = useSpring(() => ({
      top: 0,
      config: {
        tension: 200,
        friction: 30,
        mass: 4,
      },
    }));

    const [buttonAnimStyle, buttonAnimation] = useSpring(() => ({
      rotateZ: '0deg',
      size: 48,
    }));

    useEffect(() => {
      outterContainerAnimation.start({
        to: {
          top: isOpen ? -40 : 0,
        },
      });
      buttonAnimation.start({
        from: {
          rotateZ: isOpen ? '0deg' : '45deg',
          size: isOpen ? 48 : 42,
        },
        to: {
          rotateZ: isOpen ? '45deg' : '90deg',
          size: isOpen ? 42 : 48,
        },
      });
    }, [isOpen, outterContainerAnimation, buttonAnimation]);

    const styles = usePescaMenuStyles();

    return (
      <PescaMenuContext.Provider value={contextValue}>
        <View style={styles.addButtonWrapper}>
          <animated.View style={[styles.outterContainer, outterContainerAnimStyle]}>
            {children}
            <animated.View
              style={[
                styles.buttonContainer,
                {
                  transform: [{ rotateZ: buttonAnimStyle.rotateZ }],
                  height: buttonAnimStyle.size,
                  width: buttonAnimStyle.size,
                },
              ]}>
              <PescaButton onPress={handleClick}>
                <MaterialCommunityIcons name="plus" style={styles.icon} />
              </PescaButton>
            </animated.View>
          </animated.View>
        </View>
      </PescaMenuContext.Provider>
    );
  };
