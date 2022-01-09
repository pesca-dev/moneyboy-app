import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const usePescaMenuStyles = () => {
  const { Buttons, Content } = useStyle();
  return StyleSheet.create({
    addButtonWrapper: {
      height: 32,
      width: 32,
      top: -25,
      overflow: 'visible',
      marginLeft: 15,
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: Content.shadows.color,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0.7,
      zIndex: 100,
      shadowRadius: 7,
    },
    outterContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
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
