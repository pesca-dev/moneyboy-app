import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useLogoutButtonStyles = () => {
  const { Buttons } = useStyle();
  return StyleSheet.create({
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
};
