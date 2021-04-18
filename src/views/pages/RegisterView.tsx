import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationHelpers, ParamListBase } from '@react-navigation/core';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';

import PescaButton from '@components/input/PescaButton';
import PescaInputField from '@components/input/PescaInputField';
import { AuthContext } from '@context/LoginContext';
import { ScrollView } from 'react-native-gesture-handler';

type RegisterViewProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export default function RegisterView({ navigation }: RegisterViewProps) {
  const { register } = React.useContext(AuthContext);

  const [valid, setValid] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  const [mail, setMail] = useState<string>('');

  // let isValid = React.useRef(false);

  useEffect(() => {
    function validate() {
      return (
        !!mail.length &&
        !!username.length &&
        !!displayName.length &&
        !!password.length &&
        !!confirmPw.length &&
        password === confirmPw
      );
    }
    setValid(validate());
  }, [username, displayName, password, confirmPw, mail]);

  function onSubmit() {
    if (valid) {
      register();
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.wrapper]}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={[styles.formContainer]}>
            <View style={[styles.formHeadingContainer]}>
              <Text style={[styles.formHeading]}>Register</Text>
            </View>
            <PescaInputField
              label="Email"
              placeholder="Email"
              value={mail}
              onChangeText={setMail}
              onSubmitEditing={onSubmit}
            />
            <PescaInputField
              label="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={onSubmit}
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
            />
            <PescaInputField
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPw}
              onChangeText={setConfirmPw}
              onSubmitEditing={onSubmit}
              style={password !== confirmPw && styles.error}
              secureTextEntry
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
              <Text>Already got an accout? Login!</Text>
            </PescaButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 60,
  },
  formHeadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formHeading: {
    fontSize: 32,
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
    fontSize: 18,
    color: '#fff',
  },
  error: {
    borderColor: '#f00',
  },
  link: {
    marginTop: 25,
  },
});
