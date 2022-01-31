import { StyleSheet } from 'react-native';
import { useStyle } from '@moneyboy/hooks/useStyle';

export const useThemeSwitchStyles = () => {
  const { Texts } = useStyle();
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'column',
      flex: 1,
    },
    container: {
      flexDirection: 'row',
      flex: 1,
      marginVertical: 2,
    },
    labelContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    label: {
      color: Texts.colors.primary,
      fontSize: 16,
    },
    subLabelContainer: {
      paddingLeft: 20,
    },
    disabled: {
      color: Texts.colors.disabled,
    },
    switchContainer: {},
  });
};
