import { useStyle } from '@moneyboy/hooks/useStyle';
import { StyleSheet } from 'react-native';

export const useSeparatorStyles = () => {
  const { Content } = useStyle();
  return StyleSheet.create({
    separatorContainer: {
      width: '100%',
      flexDirection: 'row',
    },
    separator: {
      flex: 1,
      height: 1,
      marginHorizontal: 15,
      backgroundColor: Content.separator.color,
    },
  });
};
