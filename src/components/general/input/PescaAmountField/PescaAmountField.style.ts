import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const usePescaAmountFieldStyles = () => {
  const { Input, Texts } = useStyle();
  return StyleSheet.create({
    container: {
      //   flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
    label: {
      fontSize: variables.font.size.small,
      marginBottom: 5,
      paddingLeft: 7,
      color: Input.label.color,
    },
    input: {
      display: 'none',
    },
    text: {
      //   flexDirection: 'column',
      textAlign: 'center',
      fontSize: 100,
      color: Texts.colors.primary,
    },
  });
};
