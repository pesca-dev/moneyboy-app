import variables from '@moneyboy/config/variables';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useFlyoutStyles = () => {
  const { Flyouts } = useStyle();
  return StyleSheet.create({
    outterContainer: {
      maxHeight: '80%',
    },
    flyoutContainer: {
      backgroundColor: Flyouts.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingTop: 20,
      elevation: 5,
      shadowColor: Flyouts.shadow,
      shadowRadius: 10,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
    },
    closeButtonContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    closeButton: {
      zIndex: 9999,
    },
    closeIcon: {
      fontSize: variables.font.size.default,
      color: Flyouts.icon.color,
    },
    modal: {
      margin: 20,
      // marginBottom: 20,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
  });
};
