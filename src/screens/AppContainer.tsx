import { PescaTabBar } from '@moneyboy/components/general/navigation/pescaTabBar';
import SettingsPanel from '@moneyboy/components/settings/settingsPanel';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { LoginView } from '@moneyboy/screens/auth/login';
import { RegisterView } from '@moneyboy/screens/auth/register';
import { EventView } from '@moneyboy/screens/events';
import { GroupView } from '@moneyboy/screens/groups';
import { HistoryView } from '@moneyboy/screens/history';
import { MainView } from '@moneyboy/screens/main';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();

type AppContainerProps = unknown;

/**
 * Container for the app and the navigation.
 */
export const AppContainer: React.FC<AppContainerProps> = () => {
  const { loggedIn, ready } = useAuth();

  const { Content } = useStyle();
  const styles = StyleSheet.create({
    outterContainer: {
      flex: 1,
      backgroundColor: Content.background.dp01,
    },
    sceneContainer: {
      backgroundColor: 'transparent',
    },
  });

  return (
    <>
      <View style={[styles.outterContainer]}>
        <NavigationContainer>
          {ready && (
            <Tab.Navigator
              detachInactiveScreens={false}
              tabBar={props => loggedIn && <PescaTabBar {...props} />}
              screenOptions={{
                headerShown: false,
              }}
              sceneContainerStyle={[styles.sceneContainer]}>
              {loggedIn ? (
                <>
                  <Tab.Screen name="Overview" component={MainView} initialParams={{ icon: 'home-outline' }} />
                  <Tab.Screen
                    name="Groups"
                    component={GroupView}
                    initialParams={{ icon: 'account-multiple-outline' }}
                  />
                  <Tab.Screen
                    name="Events"
                    component={EventView}
                    initialParams={{ icon: 'calendar-multiple', disabled: true }}
                  />
                  <Tab.Screen name="History" component={HistoryView} initialParams={{ icon: 'history' }} />
                </>
              ) : (
                <>
                  <Tab.Screen name="login" component={LoginView} />
                  <Tab.Screen name="register" component={RegisterView} />
                </>
              )}
            </Tab.Navigator>
          )}
        </NavigationContainer>
        <SettingsPanel />
      </View>
    </>
  );
};
