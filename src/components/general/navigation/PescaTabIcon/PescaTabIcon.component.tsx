import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/routers';
import React from 'react';
import { Insets, TouchableWithoutFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePescaTabIconStyles } from './PescaTabIcon.style';

type PescaTabProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  focussed?: boolean;
  disabled?: boolean;
  name: string;
  icon: string;
};

/**
 * Custom tab for being used inside of custom pesca tab bar for react-native-navigation.
 */
export const PescaTabIcon: React.FC<PescaTabProps> = ({ name, navigation, icon, focussed, disabled }) => {
  function navigate() {
    navigation.navigate(name);
  }

  const styles = usePescaTabIconStyles();

  const hitStops: Insets = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  return (
    <View style={styles.tab}>
      <TouchableWithoutFeedback onPress={navigate} disabled={disabled} hitSlop={hitStops}>
        <View>
          <MaterialCommunityIcons
            name={icon}
            style={[styles.icon, focussed && styles.focus, disabled && styles.disabled]}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
