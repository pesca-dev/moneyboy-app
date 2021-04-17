import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import PescaButton from '@components/input/PescaButton';
import { FlyoutContext } from '@context/FlyoutContext';

const topOffset = -40;
const maxRotation = Math.PI / 4;
const defaultContainerWidth = 48;
const maxContainerWidth = 200;

const springConfig: Animated.WithSpringConfig = {
  stiffness: 15,
  mass: 0.1,
};

type AddButtonProps = {};

// TODO lome: Clean this mess up
export default function AddButton({}: AddButtonProps) {
  const flyout = React.useContext(FlyoutContext);

  const containerOffset = useSharedValue(0);
  const buttonRotation = useSharedValue(0);
  const buttonContainerWidth = useSharedValue(defaultContainerWidth);

  const buttonOpacity = useSharedValue(0);

  const [open, setOpen] = useState<boolean>(false);

  // Move the outter container up
  const animatedContainer = useAnimatedStyle(() => {
    return {
      top: withSpring(containerOffset.value),
    };
  });

  // Rotate the center button
  const animatedButton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(buttonRotation.value),
        },
      ],
    };
  });

  // Make the button container wider
  const animatedButtonContainer = useAnimatedStyle(() => {
    return {
      width: withSpring(buttonContainerWidth.value, springConfig),
    };
  });

  // Animate everything, if main button is pressed
  function onMainButtonPress() {
    containerOffset.value = open ? 0 : topOffset;
    buttonRotation.value = open ? 0 : maxRotation;
    buttonContainerWidth.value = open ? defaultContainerWidth : maxContainerWidth;
    buttonOpacity.value = open ? 0 : 1;
    setOpen(!open);
  }

  function onAddPaymentButtonPress() {
    flyout.setChildren(
      <>
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

  return (
    <View style={styles.addButtonWrapper}>
      <Animated.View style={[animatedContainer, styles.center]}>
        <Animated.View style={[styles.addButtonOutterContainer, styles.center, animatedButtonContainer]}>
          <View style={[styles.addButtonInnerContainer, styles.center]}>
            {/*  */}
            <Animated.View style={[styles.addPaymentButton]}>
              <PescaButton onPress={onAddPaymentButtonPress}>
                <MaterialCommunityIcons name="currency-eur" style={styles.icon} />
              </PescaButton>
            </Animated.View>
            {/*  */}
            <Animated.View style={[styles.addButton, animatedButton]}>
              <PescaButton onPress={onMainButtonPress}>
                <MaterialCommunityIcons name="plus" style={styles.icon} />
              </PescaButton>
            </Animated.View>
            {/*  */}
            <Animated.View style={[styles.addGroupButton]}>
              <PescaButton onPress={onAddGroupButtonPress}>
                <MaterialCommunityIcons name="account-multiple-plus-outline" style={styles.icon} />
              </PescaButton>
            </Animated.View>
            {/*  */}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

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
  },
  addButtonOutterContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#3498db',
    borderRadius: 24,
    height: 48,
    width: 48,
    shadowColor: '#42423d',
    shadowRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },
  addButtonInnerContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  addButton: {},
  icon: {
    fontSize: 32,
    color: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPaymentButton: {
    marginRight: 15,
    paddingRight: 15,
    borderColor: '#fff',
    borderRightWidth: 1,
  },
  addGroupButton: {
    marginLeft: 15,
    paddingLeft: 15,
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
  },
});
