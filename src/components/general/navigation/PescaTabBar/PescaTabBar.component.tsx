import { CenterButton } from '@moneyboy/components/general/navigation/CenterButton';
import { PescaTabIcon } from '@moneyboy/components/general/navigation/PescaTabIcon';
import { Footer } from '@moneyboy/components/general/structure/Footer';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { usePescaTabBarStyles } from './PescaTabBar.style';

type PescaTabUIProps = BottomTabBarProps;

/**
 * Custom tab bar for being used in react-anative-navigation.
 */
export const PescaTabBar: React.FC<PescaTabUIProps> = ({ navigation, state }) => {
  // Split tabs depending on their index
  const leftTabs = state.routes.filter((_, index) => index < state.routes.length / 2);
  const rightTabs = state.routes.filter((_, index) => index >= state.routes.length / 2);

  /**
   * Helper function for rendering a tab.
   */
  function renderTab(route: Route<string, any>) {
    return (
      <PescaTabIcon
        key={`route-${route.name}`}
        name={route.name}
        icon={route.params?.icon}
        navigation={navigation}
        focussed={state.index === state.routeNames.indexOf(route.name)}
        disabled={!!route.params?.disabled}
      />
    );
  }

  const styles = usePescaTabBarStyles();

  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      <Footer style={styles.footer}>
        <View style={styles.tabBarContainer}>
          <View style={styles.tabContainer}>{leftTabs.map(tab => renderTab(tab))}</View>
          <CenterButton />
          <View style={styles.tabContainer}>{rightTabs.map(tab => renderTab(tab))}</View>
        </View>
      </Footer>
    </SafeAreaView>
  );
};
