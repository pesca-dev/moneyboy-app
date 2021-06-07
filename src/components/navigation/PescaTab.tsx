import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/routers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
export default function PescaTab({ name, navigation, icon, focussed, disabled }: PescaTabProps) {
  function navigate() {
    navigation.navigate(name);
  }

  return (
    <View style={styles.tab}>
      <TouchableWithoutFeedback
        onPress={navigate}
        disabled={disabled}
        hitSlop={{
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
        }}>
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

const styles = StyleSheet.create({
  tab: {
    minWidth: 32,
    height: 32,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    color: '#7f8c8d',
  },
  focus: {
    color: '#34495e',
    shadowColor: '#42423d',
    shadowRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
  },
  disabled: {
    color: '#bdc3c7',
  },
});
