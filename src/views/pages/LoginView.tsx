import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationHelpers, ParamListBase } from '@react-navigation/core';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

import PescaButton from '@components/input/PescaButton';
import PescaInputField from '@components/input/PescaInputField';
import { AuthContext } from '@context/AuthContext';
import variables from '@config/variables';

type LoginViewProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

/**
 * The login view of out application.
 */
export default function LoginView({ navigation }: LoginViewProps) {
  const { login } = React.useContext(AuthContext);

  const [valid, setValid] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    function validate() {
      return !!username.length && !!password.length;
    }

    setValid(validate());
  }, [username, password]);

  function onSubmit() {
    // Only try to log in, if there is any useful input.
    if (valid) {
      login({
        username,
        password,
      }).then(([success, message]) => {
        // Set error message, if login is not successful
        if (!success) {
          setError(message);
        }
      });
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.wrapper]}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={[styles.formContainer]}>
            <View style={[styles.formHeadingContainer]}>
              <Text style={[styles.formHeading]}>Login</Text>
            </View>
            {/* Display possible error */}
            {error && (
              <View style={[styles.errorView]}>
                <Text style={[styles.errorText]}>{error}</Text>
              </View>
            )}
            <PescaInputField
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={onSubmit}
            />
            <PescaInputField
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onSubmit}
              secureTextEntry
            />
            <View style={[styles.buttonContainer]}>
              <PescaButton onPress={onSubmit} style={[styles.button]}>
                <View style={[styles.buttonContent, valid && styles.validFormbutton]}>
                  <Text style={[styles.buttonText]}>Login</Text>
                </View>
              </PescaButton>
            </View>
          </View>

          <View style={[styles.link]}>
            <PescaButton onPress={() => navigation.navigate('register')}>
              <Text>No Account? Register!</Text>
            </PescaButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: variables.themes.light.background.primary,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 40,
  },
  formHeadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formHeading: {
    fontSize: variables.font.size.large,
  },
  errorView: {
    alignItems: 'center',
    backgroundColor: variables.themes.light.signals.bad,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: variables.themes.light.text.white,
  },
  formContainer: {
    width: '80%',
    marginTop: 120,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {},
  buttonContent: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#95a5a6',
  },
  validFormbutton: {
    backgroundColor: '#2c3e50',
  },
  buttonText: {
    fontSize: variables.font.size.extraSmall,
    color: variables.themes.light.text.white,
  },
  link: {
    marginTop: 25,
  },
});
