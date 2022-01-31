import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useMenuItemStyles = () => {
  const { Buttons } = useStyle();
  return StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      backgroundColor: Buttons.primary.active.background,
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 24,
    },
    icon: {
      fontSize: 28,
      color: Buttons.primary.active.color,
    },
  });
};
