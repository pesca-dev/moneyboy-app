import { PescaButton } from '@components/input/PescaButton';
import variables from '@config/variables';
import { AuthContext } from '@context/AuthContext';
import { ThemeContext } from '@context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type LogoutButtonProps = {};

export const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const { logout } = React.useContext(AuthContext);

  const theme = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    logoutContainer: {
      flexDirection: 'row',
    },
    logoutIcon: {
      fontSize: variables.font.size.small,
      marginRight: 5,
      color: theme.buttons.logout.color,
    },
    logoutText: {
      fontSize: variables.font.size.extraSmall,
      color: theme.buttons.logout.color,
    },
  });

  return (
    <PescaButton onPress={logout}>
      <View style={[styles.logoutContainer]}>
        <MaterialCommunityIcons name="arrow-right" style={[styles.logoutIcon]} />
        <Text style={[styles.logoutText]}>Logout</Text>
      </View>
    </PescaButton>
  );
};
