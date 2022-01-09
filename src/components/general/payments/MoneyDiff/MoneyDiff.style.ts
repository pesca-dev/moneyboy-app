import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useMoneyDiffStyles = () => {
  const { Colors, Texts } = useStyle();
  return StyleSheet.create({
    moneyDiffName: {
      flex: 1,
      fontSize: variables.font.size.small,
      color: Texts.colors.primary,
    },
    moneyDiffAmount: {
      fontSize: variables.font.size.small,
    },
    positiveDiff: {
      color: Colors.status.success,
    },
    negativeDiff: {
      color: Colors.status.error,
    },
  });
};
