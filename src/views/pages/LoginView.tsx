import PescaButton from '@components/input/PescaButton';
import PescaInputField from '@components/input/PescaInputField';
import variables from '@config/variables';
import { AuthContext } from '@context/AuthContext';
import { ThemeContext } from '@context/ThemeContext';
import { NavigationHelpers, ParamListBase } from '@react-navigation/core';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type LoginViewProps = {
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
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

  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.content.background,
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
      backgroundColor: theme.signals.error,
      padding: 10,
      borderRadius: 5,
    },
    errorText: {
      color: theme.default.white,
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
      backgroundColor: theme.buttons.form.invalid.background,
    },
    validFormbutton: {
      backgroundColor: theme.buttons.form.valid.background,
    },
    buttonText: {
      fontSize: variables.font.size.extraSmall,
      color: theme.buttons.form.color,
    },
    link: {
      marginTop: 25,
    },
  });

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
              textContentType="username"
            />
            <PescaInputField
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onSubmit}
              textContentType="password"
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
