import React from 'react';
import { StyleSheet } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PescaTabBar from '@components/navigation/PescaTabBar';
import { FlyoutContextProvider } from '@context/FlyoutContext';
import { AuthContext } from '@context/AuthContext';
import GroupView from '@views/pages/GroupView';
import HistoryView from '@views/pages/HistoryView';
import LoginView from '@views/pages/LoginView';
import MainView from '@views/pages/MainView';
import SettingsView from '@views/pages/SettingsView';
import RegisterView from '@views/pages/RegisterView';
import { StyleContext } from '@context/StyleContext';

const Tab = createBottomTabNavigator();

/**
 * Container for the app and the navigation.
 */
export default function AppContainer() {
  const { loggedIn, ready } = React.useContext(AuthContext);

  const theme = React.useContext(StyleContext);
  const styles = StyleSheet.create({
    sceneContainer: {
      backgroundColor: theme.content.background,
    },
  });

  return (
    <>
      <FlyoutContextProvider>
        <NavigationContainer>
          {ready && (
            <Tab.Navigator
              tabBar={(props) => loggedIn && <PescaTabBar {...props} />}
              sceneContainerStyle={[styles.sceneContainer]}>
              {loggedIn ? (
                <>
                  <Tab.Screen name="Overview" component={MainView} initialParams={{ icon: 'home-outline' }} />
                  <Tab.Screen
                    name="Groups"
                    component={GroupView}
                    initialParams={{ icon: 'account-multiple-outline' }}
                  />
                  <Tab.Screen name="History" component={HistoryView} initialParams={{ icon: 'history' }} />
                  <Tab.Screen name="Settings" component={SettingsView} initialParams={{ icon: 'cog-outline' }} />
                </>
              ) : (
                <>
                  <Tab.Screen key={uuid()} name="login" component={LoginView} />
                  <Tab.Screen key={uuid()} name="register" component={RegisterView} />
                </>
              )}
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </FlyoutContextProvider>
    </>
  );
}
