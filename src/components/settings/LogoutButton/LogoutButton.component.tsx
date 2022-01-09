import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { useAuth } from '@moneyboy/hooks/useAuth';
import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLogoutButtonStyles } from './LogoutButton.style';

type LogoutButtonProps = {
  onPress?: () => void;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  const { logout } = useAuth();

  const handlePress = () => {
    logout();
    onPress?.();
  };

  const styles = useLogoutButtonStyles();

  return (
    <PescaButton onPress={handlePress}>
      <View style={[styles.logoutContainer]}>
        <MaterialCommunityIcons name="arrow-right" style={[styles.logoutIcon]} />
        <Text style={[styles.logoutText]}>Logout</Text>
      </View>
    </PescaButton>
  );
};
