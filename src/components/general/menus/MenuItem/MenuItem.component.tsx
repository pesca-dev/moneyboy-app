import { PescaMenuContextType } from '@moneyboy/api/PescaMenuContextType';
import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { animated, useSpring } from '@react-spring/native';
// eslint-disable-next-line no-restricted-imports
import React, { useCallback, useContext, useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMenuItemStyles } from './MenuItem.style';

type MenuItemProps = {
  iconName: string;
  onPress?: () => void;
};

/**
 * Create a menu item for a PescaMenu. All items will be layout in a half-circle around the Main button.
 */
export const createPescaMenuItem =
  (PescaMenuContext: React.Context<PescaMenuContextType>): React.FC<MenuItemProps> =>
  ({ iconName, onPress }: MenuItemProps) => {
    // TODO lome: introduce own hook for this
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

    const rotation = count > 1 ? 20 + (140 / (count - 1)) * index : 90;

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
          distance: -80,
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

    const styles = useMenuItemStyles();

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
        <PescaButton onPress={handlePress} disabled={!isOpen}>
          <MaterialCommunityIcons name={iconName} style={styles.icon} />
        </PescaButton>
      </animated.View>
    );
  };
