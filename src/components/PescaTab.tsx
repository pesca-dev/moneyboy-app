import React from 'react';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/routers';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationEntry } from '@api/NavigationEntry';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type PescaTabProps = NavigationEntry & {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  focussed?: boolean;
  disabled?: boolean;
};

export default function PescaTab({ name, navigation, icon, focussed, disabled }: PescaTabProps) {
  function navigate() {
    navigation.navigate(name);
  }

  return (
    <View style={styles.tab}>
      <TouchableWithoutFeedback onPress={navigate} disabled={disabled}>
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
