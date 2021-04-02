import React, { ReactNode, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { v4 as uuid } from 'react-native-uuid';
import { StatusBar, Text } from 'react-native';

import MainView from '@views/MainView';
import HistoryView from '@views/HistoryView';
import GroupView from '@views/GroupView';
import PescaTabBar from '@components/PescaTabBar';
import { NavigationEntry } from '@api/NavigationEntry';
import SettingsView from '@views/SettingsView';
import Flyout from '@components/Flyout';
import { FlyoutType } from '@api/FlyoutType';

declare const global: { HermesInternal: null | {} };
const Tab = createBottomTabNavigator();

const tabs: NavigationEntry[] = [
  { name: 'Overview', component: MainView, icon: 'home-outline' },
  { name: 'Groups', component: GroupView, icon: 'account-multiple-outline' },
  { name: 'History', component: HistoryView, icon: 'history' },
  { name: 'Settings', component: SettingsView, icon: 'cog-outline' },
];

type FlyoutState = {
  open: boolean;
  children: ReactNode;
};

export default function App() {
  const [flyoutState, setFlyoutState] = useState<FlyoutState>({
    open: false,
    children: <Text> Lol </Text>,
  });

  function openFlyout() {
    setFlyoutState({
      ...flyoutState,
      open: true,
    });
  }

  function closeFlyout() {
    setFlyoutState({
      ...flyoutState,
      open: false,
    });
  }

  function setFlyoutChildren(children: ReactNode, open?: boolean) {
    setFlyoutState({
      ...flyoutState,
      children: children,
      open: !!open,
    });
  }

  const flyout: FlyoutType = {
    open: openFlyout,
    close: closeFlyout,
    setChildren: setFlyoutChildren,
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <PescaTabBar {...{ tabs, flyout, ...props }} />}>
          {tabs.map(({ name, component }) => (
            <Tab.Screen
              key={uuid()}
              name={name}
              children={() => {
                return React.createElement(component, {
                  flyout,
                });
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
      <Flyout open={flyoutState.open} flyout={flyout}>
        {flyoutState.children}
      </Flyout>
    </>
  );
}
