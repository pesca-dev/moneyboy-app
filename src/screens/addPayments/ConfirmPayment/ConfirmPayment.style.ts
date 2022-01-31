import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useConfirmPaymentStyles = () => {
  const { Buttons, Input, Texts } = useStyle();
  return StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 30,
    },
    backButtonContainer: {
      paddingTop: 5,
      paddingBottom: 20,
    },
    backButtonText: {
      color: Buttons.special.back.color,
    },
    label: {
      fontSize: variables.font.size.small,
      marginBottom: 5,
      paddingLeft: 7,
      color: Input.label.color,
    },
    amount: {
      color: Texts.colors.primary,
      textAlign: 'center',
      fontSize: 100,
    },
    submitButtonContainer: {
      width: '100%',
      marginTop: 20,
    },
    submitButtonBackground: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: Buttons.primary.active.background,
      padding: 5,
      borderRadius: 10,
    },
    submitButtonText: {
      textAlign: 'center',
      fontSize: 24,
      color: Buttons.primary.active.color,
    },
    dateFieldContainer: {
      flexDirection: 'row',
    },
    dateFieldLabelContainer: {
      justifyContent: 'center',
    },
    dateFieldLabel: {
      color: Texts.colors.primary,
      fontSize: variables.font.size.small,
      paddingHorizontal: 7,
    },
  });
};
