import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { v4 as uuid } from 'react-native-uuid';
import { StatusBar } from 'react-native';

import MainView from '@views/MainView';
import HistoryView from '@views/HistoryView';
import GroupView from '@views/GroupView';
import PescaTabBar from '@components/PescaTabBar';
import { NavigationEntry } from '@api/NavigationEntry';
import SettingsView from '@views/SettingsView';
import { FlyoutContextProvider } from '@context/FlyoutContext';

declare const global: { HermesInternal: null | {} };
const Tab = createBottomTabNavigator();

const tabs: NavigationEntry[] = [
  { name: 'Overview', component: MainView, icon: 'home-outline' },
  { name: 'Groups', component: GroupView, icon: 'account-multiple-outline' },
  { name: 'History', component: HistoryView, icon: 'history' },
  { name: 'Settings', component: SettingsView, icon: 'cog-outline' },
];

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlyoutContextProvider>
        <NavigationContainer>
          <Tab.Navigator tabBar={(props) => <PescaTabBar {...{ tabs, ...props }} />}>
            {tabs.map(({ name, component }) => (
              <Tab.Screen
                key={uuid()}
                name={name}
                children={() => {
                  return React.createElement(component, {});
                }}
              />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </FlyoutContextProvider>
    </>
  );
}
