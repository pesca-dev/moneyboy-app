import variables from '@config/variables';
import { ThemeContext } from '@context/ThemeContext';
import { NavigationHelpers } from '@react-navigation/core';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { ParamListBase } from '@react-navigation/routers';
import React from 'react';
import { Insets, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type PescaTabProps = {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
  focussed?: boolean;
  disabled?: boolean;
  name: string;
  icon: string;
};

/**
 * Custom tab for being used inside of custom pesca tab bar for react-native-navigation.
 */
export function PescaTabIcon({ name, navigation, icon, focussed, disabled }: PescaTabProps) {
  function navigate() {
    navigation.navigate(name);
  }

  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    tab: {
      minWidth: 32,
      height: 32,
      justifyContent: 'center',
    },
    icon: {
      fontSize: variables.font.size.large,
      color: theme.tab.default.color,
    },
    focus: {
      color: theme.tab.focus.color,
      shadowColor: theme.tab.focus.shadow,
      shadowRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.6,
    },
    disabled: {
      color: theme.tab.disabled.color,
    },
  });

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
}
