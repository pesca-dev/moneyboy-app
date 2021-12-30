import variables from '@config/variables';
import { StyleContext } from '@context/StyleContext';
import { NavigationHelpers } from '@react-navigation/core';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { ParamListBase } from '@react-navigation/routers';
import React, { useContext } from 'react';
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
export const PescaTabIcon: React.FC<PescaTabProps> = ({ name, navigation, icon, focussed, disabled }) => {
  function navigate() {
    navigation.navigate(name);
  }

  const { Tabs } = useContext(StyleContext);
  const styles = StyleSheet.create({
    tab: {
      minWidth: 32,
      height: 32,
      justifyContent: 'center',
    },
    icon: {
      fontSize: variables.font.size.large,
      color: Tabs.default.color,
    },
    focus: {
      color: Tabs.focus.color,
      shadowColor: Tabs.focus.shadow,
      shadowRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.6,
    },
    disabled: {
      color: Tabs.disabled.color,
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
};