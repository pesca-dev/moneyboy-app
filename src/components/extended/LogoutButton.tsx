import { PescaButton } from '@components/input/PescaButton';
import variables from '@config/variables';
import { AuthContext } from '@context/AuthContext';
import { StyleContext } from '@context/StyleContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type LogoutButtonProps = {
  onPress?: () => void;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  const { logout } = React.useContext(AuthContext);

  const handlePress = () => {
    logout();
    onPress?.();
  };

  const { Buttons } = React.useContext(StyleContext);
  const styles = StyleSheet.create({
    logoutContainer: {
      flexDirection: 'row',
    },
    logoutIcon: {
      fontSize: variables.font.size.small,
      marginRight: 5,
      color: Buttons.special.logout.color,
    },
    logoutText: {
      fontSize: variables.font.size.extraSmall,
      color: Buttons.special.logout.color,
    },
  });

  return (
    <PescaButton onPress={handlePress}>
      <View style={[styles.logoutContainer]}>
        <MaterialCommunityIcons name="arrow-right" style={[styles.logoutIcon]} />
        <Text style={[styles.logoutText]}>Logout</Text>
      </View>
    </PescaButton>
  );
};
