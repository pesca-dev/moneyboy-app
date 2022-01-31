import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useRegisterStyles = () => {
  const { Texts, Buttons, Colors } = useStyle();
  return StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      marginBottom: 60,
    },
    formHeadingContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    formHeading: {
      color: Texts.colors.primary,
      fontSize: variables.font.size.large,
    },
    infoMessage: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
    },
    errorView: {
      backgroundColor: Colors.status.error,
    },
    errorText: {
      color: Texts.colors.secondary,
    },
    successView: {
      backgroundColor: Colors.status.success,
    },
    successText: {
      color: Texts.colors.secondary,
    },
    formContainer: {
      width: '80%',
      marginTop: 120,
    },
    buttonContainer: {
      marginTop: 15,
    },
    button: {},
    buttonContent: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      backgroundColor: Buttons.secondary.inactive.background,
    },
    validFormbutton: {
      backgroundColor: Buttons.secondary.active.background,
    },
    buttonText: {
      fontSize: variables.font.size.extraSmall,
      color: Buttons.secondary.active.color,
    },
    error: {
      borderColor: Colors.status.error,
    },
    link: {
      marginTop: 25,
    },
    linkText: {
      color: Texts.colors.primary,
    },
  });
};
