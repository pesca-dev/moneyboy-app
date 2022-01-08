import { PescaTabBar } from '@moneyboy/components/navigation/PescaTabBar';
import { AuthContext } from '@moneyboy/context/AuthContext';
import { StyleContext } from '@moneyboy/context/StyleContext';
import { EventView } from '@moneyboy/views/pages/EventView';
import { GroupView } from '@moneyboy/views/pages/GroupView';
import { HistoryView } from '@moneyboy/views/pages/HistoryView';
import { LoginView } from '@moneyboy/views/pages/LoginView';
import { MainView } from '@moneyboy/views/pages/MainView';
import { RegisterView } from '@moneyboy/views/pages/RegisterView';
import SettingsPanel from '@moneyboy/views/SettingsPanel';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();

type AppContainerProps = unknown;

/**
 * Container for the app and the navigation.
 */
export const AppContainer: React.FC<AppContainerProps> = () => {
  const { loggedIn, ready } = React.useContext(AuthContext);

  const { Content } = useContext(StyleContext);
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
