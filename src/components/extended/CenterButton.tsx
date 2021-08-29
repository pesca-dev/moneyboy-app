import AddPaymentButton from '@components/extended/AddPaymentButton';
import PescaButton from '@components/input/PescaButton';
import variables from '@config/variables';
import { FlyoutContext } from '@context/FlyoutContext';
import { ThemeContext } from '@context/ThemeContext';
import { animated, useSpring } from '@react-spring/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const [animatedButtonContainerStyle, animateButtonContainer] = useSpring(() => ({
    width: containerWidth.default,
    borderRadius: 24,
  }));

  const [distance, animateDistance] = useSpring(() => ({
    distance: 40,
    opacity: 0,
    size: 36,
  }));

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
      borderRadius: open ? 24 : 12,
    });
    animateDistance.start({
      distance: open ? 40 : 60,
      opacity: open ? 0 : 1,
      size: open ? 36 : 48,
      delay: open ? 0 : 100,
    });
    setOpen(!open);
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
      zIndex: 100,
      shadowRadius: 7,
    },
    addButtonOutterContainer: {
      // overflow: 'hidden',
      flexDirection: 'row',
      position: 'relative',
      // backgroundColor: theme.buttons.add.background,
      borderRadius: 24,
      height: 48,
      width: 48,
    },
    addButtonInnerContainer: {
      flexDirection: 'row',
      // overflow: 'hidden',
    },
    addButton: {
      width: 42,
      height: 42,
    },
    icon: {
      fontSize: variables.font.size.large,
      color: theme.buttons.add.color,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    addGroupButton: {
      // marginLeft: 15,
      // paddingLeft: 15,
      // borderLeftColor: theme.buttons.add.color,
      // borderLeftWidth: 1,
    },
    dummy: {
      backgroundColor: theme.buttons.add.background,
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 40,
      borderRadius: 24,
    },
  });

  return (
    <View style={styles.addButtonWrapper}>
      <animated.View style={[animatedContainerStyle, styles.center]}>
        <animated.View style={[styles.addButtonOutterContainer, styles.center, animatedButtonContainerStyle]}>
          <View style={[styles.addButtonInnerContainer, styles.center]}>
            {/*  */}
            <animated.View
              style={[
                styles.dummy,
                {
                  position: 'absolute',
                  transform: [{ rotateZ: '0deg' }, { translateX: distance.distance }, { rotateZ: '-0deg' }],
                  opacity: distance.opacity,
                  width: distance.size,
                  height: distance.size,
                },
              ]}>
              <AddPaymentButton onPress={onMainButtonPress} iconStyle={styles.icon} />
            </animated.View>
            {/*  */}
            <animated.View
              style={[
                styles.dummy,
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
            <animated.View
              style={[
                styles.addGroupButton,
                styles.dummy,
                {
                  position: 'absolute',
                  transform: [{ rotateZ: '-180deg' }, { translateX: distance.distance }, { rotateZ: '180deg' }],
                  opacity: distance.opacity,
                  width: distance.size,
                  height: distance.size,
                },
              ]}>
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
