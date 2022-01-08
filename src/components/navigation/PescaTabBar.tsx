import { CenterButton } from '@moneyboy/components/extended/CenterButton';
import { PescaTabIcon } from '@moneyboy/components/navigation/PescaTabIcon';
import { Footer } from '@moneyboy/components/structure/Footer';
import { StyleContext } from '@moneyboy/context/StyleContext';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  const insets = useSafeAreaInsets();
  const { Content } = useContext(StyleContext);
  const styles = StyleSheet.create({
    safeAreaView: {
      backgroundColor: Content.background.dp01,
    },
    footer: {
      height: 64,
      marginBottom: insets.bottom ? 0 : 20, // if we are on an older device, use some default padding
    },
    tabBarContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 8,
    },
    tabContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
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
