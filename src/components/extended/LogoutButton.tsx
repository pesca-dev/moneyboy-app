import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PescaButton from '@components/input/PescaButton';
import { AuthContext } from '@context/AuthContext';
import variables from '@config/variables';

type LogoutButtonProps = {};

export default function LogoutButton({}: LogoutButtonProps) {
  const { logout } = React.useContext(AuthContext);

  return (
    <PescaButton onPress={logout}>
      <View style={[styles.logoutContainer]}>
        <MaterialCommunityIcons name="arrow-right" style={[styles.logoutIcon]} />
        <Text style={[styles.logoutText]}>Logout</Text>
      </View>
    </PescaButton>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    flexDirection: 'row',
  },
  logoutIcon: {
    fontSize: variables.font.size.small,
    marginRight: 5,
    color: '#e74c3c',
  },
  logoutText: {
    fontSize: variables.font.size.extraSmall,
    color: '#e74c3c',
  },
});
