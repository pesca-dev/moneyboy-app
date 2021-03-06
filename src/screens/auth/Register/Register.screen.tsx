import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { PescaInputField } from '@moneyboy/components/general/input/PescaInputField';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRegisterStyles } from './Register.style';

/**
 * Display message for the registration dialog.
 */
type Messages = {
  error: string | undefined;
  success: string | undefined;
};

type RegisterViewProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export const RegisterView: React.FC<RegisterViewProps> = ({ navigation }) => {
  const { register } = useAuth();

  const [valid, setValid] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  const [email, setMail] = useState<string>('');

  const [message, setMessages] = useState<Messages>({ error: undefined, success: undefined });

  useEffect(() => {
    function validate() {
      return (
        !!email.length &&
        !!username.length &&
        !!displayName.length &&
        !!password.length &&
        !!confirmPw.length &&
        password === confirmPw
      );
    }

    setValid(validate());
  }, [username, displayName, password, confirmPw, email]);

  function onSubmit() {
    if (valid) {
      register({ username, password, displayName, email }).then(([success, error]) => {
        if (success) {
          setMessages({
            error: undefined,
            success: 'Please check your mailbox for a confirmation email! Also check your spam box.',
          });
        } else {
          setMessages({
            success: undefined,
            error,
          });
        }
      });
    }
  }

  const styles = useRegisterStyles();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.wrapper]}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={[styles.formContainer]}>
            <View style={[styles.formHeadingContainer]}>
              <Text style={[styles.formHeading]}>Register</Text>
            </View>
            {/* Display possible error */}
            {message.error && (
              <View style={[styles.infoMessage, styles.errorView]}>
                <Text style={[styles.errorText]}>{message.error}</Text>
              </View>
            )}
            {/* Display possible succes message */}
            {message.success && (
              <View style={[styles.infoMessage, styles.successView]}>
                <Text style={[styles.successText]}>{message.success}</Text>
              </View>
            )}
            <PescaInputField
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setMail}
              onSubmitEditing={onSubmit}
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <PescaInputField
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={onSubmit}
              textContentType="username"
            />
            <PescaInputField
              label="Displayname"
              placeholder="Displayname"
              value={displayName}
              onChangeText={setDisplayName}
              onSubmitEditing={onSubmit}
            />
            <PescaInputField
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onSubmit}
              secureTextEntry
              textContentType="newPassword"
            />
            <PescaInputField
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPw}
              onChangeText={setConfirmPw}
              onSubmitEditing={onSubmit}
              style={password !== confirmPw && styles.error}
              secureTextEntry
              textContentType="newPassword"
            />
            <View style={[styles.buttonContainer]}>
              <PescaButton onPress={onSubmit} style={[styles.button]}>
                <View style={[styles.buttonContent, valid && styles.validFormbutton]}>
                  <Text style={[styles.buttonText]}>Register</Text>
                </View>
              </PescaButton>
            </View>
          </View>

          <View style={[styles.link]}>
            <PescaButton onPress={() => navigation.navigate('login')}>
              <Text style={styles.linkText}>Already got an accout? Login!</Text>
            </PescaButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
