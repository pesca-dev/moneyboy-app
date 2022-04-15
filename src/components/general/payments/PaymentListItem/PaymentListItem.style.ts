import variables from '@moneyboy/config/variables';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const usePaymentListItemStyles = () => {
  const { Buttons, Texts } = useStyle();
  return StyleSheet.create({
    buttonContainer: {
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
    deleteButtonBackground: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: Buttons.special.deleteButton.active.background,
      padding: 5,
      borderRadius: 10,
    },
    disabled: {
      backgroundColor: Buttons.primary.inactive.background,
    },
    buttonText: {
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
