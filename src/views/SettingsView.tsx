import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PescaButton from '@components/input/PescaButton';
import { AuthContext } from '@context/LoginContext';

export default function SettingsView() {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user?.username}</Text>
      <PescaButton onPress={logout}>
        <Text>Logout</Text>
      </PescaButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    marginBottom: 40,
  },
});
