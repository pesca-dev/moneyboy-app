import CenterButton from '@components/input/CenterButton';
import PescaTab from '@components/navigation/PescaTab';
import Footer from '@components/structure/Footer';
import variables from '@config/variables';
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

type PescaTabUIProps<T = BottomTabBarOptions> = BottomTabBarProps<T> & {};

/**
 * Custom tab bar for being used in react-anative-navigation.
 */
export default function PescaTabBar({ navigation, state }: PescaTabUIProps) {
  // Split tabs depending on their index
  const leftTabs = state.routes.filter((_, index) => index < state.routes.length / 2);
  const rightTabs = state.routes.filter((_, index) => index >= state.routes.length / 2);

  /**
   * Helper function for rendering a tab.
   */
  function renderTab(route: Route<any, any>) {
    return (
      <PescaTab
        key={uuid()}
        name={route.name}
        icon={route.params?.icon}
        navigation={navigation}
        focussed={state.index === state.routeNames.indexOf(route.name)}
        disabled={!!route.params?.disabled}
      />
    );
  }

  return (
    <View>
      <Footer style={styles.footer}>
        <SafeAreaView>
          <View style={styles.tabBarContainer}>
            <View style={styles.tabContainer}>{leftTabs.map(tab => renderTab(tab))}</View>
            <CenterButton />
            <View style={styles.tabContainer}>{rightTabs.map(tab => renderTab(tab))}</View>
          </View>
        </SafeAreaView>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    width: '100%',
    height: variables.display.footer.height,
  },
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
