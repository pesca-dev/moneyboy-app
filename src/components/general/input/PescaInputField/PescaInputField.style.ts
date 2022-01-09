import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const usePescaInputFieldStyles = () => {
  const { Input, Texts } = useStyle();
  return StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 10,
    },
    label: {
      fontSize: variables.font.size.ultraSmall,
      marginBottom: 5,
      paddingLeft: 7,
      color: Input.label.color,
    },
    input: {
      borderColor: Input.border.color,
      borderWidth: 1,
      padding: 10,
      fontSize: variables.font.size.small,
      borderRadius: 5,
      color: Texts.colors.primary,
    },
    placeholder: {
      color: Input.placeholder.color,
    },
  });
};
