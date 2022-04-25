import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { PescaInputField } from '@moneyboy/components/general/input/PescaInputField';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useLoginStyles } from './Login.style';

type LoginViewProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

/**
 * The Login view of out application.
 */
export const LoginView: React.FC<LoginViewProps> = ({ navigation }) => {
  const { login } = useAuth();

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
        // Set error message, if Login is not successful
        if (!success) {
          setError(message);
        }
      });
    }
  }

  const styles = useLoginStyles();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.wrapper]}
      testID="login">
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
              <Text style={styles.linkText}>No Account? Register!</Text>
            </PescaButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
