import React from 'react';
import { v4 as uuid } from 'react-native-uuid';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationEntry } from '@api/NavigationEntry';
import PescaTabBar from '@components/navigation/PescaTabBar';
import { FlyoutContextProvider } from '@context/FlyoutContext';
import { AuthContext } from '@context/LoginContext';
import GroupView from '@views/pages/GroupView';
import HistoryView from '@views/pages/HistoryView';
import LoginView from '@views/pages/LoginView';
import MainView from '@views/pages/MainView';
import SettingsView from '@views/pages/SettingsView';
import RegisterView from '@views/pages/RegisterView';

const Tab = createBottomTabNavigator();

const tabs: NavigationEntry[] = [
  { name: 'Overview', component: MainView, icon: 'home-outline' },
  { name: 'Groups', component: GroupView, icon: 'account-multiple-outline' },
  { name: 'History', component: HistoryView, icon: 'history' },
  { name: 'Settings', component: SettingsView, icon: 'cog-outline' },
];

/**
 * Container for the app and the navigation.
 */
export default function AppContainer() {
  const { loggedIn } = React.useContext(AuthContext);

  return (
    <>
      <FlyoutContextProvider>
        <NavigationContainer>
          <Tab.Navigator tabBar={(props) => loggedIn && <PescaTabBar {...{ tabs, ...props }} />}>
            {loggedIn ? (
              tabs.map(({ name, component }) => (
                <Tab.Screen
                  key={uuid()}
                  name={name}
                  children={() => {
                    return React.createElement(component, {});
                  }}
                />
              ))
            ) : (
              <>
                <Tab.Screen key={uuid()} name="login" component={LoginView} />
                <Tab.Screen key={uuid()} name="register" component={RegisterView} />
              </> // <RegisterView />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </FlyoutContextProvider>
    </>
  );
}
