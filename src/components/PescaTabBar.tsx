import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { v4 as uuid } from 'react-native-uuid';

import { NavigationEntry } from '@api/NavigationEntry';
import Footer from '@components/Footer';
import PescaTab from './PescaTab';
import AddButton from './AddButton';

type PescaTabUIProps<T = BottomTabBarOptions> = BottomTabBarProps<T> & {
  tabs: NavigationEntry[];
};

export default function PescaTabBar({ tabs, navigation, state }: PescaTabUIProps) {
  const t = tabs.map((tab, i) => {
    return { ...tab, index: i };
  });

  // Split tabs depending on their index
  const leftTabs = t.filter((tab) => tab.index < t.length / 2);
  const rightTabs = t.filter((tab) => tab.index >= t.length / 2);

  /**
   * Helper function for rendering a tab.
   */
  function renderTab({ name, component, icon, index, disabled }: NavigationEntry & { index: number }) {
    return (
      <PescaTab
        key={uuid()}
        name={name}
        component={component}
        icon={icon}
        navigation={navigation}
        focussed={index === state.index}
        disabled={!!disabled}
      />
    );
  }

  return (
    <View>
      <Footer style={styles.footer}>
        <SafeAreaView>
          <View style={styles.tabBarContainer}>
            <View style={styles.tabContainer}>{leftTabs.map(renderTab)}</View>
            <AddButton />
            <View style={styles.tabContainer}>{rightTabs.map(renderTab)}</View>
          </View>
        </SafeAreaView>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { position: 'absolute', bottom: 0, width: '100%', height: 85 },
  tabBarContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
