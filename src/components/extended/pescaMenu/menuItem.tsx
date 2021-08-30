import { PescaMenuContextType } from '@api/PescaMenuContextType';
import PescaButton from '@components/input/PescaButton';
import { ThemeContext } from '@context/ThemeContext';
import { animated, useSpring } from '@react-spring/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type MenuItemProps = {
  iconName: string;
  onPress?: () => void;
};

/**
 * Create a menu item for a PescaMenu. All items will be layout in a half-circle around the main button.
 */
export function createPescaMenuItem(PescaMenuContext: React.Context<PescaMenuContextType>): React.FC<MenuItemProps> {
  return function ({ iconName, onPress }: MenuItemProps) {
    const { isOpen, count, close, register } = useContext(PescaMenuContext);

    const [index, setIndex] = useState(-1);

    // initial fetch the index of this menu item
    useEffect(() => {
      if (index < 0) {
        register(setIndex);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handlePress() {
      onPress?.();
      close();
    }

    const rotation = count > 1 ? (180 / (count - 1)) * index : 90;

    const [animStyle, animation] = useSpring(() => ({
      size: 36,
      opacity: 0,
      distance: -40,
    }));

    const animateOpen = useCallback(() => {
      animation.start({
        to: {
          size: 48,
          opacity: 1,
          distance: -60,
        },
        delay: index * 100,
      });
    }, [index, animation]);

    const animateClose = useCallback(() => {
      animation.start({
        to: {
          size: 36,
          opacity: 0,
          distance: -40,
        },
        delay: index * 50,
      });
    }, [animation, index]);

    useEffect(() => {
      if (isOpen) {
        animateOpen();
      } else {
        animateClose();
      }
    }, [isOpen, animateOpen, animateClose]);

    const theme = useContext(ThemeContext);
    const styles = StyleSheet.create({
      buttonContainer: {
        position: 'absolute',
        backgroundColor: theme.buttons.add.background,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
      },
      icon: {
        fontSize: 28,
        color: theme.buttons.add.color,
      },
    });

    return (
      <animated.View
        style={[
          styles.buttonContainer,
          {
            height: animStyle.size,
            width: animStyle.size,
            opacity: animStyle.opacity,
            transform: [
              { rotateZ: `${rotation}deg` },
              { translateX: animStyle.distance },
              { rotateZ: `-${rotation}deg` },
            ],
          },
        ]}>
        <PescaButton onPress={handlePress}>
          <MaterialCommunityIcons name={iconName} style={styles.icon} />
        </PescaButton>
      </animated.View>
    );
  };
}
