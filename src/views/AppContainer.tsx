import PescaButton from '@components/input/PescaButton';
import { createPescaNavigation } from '@components/navigation/pesca-navigator/createPescaNavigation';
import { ScreenComponentProps } from '@components/navigation/pesca-navigator/pescaScreen';
import PescaTabBar from '@components/navigation/PescaTabBar';
import { AuthContext } from '@context/AuthContext';
import { ThemeContext } from '@context/ThemeContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import GroupView from '@views/pages/GroupView';
import HistoryView from '@views/pages/HistoryView';
import LoginView from '@views/pages/LoginView';
import MainView from '@views/pages/MainView';
import RegisterView from '@views/pages/RegisterView';
import SettingsView from '@views/pages/SettingsView';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

const Tab = createMaterialTopTabNavigator();

const Pesca = createPescaNavigation();

/**
 * Container for the app and the navigation.
 */
export default function AppContainer() {
  const { loggedIn, ready } = React.useContext(AuthContext);

  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    sceneContainer: {
      backgroundColor: theme.content.background,
    },
  });

  return (
    <>
      <NavigationContainer>
        {ready && (
          <Tab.Navigator
            tabBar={props => loggedIn && <PescaTabBar {...props} />}
            tabBarPosition="bottom"
            sceneContainerStyle={[styles.sceneContainer]}>
            {loggedIn ? (
              <>
                <Tab.Screen name="Overview" component={MainView} initialParams={{ icon: 'home-outline' }} />
                <Tab.Screen name="Groups" component={GroupView} initialParams={{ icon: 'account-multiple-outline' }} />
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
        {/* <Pesca.Navigator>
          <Pesca.Screen name="FirstScreen" component={FirstScreen} />
          <Pesca.Screen name="SecondScreen" component={SecondScreen} />
          <Pesca.Screen name="ThridScreen" component={ThirdScreen} />
        </Pesca.Navigator> */}
      </NavigationContainer>
    </>
  );
}

function FirstScreen({ name, navigation }: ScreenComponentProps) {
  return (
    <>
      <View
        style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0' }}>
        <Text>{name}</Text>
        <View style={{ margin: 50 }}>
          <PescaButton onPress={() => navigation.next()}>
            <View>
              <Text>Next</Text>
            </View>
          </PescaButton>
        </View>
        <View style={{ margin: 50 }}>
          <PescaButton onPress={() => navigation.back()}>
            <View>
              <Text>Back</Text>
            </View>
          </PescaButton>
        </View>
      </View>
    </>
  );
}

function SecondScreen({ name, navigation }: ScreenComponentProps) {
  return (
    <>
      <View
        style={{ width: '100%', height: 600, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f00' }}>
        <Text>{name}</Text>
        <View style={{ margin: 50 }}>
          <PescaButton onPress={() => navigation.next()}>
            <View>
              <Text>Next</Text>
            </View>
          </PescaButton>
        </View>
        <View style={{ margin: 50 }}>
          <PescaButton onPress={() => navigation.back()}>
            <View>
              <Text>Back</Text>
            </View>
          </PescaButton>
        </View>
      </View>
    </>
  );
}

function ThirdScreen({ name, navigation }: ScreenComponentProps) {
  return (
    <>
      <View
        style={{ width: '100%', height: 450, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00f' }}>
        <Text>{name}</Text>
        <View style={{ margin: 50 }}>
          <PescaButton onPress={() => navigation.next()}>
            <View>
              <Text>Next</Text>
            </View>
          </PescaButton>
        </View>
        <View style={{ margin: 50 }}>
          <PescaButton onPress={() => navigation.back()}>
            <View>
              <Text>Back</Text>
            </View>
          </PescaButton>
        </View>
      </View>
    </>
  );
}
