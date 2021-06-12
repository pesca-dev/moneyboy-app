import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { animated, useSpring } from '@react-spring/native';

import PescaButton from '@components/input/PescaButton';
import { FlyoutContext } from '@context/FlyoutContext';
import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';
import PescaInputField from '@components/input/PescaInputField';

const topOffset = -40;
const containerWidth = {
  default: 48,
  max: 200,
};

type CenterButtonProps = {};

export default function CenterButton({}: CenterButtonProps) {
  const flyout = React.useContext(FlyoutContext);

  const [open, setOpen] = useState<boolean>(false);

  // Move the outter container up
  const [animatedContainerStyle, animateContainer] = useSpring(() => ({ top: 0 }));

  // Rotate the center button
  const [animatedButtonStyle, animateButton] = useSpring(() => ({
    rotateZ: '0deg',
  }));

  const [animatedButtonContainerStyle, animateButtonContainer] = useSpring(() => ({ width: containerWidth.default }));

  // Animate everything, if main button is pressed
  function onMainButtonPress() {
    animateContainer.start({
      top: open ? 0 : topOffset,
      config: {
        tension: 200,
        // bounce: 10,
        friction: 30,
        mass: 4,
      },
    });
    animateButton.start({
      from: {
        rotateZ: open ? '45deg' : '0deg',
      },
      to: {
        rotateZ: open ? '90deg' : '45deg',
      },
      config: {
        tension: 200,
        mass: 4,
      },
    });
    animateButtonContainer.start({
      width: open ? containerWidth.default : containerWidth.max,
    });
    setOpen(!open);
  }

  function onAddPaymentButtonPress() {
    flyout.setChildren(
      <>
        <PescaInputField label="Search for a user" />
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
      </>,
      true,
    );
    onMainButtonPress();
  }

  function onAddGroupButtonPress() {
    flyout.setChildren(
      <>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
        <Text>Lol</Text>
      </>,
      true,
    );
    // onMainButtonPress();
  }

  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    addButtonWrapper: {
      height: 32,
      width: 32,
      top: -25,
      overflow: 'visible',
      marginLeft: 15,
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.shadow.default.color,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0.7,
      shadowRadius: 7,
    },
    addButtonOutterContainer: {
      overflow: 'hidden',
      flexDirection: 'row',
      position: 'relative',
      backgroundColor: theme.buttons.add.background,
      borderRadius: 24,
      height: 48,
      width: 48,
    },
    addButtonInnerContainer: {
      flexDirection: 'row',
      overflow: 'hidden',
    },
    addButton: {},
    icon: {
      fontSize: variables.font.size.large,
      color: theme.buttons.add.color,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    addPaymentButton: {
      marginRight: 15,
      paddingRight: 15,
      borderColor: theme.buttons.add.color,
      borderRightWidth: 1,
    },
    addGroupButton: {
      marginLeft: 15,
      paddingLeft: 15,
      borderLeftColor: theme.buttons.add.color,
      borderLeftWidth: 1,
    },
  });

  return (
    <View style={styles.addButtonWrapper}>
      <animated.View style={[animatedContainerStyle, styles.center]}>
        <animated.View style={[styles.addButtonOutterContainer, styles.center, animatedButtonContainerStyle]}>
          <View style={[styles.addButtonInnerContainer, styles.center]}>
            {/*  */}
            <animated.View style={[styles.addPaymentButton]}>
              <PescaButton onPress={onAddPaymentButtonPress}>
                <MaterialCommunityIcons name="credit-card-plus-outline" style={styles.icon} />
              </PescaButton>
            </animated.View>
            {/*  */}
            <animated.View
              style={[
                styles.addButton,
                {
                  transform: [animatedButtonStyle],
                },
              ]}>
              <PescaButton onPress={onMainButtonPress}>
                <MaterialCommunityIcons name="plus" style={styles.icon} />
              </PescaButton>
            </animated.View>
            {/*  */}
            <animated.View style={[styles.addGroupButton]}>
              <PescaButton onPress={onAddGroupButtonPress}>
                <MaterialCommunityIcons name="account-multiple-plus-outline" style={styles.icon} />
              </PescaButton>
            </animated.View>
            {/*  */}
          </View>
        </animated.View>
      </animated.View>
    </View>
  );
}
