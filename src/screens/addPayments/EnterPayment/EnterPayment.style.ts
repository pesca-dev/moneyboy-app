import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useEnterPaymentStyles = () => {
  const { Buttons, Texts } = useStyle();
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
    disabled: {
      backgroundColor: Buttons.primary.inactive.background,
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
    dateFieldInput: {
      flex: 1,
    },
  });
};
