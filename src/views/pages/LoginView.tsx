import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import PescaButton from '@components/input/PescaButton';
import PescaInputField from '@components/input/PescaInputField';
import { AuthContext } from '@context/LoginContext';

export default function LoginView() {
  const { login } = React.useContext(AuthContext);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onSubmit() {
    login({
      username,
      password,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.formContainer]}>
        <View style={[styles.formHeadingContainer]}>
          <Text style={[styles.formHeading]}>Login</Text>
        </View>
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
            <View style={[styles.buttonContent]}>
              <Text style={[styles.buttonText]}>Login</Text>
            </View>
          </PescaButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formHeadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formHeading: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: '#2c3e50',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});
