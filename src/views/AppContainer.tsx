import { PescaTabBar } from '@components/navigation/PescaTabBar';
import { AuthContext } from '@context/AuthContext';
import { StyleContext } from '@context/StyleContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { EventView } from '@views/pages/EventView';
import { GroupView } from '@views/pages/GroupView';
import { HistoryView } from '@views/pages/HistoryView';
import { LoginView } from '@views/pages/LoginView';
import { MainView } from '@views/pages/MainView';
import { RegisterView } from '@views/pages/RegisterView';
import SettingsPanel from '@views/SettingsPanel';
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
